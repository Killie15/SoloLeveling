export interface CoreStat {
  name: 'Vitality' | 'Intellect' | 'Discipline' | 'Charisma' | 'Agility';
  value: number;
}

export interface Quest {
  id: number;
  name: string;
  type: 'daily' | 'challenge';
  difficulty: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier' | 'D-Tier' | 'E-Tier' | 'F-Tier';
  difficultyColor: string;
  reward: {
    xp: number;
    gold: number;
  };
  time: string;
  flavorText: string;
  completed: boolean;
}

export interface SubSkill {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
}

export interface Saga {
  name:string;
  description: string;
  skills: SubSkill[];
}

export interface InventoryItem {
  name: string;
  description: string;
  quantity: number;
}

export interface RealWorldReward {
    name: string;
    cost: number;
}

export interface UserProfile {
  level: number;
  rank: string;
  xp: number;
  xpMax: number;
  hp: number;
  hpMax: number;
  stats: {
    Vitality: number;
    Intellect: number;
    Discipline: number;
    Charisma: number;
    Agility: number;
  };
}

export interface AppState {
    loading: boolean;
    userProfile: UserProfile | null;
    quests: Quest[];
    sagas: Saga[];
    inventory: {
        gold: number;
        gems: number;
        consumables: InventoryItem[];
    } | null;
    realWorldRewards: RealWorldReward[];
}
