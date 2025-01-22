import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Search, Loader2, RefreshCw, History, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft,Dumbbell } from 'lucide-react';

const DAILY_VALUES = {
  calories: 2000,
  fat: 65,
  carbs: 300,
  protein: 50,
  fiber: 28
};

// Color palette
const COLORS = {
  primary: 'from-emerald-500 to-green-600',
  secondary: 'bg-emerald-100',
  accent: 'text-emerald-600',
  pieColors: ['#059669', '#10B981', '#34D399', '#6EE7B7']
};

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Nutritionix API Configuration
const NUTRITIONIX_APP_ID = '635ab679';
const NUTRITIONIX_APP_KEY = '8d2dfa81c9dec8f791e851b0463bd26b	';
const API_BASE_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const NutritionDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedView, setSelectedView] = useState('nutrition');
  const [compareItem, setCompareItem] = useState(null);
  const queryClient = useQueryClient();
  const handleBack = () => {
    window.history.back();
  };

  const fetchNutritionData = async () => {
    if (!searchTerm) return null;
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_APP_KEY,
      },
      body: JSON.stringify({
        query: searchTerm,
        timezone: "US/Eastern",
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nutrition data');
    }
    
    const data = await response.json();
    const food = data.foods[0];
    
    const processedData = {
      name: food.food_name,
      servingSize: `${food.serving_weight_grams}g (${food.serving_unit})`,
      calories: Math.round(food.nf_calories),
      fat: Math.round(food.nf_total_fat),
      carbs: Math.round(food.nf_total_carbohydrate),
      protein: Math.round(food.nf_protein),
      fiber: Math.round(food.nf_dietary_fiber),
      sugar: Math.round(food.nf_sugars),
      sodium: Math.round(food.nf_sodium),
      cholesterol: Math.round(food.nf_cholesterol),
      potassium: Math.round(food.nf_potassium),
      // Additional Nutritionix-specific data
      servingUnit: food.serving_unit,
      servingQty: food.serving_qty,
      brandName: food.brand_name,
      thumbUrl: food.photo.thumb,
    };

    setSearchHistory(prev => {
      const newHistory = [processedData, ...prev].slice(0, 5);
      return newHistory;
    });

    return processedData;
  };


  const { data: nutritionData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['nutrition', searchTerm],
    queryFn: fetchNutritionData,
    enabled: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const calculatePercentage = (value, nutrient) => {
    return (value / DAILY_VALUES[nutrient]) * 100;
  };

  const getProgressColor = (percentage) => {
    if (percentage <= 33) return "bg-green-500";
    if (percentage <= 66) return "bg-yellow-500";
    return "bg-red-500";
  };

  const renderPieChart = (nutritionData) => {
    const macroData = [
      { name: 'Protein', value: nutritionData.protein * 4 }, // 4 calories per gram
      { name: 'Carbs', value: nutritionData.carbs * 4 }, // 4 calories per gram
      { name: 'Fat', value: nutritionData.fat * 9 }, // 9 calories per gram
    ];

    return (
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {macroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS.pieColors[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${Math.round(value)} kcal`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderNutrientBar = (label, value, key, unit = 'g') => {
    const percentage = key in DAILY_VALUES ? calculatePercentage(value, key) : 0;
    
    return (
      <motion.div 
        className="bg-emerald-50 p-4 rounded-lg hover:shadow-md transition-shadow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            {label}
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-emerald-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Daily Value: {DAILY_VALUES[key] || 'Not available'}{unit}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-600">
              {value}{unit}
            </span>
            {percentage > 0 && (
              <Badge variant={percentage > 100 ? "destructive" : "secondary"}>
                {percentage.toFixed(1)}%
              </Badge>
            )}
          </div>
        </div>
        {percentage > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <Progress 
              value={percentage}
              className="h-2.5 bg-emerald-200"
              indicatorClassName="bg-emerald-500"
            />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full mx-auto">
      
    <AnimatePresence>
      <motion.div 
        className="flex flex-col gap-4"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          {/* Back Button - Now part of hero section */}
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="text-white hover:text-white hover:bg-purple-700/50 mt-6 text-lg group transition-colors duration-200"
            size="lg"
          >
            <ArrowLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
          
          <div className="flex items-center space-x-4 mb-6 mt-8">
            <Dumbbell className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Nutrition Tracker</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl pb-16">
          Monitor your nutrition intake and get personalized insights for a balanced diet
          </p>
        </div>
      </div>
        {/* Search Bar */}
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search food (e.g., chicken breast)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-emerald-200 focus:ring-emerald-500"
              />
              <Button 
                type="submit"
                disabled={isLoading || !searchTerm}
                className={`bg-gradient-to-r ${COLORS.primary} hover:opacity-90`}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <History className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Search History</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setSearchTerm(item.name);
                          refetch();
                        }}
                      >
                        {item.name} - {item.calories} kcal
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                type="button"
                variant="outline"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['nutrition'] })}
                title="Clear cache and refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              {error?.message || 'An error occurred while fetching nutrition data'}
            </AlertDescription>
          </Alert>
        )}

        {/* View Toggle */}
        {nutritionData && (
          <div className="flex gap-2">
            <Button
              variant={selectedView === 'nutrition' ? 'default' : 'outline'}
              onClick={() => setSelectedView('nutrition')}
              
            >
              Nutrition View
            </Button>
            <Button
              variant={selectedView === 'comparison' ? 'default' : 'outline'}
              onClick={() => setSelectedView('comparison')}
            >
              Compare View
            </Button>
          </div>
        )}

        {/* Main Content */}
        {nutritionData && (
          <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          >
          <Card className="bg-white shadow-lg rounded-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {nutritionData.thumbUrl ? (
                    <img 
                      src={nutritionData.thumbUrl} 
                      alt={nutritionData.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <Utensils className="w-8 h-8" />
                  )}
                  <div>
                    <CardTitle className="text-xl capitalize">
                      {nutritionData.name}
                      {nutritionData.brandName && (
                        <span className="text-sm ml-2">by {nutritionData.brandName}</span>
                      )}
                    </CardTitle>
                    <p className="text-sm opacity-90">
                      Serving: {nutritionData.servingQty} {nutritionData.servingUnit} ({nutritionData.servingSize})
                    </p>
                  </div>
                </div>
                {selectedView === 'comparison' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
                        Select Item to Compare
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Item to Compare</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {searchHistory.map((item, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              setCompareItem(item);
                              setSelectedView('comparison');
                            }}
                          >
                            {item.name} - {item.calories} kcal
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                  {/* Pie Chart */}
                  {renderPieChart(nutritionData)}
            
            
              {/* Calories */}
              {renderNutrientBar('Calories', nutritionData.calories, 'calories', 'kcal')}

              {/* Macronutrients */}
              <div className="space-y-4">
                {[
                  { label: 'Fat', key: 'fat' },
                  { label: 'Carbohydrates', key: 'carbs' },
                  { label: 'Protein', key: 'protein' },
                  { label: 'Fiber', key: 'fiber' }
                ].map(({ label, key }) => renderNutrientBar(label, nutritionData[key], key))}
              </div>

              {/* Additional Nutrients */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                {[
                  { label: 'Sodium', value: nutritionData.sodium, unit: 'mg' },
                  { label: 'Sugar', value: nutritionData.sugar, unit: 'g' },
                  { label: 'Cholesterol', value: nutritionData.cholesterol, unit: 'mg' },
                  { label: 'Potassium', value: nutritionData.potassium, unit: 'mg' }
                ].map(({ label, value, unit }) => (
                  <div key={label} className=" bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                    <span className="text-sm text-gray-500 block mb-1">{label}</span>
                    <p className="font-bold  text-emerald-600">{value}{unit}</p>
                  </div>
                ))}
              </div>

              {/* Comparison View */}
              {selectedView === 'comparison' && compareItem && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Comparison with {compareItem.name}</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Calories', key: 'calories', unit: 'kcal' },
                      { label: 'Fat', key: 'fat', unit: 'g' },
                      { label: 'Carbs', key: 'carbs', unit: 'g' },
                      { label: 'Protein', key: 'protein', unit: 'g' },
                      { label: 'Fiber', key: 'fiber', unit: 'g' }
                    ].map(({ label, key, unit }) => {
                      const diff = nutritionData[key] - compareItem[key];
                      const percentDiff = ((diff / compareItem[key]) * 100).toFixed(1);
                      
                      return (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{label}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">{compareItem[key]}{unit}</span>
                              <span className="font-bold">→</span>
                              <span className="text-green-600">{nutritionData[key]}{unit}</span>
                              <Badge variant={diff > 0 ? "destructive" : "secondary"}>
                                {diff > 0 ? '+' : ''}{percentDiff}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          </motion.div>
        )}
        </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default NutritionDisplay;