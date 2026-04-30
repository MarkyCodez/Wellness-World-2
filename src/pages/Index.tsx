"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from './Dashboard';
import { Heart } from 'lucide-react';

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="w-12 h-12 text-rose-400 fill-rose-400 mb-4" />
          <p className="text-slate-400 font-medium">Loading Wellness World...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50" />
        
        <div className="z-10 w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">Wellness World</h1>
            <p className="text-xl text-slate-500 max-w-md mx-auto">
              Your friendly companion for a healthier, happier life.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default Index;