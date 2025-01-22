import React, { useState } from 'react';
import { 
  User, Settings, Calendar, MessageSquare, LogOut, 
  ChevronDown, Bell, HelpCircle 
} from 'lucide-react';
import SignOutButton from './SignOutButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProfile } from '../ProfileProvider';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {patientInfo} = useProfile();
  const Navigate = useNavigate();

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: <User size={16} />,
          label: 'My Profile',
          description: 'Manage your personal info',
          action: () => Navigate('/PatientProfile')
        },
        {
          icon: <Bell size={16} />,
          label: 'Notifications',
          description: '3 new messages',
          badge: 3,
          action: () => Navigate('/')
        },
      ]
    },
    {
      title: "Services",
      items: [
        {
          icon: <Calendar size={16} />,
          label: 'Appointments',
          description: 'View your schedule',
          action: () => Navigate('/appointment')
        },
        {
          icon: <MessageSquare size={16} />,
          label: 'Messages',
          description: 'Chat with your doctor',
          action: () => Navigate('/Chatconsulation')
        },
        {
          icon: <Settings size={16} />,
          label: 'Settings',
          description: 'Customize your account',
          action: () => Navigate('/PatientProfile')
        },
        {
          icon: <HelpCircle size={16} />,
          label: 'Help & Support',
          description: 'Get assistance',
          action: () => Navigate('/')
        },
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Profile Button with Blue-Green Gradient */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex 
          items-center 
          space-x-2
          bg-gradient-to-r
          from-cyan-50
          to-emerald-50
          hover:from-cyan-500
          hover:to-emerald-500
          text-cyan-600
          hover:text-white
          px-3 
          py-2
          rounded-full 
          transition-all 
          duration-300
          hover:shadow-lg
          transform
          hover:-translate-y-0.5
          border
          border-cyan-500
          hover:border-transparent
        "
      >
        <User size={18} />
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute 
          right-0 
          mt-3
          w-72
          bg-white 
          rounded-3xl
          shadow-2xl
          overflow-hidden
          z-50
          border
          border-cyan-100
          transform
          transition-all
          duration-200
        ">
          {/* Profile Header with Beautiful Gradient */}
          <div className="p-4 bg-gradient-to-r from-cyan-500 to-emerald-500">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User size={24} className="text-cyan-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">{patientInfo.firstName+" "+patientInfo.lastName}</span>
                <span className="text-cyan-50 text-sm">Patient</span>
              </div>
            </div>
          </div>

          <div className="py-3">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="px-3">
                <div className="px-3 py-2">
                  <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">
                    {section.title}
                  </span>
                </div>
                
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="
                      w-full 
                      flex 
                      items-center 
                      space-x-3 
                      px-3 
                      py-2.5 
                      rounded-xl
                      text-gray-700
                      hover:bg-gradient-to-r
                      hover:from-cyan-500
                      hover:to-emerald-500
                      hover:text-white
                      transition-all 
                      duration-300
                      group
                      relative
                    "
                  >
                    <div className="
                      w-8 
                      h-8 
                      bg-cyan-50
                      group-hover:bg-cyan-400
                      rounded-lg
                      flex 
                      items-center 
                      justify-center
                      transition-colors
                      duration-300
                    ">
                      <span className="text-cyan-500 group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-gray-500 group-hover:text-cyan-50">
                        {item.description}
                      </span>
                    </div>

                    {item.badge && (
                      <span className="
                        absolute
                        right-3
                        bg-cyan-500
                        text-white
                        text-xs
                        font-bold
                        px-2
                        py-0.5
                        rounded-full
                        group-hover:bg-white
                        group-hover:text-cyan-500
                      ">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
                
                {sectionIndex < menuSections.length - 1 && (
                  <div className="my-2 border-b border-cyan-100" />
                )}
              </div>
            ))}

            {/* Logout Button */}
            <div className="px-3 mt-2">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;