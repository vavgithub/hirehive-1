import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/utility/Header";
import useCandidateAuth from "../../hooks/useCandidateAuth";
import AssessmentBanner from "../../components/ui/AssessmentBanner";
import StyledCard from "../../components/Cards/StyledCard";
import { ensureAbsoluteUrl } from "../../utility/ensureAbsoluteUrl";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Buttons/Button";
import { validationRules } from "../../utility/validationRules";
import { uploadProfilePicture, uploadResume } from "./ApplyJob";
import axios from "../../api/axios";
import { showErrorToast, showSuccessToast } from "../../components/ui/Toast";
import { useDispatch } from "react-redux";
import { updateWithoutAssessment } from "../../redux/candidateAuthSlice";
import LoaderModal from "../../components/Loaders/LoaderModal";
import CustomToolTip from "../../components/Tooltip/CustomToolTip";
import { InputField } from "../../components/Inputs/InputField";
import { emailRegex, mobileRegex } from "../../utility/regex";
import Container from "../../components/Cards/Container";
import { UNKNOWN_PROFILE_PICTURE_URL } from "../../utility/config";
import ContactUs from "../../components/Form/ContactUs";
import IconWrapper from "../../components/Cards/IconWrapper";
import { Pencil, PencilLine, Upload } from "lucide-react";

const PersonalDetails = ({ candidateData, isEditing, control }) => {
  return (
    <StyledCard backgroundColor={"bg-background-30"}>
      <h2 className="typography-h2 mb-6">Personal Details</h2>
      {!isEditing ?
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] ">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">First Name</p>
              <p className="text-font-gray whitespace-nowrap">Email</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.firstName ?? '-'}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Last Name</p>
              <p className="text-font-gray whitespace-nowrap">Phone Number</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.lastName ?? '-'}</p>
              <p>{candidateData.phone}</p>
            </div>
          </div>
        </div>
        :
        <div className="flex flex-col gap-4">
          <Controller
            name="firstName"
            control={control}
            defaultValue={""}
            rules={validationRules.firstName}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="firstName"
                label="First Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value ?? ""}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue={""}
            rules={validationRules.lastName}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="lastName"
                label="Last Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value ?? ""}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={validationRules.email}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="email"
                label="Email"
                labelStyles="text-font-gray"
                rowWise
                value={field.value ?? ""}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue={""}
            rules={validationRules.phoneNumber}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="number"
                id="phone"
                label="Phone Number"
                labelStyles="text-font-gray"
                extraClass="no-spinner"
                rowWise
                value={field.value ?? 0}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      }
    </StyledCard>
  )
}

const ResumeAndPortfolioDetails = ({ candidateData, isEditing, control, resumeFile, setResumeFile }) => {
  const resumeRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleResume = (e) => {
    setFileName(e.target.files[0]?.name)
    setResumeFile(e.target.files[0])
  }

  return (
    <StyledCard backgroundColor={"bg-background-30"}>
      <h2 className="typography-h2 mb-6">Resume and Portfolio</h2>
      {!isEditing ?
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray">Resume</p>
              <p className="text-font-gray">Website</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="w-fit whitespace-nowrap overflow-hidden text-ellipsis"><a href={candidateData.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-100">{candidateData?.firstName + "'s Resume"}</a></p>
              <p className="w-fit whitespace-nowrap overflow-hidden text-ellipsis"><a href={ensureAbsoluteUrl(candidateData.website)} target="_blank" rel="noopener noreferrer" className="underline text-blue-100">{candidateData?.website}</a></p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex sm:flex-col gap-6 typography-body">
              <p className="text-font-gray hidden sm:block opacity-0">Dummy Div</p>
              <p className="text-font-gray">Portfolio</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="hidden sm:block opacity-0">Dummy Div</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis"><a href={ensureAbsoluteUrl(candidateData.portfolio)} target="_blank" rel="noopener noreferrer" className="underline text-blue-100">{candidateData?.portfolio}</a></p>
            </div>
          </div>
        </div>
        : <div className="flex flex-col gap-4 w-full">
          <Controller
            name="resume"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="h-11 w-full flex items-center typography-body justify-between gap-2">
                <p className="w-[28%] text-font-gray ">Resume</p>
                <div className="w-[71%] bg-background-40 h-11 rounded-xl flex justify-between">
                  <p className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{fileName ? fileName : candidateData?.firstName + "'s Resume"}</p>
                  <span className="hidden md:block">
                    <Button icon={()=><IconWrapper icon={Upload} inheritColor size={0} customIconSize={4} customStrokeWidth={7} />} variant="secondary" type="button" onClick={() => resumeRef.current.click()}>{resumeFile ? "Edit" : "Choose"}</Button>
                  </span>
                  <span className="block md:hidden">
                    <Button icon={()=><IconWrapper icon={Upload} inheritColor size={0} customIconSize={4} customStrokeWidth={7} />} variant="iconSec" type="button" onClick={() => resumeRef.current.click()} />
                  </span>
                </div>
                <input onChange={handleResume}
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ref={resumeRef} type="file"
                  className="hidden w-0 h-0" />
              </div>
            )}
          />
          <Controller
            name="website"
            control={control}
            defaultValue={""}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="website"
                label="Website"
                labelStyles="text-font-gray"
                rowWise
                value={field.value ?? ""}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="portfolio"
            control={control}
            defaultValue={""}
            rules={validationRules.portfolio}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="portfolio"
                label="Portfolio"
                labelStyles="text-font-gray"
                rowWise
                value={field.value ?? ""}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />

        </div>}
    </StyledCard>
  )
}

const ProfessionalDetails = ({ candidateData, isEditing, control }) => {
  // Determine if full-time fields should be shown (both fields are filled)
  const hasFullTimeData =
    candidateData.currentCTC > 0 || candidateData.expectedCTC > 0;
  // Determine if hourly rate is available
  const hasHourlyRate = candidateData.hourlyRate > 0;

  return (
    <StyledCard backgroundColor={"bg-background-30"}>
      <h2 className="typography-h2 mb-6">Professional Details</h2>
      {!isEditing ? (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between flex-col gap-6 sm:flex-row">
            {/* Always show Experience and Notice Period */}
            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
              <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray">Experience</p>
                <p className="text-font-gray">Notice Period</p>
              </div>
              <div className="flex flex-col gap-6 typography-body">
                <p>{candidateData.experience} Years</p>
                <p>{candidateData.noticePeriod} Days</p>
              </div>
            </div>
            {/* Show full-time fields only if both currentCTC and expectedCTC are filled */}
            {hasFullTimeData && (
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex flex-col gap-6 typography-body">
                  <p className="text-font-gray">Current CTC</p>
                  <p className="text-font-gray">Expected CTC</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p>{candidateData.currentCTC} LPA</p>
                  <p>{candidateData.expectedCTC} LPA</p>
                </div>
              </div>
            )}
          </div>
          {/* Show hourly rate if available */}
          {hasHourlyRate && (
            <div className="flex justify-between flex-col gap-6 sm:flex-row">
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex flex-col gap-6 typography-body">
                  <p className="text-font-gray">Hourly Rate</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p>{candidateData.hourlyRate} INR / hour</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Edit mode: Render input fields conditionally
        <div className="flex flex-col gap-4">
          <Controller
            name="experience"
            control={control}
            defaultValue={""}
            rules={validationRules.experience}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="number"
                id="experience"
                label="Experience"
                labelStyles="text-font-gray"
                extraClass="no-spinner"
                rowWise
                value={field.value ?? 0}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="noticePeriod"
            control={control}
            defaultValue={""}
            rules={validationRules.noticePeriod}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="number"
                id="noticePeriod"
                label="Notice Period"
                labelStyles="text-font-gray"
                extraClass="no-spinner"
                rowWise
                value={field.value ?? 0}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          {/* Only show full-time fields if data exists */}
          {hasFullTimeData && (
            <>
              <Controller
                name="currentCTC"
                control={control}
                defaultValue={""}
                rules={validationRules.currentCTC}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    type="number"
                    id="currentCTC"
                    label="Current CTC"
                    labelStyles="text-font-gray"
                    extraClass="no-spinner"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="expectedCTC"
                control={control}
                defaultValue={""}
                rules={validationRules.expectedCTC}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    type="number"
                    id="expectedCTC"
                    label="Expected CTC"
                    labelStyles="text-font-gray"
                    extraClass="no-spinner"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
            </>
          )}
          {hasHourlyRate && (
            <Controller
              name="hourlyRate"
              control={control}
              defaultValue={""}
              rules={validationRules.hourlyRate}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type="number"
                  id="hourlyRate"
                  label="Hourly Rate"
                  labelStyles="text-font-gray"
                  extraClass="no-spinner"
                  rowWise
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  error={error}
                  errorMessage={error?.message}
                />
              )}
            />
          )}
        </div>
      )}
    </StyledCard>
  );
};


function Profile() {
  const { candidateData, hasGivenAssessment, isDone } = useCandidateAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [stage, setStage] = useState("EDITING");
  const [email, setEmail] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] =
    useState(false);

  const profileImageRef = useRef();
  const [resumeFile, setResumeFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stage === "DONE") {
      setIsEditing(false);
    } else if (stage === "OTP") {
      setShowOTPModal(true);
    }
  }, [stage])

  useEffect(() => {
    if (stage !== "EDITING") {
      setStage("EDITING")
    }
  }, [isEditing])

  const { control, handleSubmit, watch, setValue, setError, getValues, clearErrors, formState: { errors, isValid } } = useForm({
    defaultValues: {
      firstName: candidateData?.firstName ? candidateData.firstName : "",
      lastName: candidateData?.lastName ? candidateData.lastName : "",
      email: candidateData?.email ? candidateData.email : "",
      phone: candidateData?.phone ? candidateData.phone : 0,
      resume: candidateData?.resumeUrl ? candidateData.resumeUrl : "",
      portfolio: candidateData?.portfolio ? candidateData.portfolio : "",
      website: candidateData?.website ? candidateData.website : "",
      experience: candidateData?.experience ? candidateData.experience : 0,
      noticePeriod: candidateData?.noticePeriod ? candidateData.noticePeriod : 0,
      currentCTC: candidateData?.currentCTC ? candidateData.currentCTC : 0,
      expectedCTC: candidateData?.expectedCTC ? candidateData.expectedCTC : 0,
      ...(candidateData?.hourlyRate ? { hourlyRate: candidateData.hourlyRate } : {}),
      location: candidateData?.location ? candidateData.location : "",
    },
    mode: 'onChange'
  });

  const fetchAndUpdateCandidate = async () => {
    try {
      const response = await axios.get('/auth/candidate/dashboard');
      if (response.data?.candidate) {
        dispatch(updateWithoutAssessment(response.data.candidate))
      }
    } catch (error) {
      throw new Error("Error while fetch candidate data")
    }
  }

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      setIsAssessmentBannerVisible(!hasGivenAssessment);
    }
  }, [hasGivenAssessment, isDone]);

  const handleEditProfile = async (data) => {
    try {
      setIsLoading(true);

      if (!data.firstName?.trim()) throw new Error("First name is required.");
      if (!data.lastName?.trim()) throw new Error("Last name is required.");
      if (!data.email?.trim() || !emailRegex.test(data.email))
        throw new Error("Valid email is required.");
      if (!data.phone?.trim() || !mobileRegex.test(data.phone))
        throw new Error("Valid 10-digit phone number is required.");
      if (!data.location?.trim()) throw new Error("Location is required.");
      if (data.currentCTC < 0) throw new Error("Current CTC cannot be negative.");
      if (data.expectedCTC < data.currentCTC)
        throw new Error("Expected CTC must be greater than or equal to Current CTC.");
      if (data.experience < 0) throw new Error("Experience cannot be negative.");
      if (data.noticePeriod < 0) throw new Error("Notice period cannot be negative.");
      if (data.portfolio.trim() === "") throw new Error("Valid portfolio URL is required.");

      if (resumeFile) {
        data.resume = await uploadResume(resumeFile, () => { })
      }
      if (profileFile) {
        data.profilePictureUrl = await uploadProfilePicture(profileFile)
      }

      const response = await axios.post("/auth/candidate/edit-profile", data)
      if (response?.data?.stage === "OTP") {
        setIsLoading(false);
        setEmail(response?.data?.email)
        setStage("OTP")
      } else if (response?.data?.stage === "DONE") {
        await fetchAndUpdateCandidate()
        setIsLoading(false);
        showSuccessToast("Success", "Profile updated Successfully")
        setStage("DONE")
      }
    } catch (error) {
      setIsLoading(false);
      showErrorToast("Error", error?.response?.data?.message || error?.message || "Profile Updation Failed.");
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      showErrorToast("Invalid OTP Error", 'Please enter the 6-digit OTP sent to your email.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/candidate/verify-email-otp', { email, otp: enteredOtp });
      setShowOTPModal(false);
      await fetchAndUpdateCandidate()
      showSuccessToast("Success", "Profile updated Successfully")
      setStage("DONE");
    } catch (error) {
      showErrorToast("Invalid OTP Error", error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      setIsAssessmentBannerVisible(false);
    };
  }, []);

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
    <Container hasBgColor>
      {isLoading && <LoaderModal/>}
      {showOTPModal && isEditing && 
              <div className="flex items-center h-screen w-screen justify-center fixed bg-background-overlay z-50 top-0 left-0">
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
                          className="no-spinner otp-input"
                          value={data}
                          onChange={(e) => handleOtpChange(e.target, index)}
                        />
                      ))}
                    </div>
      
                    <div className="flex justify-center mt-6 w-full gap-4  mb-6 ">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        className="w-full "
                      >
                        {isLoading ? 'Verifying...' : 'Verify'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            }
        <Header HeaderText={"My Profile"}  />
      {isAssessmentBannerVisible &&  <AssessmentBanner />}
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="flex w-full gap-4 flex-col-reverse lg:flex-row mt-8 lg:mt-0 ">
            <div className="lg:w-[70%] flex flex-col gap-4">
              <PersonalDetails candidateData={candidateData} isEditing={isEditing} control={control} />
              <ResumeAndPortfolioDetails candidateData={candidateData} isEditing={isEditing} control={control} resumeFile={resumeFile} setResumeFile={setResumeFile} />
              <ProfessionalDetails candidateData={candidateData} isEditing={isEditing} control={control} />
            </div>
            <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%] ">
                <StyledCard backgroundColor={"bg-background-30"} extraStyles=" flex flex-col items-center relative">
                  {isEditing || <button type="button" onClick={()=>setIsEditing(true)} className="absolute top-6 right-6 border rounded-xl  border-font-gray hover:bg-background-70">
                    <CustomToolTip title={"Edit Profile"} arrowed>
                      <IconWrapper icon={Pencil}  />
                    </CustomToolTip>
                  </button>}
                  <div className="relative w-[8rem] min-h-[5rem] ">
                    <div  className="absolute w-[8rem] left-0  -top-14 aspect-square overflow-hidden rounded-full">
                      <img src={profileFile ? URL.createObjectURL(profileFile) : candidateData?.profilePictureUrl ? candidateData?.profilePictureUrl : UNKNOWN_PROFILE_PICTURE_URL } alt="" className="object-cover w-full" />
                      <input accept="image/*" onChange={(e)=>setProfileFile(e.target.files[0])} type="file" className="hidden" ref={profileImageRef} />
                    </div>
                    {isEditing && 
                    <button type="button" onClick={()=>profileImageRef.current.click()} className="absolute bottom-1 -right-1  rounded-xl">
                        <IconWrapper icon={PencilLine} size={3} hasBg customBgHover={'hover:bg-background-60'}  />
                    </button>}
                </div>
                <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">{candidateData?.firstName + " " + candidateData?.lastName}</h1>
                {!isEditing ? <>
                  <div className="w-full flex justify-center items-center gap-2">
                    <p className=" text-font-gray gap-2 typography-small-p">{candidateData?.location}</p>
                  </div>
                  <div className="mt-6 w-full flex justify-between">
                    <p className="typography-body">Jobs Applied</p>
                    <p>{candidateData?.jobApplications?.length || 0}</p>
                  </div>
                </> :
                  <div className="flex flex-col mt-2 gap-4  w-full">
                    {/* <InputField type="text" label="Role"  rowWise={true} /> */}
                    <Controller
                      name="location"
                      control={control}
                      defaultValue={""}
                      rules={validationRules.location}
                      render={({ field, fieldState: { error } }) => (
                        <InputField
                          type="text"
                          id="location"
                          label="Location"
                          labelStyles="text-font-gray"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          error={error}
                          rowWise={true}
                          errorMessage={error?.message}
                        />
                      )}
                    />

                  </div>
                }
              </StyledCard>
            </div>
          </div>
          {isEditing &&
            <div className="place-self-end flex gap-4 mt-4">
              <Button onClick={() => setIsEditing(false)} type="button" variant="secondary" >Cancel</Button>
              <Button
                type="Submit"
                disabled={isLoading}
              >Save</Button>
            </div>}
        </form>
        <div className="my-4">
          <ContactUs />

        </div>
      </Container>
  );
}

export default Profile;
