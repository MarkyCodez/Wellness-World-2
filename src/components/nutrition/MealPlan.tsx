"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, Coffee, Sun, Moon, Apple, Info, Check, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface MealPlanProps {
  profile: any;
  onLogSuccess: () => void;
}

const MealPlan = ({ profile, onLogSuccess }: MealPlanProps) => {
  const [loggingId, setLoggingId] = useState<string | null>(null);
  const primaryGoal = profile?.goals?.[0] || "More Energy";
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const getMealsForGoal = () => {
    if (primaryGoal === "Muscle Gain") {
      return [
        { type: 'Breakfast', icon: <Coffee className="w-4 h-4" />, title: 'Greek Yogurt & Nut Granola', why: 'High protein and healthy fats to kickstart muscle synthesis.' },
        { type: 'Lunch', icon: <Sun className="w-4 h-4" />, title: 'Grilled Chicken & Quinoa Bowl', why: 'Complex carbs and lean protein for sustained recovery.' },
        { type: 'Dinner', icon: <Moon className="w-4 h-4" />, title: 'Steak with Sweet Potato', why: 'Iron and dense calories to support overnight repair.' },
        { type: 'Snack', icon: <Apple className="w-4 h-4" />, title: 'Protein Shake & Almonds', why: 'Quick amino acid boost between meals.' },
      ];
    }
    if (primaryGoal === "Weight Management") {
      return [
        { type: 'Breakfast', icon: <Coffee className="w-4 h-4" />, title: 'Spinach & Feta Omelette', why: 'High satiety protein to keep you full until lunch.' },
        { type: 'Lunch', icon: <Sun className="w-4 h-4" />, title: 'Zesty Tuna Salad Wrap', why: 'Low calorie density with high fiber for volume.' },
        { type: 'Dinner', icon: <Moon className="w-4 h-4" />, title: 'Baked Cod & Asparagus', why: 'Light, lean protein that is easy on digestion.' },
        { type: 'Snack', icon: <Apple className="w-4 h-4" />, title: 'Apple Slices with Cinnamon', why: 'Natural sweetness with fiber to curb cravings.' },
      ];
    }
    // Default: More Energy / General Wellness
    return [
      { type: 'Breakfast', icon: <Coffee className="w-4 h-4" />, title: 'Overnight Berry Oats', why: 'Slow-release energy to power your entire morning.' },
      { type: 'Lunch', icon: <Sun className="w-4 h-4" />, title: 'Mediterranean Chickpea Salad', why: 'Balanced macros to prevent the afternoon slump.' },
      { type: 'Dinner', icon: <Moon className="w-4 h-4" />, title: 'Lentil Soup & Whole Grain Bread', why: 'Fiber-rich and comforting for better sleep quality.' },
      { type: 'Snack', icon: <Apple className="w-4 h-4" />, title: 'Hummus & Carrot Sticks', why: 'Crunchy, satisfying, and nutrient-dense.' },
    ];
  };

  const meals = getMealsForGoal();

  const handleLogMeal = async (mealTitle: string, mealType: string, id: string) => {
    setLoggingId(id);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('nutrition_logs').insert({
        user_id: user.id,
        food_item: mealTitle,
        meal_type: mealType.toLowerCase()
      });

      if (error) throw error;

      showSuccess(`Logged ${mealTitle}! Your body is thanking you.`);
      onLogSuccess();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoggingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Utensils className="w-5 h-5 text-emerald-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Your 7-Day {primaryGoal} Plan</h3>
      </div>
      
      <div className="space-y-8">
        {days.map((day) => (
          <div key={day} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
              <h4 className="font-black text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest">{day}</h4>
              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meals.map((meal, idx) => {
                const uniqueId = `${day}-${meal.type}-${idx}`;
                return (
                  <Card key={uniqueId} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                            {meal.icon}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{meal.type}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleLogMeal(meal.title, meal.type, uniqueId)}
                          disabled={loggingId === uniqueId}
                        >
                          {loggingId === uniqueId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
                          Log Meal
                        </Button>
                      </div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{meal.title}</h5>
                      <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                        <Info className="w-3 h-3 text-slate-300 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed">
                          {meal.why}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;