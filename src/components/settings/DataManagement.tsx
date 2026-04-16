"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DataManagement = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [logs, nutrition, profile] = await Promise.all([
        supabase.from('daily_logs').select('*').eq('user_id', user.id),
        supabase.from('nutrition_logs').select('*').eq('user_id', user.id),
        supabase.from('profiles').select('*').eq('id', user.id).single()
      ]);

      const exportData = {
        user_id: user.id,
        exported_at: new Date().toISOString(),
        profile: profile.data,
        activity_logs: logs.data,
        nutrition_logs: nutrition.data
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wellness-world-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showSuccess("Your data has been exported successfully!");
    } catch (error: any) {
      showError("Failed to export data: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await Promise.all([
        supabase.from('daily_logs').delete().eq('user_id', user.id),
        supabase.from('nutrition_logs').delete().eq('user_id', user.id),
        supabase.from('wearable_connections').delete().eq('user_id', user.id),
        supabase.from('profiles').delete().eq('id', user.id)
      ]);

      showSuccess("All your data has been permanently deleted.");
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error: any) {
      showError("Failed to delete data: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="rounded-[2rem] border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Data Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full justify-start rounded-xl py-6 border-slate-100"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2 text-slate-400" />}
            Export My Data (JSON)
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start rounded-xl py-6 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All My Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem]">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" /> Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your activity logs, nutrition data, and profile information from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAllData}
                  className="bg-rose-500 hover:bg-rose-600 rounded-xl"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;