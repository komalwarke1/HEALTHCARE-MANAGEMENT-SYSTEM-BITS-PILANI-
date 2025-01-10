import React from 'react'
import Navbar from '../component/Navbar'
import VideoBackground from '../component/VideoBackground'
import ArticleSlider from '../component/ArticalSlider'
import DoctorSpecialties from '../component/DoctorSpecialties'
import Footer1 from '../component/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const handleFindClick = () => {
    navigate('/LocationIQMap');
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navbar Section */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Hero Section with Video */}
      <section className="relative">
        <VideoBackground />
        
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Health Insights
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest medical research, health tips, and wellness advice from our experts
            </p>
          </div>
          <ArticleSlider />
        </div>
      </section>

      {/* Doctor Specialties Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <DoctorSpecialties />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and take the first step towards better health
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleFindClick} className="bg-white text-orange-500 hover:bg-orange-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg">
              Find a Doctor
            </button>
            <button className="bg-orange-600 text-white hover:bg-orange-700 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg">
              Emergency Care
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      
       <Footer1/>
      
    </div>
  )
}

export default Home