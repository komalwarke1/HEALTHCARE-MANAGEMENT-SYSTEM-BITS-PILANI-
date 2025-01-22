import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Heart,
  Brain,
  Baby,
  Eye,
  Stethoscope,
  Activity,
  CircleDot,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Star,
  Syringe,
  Calendar,
  Bone,
  Wind,
  Pill,
  Microscope,
} from "lucide-react"

const DoctorSpecialties = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCard, setSelectedCard] = useState(null)
  const cardsPerPage = 3
  const navigate = useNavigate()

  const specialties = [
    {
      title: "Cardiologist",
      description: "Heart and cardiovascular system specialist",
      icon: Heart,
      commonTreatments: ["Heart Disease", "Blood Pressure", "Cholesterol"],
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      rating: 4.9,
      patients: "1.2k+",
      experience: "15+ years",
      availability: "Mon, Wed, Fri",
    },
    {
      title: "Neurologist",
      description: "Brain, spine, and nervous system expert",
      icon: Brain,
      commonTreatments: ["Headaches", "Seizures", "Stroke"],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      rating: 4.8,
      patients: "980+",
      experience: "12+ years",
      availability: "Tue, Thu, Sat",
    },
    {
      title: "Pediatrician",
      description: "Children's health specialist",
      icon: Baby,
      commonTreatments: ["Child Development", "Vaccinations", "Growth"],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      rating: 4.9,
      patients: "2.1k+",
      experience: "10+ years",
      availability: "Mon-Sat",
    },
    {
      title: "Ophthalmologist",
      description: "Eye and vision care specialist",
      icon: Eye,
      commonTreatments: ["Cataract", "Glaucoma", "Vision Correction"],
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      rating: 4.7,
      patients: "850+",
      experience: "8+ years",
      availability: "Mon, Wed, Thu",
    },
    {
      title: "Orthopedist",
      description: "Bone and joint specialist",
      icon: Bone,
      commonTreatments: ["Fractures", "Joint Pain", "Sports Injuries"],
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      rating: 4.8,
      patients: "1.5k+",
      experience: "14+ years",
      availability: "Tue-Sat",
    },
    {
      title: "Pulmonologist",
      description: "Respiratory system expert",
      icon: Wind,
      commonTreatments: ["Asthma", "COPD", "Sleep Apnea"],
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      rating: 4.9,
      patients: "1.1k+",
      experience: "11+ years",
      availability: "Mon-Fri",
    },
    {
      title: "Endocrinologist",
      description: "Hormone and metabolism specialist",
      icon: Activity,
      commonTreatments: ["Diabetes", "Thyroid", "Hormone Imbalance"],
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      rating: 4.8,
      patients: "950+",
      experience: "13+ years",
      availability: "Mon, Tue, Thu",
    },
    {
      title: "Dermatologist",
      description: "Skin, hair, and nail expert",
      icon: CircleDot,
      commonTreatments: ["Acne", "Skin Cancer", "Eczema"],
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      rating: 4.7,
      patients: "1.3k+",
      experience: "9+ years",
      availability: "Wed-Sat",
    },
    {
      title: "Pathologist",
      description: "Disease diagnosis specialist",
      icon: Microscope,
      commonTreatments: ["Lab Tests", "Biopsies", "Blood Analysis"],
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      rating: 4.9,
      patients: "750+",
      experience: "16+ years",
      availability: "Mon-Fri",
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + cardsPerPage >= specialties.length ? 0 : prev + cardsPerPage))
  }

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev - cardsPerPage < 0 ? Math.max(0, specialties.length - cardsPerPage) : prev - cardsPerPage,
    )
  }

  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index)
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-2xl">
      <h1 className="text-5xl font-bold mb-4 text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
        Medical Specialists
      </h1>
      <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto text-lg">
        Discover our network of specialized healthcare professionals dedicated to providing expert medical care.
      </p>

      <div className="relative max-w-6xl mx-auto px-4">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-50 transition-all duration-300"
        >
          <ChevronLeft className="w-8 h-8 text-blue-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-50 transition-all duration-300"
        >
          <ChevronRight className="w-8 h-8 text-blue-600" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * (100 / cardsPerPage)}%)` }}
          >
            {specialties.map((specialty, index) => (
              <div key={index} className="w-full min-w-[33.333%] p-4">
                <div
                  className={`bg-white border-2 ${specialty.borderColor} rounded-2xl p-6 
                    cursor-pointer transition-all duration-300 
                    ${selectedCard === index ? "shadow-2xl scale-105" : "hover:shadow-xl hover:scale-102"}
                    relative overflow-hidden`}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Card Header */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${specialty.bgColor} ${specialty.color} border-2 ${specialty.borderColor}`}
                      >
                        <specialty.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold mb-1 ${specialty.color}`}>{specialty.title}</h2>
                        <p className="text-gray-600 text-sm">{specialty.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${specialty.bgColor} flex items-center justify-center gap-1`}>
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{specialty.rating}</span>
                    </div>
                    <div className={`p-2 rounded-lg ${specialty.bgColor} flex items-center justify-center gap-1`}>
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{specialty.patients}</span>
                    </div>
                    <div className={`p-2 rounded-lg ${specialty.bgColor} flex items-center justify-center gap-1`}>
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{specialty.experience}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className={`mb-4 p-3 rounded-lg ${specialty.bgColor} flex items-center gap-2`}>
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Available: </span>
                      {specialty.availability}
                    </span>
                  </div>

                  {/* Treatments */}
                  <div
                    className={`space-y-3 transition-all duration-300 
                    ${selectedCard === index ? "max-h-96" : "max-h-20 overflow-hidden"}`}
                  >
                    <h3 className="text-sm font-semibold text-gray-700">Common Treatments</h3>
                    <div className="flex flex-wrap gap-2">
                      {specialty.commonTreatments.map((treatment, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium
                            ${specialty.color} ${specialty.bgColor} border ${specialty.borderColor}`}
                        >
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedCard === index && (
                    <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate("/appointment")}
                        className={`w-full py-2 px-4 rounded-lg font-medium
                          ${specialty.color} ${specialty.bgColor} border-2 ${specialty.borderColor}`}
                      >
                        Book Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: Math.ceil(specialties.length / cardsPerPage) }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${activeIndex / cardsPerPage === idx ? "bg-blue-600 w-6" : "bg-gray-300"}`}
              onClick={() => setActiveIndex(idx * cardsPerPage)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorSpecialties

