import React, { useState, useEffect } from "react"
import { User, Menu, X } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import { useAuth } from "../AuthContext"

const Navbar = () => {
  const { isLogin } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigationItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "appointment", label: "Book Appointment", path: "/appointment" },
    { id: "location", label: "Location", path: "/LocationIQMap" },
    { id: "consultation", label: "Chat Consultation", path: "/Chatconsulation" },
  ]

  const handleLoginClick = () => {
    navigate("/login")
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="bg-blue-50 shadow-lg sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              MediCare
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4" role="navigation" aria-label="Main Navigation">
            {navigationItems.map(({ id, label, path }) => (
              <Link
                key={id}
                to={path}
                className={`
                  relative
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  group
                  hover:scale-105
                  ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-blue-600 to-green-500"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500"
                  }
                `}
                aria-current={location.pathname === path ? "page" : null}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Login/Profile Button */}
          <div className="hidden md:flex items-center">
            {isLogin ? (
              <ProfileButton />
            ) : (
              <button
                onClick={handleLoginClick}
                className="
                  flex
                  items-center
                  space-x-2
                  bg-gradient-to-r
                  from-blue-600
                  to-green-500
                  hover:from-blue-700
                  hover:to-green-600
                  text-white
                  px-6
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:shadow-xl
                  transform
                  hover:-translate-y-1
                  hover:scale-105
                "
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map(({ id, label, path }) => (
              <Link
                key={id}
                to={path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-blue-600 to-green-500"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location.pathname === path ? "page" : null}
              >
                {label}
              </Link>
            ))}
            {isLogin ? (
              <div className="px-3 py-2">
                <ProfileButton />
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLoginClick()
                  setIsMobileMenuOpen(false)
                }}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  space-x-2
                  bg-gradient-to-r
                  from-blue-600
                  to-green-500
                  hover:from-blue-700
                  hover:to-green-600
                  text-white
                  px-6
                  py-2
                  rounded-md
                  text-base
                  font-medium
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

