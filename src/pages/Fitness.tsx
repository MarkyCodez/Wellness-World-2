"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import SmartAnalysis from '@/components/fitness/SmartAnalysis';
import FitnessProgress from '@/components/fitness/FitnessProgress';
import DailyRecommendation from '@/components/fitness/DailyRecommendation';
import LogActivity from '@/components/dashboard/LogActivity';
import StreakCounter from '@/components/dashboard/StreakCounter';
import { Activity, Loader2, Settings2, Dumbbell, Clock, Footprints, Wind, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getPersonalizedPlan } from '@/utils/recommendationData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { showSuccess, showError } from '@/utils/toast';

const Fitness = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [isLogging, setIsLogging] = useState(false);
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

  const handleLogWorkout = async (workout: any) => {
    setIsLogging(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date().toISOString().split('T')[0];
      const activeMins = parseInt(workout.duration.split(' ')[0]);

      const { error } = await supabase.from('daily_logs').upsert({
        user_id: user.id,
        date: today,
        active_minutes: activeMins,
        steps: logs[0]?.steps || 0,
        sleep_hours: logs[0]?.sleep_hours || 0,
        calories_burned: (logs[0]?.calories_burned || 0) + (activeMins * 8)
      }, { onConflict: 'user_id,date' });

      if (error) throw error;

      showSuccess(`Workout logged! You've earned ${activeMins * 8} extra calories today.`);
      setSelectedWorkout(null);
      fetchData();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsLogging(false);
    }
  };

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
            <div onClick={() => setSelectedWorkout(plan[0])}>
              <DailyRecommendation lastLog={logs[0]} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Activity className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Your 7-Day Routine</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {plan.map((item, i) => (
                  <Card 
                    key={i} 
                    className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedWorkout(item)}
                  >
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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

      {/* Workout Detail Modal */}
      <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none">
          <div className="relative h-48 bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Dumbbell className="w-20 h-20 text-white/30" />
            <div className="absolute bottom-4 left-6">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-none mb-2">
                {selectedWorkout?.difficulty}
              </Badge>
              <h2 className="text-3xl font-black text-white">{selectedWorkout?.activity}</h2>
            </div>
          </div>
          
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="flex gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" /> {selectedWorkout?.duration}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500" /> Personalized for you
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Why this fits your goals</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-800/30">
                {selectedWorkout?.why}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Exercises</h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedWorkout?.exercises.split(', ').map((ex: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <div className="w-8 h-8 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center font-black text-rose-500 shadow-sm">
                      {i + 1}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Coach's Instructions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {selectedWorkout?.instructions}
              </p>
            </div>

            <Button 
              onClick={() => handleLogWorkout(selectedWorkout)}
              disabled={isLogging}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-2xl py-8 text-lg font-bold shadow-lg shadow-rose-100 dark:shadow-none"
            >
              {isLogging ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log Today's Workout"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Fitness;