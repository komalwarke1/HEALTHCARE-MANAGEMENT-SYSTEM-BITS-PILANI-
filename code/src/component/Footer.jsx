import React from 'react'

const Footer1 = () => {
  return (
    <div>
       <footer className="bg-gray-900 text-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">HealthCare</h3>
              <p className="text-gray-400">
                Dedicated to your well-being, every step of the way.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Find a Doctor</a></li>
                <li><a href="/appointment" className="hover:text-blue-400 transition-colors">Book Appointment</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Our Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Healthcare Ave</li>
                <li>New York, NY 10001</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer1
