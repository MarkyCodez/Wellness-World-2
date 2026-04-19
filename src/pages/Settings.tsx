"use client";

import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import AppPreferences from '../components/settings/AppPreferences';
import PrivacySection from '../components/settings/PrivacySection';
import DataManagement from '../components/settings/DataManagement';
import WearableConnect from '../components/dashboard/WearableConnect';

const Settings = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your preferences and data security.</p>
        </div>

        <AppPreferences />
        <PrivacySection />
        <WearableConnect />
        <DataManagement />
      </div>
    </AppLayout>
  );
};

export default Settings;