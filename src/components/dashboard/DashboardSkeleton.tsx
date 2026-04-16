"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
        <Skeleton className="h-64 w-full rounded-[2.5rem]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-[2.5rem]" />)}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;