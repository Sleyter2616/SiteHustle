"use client"

import React, { useEffect, useState } from "react"
import { Pillar2Data, SectionValidationState } from "@/types/pillar2"
import { usePillar2Sections } from "@/hooks/usePillar2Sections"
import { loadPillarData, savePillarData } from "@/utils/storage"
import { useRouter } from "next/navigation"
import {
  saveProgress,
  getProgress,
  markSectionComplete,
  updateLastActiveSection,
  markPillarComplete,
  isPillarComplete,
  getLastActiveSection,
} from "@/utils/progressStorage"

import ToolsLandscapePage from "../pillar2/ToolsLandscapePage"
import DecisionMatrixPage from "../pillar2/DecisionMatrixPage"
import AiBootcampModulePage from "../pillar2/AiBootcampModulePage"
import SetupConfigurationPage from "../pillar2/SetupConfigurationPage"
import BestPracticesPage from "../pillar2/BestPracticesPage"
import Pillar2IntroPage from "../pillar2/Pillar2IntroPage"
import Pillar2ConclusionPage from "../pillar2/Pillar2ConclusionPage"

import { toast } from "react-hot-toast"

interface Pillar2ContentProps {
  data?: Pillar2Data | null
  onDataChange?: (updated: Pillar2Data) => void
}

function getEmptyPillar2Data(): Pillar2Data {
  return {
    userId: "",
    progress: {
      completedTasks: 0,
      totalTasks: 5,
      aiBootcamp: {
        modules: [],
      },
      toolSetup: {
        tools: [],
      },
      matrixCompleted: false,
    },
    toolsLandscape: {
      selectedTools: [],
      toolRatings: {},
      overviewNotes: "",
      researchNotes: "",
    },
    decisionMatrix: {},
    aiBootcampModule: {
      contentDraft: "",
      visualAssets: [],
      automationWorkflow: "",
      researchSummary: "",
    },
    setupGuides: {
      accountSetupComplete: false,
      integrationNotes: "",
      setupSteps: [],
    },
    bestPractices: {
      recommendations: [],
      proTips: "",
      commonPitfalls: [],
    },
  }
}

export default function Pillar2Content({
  data: initialData = null,
  onDataChange,
}: Pillar2ContentProps) {
  const [pillar2Data, setPillar2Data] = useState<Pillar2Data | null>(initialData)
  const [loading, setLoading] = useState(false)

  const {
    activeSection,
    sectionConfig,
    goToSection,
    canAccessSection,
    downloadedPdfs,
    handleNextSection,
    sectionValidation,
  } = usePillar2Sections({
    data: pillar2Data,
    saveDataToServer: (data: Pillar2Data) => savePillarData(2, data),
  })

  const router = useRouter()

  // Load initial active section from storage
  useEffect(() => {
    const lastSection = getLastActiveSection(2)
    goToSection(lastSection || 0)
  }, [])

  // Load data on mount if none provided
  useEffect(() => {
    if (!pillar2Data) {
      setLoading(true)
      loadPillarData<Pillar2Data>(2)
        .then((res) => {
          if (res) {
            setPillar2Data(res)
            onDataChange?.(res)
          } else {
            const empty = getEmptyPillar2Data()
            setPillar2Data(empty)
            onDataChange?.(empty)
          }
        })
        .catch((err) => {
          console.error("Error loading Pillar2Data:", err)
          toast.error("Failed to load Pillar 2 data from server.")
        })
        .finally(() => setLoading(false))
    }
  }, [pillar2Data, onDataChange])

  // Save data to server
  async function saveDataToServer(dataToSave: Pillar2Data) {
    setLoading(true)
    try {
      await savePillarData(2, dataToSave)
      onDataChange?.(dataToSave)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save your data")
    } finally {
      setLoading(false)
    }
  }

  // Handle local data changes
  function handleLocalDataChange(sectionKey: keyof Pillar2Data, updatedVal: any) {
    if (!pillar2Data) return
    const updated = { ...pillar2Data, [sectionKey]: updatedVal }
    setPillar2Data(updated)
  }

  // Called when user downloads PDF => after success => sync
  async function handleDownloadAndSync(sectionIndex: number) {
    if (!pillar2Data) return
    setLoading(true)
    try {
      // First save the data
      await saveDataToServer(pillar2Data)
      // Then download PDF
      await handleNextSection()
      toast.success("PDF downloaded successfully")
    } catch (error) {
      console.error("Error during download and sync:", error)
      toast.error("Failed to save progress or download PDF")
    } finally {
      setLoading(false)
    }
  }

  // Initialize validation state
  const [validationState, setValidationState] = useState<SectionValidationState>({
    intro: true,
    toolsLandscape: [],
    decisionMatrix: [],
    aiBootcampModule: [],
    setupGuides: [],
    bestPractices: [],
    conclusion: true,
  })

  // Validate current section
  useEffect(() => {
    if (!pillar2Data) return

    const newValidationState: SectionValidationState = {
      intro: true,
      toolsLandscape: [],
      decisionMatrix: [],
      aiBootcampModule: [],
      setupGuides: [],
      bestPractices: [],
      conclusion: true,
    }

    // Validate based on active section
    switch (activeSection) {
      case 1:
        if (!pillar2Data.toolsLandscape.selectedTools.length) {
          newValidationState.toolsLandscape = ["Please select at least one tool"]
        }
        break
      case 2:
        if (Object.keys(pillar2Data.decisionMatrix).length === 0) {
          newValidationState.decisionMatrix = ["Please complete the decision matrix"]
        }
        break
      case 3:
        if (!pillar2Data.aiBootcampModule.contentDraft) {
          newValidationState.aiBootcampModule = ["Please complete the bootcamp module"]
        }
        break
      case 4:
        if (!pillar2Data.setupGuides.setupSteps.length) {
          newValidationState.setupGuides = ["Please add setup steps"]
        }
        break
      case 5:
        if (!pillar2Data.bestPractices.recommendations.length) {
          newValidationState.bestPractices = ["Please add recommendations"]
        }
        break
    }

    setValidationState(newValidationState)
  }, [pillar2Data, activeSection])

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Render error state if no data
  if (!pillar2Data) {
    return (
      <div className="text-center text-red-500">Error: No data available</div>
    )
  }

  // Render active section
  const renderSection = () => {
    if (!pillar2Data) return null

    switch (activeSection) {
      case 0:
        return <Pillar2IntroPage onNextSection={handleNextSection} canProceed={true} />
      case 1:
        return (
          <ToolsLandscapePage
            data={pillar2Data.toolsLandscape}
            onChange={(val) => handleLocalDataChange("toolsLandscape", val)}
            onNextSection={handleNextSection}
          />
        )
      case 2:
        return (
          <DecisionMatrixPage
            data={pillar2Data.decisionMatrix}
            onChange={(val) => handleLocalDataChange("decisionMatrix", val)}
            onNextSection={handleNextSection}
          />
        )
      case 3:
        return (
          <AiBootcampModulePage
            data={pillar2Data.aiBootcampModule}
            onChange={(val) => handleLocalDataChange("aiBootcampModule", val)}
            onNextSection={handleNextSection}
          />
        )
      case 4:
        return (
          <SetupConfigurationPage
            data={pillar2Data.setupGuides}
            onChange={(val) => handleLocalDataChange("setupGuides", val)}
            onNextSection={handleNextSection}
            canProceed={canAccessSection(6)}
          />
        )
      case 5:
        return (
          <BestPracticesPage
            data={pillar2Data.bestPractices}
            onChange={(val) => handleLocalDataChange("bestPractices", val)}
            onNextSection={handleNextSection}
          />
        )
      case 6:
        return (
          <Pillar2ConclusionPage
            data={pillar2Data}
            onDownloadPdf={handleDownloadAndSync}
            pdfDownloaded={downloadedPdfs.conclusion}
          />
        )
      default:
        return <div>Section not available</div>
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#0f1729] min-h-screen text-white">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <p className="text-gray-300">
          Choose your no-code tools and master AI-powered automation.
        </p>
      </div>

      {/* Main Navigation Pills */}
      <div className="mb-6">
        <nav className="flex justify-center space-x-4 overflow-x-auto">
          {Object.entries({
            0: "Intro",
            1: "Tools Landscape",
            2: "Decision Matrix",
            3: "AI Bootcamp",
            4: "Setup & Configuration",
            5: "Best Practices",
            6: "Conclusion",
          }).map(([id, title]) => {
            const sectionId = parseInt(id)
            const isActive = activeSection === sectionId
            return (
              <button
                key={sectionId}
                onClick={() => goToSection(sectionId)}
                className={`py-2 px-4 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {title}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-700 h-1">
          <div
            className="bg-blue-500 h-1 transition-all duration-300"
            style={{ width: `${(activeSection / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#1a2236] rounded-lg p-6">
        {renderSection()}
      </div>
    </div>
  )
}