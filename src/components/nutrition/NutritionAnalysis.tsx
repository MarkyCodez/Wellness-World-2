"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Apple, Scale, TrendingUp } from 'lucide-react';

interface NutritionAnalysisProps {
  logs: any[];
  profile: any;
}

const NutritionAnalysis = ({ logs, profile }: NutritionAnalysisProps) => {
  const getInsights = () => {
    const insights = [];
    const goals = profile?.goals || [];
    const primaryGoal = goals[0] || "More Energy";
    const recentLogsCount = logs.length;

    // Goal-specific insights
    if (primaryGoal === "Muscle Gain") {
      insights.push({
        icon: <Zap className="w-5 h-5 text-amber-500" />,
        text: "To support your muscle-building goal, we've increased protein density in your plan. Focus on those post-workout meals!"
      });
    } else if (primaryGoal === "Weight Management") {
      insights.push({
        icon: <Scale className="w-5 h-5 text-emerald-500" />,
        text: "We've prioritized high-volume, low-calorie foods today to keep you satisfied while reaching your weight goals."
      });
    }

    // Behavioral insights based on logs
    if (recentLogsCount < 3) {
      insights.push({
        icon: <Apple className="w-5 h-5 text-rose-500" />,
        text: "Logging your meals helps us understand your energy patterns better. Try to log your next snack!"
      });
    } else {
      insights.push({
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
        text: "Great job logging consistently! Your data shows you're building a mindful relationship with food."
      });
    }

    if (goals.includes('More Energy')) {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
        text: "Based on your energy goals, we've added more complex carbs in the morning to prevent mid-day slumps."
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

export default NutritionAnalysis;