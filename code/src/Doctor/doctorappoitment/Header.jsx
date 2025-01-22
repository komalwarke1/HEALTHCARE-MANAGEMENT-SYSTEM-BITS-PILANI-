import React, { useState } from 'react';
import { UserCircle, Calendar, Users, Bell, Settings, LogOut, Menu, X, Search } from 'lucide-react';

import { Alert, AlertDescription } from '../doctorprofile/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSetScheduleClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();
  
  const handleset = ()=>{
    
    navigate('/Doctorprofile')
  }
  const handleLogout = async () => {
    try {
      // Close any open menus
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
      
      // Show loading state
      setShowLogoutAlert(true);

      // Make API call to logout endpoint
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json'
        }
        
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear any local storage items
      localStorage.removeItem('user-preferences');
      sessionStorage.clear();

      // Redirect to login page
      //navigate('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
      setShowLogoutAlert(false);
      // You could add error handling UI here
    }
    navigate('/Doctorlogin')
  };

  const NavItem = ({ icon: Icon, children, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md transition-colors"
    >
      <Icon className="h-5 w-5 text-green-600" />
      <span>{children}</span>
    </button>
  );

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">MedDashboard</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Navigation Items */}
              <NavItem icon={Calendar} onClick={onSetScheduleClick}>Schedule</NavItem>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <UserCircle className="h-8 w-8 text-green-600" />
                  <span className="font-medium">Dr. Smith</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <NavItem icon={Settings} onClick={handleset}>Settings</NavItem>
                    <NavItem icon={LogOut} onClick={handleLogout}>Logout</NavItem>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="space-y-2">
                <NavItem icon={Calendar} onClick={onSetScheduleClick}>Schedule</NavItem>
                <NavItem icon={Users}>Patients</NavItem>
                <NavItem icon={Bell}>Notifications</NavItem>
                <NavItem icon={Settings}>Settings</NavItem>
                <NavItem icon={LogOut} onClick={handleLogout}>Logout</NavItem>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Alert */}
      {showLogoutAlert && (
        <Alert className="fixed bottom-4 right-4 w-auto bg-green-50 border-green-200">
          <AlertDescription>
            Logging out...
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Navbar;