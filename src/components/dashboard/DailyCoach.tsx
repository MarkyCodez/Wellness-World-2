"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Heart, Zap, Moon } from 'lucide-react';

interface DailyCoachProps {
  steps: number;
  sleep: number;
  activeMinutes: number;
  userName: string;
}

const DailyCoach = ({ steps, sleep, activeMinutes, userName }: DailyCoachProps) => {
  const getCoachMessage = () => {
    if (steps > 10000 && sleep > 7) {
      return {
        title: "You're in the Zone!",
        message: `Wow, ${userName}! You're absolutely crushing it. Great sleep and high activity is the ultimate recipe for energy. Keep that momentum!`,
        icon: <Sparkles className="w-6 h-6 text-amber-400" />,
        color: "from-amber-400 to-orange-500"
      };
    }
    if (sleep < 6) {
      return {
        title: "Rest is Productive",
        message: `It looks like you're a bit short on sleep, ${userName}. Try to wind down 30 minutes earlier tonight. Your body will thank you!`,
        icon: <Moon className="w-6 h-6 text-indigo-400" />,
        color: "from-indigo-500 to-purple-600"
      };
    }
    if (activeMinutes > 30) {
      return {
        title: "Heart Hero!",
        message: `Great job on those active minutes! Your heart is getting stronger with every minute of movement. You're doing amazing.`,
        icon: <Heart className="w-6 h-6 text-rose-400" />,
        color: "from-rose-400 to-rose-600"
      };
    }
    return {
      title: "Ready for a Reset?",
      message: `Every day is a fresh start, ${userName}. Even a 10-minute walk can completely shift your mood and energy. Shall we try?`,
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-400 to-teal-500"
    };
  };

  const coach = getCoachMessage();

  return (
    <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden group cursor-pointer transition-all hover:scale-[1.01]">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-br ${coach.color} p-8 text-white relative`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="flex items-start gap-6 relative z-10">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-3xl shadow-inner">
              {coach.icon}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">Daily Coach</span>
                <h3 className="text-2xl font-black">{coach.title}</h3>
              </div>
              <p className="text-lg opacity-90 leading-relaxed font-medium">
                "{coach.message}"
              </p>
              <div className="pt-4 flex items-center text-sm font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Full Analysis <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCoach;