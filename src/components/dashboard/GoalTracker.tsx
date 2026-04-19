"use client";

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Plus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Goal {
  id: string;
  title: string;
  target_value: number;
  current_value: number;
  unit: string;
}

interface GoalTrackerProps {
  goals: Goal[];
  onAddGoal: () => void;
}

const GoalTracker = ({ goals, onAddGoal }: GoalTrackerProps) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-rose-500" /> Active Goals
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => navigate('/profile')} className="rounded-full">
          <Plus className="w-4 h-4 text-slate-400" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6 text-slate-200 dark:text-slate-700" />
            </div>
            <p className="text-sm text-slate-400 italic">No active goals yet. Ready to set one?</p>
            <Button variant="outline" onClick={() => navigate('/profile')} className="rounded-xl text-xs">Set Your First Goal</Button>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = Math.min(Math.round((goal.current_value / goal.target_value) * 100), 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{goal.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {goal.current_value} / {goal.target_value} {goal.unit}
                    </p>
                  </div>
                  <span className="text-xs font-black text-rose-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-100 dark:bg-slate-800" />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTracker;