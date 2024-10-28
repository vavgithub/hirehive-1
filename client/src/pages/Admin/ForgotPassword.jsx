import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useMutation } from '@tanstack/react-query';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import axios from '../../api/axios';

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

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={onBack}
      >
      ← Back to Login
      </Button>

      <h2 className="typography-h2 mb-6">Reset Password</h2>

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400"
              placeholder="Enter your email"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={requestOtpMutation.isPending}
          >
            {requestOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400"
              placeholder="Enter OTP sent to your email"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </form>
      )}

      {step === 'newPassword' && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400"
              placeholder="Confirm new password"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
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