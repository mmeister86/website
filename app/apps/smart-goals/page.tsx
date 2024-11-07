"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SmartGoals = () => {
  const [goal, setGoal] = useState('');
  const [smartGoals, setSmartGoals] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
    if (!apiKey) {
      console.error('API key not found in .env');
      return;
    }

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-tiny',
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
      setSmartGoals(smartGoalResponse.split('\n').filter((goal: string) => goal.trim() !== ''));
    } catch (error) {
      console.error('Error fetching SMART goals:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 md:p-24 max-w-5xl mx-auto">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight transition-transform ease-in-out">
            SMART Goals Generator
          </h1>
          
          <div className="space-y-4 text-lg text-neutral-600 font-medium">
            <p>Transform your goals into precise, achievable plans.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="text" 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)} 
              placeholder="Enter your goal"
              className="text-lg"
            />
            <Button type="submit" className="bg-[#ff9f43] hover:bg-[#ff9f43]/80">
              Generate SMART Goals
            </Button>
          </form>

          {smartGoals.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Your SMART Goals</h2>
              <ul className="space-y-2 text-neutral-600">
                {smartGoals.map((goal, index) => (
                  <li key={index} className="flex items-center gap-2 text-lg font-medium">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SmartGoals;
