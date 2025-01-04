import React, { useState } from "react";
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    Stethoscope,
    Brain,
    Shield,
    MessageCircle,
    Check,
    X,
    Video,
    UserPlus,
    Heart,
    TreesIcon as Lungs,
    BrainIcon,
    Smile,
    Eye,
    Phone,
    Mail,
    Star
} from "lucide-react";

const AppointmentScheduler = ({ onDoctorSelect }) => {
    const [step, setStep] = useState(1);
    const [appointmentType, setAppointmentType] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
    });
    const appointmentTypes = [
        {
            id: "in-person",
            name: "In-Person Consultation",
            icon: <MapPin className="mr-2 w-6 h-6 text-blue-600" />,
            description: "Traditional face-to-face medical consultation",
        },
        {
            id: "virtual",
            name: "Virtual Consultation",
            icon: <Video className="mr-2 w-6 h-6 text-green-600" />,
            description: "Online medical consultation via video call",
        },
    ];

    const services = [
        {
            id: "general",
            name: "General Consultation",
            icon: <Stethoscope className="mr-2 w-6 h-6 text-blue-500" />,
            description: "Comprehensive health check and primary care",
            doctors: [
                { 
                    name: "Dr. Priya Sharma", 
                    location: { lat: 12.9716, lng: 77.5946 }, 
                    address: "123 Indiranagar, Bangalore, Karnataka 560038",
                    contact: "+91 98765 43210",
                    email: "priya.sharma@healthclinic.in",
                    rating: 4.7,
                    specialties: ["Family Medicine", "Preventive Care"]
                },
                { 
                    name: "Dr. Rajesh Patel", 
                    location: { lat: 19.0760, lng: 72.8777 }, 
                    address: "456 Bandra West, Mumbai, Maharashtra 400050",
                    contact: "+91 99099 88776",
                    email: "rajesh.patel@healthclinic.in",
                    rating: 4.5,
                    specialties: ["Internal Medicine", "Chronic Disease Management"]
                },
            ],
        },
        {
            id: "cardiology",
            name: "Cardiology",
            icon: <Heart className="mr-2 w-6 h-6 text-red-500" />,
            description: "Heart health and cardiovascular treatments",
            doctors: [
                { 
                    name: "Dr. Anjali Desai", 
                    location: { lat: 23.0225, lng: 72.5714 }, 
                    address: "789 Satellite, Ahmedabad, Gujarat 380015",
                    contact: "+91 90123 45678",
                    email: "anjali.desai@heartcenter.in",
                    rating: 4.8,
                    specialties: ["Interventional Cardiology", "Preventive Cardiology"]
                },
                { 
                    name: "Dr. Sanjay Gupta", 
                    location: { lat: 28.6139, lng: 77.2090 }, 
                    address: "101 Connaught Place, New Delhi, Delhi 110001",
                    contact: "+91 81234 56789",
                    email: "sanjay.gupta@heartcenter.in",
                    rating: 4.6,
                    specialties: ["Cardiac Electrophysiology", "Heart Failure"]
                },
            ],
        },
        {
            id: "neurology",
            name: "Neurology",
            icon: <BrainIcon className="mr-2 w-6 h-6 text-purple-500" />,
            description: "Neurological disorders and brain health",
            doctors: [
                { 
                    name: "Dr. Neha Iyer", 
                    location: { lat: 13.0827, lng: 80.2707 }, 
                    address: "246 Adyar, Chennai, Tamil Nadu 600020",
                    contact: "+91 94567 89012",
                    email: "neha.iyer@neuroclinic.in",
                    rating: 4.9,
                    specialties: ["Stroke Neurology", "Epilepsy"]
                },
                { 
                    name: "Dr. Vikram Mehta", 
                    location: { lat: 26.9124, lng: 75.7873 }, 
                    address: "567 Malviya Nagar, Jaipur, Rajasthan 302017",
                    contact: "+91 87654 32109",
                    email: "vikram.mehta@neuroclinic.in",
                    rating: 4.7,
                    specialties: ["Neurodegenerative Disorders", "Movement Disorders"]
                },
            ],
        },
        {
            id: "pulmonology",
            name: "Pulmonology",
            icon: <Lungs className="mr-2 w-6 h-6 text-green-700" />,
            description: "Respiratory system and lung health",
            doctors: [
                { 
                    name: "Dr. Kavita Khanna", 
                    location: { lat: 30.9010, lng: 75.8573 }, 
                    address: "890 Model Town, Ludhiana, Punjab 141002",
                    contact: "+91 70123 45678",
                    email: "kavita.khanna@lungcenter.in",
                    rating: 4.6,
                    specialties: ["Respiratory Diseases", "Sleep Medicine"]
                },
                { 
                    name: "Dr. Arun Chopra", 
                    location: { lat: 22.5726, lng: 88.3639 }, 
                    address: "321 Salt Lake, Kolkata, West Bengal 700091",
                    contact: "+91 98765 43211",
                    email: "arun.chopra@lungcenter.in",
                    rating: 4.5,
                    specialties: ["Asthma", "Pulmonary Rehabilitation"]
                },
            ],
        },
        {
            id: "psychiatry",
            name: "Psychiatry",
            icon: <Brain className="mr-2 w-6 h-6 text-indigo-600" />,
            description: "Mental health and psychological wellness",
            doctors: [
                { 
                    name: "Dr. Divya Menon", 
                    location: { lat: 10.0026, lng: 76.3044 }, 
                    address: "654 Marine Drive, Kochi, Kerala 682016",
                    contact: "+91 80987 65432",
                    email: "divya.menon@mentalwellness.in",
                    rating: 4.8,
                    specialties: ["Cognitive Behavioral Therapy", "Anxiety Disorders"]
                },
                { 
                    name: "Dr. Rohan Kapoor", 
                    location: { lat: 31.6340, lng: 74.8723 }, 
                    address: "987 Civil Lines, Jalandhar, Punjab 144001",
                    contact: "+91 90876 54321",
                    email: "rohan.kapoor@mentalwellness.in",
                    rating: 4.7,
                    specialties: ["Depression", "Relationship Counseling"]
                },
            ],
        },
        {
            id: "dentistry",
            name: "Dental Care",
            icon: <Smile className="mr-2 w-6 h-6 text-teal-500" />,
            description: "Dental health and oral treatments",
            doctors: [
                { 
                    name: "Dr. Mahesh Rao", 
                    location: { lat: 15.4909, lng: 73.8278 }, 
                    address: "210 Panaji, Goa 403001",
                    contact: "+91 75123 45678",
                    email: "mahesh.rao@dentalcare.in",
                    rating: 4.7,
                    specialties: ["Cosmetic Dentistry", "Orthodontics"]
                },
                { 
                    name: "Dr. Deepa Reddy", 
                    location: { lat: 17.3850, lng: 78.4867 }, 
                    address: "543 Banjara Hills, Hyderabad, Telangana 500034",
                    contact: "+91 93456 78901",
                    email: "deepa.reddy@dentalcare.in",
                    rating: 4.6,
                    specialties: ["Periodontics", "Dental Implants"]
                },
            ],
        },
        {
            id: "ophthalmology",
            name: "Eye Care",
            icon: <Eye className="mr-2 w-6 h-6 text-amber-600" />,
            description: "Vision and eye health consultations",
            doctors: [
                { 
                    name: "Dr. Amrita Joshi", 
                    location: { lat: 18.5204, lng: 73.8567 }, 
                    address: "876 Pune Camp, Pune, Maharashtra 411001",
                    contact: "+91 82345 67890",
                    email: "amrita.joshi@eyeclinic.in",
                    rating: 4.9,
                    specialties: ["Cornea", "Refractive Surgery"]
                },
                { 
                    name: "Dr. Karthik Nadar", 
                    location: { lat: 19.0760, lng: 72.8777 }, 
                    address: "432 Andheri West, Mumbai, Maharashtra 400058",
                    contact: "+91 97654 32109",
                    email: "karthik.nadar@eyeclinic.in",
                    rating: 4.7,
                    specialties: ["Glaucoma", "Pediatric Ophthalmology"]
                },
            ],
        },
    ];

    const availableTimes = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
    ];

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            appointmentType,
            service: selectedService,
            doctor: selectedDoctor,
            date: selectedDate,
            time: selectedTime,
            patientDetails,
        });
        alert("Appointment Scheduled Successfully!");
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="w-full">
                        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
                            Select Consultation Type
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {appointmentTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => {
                                        setAppointmentType(type.id);
                                        handleNextStep();
                                    }}
                                    className={`flex items-center p-6 border-2 rounded-xl shadow-md transition-all duration-300 w-full
                    ${appointmentType === type.id
                                            ? "bg-blue-100 border-blue-500 scale-105"
                                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                                        }`}
                                >
                                    {type.icon}
                                    <div className="text-left">
                                        <h3 className="font-semibold text-lg">{type.name}</h3>
                                        <p className="text-sm text-gray-600">{type.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-full space-y-6">
                        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
                            Choose Medical Service
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => {
                                        setSelectedService(service.id);
                                        handleNextStep();
                                    }}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl shadow-md transition-all duration-300 text-center w-full
                    ${selectedService === service.id
                                            ? "bg-blue-100 border-blue-500 scale-105"
                                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                                        }`}
                                >
                                    {service.icon}
                                    <div>
                                        <h3 className="font-semibold mt-2">{service.name}</h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {service.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handlePreviousStep}
                                className="text-orange-500 hover:bg-blue-50 px-4 py-2 rounded"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                );
                case 3:
                    return (
                        <div className="w-full space-y-6">
                            <h2 className="text-2xl font-bold text-orange-500">Select Doctor</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {services
                                    .find((s) => s.id === selectedService)
                                    ?.doctors.map((doctor) => (
                                        <button
                                            key={doctor.name}
                                            onClick={() => {
                                                setSelectedDoctor(doctor);
                                                handleNextStep();
                                            }}
                                            className={`flex items-center p-4 border rounded-lg w-full 
                              ${selectedDoctor === doctor
                                                ? "bg-blue-100 border-blue-500"
                                                : "hover:bg-gray-100"
                                            }`}
                                        >
                                            <div className="flex items-center w-full">
                                                <UserPlus className="mr-4 w-6 h-6 text-blue-500" />
                                                <div className="text-left flex-grow">
                                                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                                        {doctor.rating} | {selectedService} Specialist
                                                    </div>
                                                    <div className="mt-2 text-xs text-gray-500">
                                                        <p className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1" /> 
                                                            {doctor.address}
                                                        </p>
                                                        <p className="flex items-center mt-1">
                                                            <Phone className="w-4 h-4 mr-1" /> 
                                                            {doctor.contact}
                                                        </p>
                                                        <p className="flex items-center mt-1">
                                                            <Mail className="w-4 h-4 mr-1" /> 
                                                            {doctor.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handlePreviousStep}
                                    className="text-orange-500 hover:bg-blue-50 px-4 py-2 rounded"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    );
            case 4:
                return (
                    <div className="w-full space-y-6">
                        <h2 className="text-2xl font-bold text-orange-500">
                            Choose Date & Time
                        </h2>
                        <div>
                            <label className="block mb-2">Select Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-2 border rounded"
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Select Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setSelectedTime(time);
                                            handleNextStep();
                                        }}
                                        className={`p-2 border rounded flex items-center justify-center w-full
                      ${selectedTime === time
                                                ? "bg-blue-100 border-blue-500"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <Clock className="mr-2 w-4 h-4" />
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePreviousStep}
                                className="text-orange-500 hover:bg-blue-50 px-4 py-2 rounded"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="w-full space-y-6">
                        <h2 className="text-2xl font-bold text-orange-500">
                            Patient Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={patientDetails.name}
                                onChange={(e) =>
                                    setPatientDetails({ ...patientDetails, name: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={patientDetails.email}
                                onChange={(e) =>
                                    setPatientDetails({
                                        ...patientDetails,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={patientDetails.phone}
                                onChange={(e) =>
                                    setPatientDetails({
                                        ...patientDetails,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={patientDetails.age}
                                    onChange={(e) =>
                                        setPatientDetails({
                                            ...patientDetails,
                                            age: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <select
                                    value={patientDetails.gender}
                                    onChange={(e) =>
                                        setPatientDetails({
                                            ...patientDetails,
                                            gender: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-700 flex items-center justify-center"
                            >
                                <Check className="mr-2 w-5 h-5" />
                                Confirm Appointment
                            </button>
                        </form>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePreviousStep}
                                className="text-orange-500 hover:bg-blue-50 px-4 py-2 rounded flex items-center"
                            >
                                <X className="mr-2 w-5 h-5" />
                                Back
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 transition-all duration-300 ease-in-out">
                <div className="min-h-[400px] flex flex-col justify-center">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default AppointmentScheduler;