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
import { Plus, Footprints, Moon, Zap, Flame } from 'lucide-react';
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
    calories_burned: ''
  });

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
      }, { onConflict: 'user_id,date' });

      if (error) throw error;

      showSuccess("Activity logged! Great job today.");
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
        <Button className="bg-white text-rose-500 hover:bg-rose-50 rounded-xl font-bold shadow-sm">
          Log Activity <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">Log Daily Activity</DialogTitle>
          <DialogDescription>
            How are you feeling today? Record your progress below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps" className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-rose-500" /> Steps
              </Label>
              <Input
                id="steps"
                type="number"
                placeholder="10000"
                value={formData.steps}
                onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active" className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Active Mins
              </Label>
              <Input
                id="active"
                type="number"
                placeholder="60"
                value={formData.active_minutes}
                onChange={(e) => setFormData({ ...formData, active_minutes: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep" className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" /> Sleep (hrs)
              </Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="8"
                value={formData.sleep_hours}
                onChange={(e) => setFormData({ ...formData, sleep_hours: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories" className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Calories
              </Label>
              <Input
                id="calories"
                type="number"
                placeholder="2000"
                value={formData.calories_burned}
                onChange={(e) => setFormData({ ...formData, calories_burned: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-6"
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