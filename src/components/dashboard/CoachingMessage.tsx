"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface CoachingMessageProps {
  steps: number;
  stepGoal: number;
  activeMinutes: number;
}

const CoachingMessage = ({ steps, stepGoal, activeMinutes }: CoachingMessageProps) => {
  const getMessage = () => {
    const progress = (steps / stepGoal) * 100;
    
    if (progress >= 100) return "You've crushed your step goal today! That energy is absolutely showing. Take a moment to celebrate!";
    if (progress >= 75) return "Almost there! You're just a short walk away from hitting your goal. You've got this!";
    if (activeMinutes > 30) return "Great job on the active minutes! Your heart is thanking you for that movement.";
    if (steps > 0) return "Every step counts towards a healthier you. You're building great momentum!";
    return "Ready to start your journey today? Even a 5-minute walk makes a difference!";
  };

  return (
    <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 text-white">
      <div className="p-2 bg-white/20 rounded-full h-fit">
        <Sparkles className="w-5 h-5 text-amber-200" />
      </div>
      <div>
        <p className="font-medium leading-relaxed">
          {getMessage()}
        </p>
      </div>
    </div>
  );
};

export default CoachingMessage;