'use client'

interface ProgressBarProps {
  type: 'pillars' | 'tasks'
  completed: number
  total: number
}

export default function ProgressBar({ completed, total, type }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-[#94A3B8]">Progress</span>
        <span className="text-[#E2E8F0]">{completed} of {total} {type} completed</span>
      </div>
      <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6C63FF] to-[#4D9FFF] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
