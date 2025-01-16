'use client'

import { FiLock, FiDownload, FiExternalLink, FiPlay, FiInfo } from 'react-icons/fi'
import { BsFileEarmarkText, BsFiletypeXls, BsFiletypePdf, BsFiletypeDoc } from 'react-icons/bs'

export type ResourceType = 'pdf' | 'video' | 'excel' | 'doc' | 'link' | 'template'

export interface ResourceItem {
  id: string
  title: string
  description: string
  type: ResourceType
  url: string
  pillar?: number
  isLocked?: boolean
  isNew?: boolean
  lastUpdated?: string
  featured?: boolean
}

interface ResourceCardProps {
  resource: ResourceItem
  currentPillar: number
}

export default function ResourceCard({ resource, currentPillar }: ResourceCardProps) {
  const isLocked = resource.isLocked || (resource.pillar && resource.pillar > currentPillar)

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'pdf':
        return BsFiletypePdf
      case 'excel':
        return BsFiletypeXls
      case 'doc':
        return BsFiletypeDoc
      case 'video':
        return FiPlay
      case 'link':
        return FiExternalLink
      default:
        return BsFileEarmarkText
    }
  }

  const getActionLabel = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return 'Watch Video'
      case 'link':
        return 'Open Link'
      default:
        return 'Download'
    }
  }

  const getActionIcon = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return FiPlay
      case 'link':
        return FiExternalLink
      default:
        return FiDownload
    }
  }

  const TypeIcon = getTypeIcon(resource.type)
  const ActionIcon = getActionIcon(resource.type)

  return (
    <div className={`bg-[#1E293B] rounded-xl p-6 transition-all duration-200 ${
      isLocked ? 'opacity-60' : 'hover:scale-[1.02]'
    }`}>
      <div className="flex items-start gap-4">
        {/* Icon and Type */}
        <div className="shrink-0">
          <div className="p-3 rounded-lg bg-[#6C63FF]/10">
            <TypeIcon className="w-6 h-6 text-[#6C63FF]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-[#E2E8F0] mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-[#94A3B8] mb-3">
                {resource.description}
              </p>
            </div>

            {isLocked && (
              <div className="shrink-0">
                <FiLock className="w-5 h-5 text-[#94A3B8]" />
              </div>
            )}
          </div>

          {/* Tags and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-1 text-xs uppercase tracking-wide bg-[#2D3748] text-[#94A3B8] rounded-full">
                {resource.type}
              </span>
              {resource.isNew && (
                <span className="inline-block px-2.5 py-1 text-xs uppercase tracking-wide bg-[#6C63FF]/20 text-[#6C63FF] rounded-full">
                  New
                </span>
              )}
              {resource.featured && (
                <span className="inline-block px-2.5 py-1 text-xs uppercase tracking-wide bg-[#F59E0B]/20 text-[#F59E0B] rounded-full">
                  Featured
                </span>
              )}
            </div>

            {!isLocked ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#6C63FF] hover:bg-[#5753D8] text-white rounded-lg transition-colors duration-200"
              >
                <ActionIcon className="w-4 h-4" />
                <span>{getActionLabel(resource.type)}</span>
              </a>
            ) : (
              <div className="group relative">
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#2D3748] text-[#94A3B8] rounded-lg cursor-not-allowed"
                >
                  <FiLock className="w-4 h-4" />
                  <span>Locked</span>
                </button>
                <div className="absolute bottom-full mb-2 right-0 w-48 p-2 bg-[#2D3748] text-[#94A3B8] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  Complete Pillar {resource.pillar && resource.pillar - 1} to unlock
                </div>
              </div>
            )}
          </div>

          {resource.lastUpdated && (
            <div className="mt-4 flex items-center gap-2 text-xs text-[#94A3B8]">
              <FiInfo className="w-4 h-4" />
              <span>Updated {resource.lastUpdated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
