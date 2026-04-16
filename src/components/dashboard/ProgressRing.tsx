"use client";

import React from 'react';

interface ProgressRingProps {
  value: number;
  target: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  unit: string;
}

const ProgressRing = ({ value, target, label, icon, color, unit }: ProgressRingProps) => {
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <div className="p-2 rounded-full bg-slate-50 mb-1">
            {icon}
          </div>
          <span className="text-xl font-bold text-slate-800">{value.toLocaleString()}</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{unit}</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-slate-700">{label}</h3>
        <p className="text-xs text-slate-400 mt-1">Goal: {target.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProgressRing;