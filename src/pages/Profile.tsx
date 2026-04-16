"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, LogOut, Save, Loader2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import PrivacySection from '@/components/settings/PrivacySection';
import DataManagement from '@/components/settings/DataManagement';
import AppPreferences from '@/components/settings/AppPreferences';
import WearableConnect from '@/components/dashboard/WearableConnect';
import { Checkbox } from '@/components/ui/checkbox';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: '',
    goals: [] as string[],
    dietary_preferences: [] as string[],
    lifestyle_info: ''
  });
  const navigate = useNavigate();

  const goalsOptions = ["More Energy", "Weight Management", "Better Sleep", "Muscle Gain", "Stress Reduction"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "No Restrictions"];

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          setProfile(data);
          setFormData({
            full_name: data.full_name || '',
            age: data.age?.toString() || '',
            gender: data.gender || '',
            goals: data.goals || [],
            dietary_preferences: data.dietary_preferences || [],
            lifestyle_info: data.lifestyle_info || ''
          });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('profiles').update({
        full_name: formData.full_name,
        age: parseInt(formData.age) || null,
        gender: formData.gender,
        goals: formData.goals,
        dietary_preferences: formData.dietary_preferences,
        lifestyle_info: formData.lifestyle_info,
        updated_at: new Date().toISOString()
      }).eq('id', user.id);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Profile</h1>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* User Header */}
        <div className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg shrink-0">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 truncate">{formData.full_name || 'Wellness Explorer'}</h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Member since {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'today'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="rounded-xl py-6"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Your Goals</h3>
          <div className="flex flex-wrap gap-3">
            {goalsOptions.map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  const newGoals = formData.goals.includes(goal)
                    ? formData.goals.filter(g => g !== goal)
                    : [...formData.goals, goal];
                  setFormData({...formData, goals: newGoals});
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  formData.goals.includes(goal)
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-3">
            {dietaryOptions.map((pref) => (
              <button
                key={pref}
                onClick={() => {
                  const newPrefs = formData.dietary_preferences.includes(pref)
                    ? formData.dietary_preferences.filter(p => p !== pref)
                    : [...formData.dietary_preferences, pref];
                  setFormData({...formData, dietary_preferences: newPrefs});
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  formData.dietary_preferences.includes(pref)
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <PrivacySection />
        <AppPreferences />
        <WearableConnect />
        <DataManagement />

        <Button 
          variant="destructive" 
          className="w-full rounded-2xl py-8 text-lg font-bold shadow-lg shadow-rose-100 dark:shadow-none transition-all hover:scale-[1.02]"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-2" /> Sign Out
        </Button>
      </main>
    </div>
  );
};

export default Profile;