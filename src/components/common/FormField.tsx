import React, { useState } from 'react'
import Tooltip from './Tooltip'
import { FiInfo } from 'react-icons/fi'

interface FormFieldProps {
  label: React.ReactNode
  error?: string
  required?: boolean
  helper?: string
  children: React.ReactNode
  tooltip?: string
}

export default function FormField({ label, error, required, helper, children, tooltip }: FormFieldProps) {
  return (
    <div className="mb-4">
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-[#E2E8F0]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          )}
        </div>
      )}
      {children}
      {helper && (
        <p className="mt-1 text-sm text-[#94A3B8]">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}

interface ArrayInputProps {
  label?: string
  values?: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  error?: string
  tooltip?: string
  required?: boolean
}

export function ArrayInput({ 
  label, 
  values = [], 
  onChange, 
  error,
  placeholder,
  tooltip,
  required
}: ArrayInputProps) {
  const [newItem, setNewItem] = useState('')

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...(values || []), newItem.trim()])
      setNewItem('')
    }
  }

  const handleRemove = (index: number) => {
    const newValues = [...(values || [])]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <Tooltip content={tooltip} />
        )}
      </div>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
        />
        <button
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:hover:from-purple-500 disabled:hover:to-purple-600 transition-all duration-200 whitespace-nowrap"
        >
          Add
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <ul className="space-y-2 mt-2">
        {(values || []).map((item, index) => (
          <li key={index} className="flex items-center justify-between bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-2 group hover:border-purple-500/50 transition-all duration-200">
            <span className="text-white">{item}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-lg font-medium px-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
