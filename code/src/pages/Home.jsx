import React from "react";
import Navbar from "../component/Navbar";
import VideoBackground from "../component/VideoBackground";
import ArticleSlider from "../component/ArticalSlider";
import DoctorSpecialties from "../component/DoctorSpecialties";
import Footer1 from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Dumbbell, Utensils, Activity } from 'lucide-react';
import WellnessSection from "@/component/WellnessSection";



const Home = () => {
  const navigate = useNavigate();
  
  const handleFindClick = () => {
    navigate("/LocationIQMap");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Navbar Section */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Hero Section with Video */}
      <section className="relative">
        <VideoBackground />
      </section>

      {/* Wellness Hub Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <WellnessSection />
      </section>



      {/* Doctor Specialties Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <DoctorSpecialties />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-white text-xl mb-8 max-w-3xl mx-auto">
            Schedule your appointment today and take the first step towards better health
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={handleFindClick}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Find a Doctor
            </button>
            <button className="bg-green-600 text-white hover:bg-green-700 font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Emergency Care
            </button>
          </div>
        </div>
      </section>
            {/* Featured Articles Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-green-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Health Insights
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stay informed with the latest medical research, health tips, and wellness advice from our experts
            </p>
          </div>
          <ArticleSlider />
        </div>
      </section>

      {/* Footer */}
      <Footer1 />
    </div>
  );
};

export default Home;