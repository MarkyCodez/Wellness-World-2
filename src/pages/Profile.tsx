"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrivacySection from '@/components/settings/PrivacySection';
import DataManagement from '@/components/settings/DataManagement';
import AppPreferences from '@/components/settings/AppPreferences';
import WearableConnect from '@/components/dashboard/WearableConnect';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Settings & Privacy</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* User Header */}
        <div className="flex items-center gap-6 p-6 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0">
            <User className="w-10 h-10 text-rose-500" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-2xl font-black text-slate-800 truncate">{profile?.full_name || 'Wellness Explorer'}</h2>
            <p className="text-sm text-slate-400 font-medium">Member since {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'today'}</p>
          </div>
        </div>

        <PrivacySection />
        
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">App Settings</h3>
          <AppPreferences />
          <WearableConnect />
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Account & Data</h3>
          <DataManagement />
        </div>

        <Button 
          variant="destructive" 
          className="w-full rounded-2xl py-8 text-lg font-bold shadow-lg shadow-rose-100 transition-all hover:scale-[1.02]"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-2" /> Sign Out
        </Button>

        <p className="text-center text-[10px] text-slate-400 font-medium">
          Wellness World v1.0.0 • Made with love for your health
        </p>
      </main>
    </div>
  );
};

export default Profile;