"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';
import { Heart } from 'lucide-react';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        showSuccess("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showSuccess("Welcome back to Wellness World!");
      }
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-white/80 backdrop-blur-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-rose-100 rounded-full">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          {isSignUp ? "Start Your Journey" : "Welcome Back"}
        </CardTitle>
        <CardDescription className="text-slate-500">
          {isSignUp 
            ? "Join Wellness World and build healthy habits today." 
            : "Your personal health coach is waiting for you."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAuth}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="hello@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-slate-200 focus:ring-rose-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-slate-200 focus:ring-rose-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-6 text-lg font-semibold transition-all transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
          </Button>
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-slate-500 hover:text-rose-500 transition-colors"
          >
            {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;