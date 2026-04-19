"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '../components/layout/AppLayout';
import TrendChart from '../components/dashboard/TrendChart';
import LogActivity from '../components/dashboard/LogActivity';
import GoalTracker from '../components/dashboard/GoalTracker';
import WearableConnect from '../components/dashboard/WearableConnect';
import { Activity, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Fitness = () => {
  const [goals, setGoals] = useState<any[]>([]);
  navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('goals').select('*').eq('user_id', user.id);
        setGoals(data || []);
      }
    };
    fetchGoals();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Fitness Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Track your movement and crush your physical goals.</p>
          </div>
          <LogActivity onSuccess={() => {}} />
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-4">Keep the momentum!</h2>
            <p className="text-lg opacity-90 mb-8">"Your body can stand almost anything. It's your mind that you have to convince."</p>
            <Button className="bg-white text-rose-500 hover:bg-rose-50 rounded-xl font-bold px-8 py-6">
              Start Workout <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TrendChart />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">Morning Run</p>
                        <p className="text-xs text-slate-400">Yesterday at 7:30 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-800 dark:text-slate-100">5.2 km</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">320 kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <GoalTracker goals={goals} onAddGoal={() => navigate('/profile')} />
            <WearableConnect />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Fitness;