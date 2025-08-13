"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Quest, Saga, UserProfile } from '@/lib/types';
import { playTaskCompleteSound, playLevelUpSound } from '@/lib/sounds';

// --- Initial State Definition ---
const initialState: AppState = {
    loading: true,
    userProfile: null,
    quests: [],
    sagas: [],
    inventory: null,
    realWorldRewards: [],
};

// --- Reducer Logic ---
type Action =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_INITIAL_DATA'; payload: AppState }
    | { type: 'COMPLETE_QUEST'; payload: { questId: number } };

const levelUp = (profile: UserProfile): UserProfile => {
    if (profile.xp < profile.xpMax) return profile;

    // Level up occurred
    playLevelUpSound(); // Play sound on level up
    return {
        ...profile,
        level: profile.level + 1,
        xp: profile.xp - profile.xpMax,
        xpMax: Math.floor(profile.xpMax * 1.5),
    };
}

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'SET_INITIAL_DATA':
            return { ...action.payload, loading: false };

        case 'COMPLETE_QUEST': {
            const { questId } = action.payload;
            const quest = state.quests.find(q => q.id === questId);

            if (!quest || quest.completed || !state.userProfile || !state.inventory) {
                return state;
            }

            playTaskCompleteSound(); // Play sound on task completion

            const updatedQuests = state.quests.map(q =>
                q.id === questId ? { ...q, completed: true } : q
            );

            let updatedUserProfile = {
                ...state.userProfile,
                xp: state.userProfile.xp + quest.reward.xp,
            };
            updatedUserProfile = levelUp(updatedUserProfile);

            const updatedInventory = {
                ...state.inventory,
                gold: state.inventory.gold + quest.reward.gold,
            };

            return {
                ...state,
                userProfile: updatedUserProfile,
                quests: updatedQuests,
                inventory: updatedInventory,
            };
        }
        default:
            return state;
    }
};

// --- Context Definition ---
type AppContextType = {
    state: AppState;
    dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const response = await fetch('/api/user');
                const data: AppState = await response.json();
                dispatch({ type: 'SET_INITIAL_DATA', payload: data });
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
