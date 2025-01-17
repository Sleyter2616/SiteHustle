interface ProgressBarProps {
  progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full bg-[#1A1F2E] rounded-full h-2">
      <div
        className="bg-[#5865F2] h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
