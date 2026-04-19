"use client";

import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', steps: 4000 },
  { name: 'Tue', steps: 3000 },
  { name: 'Wed', steps: 2000 },
  { name: 'Thu', steps: 2780 },
  { name: 'Fri', steps: 1890 },
  { name: 'Sat', steps: 2390 },
  { name: 'Sun', steps: 3490 },
];

const TrendChart = () => {
  return (
    <div className="w-full h-[300px] bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Weekly Activity</h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 rounded-full bg-rose-400" /> Steps
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: 'var(--card)',
              color: 'var(--card-foreground)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="steps" 
            stroke="#fb7185" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSteps)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;