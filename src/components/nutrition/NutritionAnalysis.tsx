"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Apple, Scale } from 'lucide-react';

interface NutritionAnalysisProps {
  logs: any[];
  profile: any;
}

const NutritionAnalysis = ({ logs, profile }: NutritionAnalysisProps) => {
  const getInsights = () => {
    const insights = [];
    const goals = profile?.goals || [];
    const recentLogsCount = logs.length;

    if (recentLogsCount < 5) {
      insights.push({
        icon: <Apple className="w-5 h-5 text-emerald-500" />,
        text: "Logging more consistently helps us tailor your plan. Try to log at least 3 items today!"
      });
    }

    if (goals.includes('Muscle Gain')) {
      insights.push({
        icon: <Zap className="w-5 h-5 text-amber-500" />,
        text: "To support muscle growth, focus on high-quality protein sources like Greek yogurt or lentils today."
      });
    }

    if (goals.includes('More Energy')) {
      insights.push({
        icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
        text: "Your energy levels thrive on complex carbs. Consider oats or quinoa for your next meal."
      });
    }

    if (insights.length === 0) {
      insights.push({
        icon: <Scale className="w-5 h-5 text-emerald-500" />,
        text: "You're doing a great job maintaining balance! Keep focusing on whole, unprocessed foods."
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