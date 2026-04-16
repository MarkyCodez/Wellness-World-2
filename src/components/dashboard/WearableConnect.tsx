"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Check, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const providers = [
  { id: 'google_fit', name: 'Google Fit', color: 'hover:bg-blue-50' },
  { id: 'apple_health', name: 'Apple Health', color: 'hover:bg-rose-50' },
  { id: 'fitbit', name: 'Fitbit', color: 'hover:bg-teal-50' }
];

const WearableConnect = () => {
  const [connections, setConnections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('wearable_connections')
      .select('provider')
      .eq('user_id', user.id);

    if (data) {
      setConnections(data.map(c => c.provider));
    }
    setLoading(false);
  };

  const handleConnect = async (providerId: string) => {
    // In a real app, this would trigger the OAuth flow
    // For now, we'll simulate a successful connection
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('wearable_connections')
        .upsert({
          user_id: user.id,
          provider: providerId,
          last_synced_at: new Date().toISOString()
        });

      if (error) throw error;

      setConnections(prev => [...prev, providerId]);
      showSuccess(`Successfully connected to ${providerId.replace('_', ' ')}!`);
    } catch (error: any) {
      showError(error.message);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-300" /></div>;

  return (
    <Card className="rounded-3xl border-slate-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-rose-500" /> Connect Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {providers.map((provider) => {
          const isConnected = connections.includes(provider.id);
          return (
            <Button
              key={provider.id}
              variant="outline"
              className={`w-full justify-between rounded-xl py-6 border-slate-100 transition-all ${provider.color}`}
              onClick={() => !isConnected && handleConnect(provider.id)}
              disabled={isConnected}
            >
              <span className="font-medium text-slate-600">{provider.name}</span>
              {isConnected ? (
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase">
                  <Check className="w-4 h-4" /> Connected
                </div>
              ) : (
                <span className="text-xs text-slate-400">Connect</span>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default WearableConnect;