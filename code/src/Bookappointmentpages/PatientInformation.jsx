import React from 'react';

export default function PatientInformation({ patientInfo, setPatientInfo }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-800">Patient Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {['fullName', 'email', 'phone'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('N', ' N')}
            value={patientInfo[field]}
            onChange={(e) => setPatientInfo({ ...patientInfo, [field]: e.target.value })}
            required
            className="w-full p-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        ))}
        <textarea
          placeholder="Additional Notes"
          value={patientInfo.notes}
          onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })}
          className="w-full p-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent md:col-span-2"
        />
      </div>
    </div>
  );
}