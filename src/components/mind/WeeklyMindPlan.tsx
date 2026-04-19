"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, PenLine, TreePine, Heart, Sparkles, Moon, Sun } from 'lucide-react';

const WeeklyMindPlan = () => {
  const schedule = [
    { day: 'Monday', activity: '5-min Box Breathing', icon: <Wind />, type: 'Calm', why: 'To center yourself for the week ahead.' },
    { day: 'Tuesday', activity: 'Gratitude Journaling', icon: <PenLine />, type: 'Reflect', why: 'Focusing on the small wins today.' },
    { day: 'Wednesday', activity: 'Short Nature Walk', icon: <TreePine />, type: 'Connect', why: 'Fresh air to clear mid-week mental fog.' },
    { day: 'Thursday', activity: 'Loving-Kindness Meditation', icon: <Heart />, type: 'Kindness', why: 'Nurturing a positive inner dialogue.' },
    { day: 'Friday', activity: 'Digital Detox (1 hour)', icon: <Sparkles />, type: 'Focus', why: 'Reclaiming your attention from screens.' },
    { day: 'Saturday', activity: 'Creative Expression', icon: <Sun />, type: 'Joy', why: 'Doing something purely for the fun of it.' },
    { day: 'Sunday', activity: 'Evening Wind-down', icon: <Moon />, type: 'Rest', why: 'Preparing your mind for deep, restorative sleep.' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Weekly Mind Plan</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center shrink-0 text-indigo-500">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 dark:text-slate-100">{item.day}</span>
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.activity}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic sm:text-right">"{item.why}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMindPlan;