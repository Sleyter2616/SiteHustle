import React from 'react'
import { Pillar2ConclusionPageProps } from '@/types/pillar2'

export default function Pillar2ConclusionPage({
  data,
  onDownloadPdf,
  pdfDownloaded
}: Pillar2ConclusionPageProps) {
  const selectedTools = data.toolsLandscape.selectedTools.length
  const completedSetup = data.setupGuides.accountSetupComplete
  const hasBootcampContent = data.aiBootcampModule.contentDraft.trim().length > 0

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Congratulations!
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          You've completed Pillar 2: AI Tools & Bootcamp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Your Achievements</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">✓</span>
              Selected {selectedTools} AI tools for your stack
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">✓</span>
              {completedSetup ? 'Completed' : 'Started'} tool setup and configuration
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">✓</span>
              {hasBootcampContent ? 'Completed' : 'Started'} AI bootcamp modules
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">✓</span>
              Created your AI implementation roadmap
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Next Steps</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">1.</span>
              Download your AI Tools & Bootcamp summary
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">2.</span>
              Begin implementing your selected tools
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">3.</span>
              Follow your integration framework
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">4.</span>
              Move on to the next pillar
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => onDownloadPdf(2, 0)}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
            pdfDownloaded
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          } text-white`}
        >
          {pdfDownloaded ? 'Download Again' : 'Download Summary'}
        </button>
      </div>
    </div>
  )
}