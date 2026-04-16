"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Moon, Target, Sparkles } from 'lucide-react';

const AppPreferences = () => {
  return (
    <Card className="rounded-[2rem] border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl">
              <Moon className="w-4 h-4 text-slate-500" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-sm font-bold text-slate-700">Dark Mode</Label>
              <p className="text-[10px] text-slate-400">Easier on the eyes at night</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 rounded-xl">
              <Bell className="w-4 h-4 text-rose-500" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-sm font-bold text-slate-700">Daily Reminders</Label>
              <p className="text-[10px] text-slate-400">Gentle nudges to stay active</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-sm font-bold text-slate-700">Goal Celebrations</Label>
              <p className="text-[10px] text-slate-400">Confetti when you hit targets</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-sm font-bold text-slate-700">Coaching Insights</Label>
              <p className="text-[10px] text-slate-400">Personalized health tips</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppPreferences;