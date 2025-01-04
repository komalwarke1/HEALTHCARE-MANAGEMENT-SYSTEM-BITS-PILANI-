import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); // email, resetPassword, success
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Mock API call - replace with actual implementation
    setStep('resetPassword');
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock API call - replace with actual implementation
    setStep('success');
  };

  const renderError = () => {
    if (error) {
      return (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm bg-red-50/50 p-3 rounded-lg border border-red-100">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      );
    }
    return null;
  };

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex justify-center items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl">
          <KeyRound className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Reset Password
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 h-12 bg-white/60 border border-orange-200 text-gray-800 
                       placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 
                       focus:ring-orange-400/20 rounded-xl outline-none"
            />
          </div>
          {renderError()}
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 
                   text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50 
                   hover:from-orange-600 hover:to-orange-500"
        >
          <span className="flex items-center justify-center gap-2">
            Send Reset Link
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>

        <div className="text-center">
          <a 
            href="/login" 
            className="text-orange-500 hover:text-orange-600 text-sm font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );

  const renderResetPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex justify-center items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl">
          <Lock className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            New Password
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Please enter your new password
        </p>
      </div>

      <form onSubmit={handlePasswordReset} className="space-y-6">
        {/* Password field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full pl-10 h-12 bg-white/60 border border-orange-200 text-gray-800 
                       placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 
                       focus:ring-orange-400/20 rounded-xl outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-orange-400 hover:text-orange-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-10 h-12 bg-white/60 border border-orange-200 text-gray-800 
                       placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 
                       focus:ring-orange-400/20 rounded-xl outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-orange-400 hover:text-orange-500"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {renderError()}
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 
                   text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50 
                   hover:from-orange-600 hover:to-orange-500"
        >
          <span className="flex items-center justify-center gap-2">
            Reset Password
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="inline-flex justify-center items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl">
        <CheckCircle className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          Success!
        </h1>
      </div>
      
      <div className="space-y-3">
        <p className="text-gray-600">Your password has been reset successfully.</p>
        <a
          href="/login"
          className="inline-block w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 
                    text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50 
                    hover:from-orange-600 hover:to-orange-500"
        >
          <span className="flex items-center justify-center gap-2 h-full">
            Return to Login
            <ArrowRight className="w-5 h-5" />
          </span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-2xl shadow-xl shadow-orange-100">
          <div className="p-8">
            {step === 'email' && renderEmailStep()}
            {step === 'resetPassword' && renderResetPasswordStep()}
            {step === 'success' && renderSuccessStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;