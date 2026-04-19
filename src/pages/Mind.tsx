"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import MindAnalysis from '@/components/mind/MindAnalysis';
import WeeklyMindPlan from '@/components/mind/WeeklyMindPlan';
import MoodTrend from '@/components/mind/MoodTrend';
import DailyMindRecommendation from '@/components/mind/DailyMindRecommendation';
import MoodCheckIn from '@/components/dashboard/MoodCheckIn';
import WellnessTip from '@/components/dashboard/WellnessTip';
import { Loader2 } from 'lucide-react';

const Mind = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: logsRes } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30);

      setLogs(logsRes || []);
    } catch (error) {
      console.error("Error fetching mind data:", error);
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
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  const lastMood = logs[0]?.mood || 'Neutral';

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Mind Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Nurture your mental clarity and emotional balance.</p>
          </div>
        </div>

        <MindAnalysis logs={logs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DailyMindRecommendation lastMood={lastMood} />
            <WeeklyMindPlan />
          </div>
          <div className="space-y-8">
            <MoodCheckIn />
            <MoodTrend logs={logs} />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Coach's Note</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Your mind is like a garden. It doesn't need to be perfect; it just needs to be tended to with kindness. You're doing a wonderful job showing up for yourself today."
              </p>
            </div>
            <WellnessTip />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Mind;