import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Star } from 'lucide-react'

export default function RatingsTab({ profile }) {
  return (
    <Card className="border-indigo-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Star className="w-5 h-5 text-yellow-400" />
          Ratings & Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{profile.ratings.overall}</div>
              <div className="text-sm text-gray-500">Overall Rating</div>
            </div>
            <div className="flex-1">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(profile.ratings.overall)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Based on {profile.ratings.totalReviews} reviews
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.entries(profile.ratings.categories).map(([category, rating]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{category}</span>
                  <span className="font-medium">{rating}/5</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-300"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}