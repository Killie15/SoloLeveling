"use client";

import StatusWindow from '@/components/StatusWindow';
import QuestLog from '@/components/QuestLog';
import SkillsWindow from '@/components/SkillsWindow';
import Inventory from '@/components/Inventory';
import SystemChat from '@/components/SystemChat';
import { useAppContext } from '@/contexts/AppContext';

export default function Home() {
  const { state } = useAppContext();

  if (state.loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-cyan-400">The System</h1>
        <p className="mt-4 text-lg text-gray-400 animate-pulse">LOADING...</p>
      </main>
    );
  }

  if (!state.userProfile || !state.inventory) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-red-500">ERROR</h1>
            <p className="mt-4 text-lg text-gray-400">Failed to load user data. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl space-y-8 fade-in">
        <StatusWindow />
        <QuestLog />
        <SkillsWindow />
        <Inventory />
        <SystemChat />
      </div>
    </main>
  );
}
