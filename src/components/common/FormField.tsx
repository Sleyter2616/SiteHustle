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
      <div className="flex space-x-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
        />
        <button
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="px-4 py-2 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4] disabled:opacity-50"
        >
          Add
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <ul className="space-y-2">
        {(values || []).map((item, index) => (
          <li key={index} className="flex items-center justify-between bg-[#2D3748] rounded-md px-3 py-2">
            <span className="text-[#E2E8F0]">{item}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-[#94A3B8] hover:text-[#E2E8F0]"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
