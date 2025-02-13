'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadWizardData } from '@/lib/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';

const WizardConclusion: React.FC = () => {
  const [finalPlan, setFinalPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadFinalPlan = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.error('Please sign in to continue');
          router.push('/login');
          return;
        }

        const savedSteps = await loadWizardData(session.user.id);
        const reviewStep = savedSteps.find(step => step.step_id === 'review');
        
        if (reviewStep?.ai_output) {
          // Format the AI output based on its type
          const formattedOutput = typeof reviewStep.ai_output === 'object' 
            ? JSON.stringify(reviewStep.ai_output, null, 2)
            : reviewStep.ai_output;
            
          setFinalPlan(formattedOutput);
        } else {
          toast.error('No final plan found.');
        }
      } catch (error) {
        console.error('Error loading final plan:', error);
        toast.error('Failed to load final plan.');
      } finally {
        setIsLoading(false);
      }
    };
    loadFinalPlan();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Your AI-Generated Business Plan</h1>
        
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm">{finalPlan || 'No plan content available.'}</pre>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              const blob = new Blob([finalPlan], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'Business_Plan.txt';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Download as Text
          </button>
          
          <button
            onClick={() => router.push('/tool-automation-planning')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200"
          >
            Continue to Tool & Automation Planning
          </button>
        </div>
      </div>
    </div>
  );
};

export default WizardConclusion;
