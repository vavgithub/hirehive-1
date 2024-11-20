// ApplyJob.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/FormFields';
import SkillsInput from '../../components/utility/SkillsInput';
import { Button } from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import useAuthCandidate from '../../hooks/useAuthCandidate';
import { dummySkills } from '../../components/Form/dropdownOptions';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/ui/Loader';
import Logo from '../../svg/Logo/lightLogo.svg'

const fetchJobDetails = async (id) => {
  const response = await axios.get(`/jobs/getJobById/${id}`);
  return response.data;
};

const ApplyJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([]);

  // const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { isAuthenticated, candidateData, refetch  } = useAuthCandidate();

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const hiddenFileInput = useRef(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setValue('resumeFile', file, { shouldValidate: true });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
        setValue('resumeFile', acceptedFiles[0], { shouldValidate: true });
      }
    },

  });


  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      resumeFile: null,
      skills: [], // Add this line
    },
  });

  useEffect(() => {
    if (isAuthenticated && candidateData) {
      // Pre-fill form fields with candidate data
      reset({
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phoneNumber: candidateData.phone,
        website: candidateData.website || '',
        portfolio: candidateData.portfolio || '',
        experience: candidateData.experience || '',
        noticePeriod: candidateData.noticePeriod || '',
        currentCTC: candidateData.currentCTC || '',
        expectedCTC: candidateData.expectedCTC || '',
        resumeFile: resumeFile,
        skills: candidateData.skills || [], // Add this line
      });
    }
  }, [isAuthenticated, candidateData, reset]);

  const { data: jobDetails, isLoading } = useQuery({
    queryKey: ['jobDetails', jobId],
    queryFn: () => fetchJobDetails(jobId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const { jobTitle, questions = [] } = jobDetails || {};

  const uploadResume = async () => {
    if (!resumeFile) return null;

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await axios.post('/auth/candidate/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      return response.data.resumeUrl;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Extract questionResponses from form data
      const questionResponses = Object.keys(data)
        .filter((key) => key.startsWith('question-'))
        .map((key) => ({
          questionId: key.replace('question-', ''),
          answer: data[key],
        }));

      // Upload resume if provided
      let resumeUrl = null;
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);

        const uploadResponse = await axios.post('/auth/candidate/upload-resume', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });
        resumeUrl = uploadResponse.data.resumeUrl;
      }

      if (isAuthenticated) {
        // For authenticated users, only send professional details
        const applicationData = {
          jobId,
          website: data.website,
          portfolio: data.portfolio,
          noticePeriod: data.noticePeriod,
          currentCTC: data.currentCTC,
          expectedCTC: data.expectedCTC,
          experience: data.experience,
          skills: data.skills,
          questionResponses,
          resumeUrl
        };

        await axios.post('/auth/candidate/apply-job', applicationData);

         // Update this line to use refetch
         await refetch();

        setIsSubmitting(false);
        showSuccessToast('Success', 'Successfully applied to the job');
        navigate('/candidate/my-jobs');
      } else {
        // For new users, send all required information
        const registrationData = {
          jobId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phoneNumber,
          website: data.website,
          portfolio: data.portfolio,
          noticePeriod: data.noticePeriod,
          currentCTC: data.currentCTC,
          expectedCTC: data.expectedCTC,
          experience: data.experience,
          skills: data.skills,
          questionResponses,
          resumeUrl
        };

        await axios.post('/auth/candidate/register', registrationData);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        showSuccessToast('Create Password', "Please Create Your Password");
        setCurrentStep(2);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      showErrorToast(
        'Error',
        error.response?.data?.message || 'Failed to perform job action. Please try again.'
      );
    }
  };
  // Modified handleOtpSubmit function
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    setIsSubmitting(true);

    axios
      .post('/auth/candidate/verify-otp', { email, otp: enteredOtp })
      .then((response) => {
        setIsSubmitting(false);
        showSuccessToast('OTP Verified', 'Please create your password to continue.');
        setCurrentStep(3); // Move to password creation step
      })
      .catch((error) => {
        setIsSubmitting(false);
        setOtpError(error.response.data.message);
      });
  };

  // Modified handlePasswordSubmit function
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const password = getValues('password');
    const confirmPassword = getValues('confirmPassword');

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('/auth/candidate/create-password', { email, password });
      setIsSubmitting(false);
      showSuccessToast('Success', 'Account created successfully!');
      
      // Update authentication state
      // Update this line to use refetch
      await refetch();

      
      // Navigate to My Jobs page after successful password creation
      navigate('/candidate/my-jobs');
    } catch (error) {
      setIsSubmitting(false);
      setPasswordError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  // Handler for OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };


  // Handler for additional questions input change
  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className='md:mx-16 md:mt-4 container'>
    
<img className='h-12' src={Logo}/>
      {currentStep === 1 && (
        <h1 className="typography-h1 m-4">Application for {jobTitle}</h1>
      )}

      {currentStep === 1 && (
        <form className='mx-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Details */}
          {!isAuthenticated && (
            <>

              <h3 className="typography-h3 mt-8 mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      type="text"
                      id="firstName"
                      label="First Name"
                      required={true}
                      error={errors.firstName}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      id="lastName"
                      type="text"
                      label="Last Name"
                      required={true}
                      error={errors.lastName}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      id="email"
                      type="email"
                      label="Email"
                      required={true}
                      error={errors.email}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Invalid phone number',
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      type="number"
                      id="phoneNumber"
                      label="Phone Number"
                      required={true}
                      error={errors.phoneNumber}
                      {...field}
                    />
                  )}
                />
              </div>
            </>
          )}

          {/* Resume & Portfolio */}
          <h3 className="typography-h3 mt-8 mb-4">Resume & Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            <Controller
              name="portfolio"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  type="text"
                  id="portfolio"
                  label="Portfolio"
                  required={true}
                  error={errors.portfolio}
                  {...field}
                />
              )}
            />



            <Controller
              name="website"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <InputField
                  type="text"
                  id="website"
                  label="Website"
                  required={false}
                  error={errors.website}
                  {...field}
                />
              )}
            />

            <div className='md:col-span-2'>
              <label className="typography-body">Resume<span className="text-red-100">*</span></label>
              <div
                {...getRootProps({
                  className: `bg-background-40 rounded-xl p-5 text-center cursor-pointer ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                    }`,
                })}
              >
                <input {...getInputProps()} />
                {resumeFile ? (
                  <div className="flex bg-background-70 items-center justify-between p-4 rounded-xl">
                    <span>{resumeFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                        setValue('resumeFile', null, { shouldValidate: true });
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
                    <p className="mb-2 hidden typography-body text-font-gray md:flex">Drag and drop your resume here</p>
                    <p className='text-font-gray typography-small-p hidden md:flex'>OR</p>
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
              {/* Hidden input field to include resumeFile in form validation */}
              <input type="hidden" {...register('resumeFile', { required: 'Resume is required' })} />
              {errors.resumeFile && (
                <span className="text-red-500">{errors.resumeFile.message}</span>
              )}
            </div>

          </div>

          {/* Professional Details */}
          <h3 className="typography-h3 mt-8 mb-4">Professional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Controller
              name="experience"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  type="number"
                  extraClass="no-spinner"
                  id="experience"
                  label="Experience (In Years)"
                  required={true}
                  error={errors.experience}
                  {...field}
                />
              )}
            />
            <Controller
              name="noticePeriod"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  id="noticePeriod"
                  type="number"
                  extraClass="no-spinner"
                  label="Notice Period (In days)"
                  required={true}
                  error={errors.noticePeriod}
                  {...field}
                />
              )}
            />
            <Controller
              name="currentCTC"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  type="number"
                  id="currentCTC"
                  extraClass="no-spinner"
                  label="Current CTC (In LPA)"
                  required={true}
                  error={errors.currentCTC}
                  {...field}
                />
              )}
            />
            <Controller
              name="expectedCTC"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  type="number"
                  id="expectedCTC"
                  extraClass="no-spinner"
                  label="Expected CTC (In LPA)"
                  required={true}
                  error={errors.expectedCTC}
                  {...field}
                />
              )}
            />

            {/* Skills Input */}

          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 pt-4">
            <Controller
              name="skills"
              control={control}
              rules={{
                required: 'Skills are required',
                validate: (value) =>
                  Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full mb-4">
                  <label htmlFor="skills" className="typograhpy-body mb-2">
                    Skills<span className="text-red-100">*</span>
                  </label>
                  <SkillsInput
                    value={field.value || []}
                    onChange={field.onChange}
                    allSkills={dummySkills}
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
                </div>
              )}
            />

          </div>

          {/* Additional Questions */}
          <div className="pt-4 mx-2 ">
            {questions.length != 0 && (
              <>
                <h2 className="typography-h2 mb-4">Additional Questions</h2>

                {questions.map((question, index) => (
                  <Controller
                    key={question._id}
                    name={`question-${question._id}`}
                    control={control}
                    defaultValue=""
                    rules={{ required: question.required }}
                    render={({ field }) => (
                      <div className="mb-4">
                        <label className="block mb-2">
                          {index + 1}. {question.text}
                          {question.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {question.type === 'multiple' ? (
                          question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="mb-2 flex items-center">
                              <input
                                type="radio"
                                id={`question-${question._id}-option-${optionIndex}`}
                                value={option}
                                checked={field.value === option}
                                onChange={() => field.onChange(option)}
                                className="mr-2"
                              />
                              <label htmlFor={`question-${question._id}-option-${optionIndex}`}>
                                {option}
                              </label>
                            </div>
                          ))
                        ) : (
                          <input
                            type={question.answerType === 'number' ? 'number' : 'text'}
                            {...field}
                            className="w-full p-2 bg-background-40 rounded outline-none focus:outline-teal-300"
                            placeholder="Enter your answer"
                          />
                        )}
                        {errors[`question-${question._id}`] && (
                          <span className="text-red-500">This field is required</span>
                        )}
                      </div>
                    )}
                  />
                ))}
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex mt-6 justify-end gap-4 md:mr-16 mb-6">
            <div className="md:w-[269px] w-full">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
            <div className="md:w-[269px] w-full">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </Button>
            </div>
          </div>
        </form>
      )}

      
      {/* OTP Verification Step */}
      {currentStep === 2 && (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-verification">
          <div className="w-full max-w-md space-y-8 bg-background-90 rounded-lg shadow-xl  bg-opacity-15">
            <form onSubmit={handleOtpSubmit} className="mx-16 text-center">
              <h1 className="typography-h1 mt-8 mb-4">OTP Verification</h1>
              <p className="text-font-gray text-center typography-large-p">
                To ensure security, please enter the OTP (One-Time Password) to
                verify your account. A code has been sent to
              </p>
              <h2 className='typograhpy-h2 text-font-gray'>
                {email}
              </h2>
              <div className="flex justify-center space-x-2 mt-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="number"
                    maxLength="1"
                    className="no-spinner"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                  />
                ))}
              </div>
              {otpError && <span className="text-red-500">{otpError}</span>}

              <div className="flex mt-6 w-full gap-4 mr-16 mb-6">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Verify'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Creation Step */}
      {currentStep === 3 && (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-verification">
          <div className="w-full max-w-md space-y-8 bg-background-90 rounded-lg shadow-xl bg-opacity-15">
            <form onSubmit={handlePasswordSubmit} className="mx-16">
              <h3 className="typography-h3 mt-8 mb-4 text-center">
                Create Password
              </h3>
              <p className="typography-large-p py-4 text-font-gray text-center">
                Create a password to secure your account. Make sure it’s strong
                and easy to remember.
              </p>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    id="password"
                    label="Create Password"
                    type="password"
                    required={true}
                    error={errors.password}
                    {...field}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required={true}
                    error={errors.confirmPassword}
                    {...field}
                  />
                )}
              />
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}

              <div className="flex mt-6 gap-4 w-full mr-16 mb-6">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Next'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplyJob;
