import React from "react"
import Login from "../component/Login"
import Navbar from "../component/Navbar"
import { Stethoscope, CalendarClock, ClipboardList, MessageSquare, Shield, ArrowRight, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import image from "../assets/bg2.jpg"

const Loginpage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            {/* Left Section */}
            <div className="lg:w-7/12 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-green-600 min-h-[800px]"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] mix-blend-overlay opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col p-8 md:p-12">
                {/* Hero Section */}
                <div className="space-y-6 text-white">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg">
                    <Stethoscope size={16} className="mr-2" />
                    Welcome to Your Health Hub
                  </div>
                  <h1 className="text-5xl font-bold leading-tight">
                    Your Health,
                    <br />
                    Our Priority
                  </h1>
                  <p className="text-xl leading-relaxed text-blue-50/90 max-w-xl">
                    Experience healthcare reimagined through our secure patient portal. Access world-class services
                    anytime, anywhere.
                  </p>
                </div>

                {/* Feature Grid - Updated with transparency */}
                <div className="mt-auto">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <CalendarClock className="w-6 h-6 text-blue-600" />,
                        title: "Smart Scheduling",
                        description: "Book and manage appointments with ease",
                        bgColor: "bg-blue-50/80",
                        iconBg: "bg-blue-100/80",
                      },
                      {
                        icon: <ClipboardList className="w-6 h-6 text-green-600" />,
                        title: "Digital Records",
                        description: "Access your complete health history",
                        bgColor: "bg-green-50/80",
                        iconBg: "bg-green-100/80",
                      },
                      {
                        icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
                        title: "Virtual Care",
                        description: "Connect with Doctor remotely",
                        bgColor: "bg-blue-50/80",
                        iconBg: "bg-blue-100/80",
                      },
                      {
                        icon: <Shield className="w-6 h-6 text-green-600" />,
                        title: "Secure Platform",
                        description: "HIPAA-compliant protection",
                        bgColor: "bg-green-50/80",
                        iconBg: "bg-green-100/80",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="group bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 
                                 hover:bg-white/50 hover:scale-105 transition-all duration-300 ease-out"
                      >
                        <div className="flex gap-4">
                          <div
                            className={`shrink-0 w-12 h-12 ${feature.iconBg} rounded-xl flex items-center 
                                        justify-center shadow-inner border border-white/50 
                                        group-hover:shadow-md transition-all duration-300`}
                          >
                            <div className="transform transition-transform duration-300 group-hover:scale-110">
                              {feature.icon}
                            </div>
                          </div>
                          <div>
                            <h3
                              className="font-semibold text-white group-hover:text-white/90 
                                         transition-colors duration-300"
                            >
                              {feature.title}
                            </h3>
                            <p
                              className="mt-1 text-white/80 text-sm group-hover:text-white/90 
                                        transition-colors duration-300"
                            >
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="lg:w-5/12 w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 sticky top-24">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800  bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Patient Portal</h2>
                  <p className="mt-2 text-gray-600">Access your personalized health dashboard</p>
                </div>

                <Login />

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <span>First time here?</span>
                    <Link
                      to="/signup"
                      className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center group"
                    >
                      Create your account
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                </div>
                <div className=" pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    
                    <Link
                      to="/Doctorlogin"
                      className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center group"
                    >
                      Sign In as Doctor
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-500 text-sm">© 2024 Hospital Name</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-600 font-medium">24/7 Emergency Services</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 md:justify-center">
              {["Privacy Policy", "Patient Rights", "HIPAA Notice", "Accessibility"].map((link) => (
                <a key={link} href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <div className="md:text-right">
              <p className="text-sm text-gray-600 font-medium">Contact Us:</p>
              <a
                href="tel:123-456-7890"
                className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
              >
                <Phone size={14} />
                (123) 456-7890
              </a>
              <p className="text-sm text-red-600 font-medium mt-1">Emergency: 108</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Loginpage

