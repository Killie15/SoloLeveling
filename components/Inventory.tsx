"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { InventoryItem as InventoryItemType, RealWorldReward as RealWorldRewardType } from '@/lib/types';

const CurrencyDisplay = ({ type, amount, icon }: { type: string; amount: number; icon: string }) => (
    <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700">
        <span className="text-2xl">{icon}</span>
        <div>
            <div className="font-bold text-lg leading-tight">{amount.toLocaleString()}</div>
            <div className="text-xs text-gray-400 leading-tight">{type}</div>
        </div>
    </div>
);

const InventoryItem = ({ item }: { item: InventoryItemType }) => (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center justify-between">
        <div>
            <h5 className="font-semibold text-gray-200">{item.name}</h5>
            <p className="text-sm text-gray-400">{item.description}</p>
        </div>
        <span className="text-xl font-mono font-bold text-cyan-300">x{item.quantity}</span>
    </div>
);

const RewardItem = ({ reward }: { reward: RealWorldRewardType }) => (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center justify-between">
        <div>
            <h5 className="font-semibold text-gray-200">{reward.name}</h5>
            <p className="text-sm text-gray-400">Cost: {reward.cost} Gold</p>
        </div>
        <button disabled className="bg-cyan-600 text-white font-bold py-1 px-3 rounded opacity-50 cursor-not-allowed">
            Redeem
        </button>
    </div>
);


const Inventory = () => {
    const { inventory, realWorldRewards } = useAppContext();

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-6 text-white font-sans mt-8">
            <h3 className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-3 mb-4">INVENTORY & REWARDS</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <CurrencyDisplay type="Gold" amount={inventory.gold} icon="💰" />
                <CurrencyDisplay type="Gems" amount={inventory.gems} icon="💎" />
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="text-xl font-semibold text-gray-300 mb-3">Consumables</h4>
                    <div className="space-y-2">
                        {inventory.consumables.map((item, i) => <InventoryItem key={i} item={item} />)}
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-gray-300 mb-3">Real-World Rewards</h4>
                    <div className="space-y-2">
                        {realWorldRewards.map((reward, i) => <RewardItem key={i} reward={reward} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
