'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'

interface SetupConfigurationPageProps {
  data?: Pillar2Data["setupGuides"]
  onChange: (data: Pillar2Data["setupGuides"]) => void
  errors?: Record<string, string[]>
  onNextSection: () => void
  canProceed: boolean
}

export default function SetupConfigurationPage({ data, onChange, errors, onNextSection, canProceed }: SetupConfigurationPageProps) {
  const updateField = (field: keyof Pillar2Data["setupGuides"], value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Setup & Configuration Guides</h3>
      <p>
        Follow the step-by-step instructions to create accounts, connect platforms, and integrate key tools.
      </p>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Integration Notes</label>
        <textarea
          value={data?.integrationNotes || ''}
          onChange={(e) => updateField('integrationNotes', e.target.value)}
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
          placeholder="Enter any notes or observations from your tool setup process..."
        />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Account Setup Complete</label>
        <select
          value={data?.accountSetupComplete ? 'yes' : 'no'}
          onChange={(e) => updateField('accountSetupComplete', e.target.value === 'yes')}
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </div>
  )
}