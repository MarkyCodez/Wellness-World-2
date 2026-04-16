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
import WellnessTip from '../components/dashboard/WellnessTip';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import MoodCheckIn from '../components/dashboard/MoodCheckIn';
import GoalTracker from '../components/dashboard/GoalTracker';
import RecipeModal from '../components/nutrition/RecipeModal';
import Insights from '../components/dashboard/Insights';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Footprints, 
  Moon, 
  Zap, 
  Flame, 
  Settings, 
  User, 
  Heart, 
  Utensils, 
  Activity,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [nutritionLogs, setNutritionLogs] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
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

      const { data: goalData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id);
      
      setGoals(goalData || []);
      setStreak(5); 

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-8">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
              <User className="w-6 h-6 text-rose-500" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-none">Wellness World</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Hi, {profile?.full_name?.split(' ')[0] || 'Friend'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StreakCounter count={streak} />
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700" 
              onClick={() => navigate('/profile')}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-slate-400" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs defaultValue="activity" className="space-y-6 sm:space-y-8">
          <div className="flex justify-center sticky top-[73px] z-20 py-2 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm -mx-4 px-4">
            <TabsList className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 rounded-2xl h-auto shadow-sm">
              <TabsTrigger value="activity" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-rose-200 dark:data-[state=active]:shadow-none transition-all font-bold">
                <Activity className="w-4 h-4 mr-2" /> Activity
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-200 dark:data-[state=active]:shadow-none transition-all font-bold">
                <Utensils className="w-4 h-4 mr-2" /> Nutrition
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="activity" className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-orange-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-rose-200/50 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    Daily Insight
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">You're building great momentum!</h2>
                <CoachingMessage 
                  steps={dailyLog?.steps || 0} 
                  stepGoal={10000} 
                  activeMinutes={dailyLog?.active_minutes || 0} 
                />
                <div className="mt-10 flex flex-wrap gap-4">
                  <LogActivity onSuccess={fetchData} />
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsInsightsOpen(true)}
                    className="bg-white/20 hover:bg-white/30 border-none text-white rounded-xl font-bold backdrop-blur-md px-6"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" /> View Insights
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <TrendChart />
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Heart Rate Zones</h3>
                    <Heart className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { label: 'Resting', value: '62', unit: 'bpm', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                      { label: 'Average', value: '78', unit: 'bpm', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' },
                      { label: 'Peak', value: '142', unit: 'bpm', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' }
                    ].map((zone) => (
                      <div key={zone.label} className={`p-4 rounded-2xl ${zone.color} text-center transition-transform hover:scale-105`}>
                        <p className="text-[10px] uppercase font-bold tracking-wider opacity-70">{zone.label}</p>
                        <p className="text-xl sm:text-2xl font-black mt-1">{zone.value}</p>
                        <p className="text-[10px] font-medium">{zone.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6 sm:space-y-8">
                <MoodCheckIn />
                <GoalTracker goals={goals} onAddGoal={() => navigate('/profile')} />
                <WellnessTip />
                <WearableConnect />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-emerald-200/50 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    Mindful Eating
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Fuel your body with love.</h2>
                <p className="text-lg opacity-90 mb-10 leading-relaxed">"Eating well is a form of self-respect. You're doing great by making conscious choices today!"</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-emerald-500 hover:bg-emerald-50 rounded-xl font-bold shadow-sm px-6">
                    Explore Recipes <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <MealSuggestions 
                  goals={profile?.goals || []} 
                  onViewRecipe={(recipe) => setSelectedRecipe(recipe)}
                />
              </div>
              <div className="space-y-6 sm:space-y-8">
                <FoodLogger onSuccess={fetchData} />
                <NutritionOverview logs={nutritionLogs} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Insights isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
      <RecipeModal 
        recipe={selectedRecipe} 
        isOpen={!!selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-around items-center md:hidden z-50 pb-safe">
        <Button variant="ghost" className="flex flex-col gap-1 h-auto text-rose-500 hover:bg-transparent" aria-label="Home">
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-col gap-1 h-auto text-slate-400 hover:bg-transparent" 
          onClick={() => navigate('/profile')}
          aria-label="Settings"
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Settings</span>
        </Button>
      </nav>
    </div>
  );
};

export default Dashboard;