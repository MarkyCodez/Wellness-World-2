"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProgressRing from '@/components/dashboard/ProgressRing';
import TrendChart from '@/components/dashboard/TrendChart';
import LogActivity from '@/components/dashboard/LogActivity';
import { Button } from '@/components/ui/button';
import { Footprints, Moon, Zap, Flame, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // If no profile, redirect to onboarding
      if (!profileData || !profileData.age) {
        navigate('/onboarding');
        return;
      }

      setProfile(profileData);

      // Fetch Today's Log
      const today = new Date().toISOString().split('T')[0];
      const { data: logData } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      setDailyLog(logData || {
        steps: 0,
        active_minutes: 0,
        sleep_hours: 0,
        calories_burned: 0
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Wellness World</h1>
              <p className="text-xs text-slate-400 font-medium">Hi, {profile?.full_name || 'Friend'}!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/profile')}>
              <Settings className="w-5 h-5 text-slate-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
              <LogOut className="w-5 h-5 text-slate-400" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-gradient-to-r from-rose-400 to-orange-400 rounded-[2rem] p-8 text-white shadow-lg shadow-rose-200/50">
          <h2 className="text-2xl font-bold mb-2">You're building great momentum!</h2>
          <p className="opacity-90 mb-6">Small wins add up. Every step counts towards your goal.</p>
          <LogActivity onSuccess={fetchData} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProgressRing 
            value={dailyLog?.steps || 0} 
            target={10000} 
            label="Steps" 
            unit="steps"
            icon={<Footprints className="w-5 h-5 text-rose-500" />} 
            color="#fb7185" 
          />
          <ProgressRing 
            value={dailyLog?.active_minutes || 0} 
            target={60} 
            label="Active" 
            unit="mins"
            icon={<Zap className="w-5 h-5 text-amber-500" />} 
            color="#f59e0b" 
          />
          <ProgressRing 
            value={dailyLog?.sleep_hours || 0} 
            target={8} 
            label="Sleep" 
            unit="hours"
            icon={<Moon className="w-5 h-5 text-indigo-500" />} 
            color="#6366f1" 
          />
          <ProgressRing 
            value={dailyLog?.calories_burned || 0} 
            target={2200} 
            label="Burned" 
            unit="kcal"
            icon={<Flame className="w-5 h-5 text-orange-500" />} 
            color="#f97316" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Your Goals</h3>
            <div className="space-y-4">
              {profile?.goals?.map((goal: string) => (
                <div key={goal} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-sm font-medium text-slate-600">{goal}</span>
                </div>
              ))}
              {(!profile?.goals || profile.goals.length === 0) && (
                <p className="text-sm text-slate-400 italic">No goals set yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center md:hidden">
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-rose-500">
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-slate-400" onClick={() => navigate('/profile')}>
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </Button>
      </nav>
    </div>
  );
};

export default Dashboard;