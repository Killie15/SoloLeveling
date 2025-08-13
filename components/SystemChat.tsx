import React from 'react';

const SystemMessage = ({ text }: { text: string }) => (
    <div className="chat-message">
        <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
                <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-700 text-gray-200">
                        <span className="font-bold text-cyan-400">[SYSTEM]: </span>{text}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const UserMessage = ({ text }: { text: string }) => (
    <div className="chat-message">
        <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
                <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-cyan-600 text-white">{text}</span></div>
            </div>
        </div>
    </div>
);


const SystemChat = () => {
    // Mock Chat History
    const chatHistory = [
        { from: 'system', text: 'Hmph. Another task falls. Do not mistake basic compliance for mastery.' },
        { from: 'user', text: 'I completed the LeetCode challenge.' },
        { from: 'system', text: 'Pathetic. Your "Vitality" takes a hit, a consequence of your utter lack of discipline. Do not waste my time with excuses.' },
        { from: 'user', text: 'I missed my morning run today.' },
    ];


    return (
        <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-6 text-white font-sans mt-8">
            <h3 className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-3 mb-4">SYSTEM CHAT</h3>

            <div className="h-64 space-y-4 overflow-y-auto p-4 bg-gray-900/50 rounded-md border border-gray-700">
                {chatHistory.map((msg, i) => (
                    msg.from === 'system'
                        ? <SystemMessage key={i} text={msg.text} />
                        : <UserMessage key={i} text={msg.text} />
                ))}
            </div>

            <div className="mt-4 flex">
                <input
                    type="text"
                    placeholder="Message The System... (disabled)"
                    disabled
                    className="w-full bg-gray-800 border border-gray-700 rounded-l-lg p-2 focus:outline-none text-gray-400"
                />
                <button
                    disabled
                    className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-r-lg opacity-50 cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default SystemChat;
