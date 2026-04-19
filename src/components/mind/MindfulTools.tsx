"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Wind, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const MindfulTools = () => {
  const [gratitude, setGratitude] = useState('');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathStep, setBreathStep] = useState('Ready?');

  const handleGratitudeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitude.trim()) return;
    showSuccess("That's a beautiful thing to be grateful for!");
    setGratitude('');
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathStep('Inhale...');
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count % 2 === 0) setBreathStep('Inhale...');
      else setBreathStep('Exhale...');
      
      if (count >= 6) {
        clearInterval(interval);
        setIsBreathing(false);
        setBreathStep('Ready?');
        showSuccess("You've taken a moment for yourself. Well done.");
      }
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Gratitude Journal */}
      <Card className="rounded-[2.5rem] border-none shadow-sm bg-rose-50/50 dark:bg-rose-900/10">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-rose-900 dark:text-rose-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Daily Gratitude
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGratitudeSubmit} className="space-y-4">
            <p className="text-sm text-rose-800/80 dark:text-rose-200/80">What's one thing you're grateful for today?</p>
            <div className="flex gap-2">
              <Input 
                placeholder="I'm grateful for..." 
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                className="rounded-xl border-rose-100 dark:border-rose-800 bg-white dark:bg-slate-900"
              />
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl">
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Breathing Exercise */}
      <Card className="rounded-[2.5rem] border-none shadow-sm bg-indigo-50/50 dark:bg-indigo-900/10 overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <div className={`w-32 h-32 rounded-full bg-indigo-500/20 flex items-center justify-center transition-all duration-[4000ms] ${isBreathing ? 'scale-150' : 'scale-100'}`}>
            <Wind className={`w-12 h-12 text-indigo-500 ${isBreathing ? 'animate-pulse' : ''}`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Mindful Breathing</h3>
            <p className="text-sm text-indigo-800/80 dark:text-indigo-200/80">A quick 1-minute reset for your nervous system.</p>
          </div>
          <Button 
            onClick={startBreathing} 
            disabled={isBreathing}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-8 py-6 font-bold"
          >
            {isBreathing ? breathStep : 'Start Breathing'}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Digital Detox", desc: "Put your phone away for 15 mins.", icon: CheckCircle2, color: "text-emerald-500" },
          { title: "Hydration Hit", desc: "Drink a full glass of water now.", icon: CheckCircle2, color: "text-blue-500" }
        ].map((win, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <win.icon className={`w-5 h-5 ${win.color} shrink-0 mt-1`} />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{win.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{win.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindfulTools;