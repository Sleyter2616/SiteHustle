import { useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'

interface TooltipProps {
  text: string
}

export default function Tooltip({ text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        className="text-[#94A3B8] hover:text-[#E2E8F0] focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault()
          setIsVisible(!isVisible)
        }}
      >
        <FiHelpCircle className="w-4 h-4" />
      </button>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-[#E2E8F0] bg-[#1E293B] rounded-md shadow-lg border border-[#2D3748]">
          {text}
        </div>
      )}
    </div>
  )
}
