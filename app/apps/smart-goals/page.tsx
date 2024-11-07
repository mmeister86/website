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
      setSmartGoals(smartGoalResponse.split('\n').filter(goal => goal.trim() !== ''));
    } catch (error) {
      console.error('Error fetching SMART goals:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)} 
          placeholder="Enter your goal"
        />
        <Button type="submit">Generate SMART Goals</Button>
      </form>
      <ul>
        {smartGoals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
}

export default SmartGoals;
