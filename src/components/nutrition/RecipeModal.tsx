"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, CheckCircle2, Sparkles } from 'lucide-react';

interface RecipeModalProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none">
        <div className="relative h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <ChefHat className="w-20 h-20 text-white/30" />
          <div className="absolute bottom-4 left-6">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-none mb-2">
              {recipe.tag}
            </Badge>
            <h2 className="text-3xl font-black text-white">{recipe.title}</h2>
          </div>
        </div>
        
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" /> 25 mins
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" /> 2 servings
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Personalized for you
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Why this fits your goals</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
              {recipe.desc} This meal is rich in essential nutrients that support your journey towards {recipe.tag.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Ingredients</h3>
              <ul className="space-y-2">
                {['Fresh greens', 'Lean protein source', 'Healthy fats', 'Complex carbs', 'Herbs & Spices'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Steps</h3>
              <div className="space-y-4">
                {[
                  'Prep your fresh ingredients with love.',
                  'Lightly cook your protein source.',
                  'Assemble your beautiful bowl.',
                  'Enjoy mindfully and celebrate your health!'
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-emerald-500 font-black text-lg leading-none">{i + 1}</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;