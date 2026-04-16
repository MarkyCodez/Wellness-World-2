"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProgressRing from '../components/dashboard/ProgressRing';
import TrendChart from '../components/dashboard/TrendChart';
import LogActivity from '../components/dashboard/LogActivity';
import StreakCounter from '../components/dashboard/StreakCounter';
import CoachingMessage from '../components/dashboard/CoachingMessage';
import WearableConnect from '../components/dashboard/WearableConnect';
import FoodLogger from '../components/nutrition/FoodLogger';
import MealSuggestions from '../components/nutrition/MealSuggestions';
import NutritionOverview from '../components/nutrition/NutritionOverview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Footprints, 
  Moon, 
  Zap, 
  Flame, 
  Settings, 
  LogOut, 
  User, 
  Heart, 
  Utensils, 
  Activity,
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [nutritionLogs, setNutritionLogs] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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

      const { data: nutData } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .order('created_at', { ascending: false });

      setNutritionLogs(nutData || []);

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

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="activity" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-white border border-slate-100 p-1 rounded-2xl h-auto">
              <TabsTrigger value="activity" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all">
                <Activity className="w-4 h-4 mr-2" /> Activity
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                <Utensils className="w-4 h-4 mr-2" /> Nutrition
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="activity" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <TrendChart />
              </div>
              <div className="space-y-8">
                <WearableConnect />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Fuel your body with love.</h2>
                <p className="text-lg opacity-90 mb-8">"Eating well is a form of self-respect. You're doing great by making conscious choices today!"</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-emerald-500 hover:bg-emerald-50 rounded-xl font-bold shadow-sm">
                    Explore Recipes <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <MealSuggestions goals={profile?.goals} />
              </div>
              <div className="space-y-8">
                <FoodLogger onSuccess={fetchData} />
                <NutritionOverview logs={nutritionLogs} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-around items-center md:hidden z-50">
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-rose-500">
          <Activity className="w-6 h-6" />
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