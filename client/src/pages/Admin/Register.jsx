import React, { useEffect, useState } from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import OtpForm from '../../components/Register/OtpForm';
import PasswordForm from '../../components/Register/PasswordForm';
import DetailsForm from '../../components/Register/DetailsForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loaders/Loader';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import { checkUserAuthStatus } from '../../services/auth.service';
import { useAuthContext } from '../../context/AuthProvider';
import * as Sentry from '@sentry/react';

export const steps = [
    { id: "REGISTER", label: "Register" },
    { id: "OTP", label: "Otp" },
    { id: "PASSWORD", label: "Password" },
    { id: "COMPANY DETAILS", label: "Company Details" },
    { id: "PLAN SELECTION", label: "Plan" },
    { id: "ADD MEMBERS", label: "Add Members" },
  ];

const GOOGLE_ONBOARDING_PENDING_KEY = 'hirehive:googleOnboardingPending'
const ONBOARDING_STEP_STORAGE_KEY = 'hirehive:onboardingStep'

export const markGoogleOnboardingPending = () => {
  sessionStorage.setItem(GOOGLE_ONBOARDING_PENDING_KEY, '1')
}

export const storeOnboardingStep = (step) => {
  if (step) sessionStorage.setItem(ONBOARDING_STEP_STORAGE_KEY, step)
  sessionStorage.removeItem(GOOGLE_ONBOARDING_PENDING_KEY)
}

export const clearOnboardingSession = () => {
  sessionStorage.removeItem(GOOGLE_ONBOARDING_PENDING_KEY)
  sessionStorage.removeItem(ONBOARDING_STEP_STORAGE_KEY)
}

const isValidStepId = (stepId) => steps.some((step) => step.id === stepId)

export const getStoredOnboardingStep = () => {
  const stored = sessionStorage.getItem(ONBOARDING_STEP_STORAGE_KEY)
  if (stored && isValidStepId(stored)) return stored
  if (sessionStorage.getItem(GOOGLE_ONBOARDING_PENDING_KEY)) return 'COMPANY DETAILS'
  return null
}

export const getStepFromVerificationStage = (stage, authType) => {
  if (!stage || stage === 'DONE') return null
  if (authType === 'GOOGLE' && ['PASSWORD', 'REGISTER', 'OTP'].includes(stage)) {
    return 'COMPANY DETAILS'
  }
  const index = steps.findIndex((step) => step.id === stage)
  if (index === -1) return null
  return steps[index + 1]?.id ?? null
}

const resolveOnboardingStep = ({ onboardingStep, currentStage, authType }) => {
  if (onboardingStep && isValidStepId(onboardingStep)) return onboardingStep
  return getStepFromVerificationStage(currentStage, authType)
}

const Register = () => {
    const [searchParams] = useSearchParams();
    const onboardingStepFromUrl = searchParams.get('onboardingStep')
    const stageFromUrl = searchParams.get('currentStage')

    const [currentStep, setCurrentStep] = useState(() => {
      const fromUrl = resolveOnboardingStep({
        onboardingStep: onboardingStepFromUrl,
        currentStage: stageFromUrl,
        authType: onboardingStepFromUrl ? 'GOOGLE' : null,
      })
      if (fromUrl) {
        storeOnboardingStep(fromUrl)
        return fromUrl
      }
      return getStoredOnboardingStep() ?? steps[0]?.id
    })
    const [isResolvingSession, setIsResolvingSession] = useState(true)
    const navigate = useNavigate();
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();
    const { setUser } = useAuthContext();

    const onboardContext = useOnboardingContext();

    const goToStep = (step) => {
      if (!step || !isValidStepId(step)) return
      setCurrentStep(step)
      storeOnboardingStep(step)
    }

    const applyOnboardingProgress = ({ onboardingStep, currentStage, authType, userData }) => {
      const nextStep = resolveOnboardingStep({ onboardingStep, currentStage, authType })
      if (nextStep) goToStep(nextStep)
      if (userData) onboardContext?.setOnboardData(userData)
    }

    async function checkAuthStatus(error){
      try {
        const response = await checkUserAuthStatus(error)
        if (response?.currentStage === 'DONE' || response?.message === 'Please login to continue') {
          clearOnboardingSession()
          await refetchAuth()
          return
        }
        applyOnboardingProgress({
          onboardingStep: response?.onboardingStep,
          currentStage: response?.currentStage,
          authType: response?.userData?.auth_type,
          userData: response?.userData,
        })
      } catch (error) {
        Sentry.captureException(error, {
          tags: { file: "Register.jsx", action: "checkAuthStatus", role: "admin" },
          extra: { response: error?.response?.data, message: error?.message },
        });
        if (error?.response?.status === 401) {
          const stored = getStoredOnboardingStep()
          if (!stored) {
            clearOnboardingSession()
            setCurrentStep(steps[0]?.id)
          }
        } else if (error?.response?.status !== 401) {
          showErrorToast('Error', error.response?.data?.message || 'Unable to resume registration.')
        }
      } finally {
        setIsResolvingSession(false)
      }
    }

    useEffect(() => {
      const token = searchParams.get('token')
      const error = searchParams.get('error')
      const currentStage = searchParams.get('currentStage')
      const onboardingStep = searchParams.get('onboardingStep')

      if (token) {
        clearOnboardingSession()
        setCurrentStep(steps[1]?.id)
        setIsResolvingSession(false)
        return
      }

      if (onboardingStep || currentStage) {
        const fromUrl = resolveOnboardingStep({
          onboardingStep,
          currentStage,
          authType: onboardingStep ? 'GOOGLE' : null,
        })
        if (fromUrl) goToStep(fromUrl)
      }

      if (currentStage === 'DONE') {
        clearOnboardingSession()
        setIsResolvingSession(false)
        refetchAuth()
        return
      }

      if (error || onboardingStep || currentStage) {
        checkAuthStatus(error || null)
        if ((onboardingStep || currentStage) && currentStage !== 'DONE') {
          showSuccessToast('Success', 'Please complete your registration to continue.')
        }
        return
      }

      checkAuthStatus(null)
    }, [])

    useEffect(() => {
        if (authData?.role) {
            setUser(authData)
            clearOnboardingSession()
            navigate(getRoute(authData.role, ROUTE_KEY.DASHBOARD));
        }
    }, [authData, navigate, setUser]);

    if (authLoading || isResolvingSession) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <Loader />
          </div>
      );
    }else if(currentStep === "REGISTER"){
      return <RegisterForm setCurrentStep={goToStep} />
    }else if(currentStep === "OTP"){
      return <OtpForm setCurrentStep={goToStep} />
    }else if(currentStep === "PASSWORD"){
      return <PasswordForm setCurrentStep={goToStep} />
    }else{
      return <DetailsForm currentStep={currentStep} setCurrentStep={goToStep} />
    }

};


export default Register
