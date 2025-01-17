import React, { useState } from 'react'
interface FormFieldProps {
  label: React.ReactNode
  error?: string
  required?: boolean
  children: React.ReactNode
}

export default function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}

interface ArrayInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  error?: string
}

export function ArrayInput({ value, onChange, placeholder, error }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-[#1E293B] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4]"
        >
          Add
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-[#1E293B] rounded-md px-3 py-2"
          >
            <span className="text-[#E2E8F0]">{item}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-[#94A3B8] hover:text-red-400"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
