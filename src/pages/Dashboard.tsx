"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProgressRing from '../components/dashboard/ProgressRing';
import TrendChart from '../components/dashboard/TrendChart';
import LogActivity from '../components/dashboard/LogActivity';
import StreakCounter from '../components/dashboard/StreakCounter';
import WearableConnect from '../components/dashboard/WearableConnect';
import WellnessTip from '../components/dashboard/WellnessTip';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import MoodCheckIn from '../components/dashboard/MoodCheckIn';
import GoalTracker from '../components/dashboard/GoalTracker';
import DailyCoach from '../components/dashboard/DailyCoach';
import Insights from '../components/dashboard/Insights';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Footprints, 
  Moon, 
  Zap, 
  Flame, 
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [streak, setStreak] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, goalsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('goals').select('*').eq('user_id', user.id)
      ]);

      if (!profileRes.data || !profileRes.data.age) {
        navigate('/onboarding');
        return;
      }
      setProfile(profileRes.data);
      setGoals(goalsRes.data || []);

      const today = new Date().toISOString().split('T')[0];
      const { data: logData } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      setDailyLog(logData || { steps: 0, active_minutes: 0, sleep_hours: 0, calories_burned: 0 });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen for wearable sync events
    const handleSync = () => fetchData();
    window.addEventListener('healthDataSynced', handleSync);
    
    return () => window.removeEventListener('healthDataSynced', handleSync);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Here's how your wellness journey is looking today.</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakCounter count={streak} />
            <LogActivity onSuccess={fetchData} />
          </div>
        </div>

        <div onClick={() => setIsInsightsOpen(true)}>
          <DailyCoach 
            steps={dailyLog?.steps || 0} 
            sleep={dailyLog?.sleep_hours || 0} 
            activeMinutes={dailyLog?.active_minutes || 0}
            userName={profile?.full_name?.split(' ')[0] || 'Friend'}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ProgressRing value={dailyLog?.steps || 0} target={10000} label="Steps" unit="steps" icon={<Footprints className="w-6 h-6 text-rose-500" />} color="#fb7185" />
          <ProgressRing value={dailyLog?.active_minutes || 0} target={60} label="Active" unit="mins" icon={<Zap className="w-6 h-6 text-amber-500" />} color="#f59e0b" />
          <ProgressRing value={dailyLog?.sleep_hours || 0} target={8} label="Sleep" unit="hours" icon={<Moon className="w-6 h-6 text-indigo-500" />} color="#6366f1" />
          <ProgressRing value={dailyLog?.calories_burned || 0} target={2200} label="Burned" unit="kcal" icon={<Flame className="w-6 h-6 text-orange-500" />} color="#f97316" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TrendChart />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Heart Rate Zones</h3>
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Resting', value: dailyLog?.heart_rate_avg ? dailyLog.heart_rate_avg - 10 : '62' }, 
                  { label: 'Average', value: dailyLog?.heart_rate_avg || '78' }, 
                  { label: 'Peak', value: dailyLog?.heart_rate_avg ? dailyLog.heart_rate_avg + 60 : '142' }].map((zone) => (
                  <div key={zone.label} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 text-center">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{zone.label}</p>
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{zone.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <MoodCheckIn />
            <GoalTracker goals={goals} onAddGoal={() => navigate('/profile')} />
            <WellnessTip />
            <WearableConnect />
          </div>
        </div>
      </div>
      <Insights isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
    </AppLayout>
  );
};

export default Dashboard;