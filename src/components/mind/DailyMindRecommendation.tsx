"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface DailyMindRecommendationProps {
  lastMood: string;
}

const DailyMindRecommendation = ({ lastMood }: DailyMindRecommendationProps) => {
  const getRecommendation = () => {
    if (['Stressed', '😫'].includes(lastMood)) {
      return {
        title: "Time for a Gentle Reset",
        desc: "It sounds like things have been a bit heavy. Try a 2-minute 'grounding' exercise: find 5 things you can see and 4 things you can touch.",
        color: "from-rose-400 to-rose-600"
      };
    }
    if (['Tired', '😴'].includes(lastMood)) {
      return {
        title: "Rest is Productive",
        desc: "Your body is asking for a pause. Instead of pushing through, try a 10-minute power nap or simply closing your eyes for a moment.",
        color: "from-indigo-400 to-indigo-600"
      };
    }
    return {
      title: "Nurture Your Spark",
      desc: "You're in a good place! Why not share that positive energy? Send a quick 'thinking of you' text to a friend today.",
      color: "from-indigo-500 to-purple-600"
    };
  };

  const rec = getRecommendation();

  return (
    <Card className={`rounded-[2.5rem] border-none shadow-xl bg-gradient-to-br ${rec.color} text-white overflow-hidden relative group cursor-pointer`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-white/80 fill-white/20" />
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            Daily Mindful Moment
          </span>
        </div>
        <h3 className="text-2xl font-black mb-2">{rec.title}</h3>
        <p className="text-lg opacity-90 leading-relaxed mb-6">"{rec.desc}"</p>
        <div className="flex items-center text-sm font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
          Explore More <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMindRecommendation;