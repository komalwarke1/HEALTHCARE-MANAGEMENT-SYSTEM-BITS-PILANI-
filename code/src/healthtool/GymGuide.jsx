import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search, Dumbbell, Heart, BookmarkPlus, Share2, ChevronRight,ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises/target';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4cb45ffce6msh1664c118326faa3p144f5ajsn35e16e077ea7',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

const MUSCLE_TARGETS = [
  { value: 'abductors', label: 'Abductors' },
  { value: 'abs', label: 'Abs' },
  { value: 'adductors', label: 'Adductors' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'calves', label: 'Calves' },
  { value: 'cardiovascular system', label: 'Cardiovascular System' },
  { value: 'delts', label: 'Deltoids' },
  { value: 'forearms', label: 'Forearms' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'hamstrings', label: 'Hamstrings' },
  { value: 'lats', label: 'Latissimus Dorsi' },
  { value: 'levator scapulae', label: 'Levator Scapulae' },
  { value: 'pectorals', label: 'Pectorals' },
  { value: 'quads', label: 'Quadriceps' },
  { value: 'serratus anterior', label: 'Serratus Anterior' },
  { value: 'spine', label: 'Spine' },
  { value: 'traps', label: 'Trapezius' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'upper back', label: 'Upper Back' }
];

const GymGuidePage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetMuscle, setTargetMuscle] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (targetMuscle) {
      loadExercises(targetMuscle);
    }
  }, [targetMuscle]);

  useEffect(() => {
    filterExercises();
  }, [searchQuery, exercises]);

  const loadExercises = async (target) => {
    setLoading(true);
    try {
      const response = await fetch(`${EXERCISE_API_URL}/${target}`, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch exercises');
      const data = await response.json();
      setExercises(data);
      setError(null);
    } catch (err) {
      setError('Failed to load exercises. Please try again later.');
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    if (!searchQuery) {
      setFilteredExercises(exercises);
      return;
    }
    const filtered = exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const toggleFavorite = (exerciseId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(exerciseId)) {
        newFavorites.delete(exerciseId);
      } else {
        newFavorites.add(exerciseId);
      }
      return newFavorites;
    });
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          {/* Back Button - Now part of hero section */}
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="text-white hover:text-white hover:bg-blue-700/50 mt-6 text-lg group transition-colors duration-200"
            size="lg"
          >
            <ArrowLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
          
          <div className="flex items-center space-x-4 mb-6 mt-8">
            <Dumbbell className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Exercise Library</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl pb-16">
            Discover professional exercises, detailed instructions, and build your perfect workout routine
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={targetMuscle}
                onValueChange={setTargetMuscle}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select muscle group" />
                </SelectTrigger>
                <SelectContent>
                  {MUSCLE_TARGETS.map(target => (
                    <SelectItem key={target.value} value={target.value}>
                      {target.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search exercises or equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="w-full max-w-md mx-auto bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="text-center text-red-500">{error}</div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!targetMuscle && !loading && (
          <Card className="text-center py-12 bg-white/50">
            <CardContent>
              <Dumbbell className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-600">Ready to start?</h2>
              <p className="text-gray-500 mt-2">Select a muscle group to explore exercises</p>
            </CardContent>
          </Card>
        )}

        {/* Exercise Grid */}
        {!loading && !error && targetMuscle && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(filteredExercises.length > 0 ? filteredExercises : exercises).map((exercise) => (
              <Card key={exercise.id} className="group hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(exercise.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 transition-colors ${favorites.has(exercise.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </Button>
                  </div>
                  <img 
                    src={exercise.gifUrl} 
                    alt={exercise.name}
                    className="w-full h-48 object-cover rounded-t-lg transform transition-transform group-hover:scale-105"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold capitalize">{exercise.name}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                      {exercise.equipment}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm capitalize">
                      {exercise.target}
                    </span>
                  </div>

                  {exercise.instructions && (
                    <div className="pt-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Instructions</h4>
                      <ul className="space-y-2">
                        {exercise.instructions.slice(0, 2).map((instruction, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-start">
                            <ChevronRight className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-blue-500" />
                            {instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GymGuidePage;