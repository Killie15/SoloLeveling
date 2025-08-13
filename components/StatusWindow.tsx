"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';

const StatBar = ({ label, value, maxValue, colorClass }: { label: string; value: number; maxValue: number; colorClass: string }) => (
  <div className="w-full bg-gray-800/50 rounded-full h-4 my-1 border border-gray-700">
    <div
      className={`${colorClass} h-full rounded-full transition-all duration-500`}
      style={{ width: `${(value / maxValue) * 100}%` }}
    />
    <span className="absolute -mt-4 ml-2 text-xs font-mono tracking-tighter">{`${label}: ${value}/${maxValue}`}</span>
  </div>
);

const CoreStat = ({ name, value }: { name: string; value: number }) => (
    <div className="flex justify-between items-center text-lg py-1">
        <span className="font-mono text-gray-300">{name}:</span>
        <span className="font-bold text-cyan-300">{value}</span>
    </div>
);

const StatusWindow = () => {
  const { userProfile } = useAppContext();

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-6 text-white font-sans">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h2 className="text-3xl font-bold text-cyan-400">STATUS</h2>
        <div className="text-right">
            <p className="text-xl font-semibold">Level {userProfile.level}</p>
            <p className="text-lg text-yellow-400 font-mono">{userProfile.rank}</p>
        </div>
      </div>

      <div className="space-y-4">
        <StatBar label="HP" value={userProfile.hp} maxValue={userProfile.hpMax} colorClass="bg-red-500" />
        <StatBar label="XP" value={userProfile.xp} maxValue={userProfile.xpMax} colorClass="bg-blue-500" />
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-xl font-semibold text-center mb-3 text-cyan-400">CORE STATS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <CoreStat name="Vitality" value={userProfile.stats.Vitality} />
            <CoreStat name="Intellect" value={userProfile.stats.Intellect} />
            <CoreStat name="Discipline" value={userProfile.stats.Discipline} />
            <CoreStat name="Charisma" value={userProfile.stats.Charisma} />
            <CoreStat name="Agility" value={userProfile.stats.Agility} />
        </div>
      </div>
    </div>
  );
};

export default StatusWindow;
