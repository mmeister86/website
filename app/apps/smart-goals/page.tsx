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
      const response = await fetch('https://api.mistral.ai/v1/smart-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ goal })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setSmartGoals(data.goals);
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
