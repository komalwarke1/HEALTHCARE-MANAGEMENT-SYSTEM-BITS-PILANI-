import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Avatar } from './Avatar';

export const EditProfileForm = ({ onClose }) => {
  const [avatar, setAvatar] = useState('/placeholder.svg');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Edit Profile</h2>
      <div className="flex items-center space-x-4">
        <Avatar src={avatar} alt="Profile Picture" className="h-20 w-20 text-white" />
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
        <Input label="Full Name" id="fullName" defaultValue="Vedant Bulbule" />
        <Input label="Email" id="email" type="email" defaultValue="VedantBulbule@example.com" />
        <Input label="Phone Number" id="phone" type="tel" defaultValue="+91 91309 12390" />
        <Input label="Date of Birth" id="dateOfBirth" type="date" defaultValue="2004-05-15" />
        <Select
          label="Gender"
          id="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          defaultValue="male"
        />
        <Select
          label="Blood Type"
          id="bloodType"
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
          defaultValue="o_positive"
        />
      </div>
      <Textarea
        label="Address"
        id="address"
        defaultValue="123 Medical Center Drive, Healthcare City, HC 12345"
      />
      <Textarea
        label="Allergies"
        id="allergies"
        placeholder="List any allergies..."
        defaultValue="Penicillin"
      />
      <Textarea
        label="Medical History"
        id="medicalHistory"
        placeholder="Brief medical history..."
      />
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

