"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, Moon, Sun } from 'lucide-react';

interface MindAnalysisProps {
  logs: any[];
}

const MindAnalysis = ({ logs }: MindAnalysisProps) => {
  const getInsights = () => {
    const insights = [];
    const recentLogs = logs.slice(0, 7);
    
    const avgSleep = recentLogs.reduce((acc, log) => acc + (log.sleep_hours || 0), 0) / (recentLogs.length || 1);
    const goodMoodDays = recentLogs.filter(log => ['Great', 'Happy', '🤩', '😊'].includes(log.mood)).length;
    const activeDays = recentLogs.filter(log => (log.active_minutes || 0) > 30).length;

    if (goodMoodDays >= 4) {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
        text: "You've been in a great headspace lately! Your consistency with self-care is really paying off."
      });
    }

    if (avgSleep < 7) {
      insights.push({
        icon: <Moon className="w-5 h-5 text-indigo-500" />,
        text: "We noticed a slight dip in sleep. Prioritizing rest tonight could really help your mental clarity tomorrow."
      });
    }

    if (activeDays >= 3 && goodMoodDays >= 3) {
      insights.push({
        icon: <Sun className="w-5 h-5 text-rose-500" />,
        text: "Your mood seems to lift on days you're active. That movement is doing wonders for your mind!"
      });
    }

    if (insights.length === 0) {
      insights.push({
        icon: <Heart className="w-5 h-5 text-rose-500" />,
        text: "Every day is a fresh start. Let's focus on one small mindful moment today to ground yourself."
      });
    }

    return insights;
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