import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '../Buttons/Button';
import StyledCard from '../Cards/StyledCard';
import Loader from '../Loaders/Loader';
import Modal from '../Modals/Modal';
import IconWrapper from '../Cards/IconWrapper';
import { ChevronRight, Headset, Phone, Upload, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapseContactUs } from '../../redux/candidateSlice';
import { useMediaQuery } from 'react-responsive';
import { uploadScreenshotToS3 } from '../../utility/s3upload';


const CLOUDINARY_URL_SS = import.meta.env.VITE_CLOUDINARY_URL_SS;
const CLOUDINARY_SCREENSHOT_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_SCREENSHOT_UPLOAD_PRESET;
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_CONTACT_FORM_SCRIPT_URL;

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const collapse = useSelector(state => state.candidate.collapseContactUs);
  const dispatch = useDispatch();

  // Find if it is mobile-screen
  const isSmallLayout = useMediaQuery({
    query: '(max-width: 1024px)'
  })

  useEffect(()=>{
    if(isSmallLayout){
      dispatch(setCollapseContactUs(false))
    }
  },[isSmallLayout])

  // React Hook Form setup
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    mode: 'onChange', // Validate on change to enable/disable submit button
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  // For watching field values for validation
  const formValues = watch();

  const toggleModal = () => {
    // Only close modal if not in loader display mode
    if (showLoader && !isSuccess) return;

    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset form when opening
      reset();
      setScreenshotFile(null);
      setUploadProgress(0);
      setShowLoader(false);
      setIsSuccess(false);
    }
  };

  // File upload handling with react-dropzone
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setScreenshotFile(file);

      // Reset upload progress when a new file is selected
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit
    maxFiles: 1
  });

  // Submit form data to Google Sheets
  const submitToGoogleSheets = async (data) => {
    try {
      // Build URL with form data as query parameters
      const url = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&message=${encodeURIComponent(data.message)}&screenshotUrl=${encodeURIComponent(data.screenshotUrl || '')}&timestamp=${encodeURIComponent(data.timestamp)}`;
      
      // console.log("Submitting to URL:", url);
      
      // Use no-cors mode since Google Script returns CORS errors
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
      });

      // Store submission in localStorage as backup
      const storedSubmissions = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
      storedSubmissions.push(data);
      localStorage.setItem('contactFormSubmissions', JSON.stringify(storedSubmissions));

      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      throw new Error('Failed to submit form');
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setShowLoader(true); // Show the loader animation

    try {
      let screenshotUrl = null;

      // Upload screenshot to Cloudinary if a file was selected
      if (screenshotFile) {
        // screenshotUrl = await uploadScreenshot(screenshotFile);
        screenshotUrl = await uploadScreenshotToS3(screenshotFile,()=>{});
      }

      // Prepare data for Google Sheets
      const contactFormData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        screenshotUrl: screenshotUrl || '',
        timestamp: new Date().toISOString()
      };
      
      // console.log("Submitting form data:", contactFormData);
      
      // Submit to Google Sheets
      await submitToGoogleSheets(contactFormData);

      // Display success state
      setIsSuccess(true);
      showSuccessToast('Success', 'Your message has been sent successfully!');

      // Close modal after showing loader for 2 seconds
      setTimeout(() => {
        toggleModal();
      }, 2000);

      return true;
    } catch (error) {
      console.error("Form submission error:", error);
      setShowLoader(false); // Hide loader on error
      showErrorToast('Error', error.message || 'Failed to send message');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the form is valid for enabling/disabling the submit button
  const isFormValid = isValid &&
    formValues.name &&
    formValues.email &&
    formValues.message &&
    formValues.message.length >= 10;

  // Render the form or loader based on submission state
  const renderContent = () => {

    return (
      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4 mt-4 max-h-[50vh] overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="typography-body">
            Name <span className="text-red-100">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className={`w-full p-2 bg-background-80 rounded outline-none focus:outline-teal-300 ${errors.name ? '!border !border-red-500' : 'border border-transparent'
              }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 typography-small-p">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="typography-body">
            Email <span className="text-red-100">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full p-2 bg-background-80 rounded outline-none focus:outline-teal-300 ${errors.email ? '!border !border-red-500' : 'border border-transparent'
              }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid"
              }
            })}
          />
          {errors.email && (
            <span className="text-red-500 typography-small-p">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="typography-body">
            Message <span className="text-red-100">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="How can we help you?"
            className={` px-4 pt-2 bg-background-80 resize-none hover:bg-background-60 cursor-pointer  rounded-xl placeholder:text-font-gray placeholder:font-body  focus:ring-teal-400 focus:outline-teal-500 outline-none typography-body w-full ${errors.message ? '!border !border-red-500' : 'border border-transparent'
              }`}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters"
              }
            })}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 typography-small-p">{errors.message.message}</span>
          )}
        </div>

        {/* Screenshot Upload Section */}
        <div className="mt-6">
          <label className="typography-body">Screenshot (Optional)</label>
          <div
            {...getRootProps({
              className: `bg-background-80 hover:bg-background-60 rounded-xl mt-4 p-4 text-center cursor-pointer 
                ${isDragActive ? 'border border-teal-500 bg-background-60' : ''}`,
            })}
          >
            <input {...getInputProps()} />
            {screenshotFile ? (
              <div className="flex bg-background-70 items-center justify-between p-4 rounded-xl">
                <span>{screenshotFile.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScreenshotFile(null);
                    setUploadProgress(0);
                  }}
                  className="ml-2"
                  type="button"
                >
                  <IconWrapper icon={X} inheritColor size={0} customIconSize={4} customStrokeWidth={7} />
                </button>
              </div>
            ) : (
              <div className='flex items-center flex-col'>
                <div className='hidden md:flex text-font-gray '>
                  <IconWrapper icon={Upload} inheritColor size={0} customIconSize={4} customStrokeWidth={7} />
                </div>
                <p className="mb-2 hidden typography-body text-font-gray md:flex">Drag and drop your screenshot here</p>
                <p className='text-font-gray typography-small-p hidden md:flex mb-2'>OR</p>
                <div className='md:w-[17.25]'>
                  <Button variant="secondary" type="button">Browse files</Button>
                </div>
              </div>
            )}
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <progress value={uploadProgress} max="100" className="w-full" />
              <span>{uploadProgress}% uploaded</span>
            </div>
          )}
        </div>
      </form>
    );
  };

  return (
    <>
      {/* Floating Button */}
      {isSubmitting &&
        <div className="flex fixed top-0 left-0 h-screen w-screen z-[100] flex-col items-center justify-center py-4 bg-background-overlay">
          <StyledCard>
            <Loader loop={!isSuccess} autoplay={true} />
            <p className="text-center mt-4 typography-body text-font-gray flex items-center justify-center">
              Sending your message<span className=' animated-dots '>...</span>
            </p>
          </StyledCard>
        </div>
      }


      <StyledCard
        onClick={collapse ? null : toggleModal}
        extraStyles={`!p-4 !md:p-4  lg:fixed bottom-6 right-6 lg:bottom-[40%] lg:right-0  w-full lg:w-fit cursor-pointer hover:bg-background-60  `}
        style={{
          maxWidth : collapse ? '5rem' : '100%',
          transition: 'max-width 1s ease',
        }}
        backgroundColor={'bg-background-80'}
        borderRadius={'rounded-xl lg:rounded-l-xl   lg:rounded-r-none  '}
      >
        { collapse ?
        <>
          <IconWrapper onClick={(e)=>{e.stopPropagation(); dispatch(setCollapseContactUs(false))}} icon={Headset} />
        </>
        :
          <div className='flex items-center gap-2'>
            <span className='hidden lg:inline-block'><IconWrapper onClick={(e)=>{e.stopPropagation(); dispatch(setCollapseContactUs(true))}} size={0} customIconSize={7} icon={ChevronRight} /></span>
            <div>
              <p className='typography-body mb-2  whitespace-nowrap'>Need Help?</p>
              <div className='flex items-center gap-2 text-primary-100'>
                <IconWrapper  size={0} inheritColor customIconSize={2} icon={Phone} />
                <p className='typography-small-p  whitespace-nowrap' >Connect with support team</p>
              </div>
            </div>
          </div>
        }
      </StyledCard>




      {/* Modal for Contact Form */}
      <Modal
        open={isOpen}
        onClose={toggleModal}
        customTitle={showLoader ? (isSuccess ? "Thank You!" : "Sending...") : "Contact Us"}
        customMessage={showLoader ? "" : "Please fill out the form below and we'll get back to you as soon as possible."}
        customConfirmLabel={isSubmitting ? "Sending..." : "Send"}
        confirmVariant="primary"
        cancelLabel="Cancel"
        onConfirm={handleFormSubmit(onSubmit)}
        isconfirmButtonDisabled={isSubmitting || showLoader || !isFormValid}
      >
        {renderContent()}
      </Modal>
    </>
  );
};

export default ContactUs;