"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ChefHat, ArrowRight } from 'lucide-react';

interface MealSuggestionsProps {
  goals: string[];
}

const MealSuggestions = ({ goals = [] }: MealSuggestionsProps) => {
  const getSuggestions = () => {
    const suggestions = [];
    
    if (goals.includes('Muscle Gain')) {
      suggestions.push({
        title: "Protein Power Bowl",
        desc: "Quinoa, grilled chicken, and roasted broccoli.",
        tag: "High Protein"
      });
    }
    
    if (goals.includes('Weight Management') || goals.includes('Better Sleep')) {
      suggestions.push({
        title: "Zesty Salmon Salad",
        desc: "Fresh greens with omega-3 rich salmon and lemon.",
        tag: "Light & Fresh"
      });
    }

    if (goals.includes('More Energy')) {
      suggestions.push({
        title: "Berry Energy Oats",
        desc: "Slow-release carbs with antioxidant-rich berries.",
        tag: "Sustained Energy"
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        title: "Rainbow Veggie Wrap",
        desc: "A colorful mix of veggies with hummus.",
        tag: "Balanced"
      });
    }

    return suggestions;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <ChefHat className="w-5 h-5 text-emerald-500" />
        <h3 className="font-bold text-slate-800">Suggestions for You</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getSuggestions().map((meal, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">
                  {meal.tag}
                </span>
                <Sparkles className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{meal.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{meal.desc}</p>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-500 group-hover:translate-x-1 transition-transform">
                View Recipe <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;