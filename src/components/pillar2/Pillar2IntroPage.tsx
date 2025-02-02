'use client'

import React from 'react'
import { Pillar2IntroPageProps } from '@/types/pillar2'

export default function Pillar2IntroPage({ onNextSection, canProceed }: Pillar2IntroPageProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Welcome to Pillar 2: AI Tools & Bootcamp
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Master the art of AI tool selection and implementation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">What You'll Learn</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Evaluate and select the best AI tools for your business
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Create a decision matrix for tool selection
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Complete hands-on AI bootcamp modules
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Set up and configure your AI toolkit
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">What You'll Achieve</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              A customized AI tool stack for your business
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Practical experience with leading AI tools
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Integration framework for your tools
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              Best practices for AI implementation
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onNextSection}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
            canProceed
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Your AI Journey
        </button>
      </div>
    </div>
  )
}