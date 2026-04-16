"use client";

import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacySection = () => {
  return (
    <Card className="rounded-[2rem] border-none shadow-sm bg-indigo-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-indigo-900">
          <ShieldCheck className="w-5 h-5 text-indigo-500" /> Your Privacy Matters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-indigo-800/80 leading-relaxed">
          At Wellness World, your health data belongs to <strong>you</strong>. We use industry-standard encryption and never sell or share your personal information with third parties without your explicit permission.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-900">End-to-End Security</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl">
            <EyeOff className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-900">Private by Default</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySection;