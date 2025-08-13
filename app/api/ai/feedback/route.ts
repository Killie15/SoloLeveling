import { NextResponse } from 'next/server';

const responses = {
    COMPLETE_QUEST: [
        "Hmph. Another task falls. Do not mistake basic compliance for mastery.",
        "Expected. Nothing more. The path to excellence is paved with such trivialities.",
        "A single step. Do not delude yourself into thinking you've reached the summit.",
        "Good. Now do it again, but faster. Efficiency is a weapon."
    ],
    LEVEL_UP: [
        "SYSTEM: LEVEL UP! But do not expect praise for merely achieving the obvious.",
        "Your power grows. But so do the shadows that lurk ahead. Do not grow complacent.",
        "A new threshold is crossed. This only means the next trial will be harsher. Prepare yourself."
    ],
    FAIL_QUEST: [
        "Pathetic. Your 'Vitality' takes a hit, a consequence of your utter lack of discipline.",
        "Failure is a harsh teacher. Learn the lesson, or be broken by it.",
        "Disappointing. The System requires more from you. Do not make this a habit."
    ]
};

type EventType = keyof typeof responses;

export async function POST(request: Request) {
  try {
    const { eventType } = await request.json() as { eventType: EventType };

    if (!responses[eventType]) {
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }

    const possibleResponses = responses[eventType];
    const randomIndex = Math.floor(Math.random() * possibleResponses.length);
    const feedback = possibleResponses[randomIndex];

    return NextResponse.json({ feedback });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
