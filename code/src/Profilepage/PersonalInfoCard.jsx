import React from 'react';
import { Card } from './Card';
import { User, Calendar, Phone, MapPin, Mail, Droplet, Heart } from 'lucide-react';

// Age calculator function
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return '';
  
  const dob = new Date(dateOfBirth);
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export const PersonalInfoCard = ({
  lastName,
  firstName,
  gender,
  dateOfBirth,
  phone,
  address,
  email,
  bloodGroup,
}) => {
  // Calculate age from dateOfBirth
  const age = calculateAge(dateOfBirth);
  
  // Format date of birth for display
  const formatDateOfBirth = (dob) => {
    if (!dob) return '';
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center">
          <User className="mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem 
            icon={<User />} 
            label="Name" 
            value={`${firstName} ${lastName}`} 
          />
          <InfoItem 
            icon={<Calendar />} 
            label="Age" 
            value={age ? `${age} years` : 'Not available'} 
          />
          <InfoItem 
            icon={<User />} 
            label="Gender" 
            value={gender} 
          />
          <InfoItem 
            icon={<Calendar />} 
            label="DOB" 
            value={formatDateOfBirth(dateOfBirth)} 
          />
          <InfoItem 
            icon={<Phone />} 
            label="Phone" 
            value={phone || 'Not provided'} 
          />
          <InfoItem 
            icon={<MapPin />} 
            label="Address" 
            value={address || 'Not provided'} 
          />
          <InfoItem 
            icon={<Mail />} 
            label="Email" 
            value={email || 'Not provided'} 
          />
          <InfoItem 
            icon={<Droplet className="text-red-500" />} 
            label="Blood Type" 
            value={bloodGroup || 'Not provided'} 
          />
        </div>
      </div>
    </Card>
  );
};