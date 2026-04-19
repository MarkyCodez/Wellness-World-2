"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Dumbbell, Footprints } from 'lucide-react';

interface WeeklyScheduleProps {
  goals: string[];
}

const WeeklySchedule = ({ goals }: WeeklyScheduleProps) => {
  const schedule = [
    { day: 'Monday', activity: 'Brisk Walk + Strength', duration: '45 min', difficulty: 'Moderate', why: 'To kickstart your metabolism for the week.' },
    { day: 'Tuesday', activity: 'Yoga & Mobility', duration: '30 min', difficulty: 'Light', why: 'Focusing on recovery after Monday\'s effort.' },
    { day: 'Wednesday', activity: 'HIIT Session', duration: '25 min', difficulty: 'Challenging', why: 'Perfect for cardiovascular health and energy.' },
    { day: 'Thursday', activity: 'Active Recovery Walk', duration: '20 min', difficulty: 'Light', why: 'Keeping the momentum without overtraining.' },
    { day: 'Friday', activity: 'Full Body Strength', duration: '50 min', difficulty: 'Moderate', why: 'Building functional strength for daily life.' },
    { day: 'Saturday', activity: 'Outdoor Adventure', duration: '60 min', difficulty: 'Moderate', why: 'Connecting with nature while staying active.' },
    { day: 'Sunday', activity: 'Rest & Reflection', duration: '0 min', difficulty: 'Rest', why: 'Allowing your body to rebuild and recharge.' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Calendar className="w-5 h-5 text-rose-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Weekly Plan</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center shrink-0">
                  {item.activity.includes('Strength') ? <Dumbbell className="w-6 h-6 text-rose-500" /> : <Footprints className="w-6 h-6 text-rose-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 dark:text-slate-100">{item.day}</span>
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {item.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.activity}</p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock className="w-3 h-3" /> {item.duration}
                </div>
                <p className="text-[11px] text-slate-400 italic">"{item.why}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;