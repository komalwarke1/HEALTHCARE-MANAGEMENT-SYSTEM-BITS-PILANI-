// Sample patient profiles data
const patientProfiles = [
    {
      name: "Sarah Mitchell",
      age: 32,
      birthdate: "1992-05-15",
      address: "123 Maple Street, Suite 4B, Portland, OR 97201",
      phone: "(503) 555-0123",
      email: "sarah.mitchell@email.com",
      primaryCare: "Dr. Jessica Wong",
      insuranceProvider: "Blue Cross Blue Shield",
      allergies: [
        "Penicillin",
        "Peanuts",
        "Latex"
      ],
      medicalHistory: [
        {
          condition: "Asthma",
          year: "2010"
        },
        {
          condition: "Migraine",
          year: "2018"
        },
        {
          condition: "Seasonal Allergies",
          year: "2015"
        }
      ],
      profileImage: null
    },
    {
      name: "David Chen",
      age: 45,
      birthdate: "1979-09-23",
      address: "456 Oak Avenue, Apt 7C, Seattle, WA 98101",
      phone: "(206) 555-4567",
      email: "david.chen@email.com",
      primaryCare: "Dr. Michael Stevens",
      insuranceProvider: "Kaiser Permanente",
      allergies: [
        "Sulfa Drugs",
        "Shellfish"
      ],
      medicalHistory: [
        {
          condition: "Hypertension",
          year: "2016"
        },
        {
          condition: "Type 2 Diabetes",
          year: "2019"
        }
      ],
      profileImage: null
    },
    {
      name: "Maria Garcia",
      age: 28,
      birthdate: "1996-12-03",
      address: "789 Pine Lane, San Francisco, CA 94107",
      phone: "(415) 555-7890",
      email: "maria.garcia@email.com",
      primaryCare: "Dr. Sarah Johnson",
      insuranceProvider: "Aetna",
      allergies: [],
      medicalHistory: [
        {
          condition: "Anxiety",
          year: "2020"
        }
      ],
      profileImage: null
    }
  ];
  
  // Example usage of a single profile
  const samplePatient = patientProfiles[0];
  
  // Helper function to get a random patient
  const getRandomPatient = () => {
    const randomIndex = Math.floor(Math.random() * patientProfiles.length);
    return patientProfiles[randomIndex];
  };
  
  // Usage example:
//   const ExampleUsage = () => {
//     return (
//       <PatientProfile {...samplePatient} />
//     );
//   };
  
  export { patientProfiles, samplePatient, getRandomPatient };