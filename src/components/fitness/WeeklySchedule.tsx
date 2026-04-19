"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Dumbbell, Footprints, Wind, Heart } from 'lucide-react';

interface WeeklyScheduleProps {
  goals: string[];
  age: number;
}

const WeeklySchedule = ({ goals = [], age }: WeeklyScheduleProps) => {
  // Logic to determine the primary focus
  const primaryGoal = goals[0] || "More Energy";
  
  const getPlan = () => {
    if (primaryGoal === "Muscle Gain") {
      return [
        { day: 'Monday', activity: 'Upper Body Strength', duration: '45 min', difficulty: 'Challenging', why: 'Focusing on compound movements for growth.' },
        { day: 'Tuesday', activity: 'Lower Body Strength', duration: '45 min', difficulty: 'Challenging', why: 'Building a strong foundation.' },
        { day: 'Wednesday', activity: 'Active Recovery Walk', duration: '20 min', difficulty: 'Light', why: 'Allowing muscle fibers to repair.' },
        { day: 'Thursday', activity: 'Push Day (Chest/Shoulders)', duration: '50 min', difficulty: 'Challenging', why: 'Targeting specific muscle groups.' },
        { day: 'Friday', activity: 'Pull Day (Back/Biceps)', duration: '50 min', difficulty: 'Challenging', why: 'Balanced strength development.' },
        { day: 'Saturday', activity: 'Full Body Functional', duration: '40 min', difficulty: 'Moderate', why: 'Improving overall athletic performance.' },
        { day: 'Sunday', activity: 'Rest & Mobility', duration: '15 min', difficulty: 'Rest', why: 'Essential for long-term progress.' },
      ];
    }
    
    if (primaryGoal === "Weight Management") {
      return [
        { day: 'Monday', activity: 'HIIT Cardio', duration: '30 min', difficulty: 'Challenging', why: 'Maximizing calorie burn and metabolic rate.' },
        { day: 'Tuesday', activity: 'Full Body Circuit', duration: '40 min', difficulty: 'Moderate', why: 'Building lean muscle to boost metabolism.' },
        { day: 'Wednesday', activity: 'Brisk Power Walk', duration: '45 min', difficulty: 'Moderate', why: 'Steady-state cardio for fat oxidation.' },
        { day: 'Thursday', activity: 'HIIT Cardio', duration: '30 min', difficulty: 'Challenging', why: 'Keeping the heart rate elevated.' },
        { day: 'Friday', activity: 'Strength Training', duration: '40 min', difficulty: 'Moderate', why: 'Maintaining muscle mass during weight loss.' },
        { day: 'Saturday', activity: 'Long Hike or Swim', duration: '60 min', difficulty: 'Moderate', why: 'Enjoyable, sustained movement.' },
        { day: 'Sunday', activity: 'Gentle Yoga', duration: '30 min', difficulty: 'Light', why: 'Reducing cortisol levels.' },
      ];
    }

    if (primaryGoal === "Stress Reduction" || primaryGoal === "Better Sleep") {
      return [
        { day: 'Monday', activity: 'Mindful Flow Yoga', duration: '40 min', difficulty: 'Moderate', why: 'Connecting breath with movement to calm the mind.' },
        { day: 'Tuesday', activity: 'Nature Walk', duration: '30 min', difficulty: 'Light', why: 'Lowering stress hormones through environment.' },
        { day: 'Wednesday', activity: 'Gentle Pilates', duration: '35 min', difficulty: 'Moderate', why: 'Focusing on core stability and control.' },
        { day: 'Thursday', activity: 'Restorative Stretching', duration: '25 min', difficulty: 'Light', why: 'Releasing physical tension.' },
        { day: 'Friday', activity: 'Swimming or Cycling', duration: '30 min', difficulty: 'Moderate', why: 'Rhythmic movement for mental clarity.' },
        { day: 'Saturday', activity: 'Long Nature Walk', duration: '50 min', difficulty: 'Light', why: 'Deep relaxation and grounding.' },
        { day: 'Sunday', activity: 'Meditation & Breathwork', duration: '20 min', difficulty: 'Rest', why: 'Preparing for a peaceful week ahead.' },
      ];
    }

    // Default: More Energy / General Wellness
    return [
      { day: 'Monday', activity: 'Brisk Walk + Light Strength', duration: '35 min', difficulty: 'Moderate', why: 'Building consistent energy levels.' },
      { day: 'Tuesday', activity: 'Mobility & Stretching', duration: '20 min', difficulty: 'Light', why: 'Improving blood flow and flexibility.' },
      { day: 'Wednesday', activity: 'Moderate Cardio', duration: '30 min', difficulty: 'Moderate', why: 'Boosting cardiovascular health.' },
      { day: 'Thursday', activity: 'Bodyweight Circuit', duration: '25 min', difficulty: 'Moderate', why: 'Quick, effective full-body movement.' },
      { day: 'Friday', activity: 'Brisk Walk', duration: '40 min', difficulty: 'Moderate', why: 'Sustaining momentum.' },
      { day: 'Saturday', activity: 'Active Recreation', duration: '45 min', difficulty: 'Moderate', why: 'Movement through play or exploration.' },
      { day: 'Sunday', activity: 'Rest & Reflection', duration: '0 min', difficulty: 'Rest', why: 'Recharging your batteries.' },
    ];
  };

  const schedule = getPlan();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Calendar className="w-5 h-5 text-rose-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Your {primaryGoal} Plan</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center shrink-0">
                  {item.activity.includes('Strength') || item.activity.includes('Day') ? <Dumbbell className="w-6 h-6 text-rose-500" /> : 
                   item.activity.includes('Yoga') || item.activity.includes('Breath') ? <Wind className="w-6 h-6 text-rose-500" /> :
                   <Footprints className="w-6 h-6 text-rose-500" />}
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
                <p className="text-[11px] text-slate-400 italic max-w-[200px] sm:text-right">"{item.why}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;