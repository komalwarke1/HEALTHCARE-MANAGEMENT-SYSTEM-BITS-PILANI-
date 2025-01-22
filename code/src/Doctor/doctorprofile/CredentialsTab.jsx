import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { GraduationCap } from 'lucide-react'

export default function CredentialsTab({ profile, isEditing, handleChange }) {
  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <GraduationCap className="w-5 h-5" />
          Education and Certifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            label="Education"
            name="education"
            value={profile.education}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your educational background"
          />
          <Input
            label="Years of Experience"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Years of experience"
          />
          <Textarea
            label="Certifications"
            name="certifications"
            value={profile.certifications}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your certifications"
          />
        </div>
      </CardContent>
    </Card>
  )
}