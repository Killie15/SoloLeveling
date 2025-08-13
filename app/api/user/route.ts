import { NextResponse } from 'next/server';
import { AppState, Quest, Saga, UserProfile } from '@/lib/types';

// This data would normally come from a database
const initialUserProfile: UserProfile = {
    level: 31, rank: 'A-Tier', xp: 1995, xpMax: 2000, hp: 95, hpMax: 100,
    stats: { Vitality: 85, Intellect: 92, Discipline: 88, Charisma: 78, Agility: 80 },
};
const initialQuests: Quest[] = [
    { id: 1, name: 'Morning Run', type: 'daily', difficulty: 'D-Tier', difficultyColor: 'bg-green-900 text-green-300', reward: { xp: 10, gold: 5 }, time: '30 min', flavorText: 'The body must be forged. Do not neglect the basics.', completed: false },
    { id: 2, name: 'Meditation', type: 'daily', difficulty: 'E-Tier', difficultyColor: 'bg-blue-900 text-blue-300', reward: { xp: 5, gold: 0 }, time: '15 min', flavorText: 'A chaotic mind is a liability. Sharpen your focus.', completed: false },
    { id: 3, name: 'Solve 3 LeetCode Problems', type: 'challenge', difficulty: 'B-Tier', difficultyColor: 'bg-purple-900 text-purple-300', reward: { xp: 50, gold: 20 }, time: '~90 min', flavorText: 'True intellect is demonstrated, not claimed. Prove your worth.', completed: false },
    { id: 4, name: 'Finish Chapter 1 of Lean Six Sigma', type: 'challenge', difficulty: 'C-Tier', difficultyColor: 'bg-yellow-900 text-yellow-300', reward: { xp: 30, gold: 10 }, time: '~60 min', flavorText: 'Knowledge is power. Absorb and conquer.', completed: false }
];
const initialSagas: Saga[] = [
    { name: 'The Architect\'s Ascent', description: 'Mastery over data and its visualization.', skills: [{ name: 'Python', level: 5, xp: 150, maxXp: 500 }, { name: 'PowerBI', level: 3, xp: 200, maxXp: 300 }, { name: 'SQL', level: 4, xp: 50, maxXp: 400 }] },
    { name: 'The Diplomat\'s Path', description: 'Understanding and connecting with the world.', skills: [{ name: 'Japanese', level: 2, xp: 100, maxXp: 200 }, { name: 'Interpersonal Skills', level: 6, xp: 300, maxXp: 600 }] }
];
const initialState: AppState = {
    userProfile: initialUserProfile,
    quests: initialQuests,
    sagas: initialSagas,
    inventory: { gold: 1540, gems: 250, consumables: [{ name: 'XP Potion (Minor)', description: '+50 XP upon use', quantity: 2 }, { name: 'HP Potion', description: 'Restores 25 HP', quantity: 5 }] },
    realWorldRewards: [{ name: 'New Technical Book', cost: 2500 }, { name: 'Weekend Trip Fund', cost: 10000 }],
};


export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(initialState);
}
