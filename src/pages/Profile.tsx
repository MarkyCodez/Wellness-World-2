"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Target, Shield, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <User className="w-12 h-12 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{profile?.full_name || 'Wellness Explorer'}</h1>
            <p className="text-slate-500">Member since {new Date(profile?.updated_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-rose-500" /> Your Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile?.goals?.map((goal: string) => (
                <span key={goal} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-medium">
                  {goal}
                </span>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-indigo-500" /> Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500">
                Your data is encrypted and stored securely. You own your health information.
              </p>
              <Button variant="outline" className="w-full rounded-xl">Export My Data</Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-amber-500" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">Daily Reminders</span>
                <div className="w-12 h-6 bg-rose-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          variant="destructive" 
          className="w-full rounded-xl py-6 mt-8 opacity-50 hover:opacity-100"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate('/');
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;