"use client";

import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  count: number;
}

const StreakCounter = ({ count }: StreakCounterProps) => {
  return (
    <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
      <Flame className={`w-5 h-5 ${count > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-slate-300'}`} />
      <span className="font-bold text-orange-700">{count} Day Streak</span>
    </div>
  );
};

export default StreakCounter;