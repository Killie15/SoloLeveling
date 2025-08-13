"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Quest } from '@/lib/types';

// A simple icon for the quest type
const QuestIcon = () => (
  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChallengeIcon = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
);


const QuestItem = ({ quest }: { quest: Quest }) => {
  const { dispatch } = useAppContext();

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_QUEST', payload: { questId: quest.id } });
  };

  return (
    <div className={`bg-gray-800/60 p-4 rounded-lg border border-gray-700 transition-all duration-300 flex items-start space-x-4 ${quest.completed ? 'opacity-50' : 'hover:border-cyan-500'}`}>
      <div className="flex-shrink-0 mt-1">
          {quest.type === 'daily' ? <QuestIcon /> : <ChallengeIcon />}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className={`text-lg font-bold ${quest.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}>{quest.name}</h4>
          <span className={`px-2 py-1 text-xs font-mono rounded-full ${quest.difficultyColor}`}>{quest.difficulty}</span>
        </div>
        <p className="text-sm text-gray-400 italic mt-1">"{quest.flavorText}"</p>
        <div className="mt-3 flex justify-between items-center text-sm font-mono text-gray-300">
          <span>Reward: {quest.reward.xp} XP, {quest.reward.gold} Gold</span>
          <span>Time: {quest.time}</span>
        </div>
      </div>
      <div className="flex-shrink-0 self-center">
        <button
          onClick={handleComplete}
          disabled={quest.completed}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-lg transition-colors"
        >
          {quest.completed ? 'Done' : 'Complete'}
        </button>
      </div>
    </div>
  );
}

const QuestLog = () => {
  const { state } = useAppContext();
  const { quests } = state;

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const challengeQuests = quests.filter(q => q.type === 'challenge');

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-6 text-white font-sans mt-8">
      <h3 className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-3 mb-4">QUEST LOG</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-yellow-400 mb-3">Daily Quests</h4>
          <div className="space-y-3">
            {dailyQuests.map((q) => <QuestItem key={q.id} quest={q} />)}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-red-500 mb-3">Challenge Quests</h4>
          <div className="space-y-3">
            {challengeQuests.map((q) => <QuestItem key={q.id} quest={q} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestLog;
