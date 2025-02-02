'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'
import { ToolSection } from '@/components/tools/ToolSection'
import { websiteBuilders, appBuilders, automationTools, databaseTools, aiTools, lowCodeTools, integrationTools } from '@/types/tools'

interface ToolsLandscapePageProps {
  data?: Pillar2Data["toolsLandscape"]
  onChange: (data: Pillar2Data["toolsLandscape"]) => void
  errors?: Record<string, string[]>
  onNextSection: () => void
}

export default function ToolsLandscapePage({ data, onChange, errors, onNextSection }: ToolsLandscapePageProps) {
  // Handler for tool selection (for simplicity, adds tool to secondary selection)
  const handleToolSelect = (toolId: string) => {
    onChange({
      ...data,
      selectedTools: [
        ...(data?.selectedTools || []),
        toolId
      ]
    })
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Tools Landscape</h3>
      <p>
        Review the curated list of AI, no-code, and automation tools. Use the sections below to evaluate the tools that best fit your needs.
      </p>
      <div className="space-y-12">
        <ToolSection
          title="Website & Landing Page Builders"
          description="No-code platforms to quickly build your website or landing page."
          tools={websiteBuilders}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="App Builders"
          description="Create mobile and web applications without coding."
          tools={appBuilders}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="Automation & Workflow Tools"
          description="Streamline your processes with powerful automation platforms."
          tools={automationTools}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="Databases & Backend Tools"
          description="Choose the right backend solution for your applications."
          tools={databaseTools}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="AI-Powered Tools"
          description="Leverage AI for content, image generation, and productivity."
          tools={aiTools}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="Low-Code Solutions"
          description="Build internal tools with minimal coding."
          tools={lowCodeTools}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
        <ToolSection
          title="Specialized Tools & Integrations"
          description="Essential integrations for payments, analytics, and more."
          tools={integrationTools}
          selectedTools={data?.selectedTools || []}
          onToolSelect={handleToolSelect}
        />
      </div>
    </div>
  )
}