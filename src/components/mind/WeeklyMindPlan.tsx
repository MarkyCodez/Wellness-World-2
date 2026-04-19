"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, PenLine, TreePine, Heart, Sparkles, Moon, Sun, Coffee } from 'lucide-react';

interface WeeklyMindPlanProps {
  goals: string[];
}

const WeeklyMindPlan = ({ goals = [] }: WeeklyMindPlanProps) => {
  const primaryGoal = goals[0] || "More Energy";

  const getSchedule = () => {
    if (primaryGoal === "Stress Reduction" || primaryGoal === "Better Sleep") {
      return [
        { day: 'Monday', activity: '5-min Box Breathing', icon: <Wind />, type: 'Calm', why: 'To lower cortisol levels after the weekend.' },
        { day: 'Tuesday', activity: 'Gratitude Journaling', icon: <PenLine />, type: 'Reflect', why: 'Shifting focus to what is going well.' },
        { day: 'Wednesday', activity: 'Evening Digital Detox', icon: <Moon />, type: 'Rest', why: 'Preparing your brain for deeper sleep cycles.' },
        { day: 'Thursday', activity: 'Short Nature Walk', icon: <TreePine />, type: 'Connect', why: 'Grounding your nervous system in nature.' },
        { day: 'Friday', activity: 'Loving-Kindness Meditation', icon: <Heart />, type: 'Kindness', why: 'Reducing self-criticism and building warmth.' },
        { day: 'Saturday', activity: 'Creative Play', icon: <Sun />, type: 'Joy', why: 'Releasing tension through unstructured fun.' },
        { day: 'Sunday', activity: 'Mindful Tea Ritual', icon: <Coffee />, type: 'Presence', why: 'Slowing down to appreciate the small things.' },
      ];
    }
    
    // Default: Energy / General Wellness
    return [
      { day: 'Monday', activity: 'Morning Intention Setting', icon: <Sparkles />, type: 'Focus', why: 'Aligning your energy with your weekly goals.' },
      { day: 'Tuesday', activity: 'Brisk Mindful Walk', icon: <TreePine />, type: 'Energy', why: 'Combining movement with mental presence.' },
      { day: 'Wednesday', activity: 'Mid-week Gratitude', icon: <PenLine />, type: 'Reflect', why: 'Boosting mood during the mid-week slump.' },
      { day: 'Thursday', activity: 'Power Breathing', icon: <Wind />, type: 'Vitality', why: 'Oxygenating your body for a mental boost.' },
      { day: 'Friday', activity: 'Social Connection', icon: <Heart />, type: 'Connect', why: 'Nurturing the relationships that fuel you.' },
      { day: 'Saturday', activity: 'Outdoor Exploration', icon: <Sun />, type: 'Adventure', why: 'Expanding your horizons and perspective.' },
      { day: 'Sunday', activity: 'Restorative Rest', icon: <Moon />, type: 'Recharge', why: 'Ensuring you start the new week fully charged.' },
    ];
  };

  const schedule = getSchedule();

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