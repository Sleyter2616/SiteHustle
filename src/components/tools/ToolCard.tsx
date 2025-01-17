import { Tool } from '@/types/tools'
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa'

interface ToolCardProps {
  tool: Tool
  selected?: boolean
  onSelect?: () => void
}

export const ToolCard = ({ tool, selected, onSelect }: ToolCardProps) => {
  return (
    <div 
      className={`
        p-6 rounded-lg transition-all duration-200 cursor-pointer
        ${selected 
          ? 'bg-[#5865F2]/10 border-[#5865F2] border-2' 
          : 'bg-[#1A1F2E] border-transparent border-2 hover:border-[#5865F2]/50'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{tool.name}</h3>
          <p className="text-gray-400 text-sm">{tool.description}</p>
        </div>
        {tool.url && (
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#5865F2] hover:text-[#5865F2]/80"
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Key Features</h4>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            {tool.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Use Cases</h4>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            {tool.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Learning Curve:</span>
            <span className={`
              text-sm font-medium px-2 py-1 rounded
              ${tool.learningCurve === 'Low' ? 'bg-green-500/20 text-green-400' :
                tool.learningCurve === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'}
            `}>
              {tool.learningCurve}
            </span>
          </div>
          {tool.pricing && (
            <div className="text-sm text-gray-400">
              From {tool.pricing.startingAt}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
