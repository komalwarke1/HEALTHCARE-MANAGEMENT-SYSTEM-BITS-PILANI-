import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Avatar } from './Avatar';
import { useProfile } from '../ProfileProvider';


export const EditProfileForm = ({ onClose }) => {
  const { patientInfo, updateProfile, isLoading } = useProfile();
  const [formData, setFormData] = useState({
    fullName: '',
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

  // Initialize form with user profile data
  useEffect(() => {
    if (patientInfo) {
      setFormData({
        fullName: patientInfo.firstName+" "+patientInfo.lastName || '',
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Edit Profile</h2>
      
      <div className="flex items-center space-x-4">
        <Avatar 
          src={formData.photoURL} 
          alt="Profile Picture" 
          className="h-20 w-20 text-white" 
        />
        <div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Change Photo
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Input
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        <Select
          label="Gender"
          id="gender"
          value={formData.gender}
          onChange={handleInputChange}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <Select
          label="Blood Type"
          id="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          options={[
            { value: 'a_positive', label: 'A+' },
            { value: 'a_negative', label: 'A-' },
            { value: 'b_positive', label: 'B+' },
            { value: 'b_negative', label: 'B-' },
            { value: 'o_positive', label: 'O+' },
            { value: 'o_negative', label: 'O-' },
            { value: 'ab_positive', label: 'AB+' },
            { value: 'ab_negative', label: 'AB-' },
          ]}
        />
      </div>

      <Textarea
        label="Address"
        id="address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <Textarea
        label="Allergies"
        id="allergies"
        value={formData.allergies}
        onChange={handleInputChange}
        placeholder="List any allergies..."
      />
      <Textarea
        label="Medical History"
        id="medicalHistory"
        value={formData.medicalHistory}
        onChange={handleInputChange}
        placeholder="Brief medical history..."
      />

      <div className="flex justify-end gap-4">
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
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};