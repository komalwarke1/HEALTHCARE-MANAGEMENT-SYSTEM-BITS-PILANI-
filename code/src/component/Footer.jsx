import React from "react"

const Footer1 = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-green-900 text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
              HealthCare
            </h3>
            <p className="text-gray-300">Dedicated to your well-being, every step of the way.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Find a Doctor
                </a>
              </li>
              <li>
                <a href="/appointment" className="hover:text-blue-400 transition-colors">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Our Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300">
              <li>123 Healthcare Ave</li>
              <li>New York, NY 10001</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors text-2xl">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors text-2xl">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors text-2xl">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer1

