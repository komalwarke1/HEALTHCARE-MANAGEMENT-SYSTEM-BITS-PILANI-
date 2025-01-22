import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, Dumbbell, Utensils, Activity, ArrowRight, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WellnessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Air Quality Monitor",
      description: "Track real-time air quality and pollution levels in your area for better environmental awareness",
      gradient: "from-green-500 to-green-600",
      href: "/weather"
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index instantly and track your progress over time",
      gradient: "from-yellow-500 to-orange-600",
      href: "/bmi"
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Fitness Guide",
      description: "Access comprehensive exercise library and personalized workouts tailored to your goals",
      gradient: "from-blue-500 to-blue-600",
      href: "/gymguide"
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Nutrition Tracker",
      description: "Monitor your nutrition intake and get personalized insights for a balanced diet",
      gradient: "from-purple-500 to-purple-600",
      href: "/nutrition"
    }
  ];

  const handleExplore = (href) => {
    navigate(`${href}`);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-blue-200 to-green-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Activity className="h-16 w-16 text-blue-500 mx-auto mb-6 animate-pulse" />
            <div className="absolute inset-0 bg-blue-500 opacity-25 rounded-full blur animate-ping" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-500 hover:tracking-wider">
            Wellness Hub
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 mx-auto mb-6 animate-gradient" />
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Take control of your well-being with our comprehensive wellness tracking tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-0">
                <div
                  className={`
                    relative p-8
                    bg-gradient-to-br ${feature.gradient}
                    transition-all duration-300 ease-in-out
                  `}
                >
                  <div className="mb-6 text-white transition-transform duration-300 ease-in-out transform hover:scale-110">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className={`
                    text-white/90 transition-opacity duration-300 mb-6
                    ${hoveredIndex === index ? 'opacity-100' : 'opacity-85'}
                  `}>
                    {feature.description}
                  </p>

                  <Button
                    onClick={() => handleExplore(feature.href)}
                    className={`
                      w-full bg-white/20 text-white hover:bg-white/30
                      transition-all duration-300 group
                    `}
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <div className={`
                    absolute bottom-0 left-0 right-0 h-1 bg-white/20
                    transform origin-left transition-transform duration-300
                    ${hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'}
                  `} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default WellnessSection;