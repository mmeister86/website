'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const SmartGoals = () => {
  const [goal, setGoal] = useState('');
  const [smartGoals, setSmartGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
    toast({
      title,
      description,
      variant,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch('/api/smart-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: goal
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API request failed: ${errorBody}`);
      }

      const smartGoals = await response.json();
      setSmartGoals(smartGoals);

      showToast(
        "Success",
        "Your SMART goals have been generated successfully.",
        "default"
      );
    } catch (error) {
      console.error('Error fetching SMART goals:', error);
      showToast(
        "Error",
        "There was a mistake. Please try again later.",
        "destructive"
      );
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
    <ToastProvider>
      <main className="min-h-screen flex items-center justify-center p-6 md:p-24 max-w-5xl mx-auto">
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
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
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
      </main>
      <ToastViewport />
    </ToastProvider>
  );
}

export default SmartGoals;
