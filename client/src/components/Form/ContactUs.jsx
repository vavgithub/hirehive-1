import React, { useState , useCallback } from 'react';
import StyledCard from '../ui/StyledCard';
import { InputField } from './FormFields';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import { Button } from '../ui/Button';
import Modal from '../Modal';
import { useDropzone } from 'react-dropzone';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_CONTACT_FORM_SCRIPT_URL;


const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset form when opening
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setErrors({});
      setScreenshotFile(null);
      setUploadProgress(0);
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Upload screenshot to Cloudinary
  const uploadScreenshot = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('resource_type', 'auto');

      const response = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error("Cloudinary: Can't generate URL");
      }
    } catch (error) {
      throw new Error(error.message || "Error uploading to Cloudinary");
    }
  };

  // Submit form data to Google Sheets
  const submitToGoogleSheets = async (data) => {
    try {
      // Build URL with form data as query parameters
      const url = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&message=${encodeURIComponent(data.message)}&screenshotUrl=${encodeURIComponent(data.screenshotUrl || '')}&timestamp=${encodeURIComponent(data.timestamp)}`;
      
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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let screenshotUrl = null;
      
      // Upload screenshot to Cloudinary if a file was selected
      if (screenshotFile) {
        screenshotUrl = await uploadScreenshot(screenshotFile);
      }
      
      // Prepare data for Google Sheets
      const contactFormData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        screenshotUrl: screenshotUrl || '',
        timestamp: new Date().toISOString()
      };
      
      // Submit to Google Sheets
      await submitToGoogleSheets(contactFormData);
      
      showSuccessToast('Success', 'Your message has been sent successfully!');
      toggleModal();
    } catch (error) {
      showErrorToast('Error', error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-teal-400 hover:bg-teal-500 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label="Contact Us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </button>
      
      {/* Modal for Contact Form */}
      <Modal
        open={isOpen}
        onClose={toggleModal}
        customTitle="Contact Us"
        customMessage="Please fill out the form below and we'll get back to you as soon as possible."
        customConfirmLabel={isSubmitting ? "Sending..." : "Send Message"}
        confirmVariant="primary"
        cancelLabel="Cancel"
        onConfirm={handleSubmit}
        isconfirmButtonDisabled={isSubmitting}
      >
        <div className="space-y-4 mt-4">
          <InputField
            id="name"
            type="text"
            label="Name"
            required
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            errorMessage={errors.name}
          />
          
          <InputField
            id="email"
            type="email"
            label="Email"
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            errorMessage={errors.email}
          />
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="typography-body">
              Message <span className="text-red-100">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className={`w-full p-2 bg-background-40 rounded outline-none focus:outline-teal-300 ${
                errors.message ? '!border !border-red-500' : 'border border-transparent'
              }`}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 typography-small-p">{errors.message}</span>
            )}
          </div>
          
          {/* Screenshot Upload Section */}
          <div className="mt-6">
            <label className="typography-body">Screenshot (Optional)</label>
            <div
              {...getRootProps({
                className: `bg-background-40 hover:bg-background-60 rounded-xl mt-4 p-4 text-center cursor-pointer 
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
                  >
                    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 0.5L1 8.5M1 0.5L9 8.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className='flex items-center flex-col'>
                  <div className='hidden md:flex'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.999 16.9999V22.3333C24.999 23.0405 24.7181 23.7188 24.218 24.2189C23.7179 24.719 23.0396 24.9999 22.3324 24.9999H3.66569C2.95845 24.9999 2.28017 24.719 1.78007 24.2189C1.27997 23.7188 0.999023 23.0405 0.999023 22.3333V16.9999M19.6657 7.66661L12.999 0.999939M12.999 0.999939L6.33236 7.66661M12.999 0.999939V16.9999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mb-2 hidden typography-body text-font-gray md:flex">Drag and drop your screenshot here</p>
                  <p className='text-font-gray typography-small-p hidden md:flex mb-2'>OR</p>
                  <div className='md:w-[276px]'>
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
        </div>
      </Modal>
    </>
  );
};
export default ContactUs;