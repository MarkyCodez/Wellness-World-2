"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import NutritionAnalysis from '@/components/nutrition/NutritionAnalysis';
import FoodLogger from '@/components/nutrition/FoodLogger';
import NutritionOverview from '@/components/nutrition/NutritionOverview';
import DailyNutriRecommendation from '@/components/nutrition/DailyNutriRecommendation';
import StreakCounter from '@/components/dashboard/StreakCounter';
import { Loader2, UtensilsCrossed, Coffee, Sun, Moon, Apple, Info, Check, X, ChefHat, Sparkles } from 'lucide-react';
import { getPersonalizedPlan } from '@/utils/recommendationData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { showSuccess, showError } from '@/utils/toast';

const Nutrition = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [showTips, setShowTips] = useState(false);
  const [loggingId, setLoggingId] = useState<string | null>(null);

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
      
      if (profileRes.data) {
        setPlan(getPersonalizedPlan(profileRes.data, logsRes.data || [], 'nutrition'));
      }
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogMeal = async (meal: any, id: string) => {
    setLoggingId(id);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('nutrition_logs').insert({
        user_id: user?.id,
        food_item: meal.title,
        meal_type: meal.type.toLowerCase()
      });
      if (error) throw error;
      showSuccess(`Logged ${meal.title}! Your body is thanking you.`);
      setSelectedMeal(null);
      fetchData();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoggingId(null);
    }
  };

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
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Fuel Your Body With Love</span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Personalized Nutrition Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Nourishing your journey towards {profile?.goals?.[0] || 'wellness'}.</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakCounter count={5} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <NutritionAnalysis logs={logs} profile={profile} />
            <div onClick={() => setShowTips(true)}>
              <DailyNutriRecommendation profile={profile} />
            </div>
            
            <div className="space-y-6">
              {plan.map((dayPlan, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    <h4 className="font-black text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest">{dayPlan.day}</h4>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { type: 'Breakfast', icon: <Coffee className="w-4 h-4" />, title: dayPlan.breakfast },
                      { type: 'Lunch', icon: <Sun className="w-4 h-4" />, title: dayPlan.lunch },
                      { type: 'Dinner', icon: <Moon className="w-4 h-4" />, title: dayPlan.dinner },
                      { type: 'Snack', icon: <Apple className="w-4 h-4" />, title: dayPlan.snack }
                    ].map((meal, idx) => (
                      <Card 
                        key={idx} 
                        className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedMeal({...meal, why: dayPlan.why, recipe: dayPlan.recipe})}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                {meal.icon}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{meal.type}</span>
                            </div>
                            <div className="h-8 w-8 rounded-full flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChefHat className="w-4 h-4" />
                            </div>
                          </div>
                          <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{meal.title}</h5>
                          <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                            <Info className="w-3 h-3 text-slate-300 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed">
                              {dayPlan.why}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <FoodLogger onSuccess={fetchData} />
            <NutritionOverview logs={logs} />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Coach's Note</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Every meal is an opportunity to nourish your cells and your soul. Focus on the colors on your plate today, {profile?.full_name?.split(' ')[0] || 'friend'}!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Detail Modal */}
      <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none">
          <div className="relative h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <ChefHat className="w-20 h-20 text-white/30" />
            <div className="absolute bottom-4 left-6">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-none mb-2">
                {selectedMeal?.type}
              </Badge>
              <h2 className="text-3xl font-black text-white">{selectedMeal?.title}</h2>
            </div>
          </div>
          
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Why this fits your goals</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                {selectedMeal?.why}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Recipe & Ingredients</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {selectedMeal?.recipe}
              </p>
            </div>

            <Button 
              onClick={() => handleLogMeal(selectedMeal, 'modal')}
              disabled={loggingId === 'modal'}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-8 text-lg font-bold shadow-lg shadow-emerald-100 dark:shadow-none"
            >
              {loggingId === 'modal' ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log This Meal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tips Modal */}
      <Dialog open={showTips} onOpenChange={setShowTips}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-8 border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" /> Personalized Nutrition Tips
            </DialogTitle>
            <DialogDescription className="text-slate-500 pt-2">
              Extra advice tailored to your {profile?.goals?.[0]} journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {[
              "Drink 500ml of water before every meal to boost metabolism.",
              "Focus on chewing each bite 20 times for better digestion.",
              "Try to eat your last meal at least 3 hours before bedtime.",
              "Add a handful of leafy greens to every lunch and dinner."
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{tip}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => setShowTips(false)} className="w-full rounded-xl">Got it!</Button>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Nutrition;