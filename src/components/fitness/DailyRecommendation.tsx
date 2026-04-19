"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Info } from 'lucide-react';

interface DailyRecommendationProps {
  lastLog: any;
}

const DailyRecommendation = ({ lastLog }: DailyRecommendationProps) => {
  const getRecommendation = () => {
    if (!lastLog) return {
      title: "Start Fresh Today",
      desc: "A 10-minute walk is the perfect way to begin your wellness journey.",
      type: "Action"
    };

    if (lastLog.sleep_hours < 6) return {
      title: "Focus on Active Recovery",
      desc: "Your sleep was a bit low. Today, swap high-intensity for a gentle walk or stretching.",
      type: "Recovery"
    };

    if (lastLog.steps > 12000) return {
      title: "Incredible Movement!",
      desc: "You crushed your steps yesterday. Today, focus on mobility to keep your joints happy.",
      type: "Mobility"
    };

    return {
      title: "Keep the Momentum",
      desc: "You're doing great! Try to hit your active minutes goal before 6 PM for better sleep.",
      type: "Consistency"
    };
  };

  const rec = getRecommendation();

  return (
    <Card className="rounded-[2.5rem] border-none shadow-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white overflow-hidden relative group cursor-pointer">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            Daily Recommendation
          </span>
        </div>
        <h3 className="text-2xl font-black mb-2">{rec.title}</h3>
        <p className="text-lg opacity-90 leading-relaxed mb-6">"{rec.desc}"</p>
        <div className="flex items-center text-sm font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
          Learn Why <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyRecommendation;