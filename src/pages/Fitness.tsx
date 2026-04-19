"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import SmartAnalysis from '@/components/fitness/SmartAnalysis';
import WeeklySchedule from '@/components/fitness/WeeklySchedule';
import FitnessProgress from '@/components/fitness/FitnessProgress';
import DailyRecommendation from '@/components/fitness/DailyRecommendation';
import LogActivity from '@/components/dashboard/LogActivity';
import StreakCounter from '@/components/dashboard/StreakCounter';
import { Activity, Loader2 } from 'lucide-react';

const Fitness = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, logsRes, goalsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('daily_logs').select('*').eq('user_id', user.id).order('date', { ascending: false }).limit(30),
        supabase.from('goals').select('*').eq('user_id', user.id)
      ]);

      setProfile(profileRes.data);
      setLogs(logsRes.data || []);
      setGoals(goalsRes.data || []);
    } catch (error) {
      console.error("Error fetching fitness data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Personalized Fitness Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Data-driven insights to help you move better.</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakCounter count={5} />
            <LogActivity onSuccess={fetchData} />
          </div>
        </div>

        <SmartAnalysis logs={logs} profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DailyRecommendation lastLog={logs[0]} />
            <WeeklySchedule goals={profile?.goals || []} />
          </div>
          <div className="space-y-8">
            <FitnessProgress logs={logs} goals={goals} />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Coach's Note</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Consistency is the secret ingredient. Even on days when you don't feel like it, a 5-minute stretch keeps the habit alive. You're doing great, {profile?.full_name?.split(' ')[0]}!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Fitness;