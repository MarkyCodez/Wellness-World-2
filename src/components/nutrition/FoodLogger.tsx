"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Plus, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface FoodLoggerProps {
  onSuccess: () => void;
}

const FoodLogger = ({ onSuccess }: FoodLoggerProps) => {
  const [food, setFood] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim()) return;
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('nutrition_logs').insert({
        user_id: user.id,
        food_item: food,
        meal_type: 'general'
      });

      if (error) throw error;

      showSuccess(`Logged: ${food}. Sounds delicious!`);
      setFood('');
      onSuccess();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl border-slate-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-emerald-500" /> Quick Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLog} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="What did you enjoy?"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="rounded-xl border-slate-100 focus:ring-emerald-500"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !food.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          </Button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Apple 🍎', 'Oatmeal 🥣', 'Salad 🥗', 'Water 💧'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setFood(preset)}
              className="text-xs font-medium px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodLogger;