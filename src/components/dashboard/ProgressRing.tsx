"use client";

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ProgressRingProps {
  value: number;
  target: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  unit: string;
}

const ProgressRing = ({ value, target, label, icon, color, unit }: ProgressRingProps) => {
  const [offset, setOffset] = useState(0);
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);

    if (percentage >= 100 && value > 0) {
      // Subtle celebration
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: [color, '#ffffff'],
        disableForReducedMotion: true
      });
    }
  }, [percentage, circumference, color, value]);

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300 group">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-50 dark:text-slate-800"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset, 
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center transition-transform group-hover:scale-110">
          <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 mb-1">
            {icon}
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{value.toLocaleString()}</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{unit}</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-bold text-slate-700 dark:text-slate-200">{label}</h3>
        <div className="flex items-center gap-1 mt-1">
          <div className="h-1 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000" 
              style={{ width: `${percentage}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-medium">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressRing;