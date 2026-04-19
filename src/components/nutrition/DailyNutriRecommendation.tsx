"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';

interface DailyNutriRecommendationProps {
  profile: any;
}

const DailyNutriRecommendation = ({ profile }: DailyNutriRecommendationProps) => {
  const getRecommendation = () => {
    const goals = profile?.goals || [];
    
    if (goals.includes('Weight Management')) {
      return {
        title: "Hydration First",
        desc: "Try drinking a glass of water 15 minutes before your next meal to support digestion and satiety.",
        color: "from-emerald-500 to-teal-600"
      };
    }
    
    return {
      title: "Leafy Green Boost",
      desc: "Add a handful of spinach or kale to your next meal. It's a simple way to boost your micronutrient intake!",
      color: "from-emerald-500 to-emerald-700"
    };
  };

  const rec = getRecommendation();

  return (
    <Card className={`rounded-[2.5rem] border-none shadow-xl bg-gradient-to-br ${rec.color} text-white overflow-hidden relative group cursor-pointer`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-200" />
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            Today's Top Suggestion
          </span>
        </div>
        <h3 className="text-2xl font-black mb-2">{rec.title}</h3>
        <p className="text-lg opacity-90 leading-relaxed mb-6">"{rec.desc}"</p>
        <div className="flex items-center text-sm font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
          See More Tips <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyNutriRecommendation;