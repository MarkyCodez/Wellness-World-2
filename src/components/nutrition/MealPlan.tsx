"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Coffee, Sun, Moon, Info } from 'lucide-react';

const MealPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const meals = [
    { type: 'Breakfast', icon: <Coffee className="w-4 h-4" />, title: 'Berry Protein Oats', why: 'Slow-release energy to power your morning.' },
    { type: 'Lunch', icon: <Sun className="w-4 h-4" />, title: 'Mediterranean Quinoa Bowl', why: 'Balanced healthy fats and fiber for focus.' },
    { type: 'Dinner', icon: <Moon className="w-4 h-4" />, title: 'Grilled Salmon & Greens', why: 'Omega-3s to support recovery and sleep.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Utensils className="w-5 h-5 text-emerald-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Your 7-Day Meal Plan</h3>
      </div>
      
      <div className="space-y-4">
        {days.map((day) => (
          <Card key={day} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardContent className="p-6">
              <h4 className="font-black text-slate-800 dark:text-slate-100 mb-4">{day}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {meals.map((meal) => (
                  <div key={meal.type} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                        {meal.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{meal.type}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{meal.title}</p>
                    <div className="flex items-start gap-1.5">
                      <Info className="w-3 h-3 text-slate-300 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-slate-400 italic leading-tight">{meal.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;