"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Footprints, Moon, Zap, Flame, Heart, MessageSquare } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface LogActivityProps {
  onSuccess: () => void;
}

const LogActivity = ({ onSuccess }: LogActivityProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    steps: '',
    active_minutes: '',
    sleep_hours: '',
    calories_burned: '',
    heart_rate_avg: '',
    mood: '😊'
  });

  const moods = ['😊', '😐', '😫', '😴', '🤩'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase.from('daily_logs').upsert({
        user_id: user.id,
        date: today,
        steps: parseInt(formData.steps) || 0,
        active_minutes: parseInt(formData.active_minutes) || 0,
        sleep_hours: parseFloat(formData.sleep_hours) || 0,
        calories_burned: parseInt(formData.calories_burned) || 0,
        heart_rate_avg: parseInt(formData.heart_rate_avg) || null,
        mood: formData.mood
      }, { onConflict: 'user_id,date' });

      if (error) throw error;

      showSuccess("Activity logged! You're doing amazing today.");
      setOpen(false);
      onSuccess();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-rose-500 hover:bg-rose-50 rounded-xl font-bold shadow-sm border border-rose-100 px-6">
          Log Activity <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">How was your day?</DialogTitle>
          <DialogDescription className="text-slate-500">
            Every bit of movement counts. Record your progress below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps" className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <Footprints className="w-4 h-4 text-rose-500" /> Steps
              </Label>
              <Input
                id="steps"
                type="number"
                placeholder="10000"
                value={formData.steps}
                onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                className="rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active" className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-500" /> Active Mins
              </Label>
              <Input
                id="active"
                type="number"
                placeholder="60"
                value={formData.active_minutes}
                onChange={(e) => setFormData({ ...formData, active_minutes: e.target.value })}
                className="rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep" className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <Moon className="w-4 h-4 text-indigo-500" /> Sleep (hrs)
              </Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="8"
                value={formData.sleep_hours}
                onChange={(e) => setFormData({ ...formData, sleep_hours: e.target.value })}
                className="rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heart" className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-400" /> Avg HR
              </Label>
              <Input
                id="heart"
                type="number"
                placeholder="72"
                value={formData.heart_rate_avg}
                onChange={(e) => setFormData({ ...formData, heart_rate_avg: e.target.value })}
                className="rounded-xl py-6"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-600 font-bold text-xs uppercase tracking-wider">How are you feeling?</Label>
            <div className="flex justify-between bg-slate-50 p-3 rounded-2xl">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: m })}
                  className={`text-2xl p-2 rounded-xl transition-all ${formData.mood === m ? 'bg-white shadow-sm scale-110' : 'opacity-50 hover:opacity-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-8 text-lg font-bold shadow-lg shadow-rose-100"
            >
              {loading ? "Saving..." : "Save Progress"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogActivity;