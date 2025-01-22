import React, { useState } from "react";
import { User, Lock, Heart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Doctorlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Doctorappoitment");
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Heart className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Please login to your account
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="doctor@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold
                         hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transform transition-transform duration-200 hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-gray-600 text-sm">Need assistance? </span>
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center group"
              >
                Create your account
                <ArrowRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Secure, HIPAA-compliant login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctorlogin;
