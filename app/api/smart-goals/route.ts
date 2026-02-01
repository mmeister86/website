import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();

    if (!goal) {
      return NextResponse.json(
        { error: 'Kein Ziel angegeben' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API-Schlüssel nicht konfiguriert' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-large-2407',
        messages: [
          {
            role: 'user',
            content: `Help me break down this goal into SMART criteria: ${goal}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API request failed: ${errorBody}`);
    }

    const data = await response.json();
    const smartGoalResponse = data.choices[0].message.content;
    const smartGoals = smartGoalResponse.split('\n').filter((goal: string) => goal.trim() !== '');

    return NextResponse.json(smartGoals);
  } catch (error) {
    console.error('Error generating SMART goals:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Generierung der SMART-Ziele' },
      { status: 500 }
    );
  }
}
