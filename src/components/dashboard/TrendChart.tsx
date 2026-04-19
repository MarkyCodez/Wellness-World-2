"use client";

import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', steps: 8400, sleep: 7.5, active: 45 },
  { name: 'Tue', steps: 9200, sleep: 8.0, active: 50 },
  { name: 'Wed', steps: 7800, sleep: 6.5, active: 30 },
  { name: 'Thu', steps: 10500, sleep: 7.2, active: 65 },
  { name: 'Fri', steps: 11200, sleep: 8.2, active: 70 },
  { name: 'Sat', steps: 6500, sleep: 9.0, active: 20 },
  { name: 'Sun', steps: 8900, sleep: 7.8, active: 40 },
];

const TrendChart = () => {
  return (
    <div className="w-full h-[350px] bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Weekly Activity</h3>
          <p className="text-xs text-slate-400 font-medium">Your movement trends over the last 7 days</p>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-rose-400" /> Steps
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-amber-400" /> Active
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
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              padding: '12px 16px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="steps" 
            stroke="#fb7185" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorSteps)" 
          />
          <Area 
            type="monotone" 
            dataKey="active" 
            stroke="#fbbf24" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorActive)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;