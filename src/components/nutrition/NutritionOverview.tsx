"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface NutritionOverviewProps {
  logs: any[];
}

const NutritionOverview = ({ logs = [] }: NutritionOverviewProps) => {
  const data = [
    { name: 'Logged', value: logs.length },
    { name: 'Remaining', value: Math.max(0, 5 - logs.length) },
  ];

  const COLORS = ['#10b981', '#f1f5f9'];

  return (
    <Card className="rounded-3xl border-slate-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Daily Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <p className="text-2xl font-black text-slate-800">{logs.length}</p>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Items Logged Today</p>
        </div>
        <div className="mt-6 w-full space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Entries</p>
          {logs.slice(0, 3).map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-600">{log.food_item}</span>
              <span className="text-[10px] text-slate-400">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-sm text-slate-400 italic text-center py-4">No entries yet today.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionOverview;