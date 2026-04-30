"use client";

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Utensils, 
  Sparkles, 
  User, 
  Settings, 
  Heart,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Fitness Plan', path: '/fitness' },
  { icon: Utensils, label: 'Nutrition Plan', path: '/nutrition' },
  { icon: Sparkles, label: 'Mind & Soul', path: '/mind' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
  <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
    <div className="p-6 flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 dark:shadow-none">
        <Heart className="w-6 h-6 text-white fill-white" />
      </div>
      <span className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Wellness World</span>
    </div>

    <nav className="flex-1 px-4 py-4 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200",
            isActive 
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 shadow-sm" 
              : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between px-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Theme</span>
        <ThemeToggle />
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-rose-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">Wellness Explorer</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pro Member</p>
        </div>
      </div>
    </div>
  </div>
);

export const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-500 fill-emerald-500" />
          <span className="font-black text-slate-800 dark:text-slate-100">Wellness World</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};