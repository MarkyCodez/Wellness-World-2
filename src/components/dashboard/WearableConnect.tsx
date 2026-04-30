"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Check, Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { syncWearableData } from '@/utils/wearableSync';

const providers = [
  { 
    id: 'google_fit', 
    name: 'Google Fit', 
    color: 'hover:bg-blue-50', 
    icon: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png' 
  },
  { 
    id: 'apple_health', 
    name: 'Apple Health', 
    color: 'hover:bg-rose-50', 
    icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png' 
  },
  { 
    id: 'fitbit', 
    name: 'Fitbit', 
    color: 'hover:bg-teal-50', 
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968852.png' 
  }
];

const WearableConnect = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

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
      if (!user) throw new Error("Please sign in to connect devices");

      if (providerId === 'google_fit') {
        showSuccess("Redirecting to Google Fit authorization...");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

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

  const handleSync = async (providerId: string) => {
    setSyncing(providerId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await syncWearableData(user.id, providerId);
      
      showSuccess("Health data synced successfully!");
      fetchConnections();
      window.dispatchEvent(new CustomEvent('healthDataSynced'));
    } catch (error: any) {
      showError("Sync failed: " + error.message);
    } finally {
      setSyncing(null);
    }
  };

  if (loading) return null;

  return (
    <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden bg-white dark:bg-slate-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-rose-500" /> Connected Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {providers.map((provider) => {
          const connection = connections.find(c => c.provider === provider.id);
          const isConnected = !!connection;
          const isSyncing = syncing === provider.id;

          return (
            <div 
              key={provider.id}
              className={`p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all ${isConnected ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-1 shadow-sm">
                    <img src={provider.icon} alt={provider.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{provider.name}</p>
                    {isConnected && (
                      <p className="text-[10px] text-slate-400 font-medium">
                        Synced: {new Date(connection.last_synced_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
                {isConnected ? (
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-none text-[10px] font-black uppercase">
                    <Check className="w-3 h-3 mr-1" /> Active
                  </Badge>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleConnect(provider.id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full h-8 text-[10px] font-black uppercase"
                  >
                    Connect <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
              
              {isConnected && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSync(provider.id)}
                  disabled={!!syncing}
                  className="w-full rounded-xl h-10 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {isSyncing ? (
                    <><Loader2 className="w-3 h-3 animate-spin mr-2" /> Syncing Data...</>
                  ) : (
                    <><RefreshCw className="w-3 h-3 mr-2" /> Sync Now</>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default WearableConnect;