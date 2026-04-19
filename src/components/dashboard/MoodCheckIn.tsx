"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast';

const moods = [
  { label: 'Great', emoji: '🤩', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Happy', emoji: '😊', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { label: 'Neutral', emoji: '😐', color: 'bg-slate-50 text-slate-600 border-slate-100' },
  { label: 'Tired', emoji: '😴', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { label: 'Stressed', emoji: '😫', color: 'bg-rose-50 text-rose-600 border-rose-100' },
];

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const fetchMood = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase.from('daily_logs').select('mood').eq('user_id', user.id).eq('date', today).single();
      if (data?.mood) setSelectedMood(data.mood);
    };
    fetchMood();
  }, []);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    
    await supabase.from('daily_logs').upsert({
      user_id: user.id,
      date: today,
      mood: mood
    }, { onConflict: 'user_id,date' });

    showSuccess(`Logged as ${mood}. Thanks for sharing how you feel!`);
  };

  return (
    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">How are you feeling today?</p>
        <div className="flex gap-2 sm:gap-3">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleMoodSelect(m.label)}
              className={`flex-1 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                selectedMood === m.label 
                  ? `${m.color} border-current scale-105 shadow-md` 
                  : 'bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 text-slate-400 hover:border-slate-200'
              }`}
            >
              <span className="text-xl sm:text-2xl">{m.emoji}</span>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;