import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi'

interface AlertProps {
  type: 'success' | 'error'
  message: string
  onClose?: () => void
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const bgColor = type === 'success' ? 'bg-green-900/20' : 'bg-red-900/20'
  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500'
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400'
  const Icon = type === 'success' ? FiCheckCircle : FiAlertCircle

  return (
    <div
      className={`flex items-center justify-between p-4 mb-4 rounded-lg border ${bgColor} ${borderColor}`}
      role="alert"
    >
      <div className="flex items-center">
        <Icon className={`w-5 h-5 mr-2 ${textColor}`} />
        <span className={textColor}>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-80`}
          aria-label="Close alert"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
