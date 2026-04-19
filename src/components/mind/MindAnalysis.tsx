"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, Moon, Sun } from 'lucide-react';

interface MindAnalysisProps {
  logs: any[];
  profile: any;
}

const MindAnalysis = ({ logs, profile }: MindAnalysisProps) => {
  const getInsights = () => {
    const insights = [];
    const recentLogs = logs.slice(0, 7);
    if (recentLogs.length === 0) return [{
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      text: "Welcome to your mind sanctuary! Start logging your mood to see personalized patterns here."
    }];
    
    const avgSleep = recentLogs.reduce((acc, log) => acc + (log.sleep_hours || 0), 0) / recentLogs.length;
    const goodMoodDays = recentLogs.filter(log => ['Great', 'Happy', '🤩', '😊'].includes(log.mood)).length;
    const activeDays = recentLogs.filter(log => (log.active_minutes || 0) > 30).length;
    const highStepDays = recentLogs.filter(log => (log.steps || 0) > 8000).length;

    // Pattern recognition: Mood vs Activity
    if (highStepDays >= 3 && goodMoodDays >= 3) {
      insights.push({
        icon: <Sun className="w-5 h-5 text-rose-500" />,
        text: "We've noticed your mood is consistently brighter on days you hit 8k+ steps. That movement is your natural mood booster!"
      });
    }

    // Pattern recognition: Mood vs Sleep
    if (avgSleep < 6.5 && goodMoodDays < 3) {
      insights.push({
        icon: <Moon className="w-5 h-5 text-indigo-500" />,
        text: "Your recent mood dip seems to follow a few shorter nights of sleep. Prioritizing rest tonight could be a game-changer for your clarity."
      });
    }

    // Goal-specific insight
    if (profile?.goals?.includes('Stress Reduction')) {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
        text: "Since your goal is stress reduction, your consistency with mindful moments is building a great foundation for resilience."
      });
    }

    if (insights.length === 0) {
      insights.push({
        icon: <Heart className="w-5 h-5 text-rose-500" />,
        text: "You're doing a great job showing up for yourself. Every mindful breath you take today is a win for your future self."
      });
    }

    return insights.slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {getInsights().map((insight, i) => (
        <Card key={i} className="rounded-3xl border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden group">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
              {insight.icon}
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              {insight.text}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MindAnalysis;