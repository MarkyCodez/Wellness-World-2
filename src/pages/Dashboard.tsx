"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProgressRing from '@/components/dashboard/ProgressRing';
import TrendChart from '@/components/dashboard/TrendChart';
import { Button } from '@/components/ui/button';
import { Footprints, Moon, Zap, Flame, Plus, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Wellness World</h1>
            <p className="text-xs text-slate-400 font-medium">Welcome back, {profile?.full_name || 'Friend'}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5 text-slate-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
              <LogOut className="w-5 h-5 text-slate-400" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Encouraging Message */}
        <div className="bg-gradient-to-r from-rose-400 to-orange-400 rounded-[2rem] p-8 text-white shadow-lg shadow-rose-200/50">
          <h2 className="text-2xl font-bold mb-2">You're building great momentum!</h2>
          <p className="opacity-90 mb-6">You've hit your step goal 3 days in a row. Keep it up!</p>
          <Button className="bg-white text-rose-500 hover:bg-rose-50 rounded-xl font-bold">
            Log Activity <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProgressRing 
            value={8432} 
            target={10000} 
            label="Steps" 
            unit="steps"
            icon={<Footprints className="w-5 h-5 text-rose-500" />} 
            color="#fb7185" 
          />
          <ProgressRing 
            value={45} 
            target={60} 
            label="Active" 
            unit="mins"
            icon={<Zap className="w-5 h-5 text-amber-500" />} 
            color="#f59e0b" 
          />
          <ProgressRing 
            value={7.5} 
            target={8} 
            label="Sleep" 
            unit="hours"
            icon={<Moon className="w-5 h-5 text-indigo-500" />} 
            color="#6366f1" 
          />
          <ProgressRing 
            value={1840} 
            target={2200} 
            label="Burned" 
            unit="kcal"
            icon={<Flame className="w-5 h-5 text-orange-500" />} 
            color="#f97316" 
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Connect Wearables</h3>
            <div className="space-y-3">
              {['Apple Health', 'Google Fit', 'Fitbit'].map((source) => (
                <Button key={source} variant="outline" className="w-full justify-start rounded-xl py-6 border-slate-100 hover:bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 mr-3 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="font-medium text-slate-600">Connect {source}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center md:hidden">
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-rose-500">
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-slate-400">
          <Footprints className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Fitness</span>
        </Button>
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-slate-400">
          <Moon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Sleep</span>
        </Button>
      </nav>
    </div>
  );
};

export default Dashboard;