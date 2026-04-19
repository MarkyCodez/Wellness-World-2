"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Moon, Zap, Target } from 'lucide-react';

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
    const primaryGoal = profile?.goals?.[0] || "More Energy";
    
    // Goal-specific behavioral insight
    if (primaryGoal === "Muscle Gain" && avgSleep < 7.5) {
      insights.push({
        icon: <Target className="w-5 h-5 text-rose-500" />,
        text: `Since you're building muscle, your ${avgSleep.toFixed(1)}h sleep average is a bit low for optimal recovery. Aim for 8h to see faster results!`
      });
    } else if (primaryGoal === "Weight Management" && avgActive < 30) {
      insights.push({
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
        text: "To reach your weight goals, we recommend increasing your daily active minutes. Even 10 more minutes makes a huge difference!"
      });
    }

    // General behavioral insights
    if (avgSleep < 6.5) {
      insights.push({
        icon: <Moon className="w-5 h-5 text-indigo-500" />,
        text: "Your sleep has been a bit inconsistent lately. A regular bedtime could boost your workout energy by 20%."
      });
    }

    if (avgActive > 45) {
      insights.push({
        icon: <Zap className="w-5 h-5 text-amber-500" />,
        text: "You're crushing your activity targets! Your body is strongest in the morning—that's your peak performance window."
      });
    }

    if (insights.length === 0) {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
        text: "You're maintaining a great balance! Your current activity and sleep levels are perfectly supporting your wellness journey."
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