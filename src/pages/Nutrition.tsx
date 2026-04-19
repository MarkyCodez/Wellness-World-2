"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import NutritionAnalysis from '@/components/nutrition/NutritionAnalysis';
import MealPlan from '@/components/nutrition/MealPlan';
import FoodLogger from '@/components/nutrition/FoodLogger';
import NutritionOverview from '@/components/nutrition/NutritionOverview';
import DailyNutriRecommendation from '@/components/nutrition/DailyNutriRecommendation';
import StreakCounter from '@/components/dashboard/StreakCounter';
import { Loader2 } from 'lucide-react';

const Nutrition = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, logsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('nutrition_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20)
      ]);

      setProfile(profileRes.data);
      setLogs(logsRes.data || []);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
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
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Personalized Nutrition Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Fuel your body with intention and love.</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakCounter count={5} />
          </div>
        </div>

        <NutritionAnalysis logs={logs} profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DailyNutriRecommendation profile={profile} />
            <MealPlan />
          </div>
          <div className="space-y-8">
            <FoodLogger onSuccess={fetchData} />
            <NutritionOverview logs={logs} />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Coach's Note</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Food is fuel, but it's also joy. Focus on how your meals make you feel 2 hours after eating. You're building a great relationship with your body, {profile?.full_name?.split(' ')[0]}!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Nutrition;