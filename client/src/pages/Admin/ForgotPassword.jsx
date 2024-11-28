import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useMutation } from '@tanstack/react-query';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import axios from '../../api/axios';
import { InputField } from '../../components/Form/FormFields';
import OTPInput from '../../components/ui/OTPInput';
import { BackButton } from '../../components/utility/Header';

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Request OTP mutation
  const requestOtpMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post('/auth/forgot-password', { email });
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessToast('OTP sent to your email');
      setStep('otp');
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  });

  // Verify OTP mutation
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/auth/verify-otp', { email, otp });
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessToast('OTP verified successfully');
      setStep('newPassword');
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/auth/reset-password', {
        email,
        otp,
        password
      });
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessToast('Password reset successfully');
      setTimeout(() => onBack(), 2000);
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Failed to reset password. Please try again.');
    }
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showErrorToast('Please enter your email');
      return;
    }
    requestOtpMutation.mutate(email);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      showErrorToast('Please enter OTP');
      return;
    }
    verifyOtpMutation.mutate();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      showErrorToast('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      showErrorToast('Password must be at least 8 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showErrorToast('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      showErrorToast('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(password)) {
      showErrorToast('Password must contain at least one number');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      showErrorToast('Password must contain at least one special character');
      return;
    }
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }
    resetPasswordMutation.mutate();
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  return (
    <div className="w-full  p-6">
      <div className='flex cursor-pointer gap-4 my-4 items-center'
      onClick={onBack}>
        <BackButton/>
        <p className='typography-h3'>

      Back to Login
        </p>
      </div>
      
      

      <h2 className="typography-h2 mb-6">Reset Password</h2>

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <InputField
            id="reset-email"
            type="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            disabled={requestOtpMutation.isPending}
          >
            {requestOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
      )}
      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit}>
          <div className="space-y-4">
            <div className="text-center">
              <label className="block mb-4 typography-body">
                Enter the verification code sent to your email
              </label>
              <OTPInput
                length={6}
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={verifyOtpMutation.isPending || otp.length !== 6}
            >
              {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </form>
      )}

      {step === 'newPassword' && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <InputField
              id="new-password"
              type="password"
              label="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <InputField
              id="confirm-password"
              type="password"
              label="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}

            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;