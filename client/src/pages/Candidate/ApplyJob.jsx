// ApplyJob.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { InputField } from '../../components/Form/FormFields';
import SkillsInput from '../../components/utility/SkillsInput';
import { Button } from '../../components/ui/Button';
import { dummySkills } from '../../components/Form/dropdownOptions';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/ui/Loader';
import Logo from '../../svg/Logo/lightLogo.svg';
import { fetchCandidateAuthData } from '../../redux/candidateAuthSlice';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import { digitsRegex, lowerCaseRegex, specialCharRegex, upperCaseRegex } from '../../utility/regex';
import { PersonalDetailsSection, ProfessionalDetailsSection, ResumePortfolioSection } from '../../components/Form/ApplyJob';
import { validationRules } from '../../utility/validationRules';

const fetchJobDetails = async (id) => {
  const response = await axios.get(`/jobs/getJobById/${id}`);
  return response.data;
};

const ApplyJob = () => {
  const dispatch = useDispatch();
  const { candidateData, isAuthenticated } = useCandidateAuth()

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const hiddenFileInput = useRef(null);

  let initial = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    website: "",
    portfolio: "",
    experience: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    resumeFile: null,
    skills: "" || [],
  }
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
    defaultValues: candidateData ? {
      ...candidateData
    } : initial,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

  // Pre-fill form with candidate data when authenticated
  useEffect(() => {
    if (isAuthenticated && candidateData) {
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
        skills: candidateData.skills || [],
      });
    }
  }, [isAuthenticated, candidateData, reset]);

  const { data: jobDetails, isLoading } = useQuery({
    queryKey: ['jobDetails', jobId],
    queryFn: () => fetchJobDetails(jobId),
  });

  const uploadResume = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('resume', file);

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

  // Register all fields with their validation rules
  useEffect(() => {
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      register(fieldName, rules);
    });
  }, [register]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const questionResponses = Object.keys(data)
        .filter((key) => key.startsWith('question-'))
        .map((key) => ({
          questionId: key.replace('question-', ''),
          answer: data[key],
        }));

      const resumeUrl = await uploadResume(resumeFile);

      if (isAuthenticated) {
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
        await dispatch(fetchCandidateAuthData()).unwrap();
        showSuccessToast('Success', 'Successfully applied to the job');
        navigate('/candidate/my-jobs');
      } else {
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
      }
    } catch (error) {
      showErrorToast(
        'Error',
        error.response?.data?.message || 'Failed to perform job action. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/auth/candidate/verify-otp', { email, otp: enteredOtp });
      showSuccessToast('OTP Verified', 'Please create your password to continue.');
      setCurrentStep(3);
    } catch (error) {
      setOtpError(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

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

    if (!upperCaseRegex.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return;
    }
    if (!lowerCaseRegex.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return;
    }
    if (!digitsRegex.test(password)) {
      setPasswordError('Password must contain at least one number');
      return;
    }
    if (!specialCharRegex.test(password)) {
      setPasswordError('Password must contain at least one special character');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/auth/candidate/create-password', { email, password });
      await dispatch(fetchCandidateAuthData()).unwrap();
      showSuccessToast('Success', 'Account created successfully!');
      navigate('/candidate/my-jobs');
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  return (


    <div className='main-wrapper flex justify-center ' >


      {currentStep === 1 && (
        <div className='container'>
          <div  >
            <img className='h-12 mt-6 mx-6' src={Logo} />
            <h1 className="typography-h1 p-6">Application for {jobDetails?.jobTitle}</h1>
          </div>
          <form className='mx-auto mt-2 container-form px-6' onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Details */}
            {!isAuthenticated && (
              <div>
                <PersonalDetailsSection control={control} />
              </div>
            )}



            <ResumePortfolioSection control={control} isAuthenticated={isAuthenticated} />

            {

            
            <div className='md:col-span-2 mt-6'>
            <label className="typography-body">Resume<span className="text-red-100">*</span></label>
            <div
                        {...getRootProps({
                          className: `bg-background-40 hover:bg-background-60 rounded-xl mt-4 p-4 text-center cursor-pointer 
                            ${isDragActive ? 'border border-teal-500 bg-background-60' : ''} 
                            ${errors.resumeFile ? '!border !border-red-500' : ''}`,
                  })}
                >
                  <input {...getInputProps()} />
                  {resumeFile ? (
                    <div className="flex bg-background-70  items-center justify-between p-4 rounded-xl">
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
                  <span className="typography-small-p text-red-500">{errors.resumeFile.message}</span>
                )}
              </div>



            }

            <ProfessionalDetailsSection control={control} />
            {/* Skills Input */}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8 ">
              <Controller
                name="skills"
                control={control}
                rules={{
                  required: 'Skills are required',
                  validate: (value) =>
                    Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
                }}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-full ">
                    <label htmlFor="skills" className="typography-body">
                      Skills <span className="text-red-100">*</span>
                    </label>
                    <SkillsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      allSkills={dummySkills}
                      error={error}
                    />
                    {error && <span className="text-red-500 typography-small-p mt-1">{error.message}</span>}
                  </div>
                )}
              />



            </div>


            {/* Additional Questions */}
            <div className="pt-8">
              {jobDetails?.questions.length != 0 && (
                <>
                  <h2 className="typography-h2 mb-4">Additional Questions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobDetails?.questions.map((question, index) => (
                      <div key={question?._id} className="bg-background-30 rounded-xl p-4">
                        <Controller
                          key={question._id}
                          name={`question-${question._id}`}
                          control={control}
                          defaultValue=""
                          rules={{ required: question.required }}
                          render={({ field }) => (
                            <div>
                              <label className="block mb-4 typography-body">
                                Q{index + 1}. {question.text}
                                {question.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              <div className="grid grid-cols-2 gap-4" style={{gridAutoRows:"1fr"}}>
                                {question.type === "multiple" ? (
                                  question.options.map((option, optionIndex) => {
                                    const inputId = `question-${question._id}-option-${optionIndex}`;

                                    return (
                                      <div
                                        key={optionIndex}
                                        className="px-4 py-2 min-h-11 rounded-xl flex bg-background-60 items-center cursor-pointer hover:bg-background-70"
                                        onClick={() => {
                                          field.onChange(option);
                                          document.getElementById(inputId).focus();
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          id={inputId}
                                          value={option}
                                          checked={field.value === option}
                                          onChange={() => field.onChange(option)}
                                          className="mr-2 appearance-none border-2 rounded-full form-radio h-5 aspect-square max-h-5 w-5 max-w-5 checked:ring-offset-[5px] checked:ring-offset-black-100 checked:bg-teal-100 checked:ml-[4px] checked:mr-[12px] checked:ring-[2px] checked:w-3 checked:h-3 checked:border-0 checked:ring-teal-100"
                                        />
                                        <label className='typography-body' htmlFor={inputId}>{option}</label>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div
                                    className="w-full cursor-pointer"
                                    onClick={() => {
                                      const inputId = `question-${question._id}-input`;
                                      document.getElementById(inputId).focus();
                                    }}
                                  >
                                    <input
                                      id={`question-${question._id}-input`}
                                      type={question.answerType === "number" ? "number" : "text"}
                                      {...field}
                                      className="w-full p-2 bg-background-40 rounded outline-none focus:outline-teal-300 "
                                      placeholder="Enter your answer"
                                    />
                                  </div>
                                )}
                             
                              </div>
                              {errors[`question-${question._id}`] && (
                                  <span className="text-red-500 typography-small-p">This field is required</span>
                                )}
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>


            {/* Buttons */}
            <div className="flex mt-6 justify-end gap-4 mb-6">
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Next'}
                </Button>
            </div>
          </form>
        </div>
      )}



      {/* OTP Verification Step */}
      {currentStep === 2 && (
        <div className="flex items-center h-screen w-screen justify-center  bg-cover bg-verification ">
          <div className="w-full mx-8 md:mx-0 max-w-lg space-y-8 bg-background-90 rounded-lg shadow-xl  bg-opacity-15 ">
            <form onSubmit={handleOtpSubmit} className="px-8 sm:px-16 text-center md:mb-20">
              <h1 className="typography-h2 sm:typography-h1 mt-8 md:mt-20 mb-4 ">OTP Verification</h1>
              <p className="text-font-gray text-center typography-large-p">
                To ensure security, please enter the OTP (One-Time Password) to
                verify your account. A code has been sent to
              </p>
              <h2 className='typography-h3 sm:typograhpy-h2 mt-3 md:mt-6 text-font-gray mx-auto w-[240px] min-[420px]:w-full whitespace-nowrap text-ellipsis overflow-hidden'>
                {email}
              </h2>
              <div className="flex justify-center  space-x-2 mt-4 ">
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

              <div className="flex justify-center mt-6 w-full gap-4  mb-6 ">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full "
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
        <div className="flex items-center w-screen justify-center min-h-screen bg-cover bg-verification">
          <div className="w-full mx-8 md:mx-0 max-w-lg space-y-8 bg-background-90 rounded-lg shadow-xl bg-opacity-15">
            <form onSubmit={handlePasswordSubmit} className="mx-8 sm:mx-16 md:mb-20">
              <h3 className="typography-h2 text-center sm:typography-h1 mt-5 sm:mt-8 md:mt-20 ">
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
                    extraClass={'mb-4'}
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

              <div className="flex mt-6 justify-center gap-4 w-full mr-16 mb-6 ">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid || isSubmitting}
                  className="w-full "
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