"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, Award, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', steps: 8400, sleep: 7.5, active: 45 },
  { name: 'Tue', steps: 9200, sleep: 8.0, active: 50 },
  { name: 'Wed', steps: 7800, sleep: 6.5, active: 30 },
  { name: 'Thu', steps: 10500, sleep: 7.2, active: 65 },
  { name: 'Fri', steps: 11200, sleep: 8.2, active: 70 },
  { name: 'Sat', steps: 6500, sleep: 9.0, active: 20 },
  { name: 'Sun', steps: 8900, sleep: 7.8, active: 40 },
];

interface InsightsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Insights = ({ isOpen, onClose }: InsightsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] rounded-[2.5rem] p-0 overflow-hidden border-none flex flex-col">
        <DialogHeader className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <DialogTitle className="text-3xl font-black">Your Wellness Journey</DialogTitle>
          </div>
          <p className="text-indigo-100 opacity-90">Deep dive into your progress and celebrate your wins!</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950">
          <Tabs defaultValue="activity" className="space-y-8">
            <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <TabsTrigger value="activity" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-indigo-500 data-[state=active]:text-white font-bold">Activity</TabsTrigger>
              <TabsTrigger value="sleep" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-indigo-500 data-[state=active]:text-white font-bold">Sleep</TabsTrigger>
              <TabsTrigger value="goals" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-indigo-500 data-[state=active]:text-white font-bold">Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Avg Steps', value: '8,450', icon: Zap, color: 'text-amber-500' },
                  { label: 'Active Days', value: '6/7', icon: Calendar, color: 'text-emerald-500' },
                  { label: 'Best Streak', value: '12 Days', icon: Award, color: 'text-rose-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[400px]">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6">Weekly Activity Trends</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="steps" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSteps)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="sleep" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[400px]">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6">Sleep Quality Analysis</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="sleep" fill="#818cf8" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-4">
                {[
                  { label: 'Step Goal', current: 8450, target: 10000, color: 'bg-amber-400' },
                  { label: 'Active Minutes', current: 45, target: 60, color: 'bg-emerald-400' },
                  { label: 'Sleep Goal', current: 7.5, target: 8, color: 'bg-indigo-400' },
                ].map((goal, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{goal.label}</span>
                      <span className="text-sm font-black text-slate-400">{Math.round((goal.current / goal.target) * 100)}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${goal.color} transition-all duration-1000`} 
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Insights;