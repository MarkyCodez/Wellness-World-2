"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '../components/layout/AppLayout';
import FoodLogger from '../components/nutrition/FoodLogger';
import MealSuggestions from '../components/nutrition/MealSuggestions';
import NutritionOverview from '../components/nutrition/NutritionOverview';
import RecipeModal from '../components/nutrition/RecipeModal';
import { Utensils, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Nutrition = () => {
  const [profile, setProfile] = useState<any>(null);
  const [nutritionLogs, setNutritionLogs] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const [profileRes, nutRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('nutrition_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);
      setProfile(profileRes.data);
      setNutritionLogs(nutRes.data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Nutrition Plan</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Fuel your body with intention and love.</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-4">Eat for energy.</h2>
            <p className="text-lg opacity-90 mb-8">"Let food be thy medicine and medicine be thy food."</p>
            <Button className="bg-white text-emerald-500 hover:bg-emerald-50 rounded-xl font-bold px-8 py-6">
              Explore Recipes <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MealSuggestions goals={profile?.goals || []} onViewRecipe={setSelectedRecipe} />
          </div>
          <div className="space-y-8">
            <FoodLogger onSuccess={fetchData} />
            <NutritionOverview logs={nutritionLogs} />
          </div>
        </div>
      </div>
      <RecipeModal recipe={selectedRecipe} isOpen={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </AppLayout>
  );
};

export default Nutrition;