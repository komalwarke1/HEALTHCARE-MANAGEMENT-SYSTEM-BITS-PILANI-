import React from 'react';
import { Card } from './Card';
import { User, Calendar, Phone, MapPin, Mail, Droplet, Heart } from 'lucide-react';

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
  name,
  age,
  gender,
  birthdate,
  phoneNumber,
  address,
  email,
  bloodType,
 
}) => (
  <Card className="w-full max-w-2xl">
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center">
        <User className="mr-2" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem icon={<User />} label="Name" value={name} />
        <InfoItem icon={<Calendar />} label="Age" value={`${age} years`} />
        <InfoItem icon={<User />} label="Gender" value={gender} />
        <InfoItem icon={<Calendar />} label="DOB" value={birthdate} />
        <InfoItem icon={<Phone />} label="Phone" value={phoneNumber} />
        <InfoItem icon={<MapPin />} label="Address" value={address} />
        <InfoItem icon={<Mail />} label="Email" value={email} />
        <InfoItem icon={<Droplet className="text-red-500" />} label="Blood Type" value={bloodType} />
        
      </div>
    </div>
  </Card>
);

