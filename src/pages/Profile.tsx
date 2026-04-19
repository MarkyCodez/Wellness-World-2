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
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">Your Profile</h1>
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
        <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg shrink-0">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-3xl font-black text-slate-800 truncate">{formData.full_name || 'Wellness Explorer'}</h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Member since {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'today'}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
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

        <PrivacySection />
        <AppPreferences />
        <WearableConnect />
        <DataManagement />

        <Button 
          variant="destructive" 
          className="w-full rounded-2xl py-8 text-lg font-bold shadow-lg shadow-rose-100 transition-all hover:scale-[1.02]"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-2" /> Sign Out
        </Button>
      </main>
    </div>
  );
};

export default Profile;