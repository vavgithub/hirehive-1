// ApplyJob.jsx - complete modified code

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import SkillsInput from '../../components/Inputs/SkillsInput';
import { Button } from '../../components/Buttons/Button';
import { dummySkills } from '../../components/Dropdowns/dropdownOptions';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Logo from '../../svg/Logo/lightLogo.svg';
import { fetchCandidateAuthData, loginCandidateAuth } from '../../redux/candidateAuthSlice';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import { digitsRegex, emailRegex, lowerCaseRegex, specialCharRegex, upperCaseRegex } from '../../utility/regex';
import { PersonalDetailsSection, ProfessionalDetailsSection, ResumePortfolioSection } from '../../components/Form/ApplyJob';
import { validateProfileImages, validateResume, validationRules } from '../../utility/validationRules';
import Header from '../../components/utility/Header';
import LoaderModal from '../../components/Loaders/LoaderModal';
import AdditionalQuestions from '../../components/QuestionUtilities/AdditionalQuestions';
import OtpComponent from '../../components/utility/OtpComponent';
import PasswordComponent from '../../components/utility/PasswordComponent';
import { InputField } from '../../components/Form/FormFields';
import ContactUs from '../../components/Form/ContactUs';
import Container from '../../components/Cards/Container';
import Modal from '../../components/Modals/Modal';
import StyledCard from '../../components/Cards/StyledCard';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Check, PencilLine, Upload, X } from 'lucide-react';
import TogglePassword from '../../components/utility/TogglePassword';
import ForgotPassword from '../Admin/ForgotPassword';

const fetchJobDetails = async (id) => {
  const response = await axios.get(`/jobs/getJobById/${id}`);
  return response.data;
};

export const uploadProfilePicture = async (file) => {
  if (!file) throw new Error("No file selected.");
  validateProfileImages(file);
  const formData = new FormData();
  formData.append('profilePicture', file);
  try {
    const response = await axios.post('/auth/candidate/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.profilePictureUrl;
  } catch (error) {
    throw error;
  }
};

export const uploadResume = async (file, setUploadProgress) => {
  if (!file) throw new Error("No file selected.");
  validateResume(file);
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
    throw error;
  }
};

const updateEmail = ({ email, userId }) => {
  const response = axios.post('/auth/candidate/update-email', { email, userId });
  return response?.data;
};

const ApplyJob = () => {
  const dispatch = useDispatch();
  const { candidateData, isAuthenticated } = useCandidateAuth();

  // to store email update candidates ID
  const IdRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [editEmail, setEditEmail] = useState("");

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const navigate = useNavigate();
  const { id: jobId, companyId } = useParams();

  const submitBtnRef = useRef(null);

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
    hourlyRate: "",
    resumeFile: null,
    skills: [] // default empty array for skills
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    trigger,
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

  const { data: jobDetails, isLoading } = useQuery({
    queryKey: ['jobDetails', jobId],
    queryFn: () => fetchJobDetails(jobId),
  });

  // Pre-fill form with candidate data when authenticated
  useEffect(() => {
    if (isAuthenticated && candidateData && jobDetails) {
      const isHourlyRateJob = jobDetails?.employmentType === 'Part Time' || jobDetails?.employmentType === 'Contract';

      reset({
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phoneNumber: candidateData.phone,
        website: candidateData.website || '',
        portfolio: candidateData.portfolio || '',
        experience: candidateData.experience || '',
        noticePeriod: candidateData.noticePeriod || '',
        ...(isHourlyRateJob ? { hourlyRate: candidateData.hourlyRate || '' } : {
          currentCTC: candidateData.currentCTC || '',
          expectedCTC: candidateData.expectedCTC || '',
        }),
        resumeFile: resumeFile,
        skills: candidateData.skills || [],
      });
    }
  }, [isAuthenticated, candidateData, jobDetails, reset, resumeFile]);

  const handleProfilePictureSelect = (file) => {
    setProfilePictureFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  // Cleanup profile picture preview URL on unmount
  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
      }
    };
  }, [profilePicturePreview]);

  // Register all fields with their validation rules
  useEffect(() => {
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      register(fieldName, rules);
    });
  }, [register]);

  // Helper function to scroll to first error field
  const scrollToErrorField = () => {
    const errorFieldKeys = Object.keys(errors);
    if (errorFieldKeys.length > 0) {
      // Taking the first error field found
      const firstErrorKey = errorFieldKeys[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const questionResponses = Object.keys(data)
        .filter((key) => key.startsWith('question-'))
        .map((key) => ({
          questionId: key.replace('question-', ''),
          answer: data[key],
        }));

      let profilePictureUrl;
      if (profilePictureFile) {
        profilePictureUrl = await uploadProfilePicture(profilePictureFile);
      }

      const resumeUrl = await uploadResume(resumeFile, setUploadProgress);

      // Determine if job is hourly rate type
      const isHourlyRateJob = jobDetails?.employmentType === 'Part Time' ||
        jobDetails?.employmentType === 'Contract';

      const compensationData = isHourlyRateJob ?
        { hourlyRate: data.hourlyRate } :
        { currentCTC: data.currentCTC, expectedCTC: data.expectedCTC };

      if (isAuthenticated) {
        const applicationData = {
          jobId,
          website: data.website,
          portfolio: data.portfolio,
          noticePeriod: data.noticePeriod,
          experience: data.experience,
          skills: data.skills,
          questionResponses,
          resumeUrl,
          profilePictureUrl,
          ...compensationData,
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
          resumeUrl,
          profilePictureUrl,
          ...compensationData,
        };

        const response = await axios.post('/auth/candidate/register', registrationData);
        if (response?.data?.currentStage === 'MODAL') {
          setValue("email", response.data?.email);
          IdRef.current = response.data?.userId;
          setIsExist(true);
          setShowConfirm(true);
        } else {
          setEmail(data.email);
          setPhone(data.phoneNumber);
          setIsExist(false);
          setShowConfirm(false);
        }
        showSuccessToast('Success', response?.data?.message || "Please Create Your Password");
        setCurrentStep(response?.data?.currentStage !== 'MODAL' ? 2 : 1);
      }
    } catch (error) {
      if (error.response?.data?.next === "LOGIN") {
        setShowLoginPopup(true);
      } else {
        showErrorToast(
          'Error',
          error.response?.data?.message || error?.message || 'Failed to perform job action. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateEmailMutation = useMutation({
    mutationFn: updateEmail,
    onSuccess: (data) => {
      submitBtnRef.current.click();
    },
    onError: (error) => {
      showErrorToast('Error', error.response?.data?.message || 'Failed to update email. Please try again.');
    }
  });

  const handleUpdateEmail = () => {
    updateEmailMutation.mutate({ email: getValues("email"), userId: IdRef?.current });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp;

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

    if (!password?.trim() && !confirmPassword?.trim()) {
      setPasswordError("Please enter your new password");
      return;
    }

    if (!password?.trim()) {
      setPasswordError("Please enter your new password");
      return;
    }

    if (!confirmPassword?.trim()) {
      setPasswordError("Please confirm your password");
      return;
    }

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

  const handleLogin = async () => {
    try {
      if (!email.trim() && !password.trim()) {
        return showErrorToast("Error", "Please enter your email and password");
      } else if (!email.trim()) {
        return showErrorToast("Error", "Please enter your email");
      } else if (!emailRegex.test(email)) {
        return showErrorToast("Error", "Please enter a valid email format");
      } else if (!password.trim()) {
        return showErrorToast("Error", "Please enter your password");
      } else {
        const result = await dispatch(loginCandidateAuth({ email, password })).unwrap();
        if (result) {
          navigate(`/apply-job/${jobId}`, { replace: true });
          showSuccessToast("Success", "Logged in Successfully");
          window.scrollTo(0, 0);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      showErrorToast("Error", error);
    }
  };

  return (
    <Container extraStyles={"flex justify-center "} customPadding={(currentStep !== 1 ? "p-0" : '')} hasContainerDiv={false} >
      {(isSubmitting || updateEmailMutation?.isPending || loading || isLoading) && <LoaderModal />}

      {currentStep === 1 && (
        <div className='container'>
          <div>
            <img className='h-12 mt-2 mx-4' src={Logo} alt="Logo" />
          </div>
          <form className='mx-auto mt-2 container-form px-6' onSubmit={handleSubmit(onSubmit)}>
            <Header HeaderText={`Application for ${jobDetails?.jobTitle}`} withBack={"true"} />
            {/* Personal Details */}
            {!isAuthenticated && (
              <div>
                <PersonalDetailsSection
                  control={control}
                  onProfilePictureSelect={handleProfilePictureSelect}
                  profilePicturePreview={profilePicturePreview}
                />
              </div>
            )}

            <ResumePortfolioSection control={control} isAuthenticated={isAuthenticated} />

            <div className='md:col-span-2 mt-6'>
              <label className="typography-body">
                Resume<span className="text-red-100">*</span>
              </label>
              <div
                {...getRootProps({
                  className: `bg-background-40 hover:bg-background-60 rounded-xl mt-4 p-4 text-center cursor-pointer 
                    ${isDragActive ? 'border border-teal-500 bg-background-60' : ''} 
                    ${errors.resumeFile ? '!border !border-red-500' : ''}`,
                })}
              >
                <input {...getInputProps()} />
                {resumeFile ? (
                  <div className="flex bg-background-70 typography-body items-center justify-between p-4 rounded-xl">
                    <span>{resumeFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                        setValue('resumeFile', null, { shouldValidate: true });
                      }}
                      className="ml-2"
                    >
                      <IconWrapper icon={X} />

                    </button>
                  </div>
                ) : (
                  <div className='flex items-center flex-col'>
                    <div className='hidden md:flex'>
                      <IconWrapper icon={Upload} />

                    </div>
                    <p className="mb-2 hidden typography-body text-font-gray md:flex">Drag and drop your resume here</p>
                    <p className='text-font-gray typography-small-p hidden md:flex mb-2'>OR</p>
                    <Button variant="secondary" type="button">Browse files</Button>
                  </div>
                )}
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <progress value={uploadProgress} max="100" className="w-full" />
                  <span>{uploadProgress}% uploaded</span>
                </div>
              )}
              <input type="hidden" {...register('resumeFile', { required: 'Resume is required' })} />
              {errors.resumeFile && (
                <span className="typography-small-p text-red-100">{errors.resumeFile.message}</span>
              )}
            </div>

            <ProfessionalDetailsSection control={control} jobDetails={jobDetails} />

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
              <Controller
                name="skills"
                control={control}
                rules={{
                  required: 'Skills are required',
                  validate: (value) =>
                    Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
                }}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-full">
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

            <div className="mt-12">
              {jobDetails?.questions.length !== 0 && (
                <AdditionalQuestions jobDetails={jobDetails} control={control} errors={errors} />
              )}
            </div>

            <div className="flex mt-6 justify-end gap-4 mb-6">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  setIsExist(false);
                  setEditEmail(false);
                  if (isAuthenticated) {
                    submitBtnRef.current.click();
                  } else {
                    const valid = await trigger();
                    if (valid) {
                      setShowConfirm(true);
                    } else {
                      scrollToErrorField();
                    }
                  }
                }}
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </Button>
              <button ref={submitBtnRef} type='submit' className='hidden'>Submit</button>
            </div>
            <Modal
              open={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={isExist ? handleUpdateEmail : () => submitBtnRef.current.click()}
              customTitle={isExist ? 'Confirm your Email' : "Is this email correct ?"}
              customMessage={isExist ? "For account registration, we are sending an OTP to this attached email. Are you sure this email is correct ?" : "For account registration, we are sending an OTP to this email. Are you sure this email is correct ? "}
              customConfirmLabel={"Sent"}
            >
              <StyledCard padding={2} backgroundColor={"bg-background-80 mt-4"}>
                <div className='typography-body w-full flex items-center justify-between gap-4'>
                  {!editEmail ? (
                    <p className='w-full'>{getValues("email")}</p>
                  ) : (
                    <div className='w-full'>
                      <InputField type="text" placeholder="Enter your email" value={watch("email")} onChange={(e) => setValue("email", e.target.value)} />
                    </div>
                  )}
                  <button type='button' onClick={() => setEditEmail(!editEmail)}>
                    {!editEmail ? (
                      <div className='rounded-xl bg-background-60 h-11 w-11 flex justify-center items-center'>
                        <IconWrapper size={2} customIconSize={3} icon={PencilLine} />
                      </div>
                    ) : (
                      <div className='rounded-xl bg-background-60 h-11 w-11 flex justify-center items-center text-green-70'>
                        <IconWrapper size={2} customIconSize={3} inheritColor icon={Check} />
                      </div>
                    )}
                  </button>
                </div>
              </StyledCard>
            </Modal>

            <Modal
              open={showLoginPopup}
              onClose={() => setShowLoginPopup(false)}
              customTitle={"Login"}
              customMessage={"Your account already exists. Please Login to continue."}
              customConfirmLabel={"Login"}
              onConfirm={handleLogin}
            >
              <div className='mt-4'>
                <div className="mb-4">
                  <label htmlFor="loginemail" className="block mb-2 font-bricolage">Email</label>
                  <input type="email" id="loginemail" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 font-bricolage">Password</label>
                  <TogglePassword typeState={passwordType} setTypeState={setPasswordType}>
                    <input type={passwordType} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={(password && "tracking-widest") + " w-full focus:outline-teal-400 p-2 rounded-lg bg-black text-white"} />
                  </TogglePassword>
                </div>
                <div className='flex justify-end'>
                  <span
                    onClick={() => { setShowForgotPassword(true); setShowLoginPopup(false) }}
                    className="text-font-primary cursor-pointer typography-body mt-2 block text-left hover:underline"
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>
            </Modal>
            <div className='mb-6'>
              <ContactUs />
            </div>
          </form>
          {/* Forgot Password Popup */}
          <Modal
            open={showForgotPassword}
            onClose={() => setShowForgotPassword(false)}
            customTitle={"Reset Your Password"}
            customMessage={"Please reset your password to continue"}
            customConfirmLabel={'Send OTP'}
            onConfirm={() => console.log("HI")}
            noCancel
            noConfirm
          >
            <div className='mt-2 '>
              <ForgotPassword role={"Candidate"} onBack={() => { setShowForgotPassword(false); }} isModal setIsLoading={setLoading} />
              <div onClick={() => setShowForgotPassword(false)} className='absolute -top-4 -right-4 cursor-pointer'>
                <IconWrapper icon={X} hasBg customBgHover={"hover:bg-background-60"} />
              </div>
            </div>
          </Modal>
        </div>
      )}

      {currentStep === 2 && (
        <OtpComponent email={email} handleOtpSubmit={handleOtpSubmit} isSubmitting={isSubmitting} otp={otp} otpError={otpError} setOtp={setOtp} />
      )}

      {currentStep === 3 && (
        <PasswordComponent watch={watch} control={control} handlePasswordSubmit={handlePasswordSubmit} isSubmitting={isSubmitting} passwordError={passwordError} />
      )}

    </Container>
  );
};

export default ApplyJob;
