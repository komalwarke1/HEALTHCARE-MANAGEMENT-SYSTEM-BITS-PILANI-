import React, { useState } from 'react'
import { Button } from './doctorprofile/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './doctorprofile/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { Alert, AlertDescription } from './doctorprofile/components/ui/alert'
import ProfileTab from './doctorprofile/ProfileTab'
import CredentialsTab from './doctorprofile/CredentialsTab'
import PracticeInfoTab from './doctorprofile/PracticeInfoTab'
import RatingsTab from './doctorprofile/RatingsTab'

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    fullName: 'Dr. John Smith',
    title: 'Cardiologist',
    education: 'MD from Harvard Medical School',
    experience: '15 years',
    certifications: 'Board Certified in Cardiology',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Medical Center Dr, Anytown, USA 12345',
    workDays: 'Monday - Friday',
    workHours: '9:00 AM - 5:00 PM',
    bio: 'Dr. John Doe is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in preventive cardiology and heart failure management.',
    languages: ['English', 'Spanish', 'French'],
    insurances: ['Medicare', 'Blue Cross', 'Aetna', 'UnitedHealth'],
    specialties: ['General Cardiology', 'Interventional Cardiology', 'Heart Failure'],
    acceptingNewPatients: true,
    telemedicineAvailable: true,
    ratings: {
      overall: 4.8,
      totalReviews: 256,
      categories: {
        bedside: 4.9,
        waitTime: 4.6,
        availability: 4.7
      }
    },
    avatar: null
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = (name) => {
    setProfile(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile updated:', profile)
    setIsEditing(false)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatePresence>
          {showSuccessAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Profile updated successfully!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-green-500">Doctor Profile</h1>
            <p className="text-green-600 mt-1">Manage your professional information</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="profile">
              <motion.div {...fadeInUp}>
                <ProfileTab 
                  profile={profile} 
                  isEditing={isEditing} 
                  handleChange={handleChange}
                  setProfile={setProfile}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="credentials">
              <motion.div {...fadeInUp}>
                <CredentialsTab 
                  profile={profile} 
                  isEditing={isEditing} 
                  handleChange={handleChange}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="practice">
              <motion.div {...fadeInUp}>
                <PracticeInfoTab 
                  profile={profile} 
                  isEditing={isEditing} 
                  handleChange={handleChange}
                  handleToggle={handleToggle}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="ratings">
              <motion.div {...fadeInUp}>
                <RatingsTab profile={profile} />
              </motion.div>
            </TabsContent>

            {isEditing && (
              <motion.div 
                className="flex justify-end gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button type="submit" className="w-32 bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </motion.div>
            )}
          </form>
        </Tabs>
      </div>
    </div>
  )
}