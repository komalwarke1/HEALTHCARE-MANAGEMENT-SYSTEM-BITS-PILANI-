import React, { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthContext';

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    signOut();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 
                 transform hover:scale-105 transition-all duration-200 relative flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
      )}
      <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
    </button>
  );
};

export default SignOutButton;