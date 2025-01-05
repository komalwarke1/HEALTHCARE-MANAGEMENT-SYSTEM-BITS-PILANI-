import React, { useState } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Heart, 
  Stethoscope, ClipboardList, Hospital, AlertCircle,
  Calendar, User, Phone, MapPin, Activity
} from 'lucide-react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import react-toastify

const Createacc = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const required = ['firstName', 'lastName', 'dateOfBirth', 'phone', 'email', 
                     'address', 'password', 'confirmPassword'];
    
    required.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { email, password, firstName, lastName, dateOfBirth, gender, phone, address, bloodGroup } = formData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          phone,
          address,
          bloodGroup,
        });
        console.log("Data saved to Firestore"); // Add this line for debugging
        // navigate("/login"); // Redirect to profile page
      }
      console.log("Account created successfully");
      toast.success("Account created successfully , Now LOGIN", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const renderField = (name, label, type = 'text', icon, placeholder) => (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-3 text-orange-400">{icon}</span>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 h-12 bg-white border border-orange-200 text-gray-800 
                   placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 
                   focus:ring-orange-400 rounded-lg outline-none"
        />
      </div>
      {errors[name] && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm bg-red-50 p-2 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white border rounded-lg shadow-lg">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2">
                <Hospital className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-orange-600">Patient Portal</h1>
                <Stethoscope className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 font-medium">
                <ClipboardList className="w-4 h-4 text-orange-400" />
                Create your Account
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('firstName', 'First Name', 'text', <User className="h-5 w-5" />, 'First Name')}
              {renderField('lastName', 'Last Name', 'text', <User className="h-5 w-5" />, 'Last Name')}
              {renderField('dateOfBirth', 'Date of Birth', 'date', <Calendar className="h-5 w-5" />)}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-3 h-12 bg-white border border-orange-200 text-gray-800 
                         focus:border-orange-400 focus:ring-1 focus:ring-orange-400 rounded-lg outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {renderField('phone', 'Phone Number', 'tel', <Phone className="h-5 w-5" />, '+91 XXXXXXXXX')}
              {renderField('email', 'Email Address', 'email', <Mail className="h-5 w-5" />, 'name@example.com')}
              {renderField('address', 'Address', 'text', <MapPin className="h-5 w-5" />, '123 Street Name, City, State')}
              {renderField('bloodGroup', 'Blood Group', 'text', <Activity className="h-5 w-5" />, 'Blood group')}
              {renderField('password', 'Password', showPassword ? 'text' : 'password', 
                <Lock className="h-5 w-5" />, 'Create a secure password')}
              {renderField('confirmPassword', 'Confirm Password', showConfirmPassword ? 'text' : 'password', 
                <Lock className="h-5 w-5" />, 'Confirm your password')}

              <button
                type="submit"
                className="md:col-span-2 w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 
                         hover:from-orange-500 hover:to-orange-600 text-white font-medium rounded-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-orange-500 hover:text-orange-600">
                  Login in
                </a>
              </p>
              <p className="mt-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-orange-400" />
                Your health journey starts here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createacc;
