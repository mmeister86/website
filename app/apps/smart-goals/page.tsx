"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SmartGoals = () => {
  const [goal, setGoal] = useState('');
  const [smartGoals, setSmartGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
    if (!apiKey) {
      console.error('API key not found in .env');
      return;
    }

    setIsLoading(true);

    try {
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
      setSmartGoals(smartGoalResponse.split('\n').filter((goal: string) => goal.trim() !== ''));
    } catch (error) {
      console.error('Error fetching SMART goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMarkdown = () => {
    const markdownContent = smartGoals.join('\n\n');
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart_goals.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 md:p-24 max-w-5xl mx-auto">
      <div className="flex flex-col gap-12 w-full">
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
            <Button 
              type="submit" 
              className={cn(
                "bg-[#ff9f43] hover:bg-[#ff9f43]/80 relative",
                isLoading && "bg-gray-400 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Generate SMART Goals'
              )}
            </Button>
          </form>


            {smartGoals.length > 0 && !isLoading && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Your SMART Goals</h2>
                <Button 
                  onClick={downloadMarkdown} 
                  className="bg-green-500 hover:bg-green-600"
                >
                  Download Markdown
                </Button>
              </div>
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
      </div>
    </main>
  );
}

export default SmartGoals;
