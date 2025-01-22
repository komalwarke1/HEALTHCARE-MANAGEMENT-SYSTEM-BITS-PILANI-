import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Switch } from './components/ui/switch'
import { MapPin } from 'lucide-react'

export default function PracticeInfoTab({ profile, isEditing, handleChange, handleToggle }) {
  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <MapPin className="w-5 h-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Email"
            />
            <Input
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Phone"
            />
          </div>
          <Input
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Address"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Work Days"
              name="workDays"
              value={profile.workDays}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Work Days"
            />
            <Input
              label="Work Hours"
              name="workHours"
              value={profile.workHours}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Work Hours"
            />
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}