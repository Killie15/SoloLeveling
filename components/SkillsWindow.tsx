"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Saga as SagaType, SubSkill as SubSkillType } from '@/lib/types';

const SkillBar = ({ level, xp, maxXp }: { level: number; xp: number; maxXp: number }) => (
  <div className="w-full bg-gray-800/70 rounded-full h-3 my-1 border border-gray-600">
    <div
      className="bg-purple-500 h-full rounded-full transition-all duration-500"
      style={{ width: `${(xp / maxXp) * 100}%` }}
    />
    <span className="absolute -mt-3 right-0 -mr-2 text-xs font-mono text-gray-400">{`${xp}/${maxXp}`}</span>
    <span className="absolute -mt-3 ml-2 text-xs font-mono text-gray-300">{`Lv. ${level}`}</span>
  </div>
);

const SubSkill = ({ skill }: { skill: SubSkillType }) => (
    <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
        <h5 className="font-semibold text-gray-200">{skill.name}</h5>
        <SkillBar level={skill.level} xp={skill.xp} maxXp={skill.maxXp} />
    </div>
);

const Saga = ({ saga }: { saga: SagaType }) => (
    <div className="bg-black/40 p-4 rounded-lg border border-purple-800/50">
        <h4 className="text-xl font-bold text-purple-400">{saga.name}</h4>
        <p className="text-sm text-gray-400 italic mb-4">"{saga.description}"</p>
        <div className="space-y-3">
            {saga.skills.map((skill: SubSkillType, index: number) => <SubSkill key={index} skill={skill} />)}
        </div>
    </div>
);


const SkillsWindow = () => {
  const { state: { sagas } } = useAppContext();

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-6 text-white font-sans mt-8">
      <h3 className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-3 mb-4">SKILLS</h3>
      <div className="space-y-6">
        {sagas.map((saga, index) => <Saga key={index} saga={saga} />)}
      </div>
    </div>
  );
};

export default SkillsWindow;
