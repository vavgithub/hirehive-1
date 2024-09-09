import React, { useState, useRef, useEffect } from 'react';

const Verification = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isError, setIsError] = useState(false);
    const [step, setStep] = useState('otp'); // 'otp' or 'password'
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const inputRefs = useRef([]);
    const submitButtonRef = useRef(null);

    const isOtpComplete = otp.every(digit => digit !== '');
    const isPasswordComplete = password !== '' && confirmPassword !== '';

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && isOtpComplete && step === 'otp') {
                e.preventDefault();
                handleOtpSubmit();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [otp, isOtpComplete, step]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.value && index < 3) {
            inputRefs.current[index + 1].focus();
        } else if (index === 3 && isOtpComplete) {
            submitButtonRef.current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            setOtp(prev => {
                const newOtp = [...prev];
                newOtp[index] = '';
                return newOtp;
            });

            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOtpSubmit = () => {
        if (!isOtpComplete) return;

        const enteredOtp = otp.join('');
        console.log('Submitted OTP:', enteredOtp);
        if (enteredOtp === '1234') { // For demonstration, assume '1234' is correct
            setStep('password');
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    const handlePasswordSubmit = () => {
        if (!isPasswordComplete) return;

        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }
        // Here you would typically send the password to your backend
        console.log('Password set successfully');
        // Reset the form or redirect the user
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-verification">
            <div className="w-full max-w-md p-8 space-y-8 bg-background-90 rounded-lg shadow-xl bg-opacity-90">
                <h2 className="text-3xl font-bold text-center text-white">
                    {step === 'otp' ? 'OTP Verification' : 'Create Password'}
                </h2>

                {step === 'otp' ? (
                    <>
                        <p className="text-center text-gray-300">
                            To ensure security, please enter the OTP (One-Time Password)
                            to verify your account. A code has been sent to
                        </p>
                        <p className="text-center text-blue-400">JohnDoe@gmail.com</p>

                        <div className="flex justify-center space-x-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength="1"
                                    className={`w-12 h-12 text-center text-xl font-semibold text-white bg-gray-700 border-2 rounded-md focus:outline-none focus:border-blue-500 ${isError ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        {isError && (
                            <p className="text-center text-red-500">Invalid OTP</p>
                        )}

                        <button
                            ref={submitButtonRef}
                            onClick={handleOtpSubmit}
                            disabled={!isOtpComplete}
                            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isOtpComplete
                                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                    : 'bg-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {isError ? 'Retry' : 'Next'}
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-center text-gray-300">
                            Please create a strong password for your account
                        </p>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="text-center text-red-500">{passwordError}</p>
                        )}
                        <button
                            onClick={handlePasswordSubmit}
                            disabled={!isPasswordComplete}
                            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isPasswordComplete
                                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                    : 'bg-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Set Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Verification;