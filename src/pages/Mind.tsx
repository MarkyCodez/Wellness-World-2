"use client";

import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import MindfulTools from '../components/mind/MindfulTools';
import MoodCheckIn from '../components/dashboard/MoodCheckIn';
import WellnessTip from '../components/dashboard/WellnessTip';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Mind = () => {
  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Mind & Soul</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Nurture your mental clarity and emotional balance.</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-4">Peace begins within.</h2>
            <p className="text-lg opacity-90 mb-8">"Your mind is a garden. Your thoughts are the seeds. You can grow flowers, or you can grow weeds."</p>
            <Button className="bg-white text-indigo-500 hover:bg-indigo-50 rounded-xl font-bold px-8 py-6">
              Start Meditation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MindfulTools />
          </div>
          <div className="space-y-8">
            <MoodCheckIn />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Resilience Progress</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                You've had <span className="font-bold text-indigo-500">4 great mood days</span> this week. You're building incredible resilience!
              </p>
              <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[75%] rounded-full" />
              </div>
            </div>
            <WellnessTip />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Mind;