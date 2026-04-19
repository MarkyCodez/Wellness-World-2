"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import SmartAnalysis from '@/components/fitness/SmartAnalysis';
import FitnessProgress from '@/components/fitness/FitnessProgress';
import DailyRecommendation from '@/components/fitness/DailyRecommendation';
import LogActivity from '@/components/dashboard/LogActivity';
import StreakCounter from '@/components/dashboard/StreakCounter';
import { Activity, Loader2, Settings2, Dumbbell, Clock, Footprints, Wind, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getPersonalizedPlan } from '@/utils/recommendationData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Fitness = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any[]>([]);
  const navigate = useNavigate();

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
      
      if (profileRes.data) {
        setPlan(getPersonalizedPlan(profileRes.data, logsRes.data || [], 'fitness'));
      }
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
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Personalized Fitness Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Tailored to your goals and recent activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/profile')}
              className="rounded-xl border-slate-200 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Settings2 className="w-4 h-4 mr-2" /> Edit Goals
            </Button>
            <LogActivity onSuccess={fetchData} />
          </div>
        </div>

        <SmartAnalysis logs={logs} profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DailyRecommendation lastLog={logs[0]} />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Activity className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Your 7-Day Routine</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {plan.map((item, i) => (
                  <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all">
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center shrink-0">
                          {item.activity.includes('Strength') ? <Dumbbell className="w-6 h-6 text-rose-500" /> : 
                           item.activity.includes('Flow') ? <Wind className="w-6 h-6 text-rose-500" /> :
                           <Footprints className="w-6 h-6 text-rose-500" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 dark:text-slate-100">{item.day}</span>
                            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {item.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.activity}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{item.exercises}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Clock className="w-3 h-3" /> {item.duration}
                        </div>
                        <p className="text-[11px] text-slate-400 italic max-w-[200px] sm:text-right">"{item.why}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Progress</h3>
              <StreakCounter count={5} />
            </div>
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