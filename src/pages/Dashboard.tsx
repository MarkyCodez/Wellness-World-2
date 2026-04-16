"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProgressRing from '@/components/dashboard/ProgressRing';
import TrendChart from '@/components/dashboard/TrendChart';
import LogActivity from '@/components/dashboard/LogActivity';
import StreakCounter from '@/components/dashboard/StreakCounter';
import CoachingMessage from '@/components/dashboard/CoachingMessage';
import WearableConnect from '@/components/dashboard/WearableConnect';
import { Button } from '@/components/ui/button';
import { Footprints, Moon, Zap, Flame, Settings, LogOut, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [streak, setStreak] = useState(0);
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
        calories_burned: 0,
        heart_rate_avg: 0
      });

      // Simple streak calculation (mocked for now, would be a query in production)
      setStreak(3); 

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
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Wellness World</h1>
              <p className="text-xs text-slate-400 font-medium">Hi, {profile?.full_name || 'Friend'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StreakCounter count={streak} />
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/profile')}>
                <Settings className="w-5 h-5 text-slate-400" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
                <LogOut className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-orange-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-rose-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">You're building great momentum!</h2>
            <CoachingMessage 
              steps={dailyLog?.steps || 0} 
              stepGoal={10000} 
              activeMinutes={dailyLog?.active_minutes || 0} 
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <LogActivity onSuccess={fetchData} />
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-none text-white rounded-xl font-bold backdrop-blur-md">
                View Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Secondary Stats & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TrendChart />
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg">Heart Rate Zones</h3>
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Resting', value: '62', unit: 'bpm', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Average', value: '78', unit: 'bpm', color: 'bg-rose-50 text-rose-600' },
                  { label: 'Peak', value: '142', unit: 'bpm', color: 'bg-orange-50 text-orange-600' }
                ].map((zone) => (
                  <div key={zone.label} className={`p-4 rounded-2xl ${zone.color} text-center`}>
                    <p className="text-[10px] uppercase font-bold tracking-wider opacity-70">{zone.label}</p>
                    <p className="text-2xl font-black mt-1">{zone.value}</p>
                    <p className="text-[10px] font-medium">{zone.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <WearableConnect />
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Your Focus Areas</h3>
              <div className="space-y-4">
                {profile?.goals?.map((goal: string) => (
                  <div key={goal} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="text-sm font-bold text-slate-600">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-around items-center md:hidden z-50">
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