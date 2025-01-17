import { Tool } from '@/types/tools'
import { ToolCard } from './ToolCard'

interface ToolSectionProps {
  title: string
  description: string
  tools: Tool[]
  selectedTools?: string[]
  onToolSelect?: (toolId: string) => void
}

export const ToolSection = ({
  title,
  description,
  tools,
  selectedTools = [],
  onToolSelect
}: ToolSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool}
            selected={selectedTools.includes(tool.id)}
            onSelect={() => onToolSelect?.(tool.id)}
          />
        ))}
      </div>
    </div>
  )
}
