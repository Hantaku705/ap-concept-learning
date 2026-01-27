'use client';

import { useState } from 'react';
import { StepCard } from '../sections/StepCard';
import { cn } from '../../lib/cn';
import { gettingStartedSteps } from '../../data/onboarding-data';

export function GettingStartedTab() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Getting Started
        </h2>
        <span className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          ~32 min
        </span>
      </div>

      {/* Step pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {gettingStartedSteps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(index)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              index === activeStep
                ? 'bg-indigo-500 text-white shadow-sm'
                : index < activeStep
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {gettingStartedSteps.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} isActive={index === activeStep} />
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveStep(Math.min(gettingStartedSteps.length - 1, activeStep + 1))}
          disabled={activeStep === gettingStartedSteps.length - 1}
          className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white disabled:opacity-30 hover:bg-indigo-600 transition-colors font-medium text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
