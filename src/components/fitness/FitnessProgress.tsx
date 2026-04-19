"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp } from 'lucide-react';

interface FitnessProgressProps {
  logs: any[];
  goals: any[];
}

const FitnessProgress = ({ logs, goals }: FitnessProgressProps) => {
  const chartData = logs.slice(0, 30).reverse().map(log => ({
    name: new Date(log.date).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    steps: log.steps || 0,
    active: log.active_minutes || 0
  }));

  return (
    <div className="space-y-6">
      <Card className="rounded-[2.5rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-500" /> 30-Day Activity Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] p-0 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="steps" stroke="#fb7185" strokeWidth={3} fillOpacity={1} fill="url(#colorSteps)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.length > 0 ? goals.map((goal) => {
            const progress = Math.min(Math.round((goal.current_value / goal.target_value) * 100), 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{goal.title}</span>
                  <span className="text-xs font-black text-rose-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-100 dark:bg-slate-800" />
              </div>
            );
          }) : (
            <p className="text-sm text-slate-400 italic text-center py-4">No active goals found. Set some in your profile!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessProgress;