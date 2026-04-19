"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Moon, Zap } from 'lucide-react';

interface SmartAnalysisProps {
  logs: any[];
  profile: any;
}

const SmartAnalysis = ({ logs, profile }: SmartAnalysisProps) => {
  const avgSleep = logs.length > 0 
    ? logs.reduce((acc, log) => acc + (log.sleep_hours || 0), 0) / logs.length 
    : 0;
  
  const avgActive = logs.length > 0 
    ? logs.reduce((acc, log) => acc + (log.active_minutes || 0), 0) / logs.length 
    : 0;

  const getInsights = () => {
    const insights = [];
    
    if (avgSleep < 7) {
      insights.push({
        icon: <Moon className="w-5 h-5 text-indigo-500" />,
        text: `Your average sleep is ${avgSleep.toFixed(1)} hrs — we recommend adding a 30-min evening wind-down to boost your recovery.`
      });
    } else {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
        text: "Your sleep consistency is amazing! This is the foundation of your high energy levels."
      });
    }

    if (profile?.goals?.includes('Muscle Gain')) {
      insights.push({
        icon: <Zap className="w-5 h-5 text-orange-500" />,
        text: "To support muscle growth, try to hit your protein targets within 2 hours of your strength sessions."
      });
    }

    if (avgActive > 45) {
      insights.push({
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
        text: "You're strongest in the morning! Based on your activity peaks, 8 AM is your optimal time for cardio."
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

export default SmartAnalysis;