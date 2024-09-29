// ApplyJob.jsx

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/FormFields';
import SkillsInput from '../../components/utility/SkillsInput';
import { Button } from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import useAuthCandidate from '../../hooks/useAuthCandidate';

const fetchJobDetails = async (id) => {
  const response = await axios.get(`/getJobById/${id}`);
  return response.data;
};

const ApplyJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const allSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Java'];
  // const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { isAuthenticated, candidateData, fetchCandidateData } = useAuthCandidate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    reset, // Add this to easily reset form values
  } = useForm({
    mode: 'onChange',
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
      });
      setSkills(candidateData.skills || []);
    }
  }, [isAuthenticated, candidateData, reset]);

  const { data: jobDetails, isLoading } = useQuery({
    queryKey: ['jobDetails', jobId],
    queryFn: () => fetchJobDetails(jobId),
  });
  if (isLoading) return <div>Loading...</div>;

  const { jobTitle, questions = [] } = jobDetails || {};

  // Handler for registration form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Extract questionResponses from form data
    const questionResponses = Object.keys(data)
      .filter((key) => key.startsWith('question-'))
      .map((key) => ({
        questionId: key.replace('question-', ''),
        answer: data[key],
      }));

    if (isAuthenticated) {
      // Authenticated candidate applies to job
      const applicationData = {
        jobId: jobId,
        jobApplied: jobDetails.jobTitle,
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: data.phoneNumber,
        website: data.website,
        portfolio: data.portfolio,
        noticePeriod: data.noticePeriod,
        currentCTC: data.currentCTC,
        expectedCTC: data.expectedCTC,
        experience: data.experience,
        skills: skills,
        questionResponses,
      };

      axios
        .post('/auth/candidate/apply-job', applicationData)
        .then(() => {
          setIsSubmitting(false);
          navigate('/candidate/my-jobs'); // Redirect to My Jobs page
        })
        .catch((error) => {
          setIsSubmitting(false);
          alert(error.response?.data?.message || 'An error occurred');
        });
    } else {
      // Unauthenticated candidate registration and application
      const registrationData = {
        jobId: jobId, // Get from useParams()
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
        skills: skills,
        questionResponses,
      };

      axios
        .post('/auth/candidate/register', registrationData)
        .then((response) => {
          setEmail(data.email);
          setPhone(data.phoneNumber);
          setCurrentStep(2); // Move to password creation step
          setIsSubmitting(false);
        })
        .catch((error) => {
          setIsSubmitting(false);
          alert(error.response.data.message);
        });
    }
  };
  // Handler for password creation
  const handlePasswordSubmit = (e) => {
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

    axios
      .post('/auth/candidate/create-password', { email, password })
      .then((response) => {
        setCurrentStep(3); // Move to OTP verification step
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(error.response.data.message);
      });
  };

  // Handler for OTP verification
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
      .then(async (response) => {
        setIsSubmitting(false);

        // Update authentication state
        await fetchCandidateData();

        navigate('/candidate/my-jobs'); // Navigate to My Jobs page
      })
      .catch((error) => {
        setIsSubmitting(false);
        setOtpError(error.response.data.message);
      });
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


  console.log("check karr", candidateData);

  // Handler for additional questions input change
  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <>
      {currentStep === 1 && (
        <h1 className="typography-h1 m-4 md:mx-16">Application for {jobTitle}</h1>
      )}

      {currentStep === 1 && (
        <form className='md:mx-16 mx-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Details */}
          {!isAuthenticated && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16">
              <h3 className="typography-h3 mt-8 mb-4">Personal Details</h3>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
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
                    id="phoneNumber"
                    label="Phone Number"
                    required={true}
                    error={errors.phoneNumber}
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {/* Resume & Portfolio */}
          <h3 className="typography-h3 mt-8 mb-4">Resume & Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="portfolio"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <InputField
                  id="portfolio"
                  label="Portfolio"
                  required={false}
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
                  id="website"
                  label="Website"
                  required={false}
                  error={errors.website}
                  {...field}
                />
              )}
            />
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
                  id="currentCTC"
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
                  id="expectedCTC"
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
            <div>
              <h3 className='typography-body py-4'>Enter Skills</h3>
              <SkillsInput
                skills={skills}
                setSkills={setSkills}
                allSkills={allSkills}
              />
            </div>
          </div>

          {/* Additional Questions */}
          <div className="pt-4 mx-2 ">
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
                        type={
                          question.answerType === 'number' ? 'number' : 'text'
                        }
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

      {/* Password Creation Step */}
      {currentStep === 2 && (
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Next'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Step */}
      {currentStep === 3 && (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-verification">
          <div className="w-full max-w-md space-y-8 bg-background-90 rounded-lg shadow-xl  bg-opacity-15">
            <form onSubmit={handleOtpSubmit} className="mx-16">
              <h1 className="typography-h1 mt-8 mb-4">OTP Verification</h1>
              <p className="text-font-gray text-center typography-large-p">
                To ensure security, please enter the OTP (One-Time Password) to
                verify your account. A code has been sent to
              </p>
              <h3>
                <strong>{email}</strong>
              </h3>
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
    </>
  );
};

export default ApplyJob;
