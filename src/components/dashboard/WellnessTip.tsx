"use client";

import React from 'react';
import { Lightbulb } from 'lucide-react';

const tips = [
  "Drinking a glass of water first thing in the morning jumpstarts your metabolism!",
  "A 10-minute walk after lunch can significantly improve your digestion.",
  "Try the 4-7-8 breathing technique for a quick stress reset.",
  "Consistency is better than intensity. Small steps lead to big changes!",
  "Your body is your home. Treat it with kindness today."
];

const WellnessTip = () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 items-start">
      <div className="p-2 bg-amber-100 rounded-full shrink-0">
        <Lightbulb className="w-4 h-4 text-amber-600" />
      </div>
      <div>
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Daily Wellness Tip</p>
        <p className="text-sm text-amber-900/80 leading-relaxed">{tip}</p>
      </div>
    </div>
  );
};

export default WellnessTip;