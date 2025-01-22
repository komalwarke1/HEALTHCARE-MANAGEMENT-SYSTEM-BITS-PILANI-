import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
import { Languages, Heart, Plus, X, Upload } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProfileTab({ profile, isEditing, handleChange, setProfile }) {
  const [newLanguage, setNewLanguage] = useState('')
  const [newSpecialty, setNewSpecialty] = useState('')

  const EditableText = ({ value, onChange, name, className = "" }) => {
    return isEditing ? (
      <Input
        value={value}
        onChange={onChange}
        name={name}
        className={`mt-0 ${className}`}
      />
    ) : (
      <span className={className}>{value}</span>
    )
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }))
      setNewLanguage('')
    }
  }

  const removeLanguage = (lang) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }))
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialties.includes(newSpecialty.trim())) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (specialty) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="border-green-100">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.fullName} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-xl font-semibold">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            {isEditing && (
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                <Upload className="w-4 h-4 text-green-600" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <EditableText
                value={profile.fullName}
                onChange={handleChange}
                name="fullName"
                className="text-2xl text-green-900 font-bold"
              />
              <EditableText
                value={profile.title}
                onChange={handleChange}
                name="title"
                className="bg-green-100  text-green-700 px-2 py-1 rounded-full text-sm"
              />
            </div>
            <Textarea
              className="mt-2"
              placeholder="Add a professional bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Languages
            </h3>
            <div className="flex gap-2 flex-wrap">
              <AnimatePresence>
                {profile.languages.map(lang => (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative"
                  >
                    <Badge variant="secondary" className="pr-8">
                      {lang}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang)}
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add language"
                    className="w-32"
                  />
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Specialties
            </h3>
            <div className="flex gap-2 flex-wrap">
              <AnimatePresence>
                {profile.specialties.map(specialty => (
                  <motion.div
                    key={specialty}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative"
                  >
                    <Badge variant="secondary" className="pr-8">
                      {specialty}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSpecialty(specialty)}
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add specialty"
                    className="w-32"
                  />
                  <Button type="button" onClick={addSpecialty} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

