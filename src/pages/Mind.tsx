"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppLayout } from '@/components/layout/AppLayout';
import MindAnalysis from '@/components/mind/MindAnalysis';
import WeeklyMindPlan from '@/components/mind/WeeklyMindPlan';
import MoodTrend from '@/components/mind/MoodTrend';
import DailyMindRecommendation from '@/components/mind/DailyMindRecommendation';
import MoodCheckIn from '@/components/dashboard/MoodCheckIn';
import WellnessTip from '@/components/dashboard/WellnessTip';
import { Loader2, Sparkles, Heart, Wind, PenLine, TreePine, Moon, Sun, Coffee, X, CheckCircle2 } from 'lucide-react';
import { getPersonalizedPlan } from '@/utils/recommendationData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { showSuccess, showError } from '@/utils/toast';

const Mind = () => {
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showTools, setShowTools] = useState(false);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, logsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('daily_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(30)
      ]);

      setProfile(profileRes.data);
      setLogs(logsRes.data || []);
      
      if (profileRes.data) {
        setPlan(getPersonalizedPlan(profileRes.data, logsRes.data || [], 'mind'));
      }
    } catch (error) {
      console.error("Error fetching mind data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogActivity = async (activity: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const today = new Date().toISOString().split('T')[0];
      await supabase.from('daily_logs').upsert({
        user_id: user.id,
        date: today,
        mood: logs[0]?.mood || 'Happy'
      }, { onConflict: 'user_id,date' });

      showSuccess(`Mindful moment logged! You're building great mental resilience.`);
      setSelectedActivity(null);
    } catch (error: any) {
      showError(error.message);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  const lastMood = logs[0]?.mood || 'Neutral';

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Mind Plan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Nurture your mental clarity and emotional balance.</p>
          </div>
        </div>

        <MindAnalysis logs={logs} profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div onClick={() => setSelectedActivity(plan[0])}>
              <DailyMindRecommendation lastMood={lastMood} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Your 7-Day Mind Plan</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {plan.map((item, i) => (
                  <Card 
                    key={i} 
                    className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedActivity(item)}
                  >
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center shrink-0 text-indigo-500 group-hover:scale-110 transition-transform">
                          {item.activity.includes('Breath') ? <Wind className="w-6 h-6" /> : 
                           item.activity.includes('Journal') ? <PenLine className="w-6 h-6" /> :
                           item.activity.includes('Nature') ? <TreePine className="w-6 h-6" /> :
                           <Heart className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 dark:text-slate-100">{item.day}</span>
                            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                              {item.duration}
                            </Badge>
                          </div>
                          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.activity}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 italic sm:text-right max-w-[200px]">"{item.why}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <MoodCheckIn />
            <MoodTrend logs={logs} />
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Coach's Note</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Your mind is like a garden. It doesn't need to be perfect; it just needs to be tended to with kindness. You're doing a wonderful job showing up for yourself today, {profile?.full_name?.split(' ')[0] || 'friend'}."
              </p>
            </div>
            <WellnessTip />
            <Button 
              variant="outline" 
              className="w-full rounded-2xl py-6 border-indigo-100 text-indigo-600 hover:bg-indigo-50"
              onClick={() => setShowTools(true)}
            >
              Explore More Tools <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none">
          <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Heart className="w-20 h-20 text-white/30" />
            <div className="absolute bottom-4 left-6">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-none mb-2">
                {selectedActivity?.duration}
              </Badge>
              <h2 className="text-3xl font-black text-white">{selectedActivity?.activity}</h2>
            </div>
          </div>
          
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Why this fits your goals</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                {selectedActivity?.why}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Instructions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {selectedActivity?.instructions}
              </p>
            </div>

            <Button 
              onClick={() => handleLogActivity(selectedActivity)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl py-8 text-lg font-bold shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              Log This Moment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tools Modal */}
      <Dialog open={showTools} onOpenChange={setShowTools}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-8 border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" /> Mental Wellness Tools
            </DialogTitle>
            <DialogDescription className="text-slate-500 pt-2">
              Additional activities to support your {profile?.goals?.[0]} journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {[
              { title: "Digital Detox", desc: "Put your phone away for 15 mins.", icon: <Moon className="w-4 h-4" /> },
              { title: "Hydration Hit", desc: "Drink a full glass of water now.", icon: <Coffee className="w-4 h-4" /> },
              { title: "Nature Connection", desc: "Find a plant or look out a window.", icon: <TreePine className="w-4 h-4" /> },
              { title: "Gratitude Hit", desc: "Think of one person you appreciate.", icon: <Heart className="w-4 h-4" /> }
            ].map((tool, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shrink-0 text-indigo-500">
                  {tool.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{tool.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setShowTools(false)} className="w-full rounded-xl">Close</Button>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Mind;