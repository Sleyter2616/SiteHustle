'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'

interface Pillar2OverviewPageProps {
  data?: Pillar2Data
  onChange: (data: Partial<Pillar2Data>) => void
  errors?: Record<string, string[]>
}

export default function Pillar2OverviewPage({ data, onChange, errors }: Pillar2OverviewPageProps) {
  // This page mainly presents static content and can allow for notes input
  const updateField = (value: string) => {
    if (!data) return
    onChange({
      toolsLandscape: {
        ...data.toolsLandscape,
        overviewNotes: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Purpose & Goals</h3>
      <p>
        In this pillar, you will:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          Identify and evaluate the most relevant AI-driven and automation tools for your business.
        </li>
        <li>
          Develop an AI Bootcamp mindset through guided walkthroughs, hands-on mini-projects, and live Q&A sessions.
        </li>
        <li>
          Establish an integration framework by designing a workflow that leverages multiple AI tools.
        </li>
      </ul>
      <h4 className="text-lg font-medium mt-4">Why It Matters</h4>
      <ul className="list-disc list-inside ml-4">
        <li>Streamlined setup and scalable solutions.</li>
        <li>Competitive edge through effective AI integration.</li>
        <li>Actionable and practical outcomes that prepare you for building your website in Pillar 3.</li>
      </ul>
      <h4 className="text-lg font-medium mt-4">Key Outcomes</h4>
      <ul className="list-disc list-inside ml-4">
        <li>A structured decision matrix to evaluate tools.</li>
        <li>Hands-on experience through a guided project workflow.</li>
        <li>An actionable plan for tool setup and configuration.</li>
        <li>Clarity on integrating AI tools for content, automation, and marketing.</li>
      </ul>
      {/* Optional notes field */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-300">Your Notes (optional)</label>
        <textarea
          value={data?.toolsLandscape?.overviewNotes || ''}
          onChange={(e) => updateField(e.target.value)}
          className="mt-1 w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
          placeholder="Enter any additional notes about your goals and expectations..."
        />
      </div>
    </div>
  )
}