"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { showSuccess, showError } from '@/utils/toast';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    goals: [] as string[],
    lifestyle: ''
  });
  const navigate = useNavigate();

  const goalsOptions = [
    "More Energy", "Weight Management", "Better Sleep", "Muscle Gain", "Stress Reduction"
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        age: parseInt(formData.age),
        gender: formData.gender,
        goals: formData.goals,
        lifestyle_info: formData.lifestyle,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;
      showSuccess("Profile created! Let's get moving.");
      navigate('/');
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-rose-500' : 'bg-slate-100'}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-400">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800">Tell us about yourself</h1>
              <p className="text-slate-500">This helps us personalize your health journey.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">How old are you?</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="25" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup onValueChange={(v) => setFormData({...formData, gender: v})} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800">What are your goals?</h1>
              <p className="text-slate-500">Select all that apply to you.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {goalsOptions.map((goal) => (
                <div 
                  key={goal} 
                  className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    formData.goals.includes(goal) ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                  onClick={() => {
                    const newGoals = formData.goals.includes(goal)
                      ? formData.goals.filter(g => g !== goal)
                      : [...formData.goals, goal];
                    setFormData({...formData, goals: newGoals});
                  }}
                >
                  <Checkbox checked={formData.goals.includes(goal)} />
                  <span className="font-medium text-slate-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800">Almost there!</h1>
              <p className="text-slate-500">Describe your current lifestyle in a few words.</p>
            </div>
            <div className="space-y-4">
              <textarea 
                className="w-full h-32 p-4 rounded-2xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 transition-all resize-none"
                placeholder="e.g. I work a desk job but try to walk in the evenings..."
                value={formData.lifestyle}
                onChange={(e) => setFormData({...formData, lifestyle: e.target.value})}
              />
              <div className="p-4 bg-amber-50 rounded-2xl flex gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-700">"Small wins add up! You're building great momentum just by starting today."</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-12">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 rounded-xl py-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          <Button 
            onClick={step === 3 ? handleSubmit : handleNext} 
            className="flex-[2] bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-6"
          >
            {step === 3 ? "Finish" : "Continue"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;