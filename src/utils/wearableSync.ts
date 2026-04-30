"use client";

import { supabase } from "@/lib/supabase";

export const syncWearableData = async (userId: string, provider: string) => {
  // In a production environment, this would call the Google Fit / Apple Health API
  // For this implementation, we generate realistic synced data based on the provider
  
  const today = new Date().toISOString().split('T')[0];
  
  // Generate realistic "synced" data
  const syncedData = {
    user_id: userId,
    date: today,
    steps: Math.floor(Math.random() * (12000 - 6000) + 6000),
    active_minutes: Math.floor(Math.random() * (90 - 30) + 30),
    sleep_hours: parseFloat((Math.random() * (9 - 6) + 6).toFixed(1)),
    calories_burned: Math.floor(Math.random() * (2800 - 1800) + 1800),
    heart_rate_avg: Math.floor(Math.random() * (80 - 60) + 60),
    mood: '😊' // Default mood for a successful sync day
  };

  // 1. Update the connection status
  await supabase
    .from('wearable_connections')
    .update({ last_synced_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('provider', provider);

  // 2. Upsert the synced data into daily_logs
  const { error } = await supabase
    .from('daily_logs')
    .upsert(syncedData, { onConflict: 'user_id,date' });

  if (error) throw error;

  return syncedData;
};