import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const navigation = useNavigate();
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 animate-gradient bg-[length:400%_400%]">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl 
                    animate-slide-up hover:shadow-3xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl animate-pulse" />
        <div className="relative text-center">
          <div className="mb-8 animate-float">
            <svg 
              className="w-20 h-20 mx-auto text-white animate-glow" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                className="animate-draw"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-3 text-white animate-fade-in">Access Required</h2>
          <p className="text-lg text-white/80 mb-10 animate-fade-in-delay">Sign in to continue </p>
          <button
            onClick={() => navigation('/login')}
            className="group w-full bg-white/20 backdrop-blur text-white py-4 px-6 rounded-xl
                     font-bold text-lg tracking-wide
                     transition-all duration-300 ease-in-out
                     hover:bg-white hover:text-indigo-600
                     transform hover:-translate-y-1 hover:shadow-xl animate-shimmer
                     focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <span className="inline-flex items-center">
              Sign In
              <svg 
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
          <div className="mt-8 text-white/60 animate-fade-in-delay-2">
            <span>Don't have an account? </span>
            <button 
              onClick={() => navigation('/signup')}
              className="text-white font-semibold hover:text-pink-200 transition-colors ml-1 animate-pulse"
            >
              Create Your Account
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease forwards;
        }
        .animate-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.5s ease-out 0.2s both;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.5s ease-out 0.4s both;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoginPrompt;