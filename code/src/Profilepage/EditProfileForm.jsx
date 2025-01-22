import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, Calendar, Heart, MapPin, AlertCircle, Activity } from 'lucide-react';
import { useProfile } from '../ProfileProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export const EditProfileForm = ({ onClose }) => {
  const { patientInfo, updateProfile, isLoading } = useProfile();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    bloodType: 'o_positive',
    address: '',
    allergies: '',
    medicalHistory: '',
    photoURL: '/placeholder.svg'
  });

  useEffect(() => {
    if (patientInfo) {
      setFormData({
        firstName: patientInfo.firstName || '',
        lastName:patientInfo.lastName||'',
        email: patientInfo.email || '',
        phone: patientInfo.phone || '',
        dateOfBirth: patientInfo.dateOfBirth || '',
        gender: patientInfo.gender || 'male',
        bloodType: patientInfo.bloodType || 'o_positive',
        address: patientInfo.address || '',
        allergies: patientInfo.allergies || '',
        medicalHistory: patientInfo.medicalHistory || '',
        photoURL: patientInfo.photoURL || '/placeholder.svg'
      });
    }
  }, [patientInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photoURL: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full mt-[550px] ">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-8">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={formData.photoURL} alt="Profile Picture" />
              <AvatarFallback>{formData.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar"
              className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white cursor-pointer shadow-lg 
                         hover:bg-blue-600 transition-all duration-300 group-hover:scale-110"
            >
              <Camera className="w-4 h-4" />
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 pt-20">
        <div className="grid gap-8">
          {/* Personal Information */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <User className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Medical Information */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Activity className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Medical Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => handleSelectChange('bloodType', value)}>
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a_positive">A+</SelectItem>
                    <SelectItem value="a_negative">A-</SelectItem>
                    <SelectItem value="b_positive">B+</SelectItem>
                    <SelectItem value="b_negative">B-</SelectItem>
                    <SelectItem value="o_positive">O+</SelectItem>
                    <SelectItem value="o_negative">O-</SelectItem>
                    <SelectItem value="ab_positive">AB+</SelectItem>
                    <SelectItem value="ab_negative">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Brief medical history..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="List any allergies..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Address</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your full address..."
                className="min-h-[100px]"
              />
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;