"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Check, Loader2, RefreshCw } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const providers = [
  { id: 'google_fit', name: 'Google Fit', color: 'hover:bg-blue-50' },
  { id: 'apple_health', name: 'Apple Health', color: 'hover:bg-rose-50' },
  { id: 'fitbit', name: 'Fitbit', color: 'hover:bg-teal-50' }
];

const WearableConnect = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('wearable_connections')
      .select('*')
      .eq('user_id', user.id);

    if (data) setConnections(data);
    setLoading(false);
  };

  const handleConnect = async (providerId: string) => {
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
      showSuccess(`Successfully connected to ${providerId.replace('_', ' ')}!`);
      fetchConnections();
    } catch (error: any) {
      showError(error.message);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSyncing(false);
    showSuccess("All your health data is now up to date!");
  };

  if (loading) return null;

  const isAnyConnected = connections.length > 0;

  return (
    <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-rose-500" /> Devices
          </div>
          {isAnyConnected && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSync} 
              disabled={syncing}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full h-8"
            >
              {syncing ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
              Sync Now
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {providers.map((provider) => {
          const connection = connections.find(c => c.provider === provider.id);
          const isConnected = !!connection;
          return (
            <Button
              key={provider.id}
              variant="outline"
              className={`w-full justify-between rounded-2xl py-6 border-slate-100 transition-all ${provider.color} ${isConnected ? 'bg-slate-50/50' : ''}`}
              onClick={() => !isConnected && handleConnect(provider.id)}
              disabled={isConnected}
            >
              <div className="flex flex-col items-start">
                <span className="font-bold text-slate-700 text-sm">{provider.name}</span>
                {isConnected && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    Last synced: {new Date(connection.last_synced_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              {isConnected ? (
                <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  <Check className="w-3 h-3" /> Connected
                </div>
              ) : (
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect</span>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default WearableConnect;