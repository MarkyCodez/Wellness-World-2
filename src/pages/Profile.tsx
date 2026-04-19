"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Save, 
  Loader2, 
  Heart, 
  Target, 
  Plus, 
  Trash2,
  LogOut
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target_value: '', unit: '' });
  const [formData, setFormData] = useState({ full_name: '', age: '', gender: '', goals: [] as string[] });
  const navigate = useNavigate();

  const goalsOptions = ["More Energy", "Weight Management", "Better Sleep", "Muscle Gain", "Stress Reduction"];

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const [profileRes, goalsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('goals').select('*').eq('user_id', user.id)
      ]);
      if (profileRes.data) {
        setProfile(profileRes.data);
        setFormData({
          full_name: profileRes.data.full_name || '',
          age: profileRes.data.age?.toString() || '',
          gender: profileRes.data.gender || '',
          goals: profileRes.data.goals || []
        });
      }
      if (goalsRes.data) setGoals(goalsRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('profiles').update({
        full_name: formData.full_name,
        age: parseInt(formData.age) || null,
        gender: formData.gender,
        goals: formData.goals,
        updated_at: new Date().toISOString()
      }).eq('id', user?.id);
      if (error) throw error;
      showSuccess("Profile updated beautifully!");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return null;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Profile</h1>
          <Button onClick={handleSaveProfile} disabled={saving} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <div className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg shrink-0">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">{formData.full_name || 'Wellness Explorer'}</h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Member since {new Date(profile?.updated_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="rounded-xl py-6" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="rounded-xl py-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Focus Areas</h3>
          <div className="flex flex-wrap gap-3">
            {goalsOptions.map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  const newGoals = formData.goals.includes(goal) ? formData.goals.filter(g => g !== goal) : [...formData.goals, goal];
                  setFormData({...formData, goals: newGoals});
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  formData.goals.includes(goal) ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <Button variant="destructive" className="w-full rounded-2xl py-8 text-lg font-bold shadow-lg shadow-rose-100 dark:shadow-none" onClick={handleSignOut}>
          <LogOut className="w-5 h-5 mr-2" /> Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;