import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  ArrowRight, 
  RefreshCcw, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (remainingTime > 0 && !canResend) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (remainingTime === 0 && !canResend) {
      setCanResend(true);
    }
  }, [remainingTime, canResend]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(char => !/^\d+$/.test(char))) return;
    
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      setError('Please enter all digits');
      return;
    }
    // Mock verification - replace with actual verification logic
    if (otp.join('') === '123456') {
      setIsVerified(true);
      setError('');
    } else {
      setError('Invalid verification code');
    }
  };

  const handleResend = () => {
    setRemainingTime(30);
    setCanResend(false);
    // Add your resend OTP logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-2xl shadow-xl shadow-orange-100">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex justify-center items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl">
                <Shield className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Verify OTP
                </h1>
              </div>
              <p className="text-sm text-gray-600">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold bg-white/60 border 
                             border-orange-200 rounded-xl focus:border-orange-400 focus:ring-2 
                             focus:ring-orange-400/20 outline-none"
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50/50 p-3 rounded-lg border border-red-100">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {isVerified && (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50/50 p-3 rounded-lg border border-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <span>OTP verified successfully!</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 
                         text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50 
                         hover:from-orange-600 hover:to-orange-500 disabled:opacity-50"
                disabled={isVerified}
              >
                <span className="flex items-center justify-center gap-2">
                  Verify Code
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>

              {/* Resend Option */}
              <div className="text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-orange-500 hover:text-orange-600 text-sm font-semibold 
                             inline-flex items-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Resend Code
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Resend code in {remainingTime} seconds
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;