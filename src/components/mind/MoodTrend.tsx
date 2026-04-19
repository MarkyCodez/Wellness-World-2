"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface MoodTrendProps {
  logs: any[];
}

const MoodTrend = ({ logs }: MoodTrendProps) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const moodMap: Record<string, string> = {
    'Great': '🤩',
    'Happy': '😊',
    'Neutral': '😐',
    'Tired': '😴',
    'Stressed': '😫',
    '🤩': '🤩',
    '😊': '😊',
    '😐': '😐',
    '😴': '😴',
    '😫': '😫'
  };

  return (
    <Card className="rounded-[2.5rem] border-none shadow-sm bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" /> 7-Day Mood Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end h-24 px-2">
          {last7Days.map((date) => {
            const log = logs.find(l => l.date === date);
            const mood = log?.mood;
            const emoji = mood ? (moodMap[mood] || '❓') : '⚪';
            
            return (
              <div key={date} className="flex flex-col items-center gap-2">
                <span className="text-2xl animate-in zoom-in duration-500">{emoji}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {new Date(date).toLocaleDateString([], { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTrend;