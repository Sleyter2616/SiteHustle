'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  file?: File | null
}

interface FormErrors {
  email?: string
  message?: string
}

const SUBJECT_OPTIONS = [
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'content', label: 'Course Content' },
  { value: 'access', label: 'Account Access' },
  { value: 'other', label: 'Other' }
]

export default function SupportForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation for email
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? 'Please enter a valid email address' : undefined
      }))
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB')
      return
    }
    setFormData(prev => ({ ...prev, file }))
  }

  const generateTicketId = () => {
    return `TKT-${Date.now().toString(36).toUpperCase()}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: FormErrors = {}
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newTicketId = generateTicketId()
      setTicketId(newTicketId)
      setIsSuccess(true)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        file: null
      })
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-[#1E293B] rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Thanks! Your message has been sent.</h3>
        <p className="text-[#94A3B8] mb-4">We'll get back to you within 24-48 hours.</p>
        <p className="text-[#94A3B8] mb-6">Your ticket ID: <span className="text-[#5865F2]">{ticketId}</span></p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#E2E8F0] mb-2">
          Name (optional)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-[#1E293B] border border-[#2D3748] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#E2E8F0] mb-2">
          Email <span className="text-[#EF4444]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 bg-[#1E293B] border ${
            errors.email ? 'border-[#EF4444]' : 'border-[#2D3748]'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white`}
          placeholder="your@email.com"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#E2E8F0] mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-[#1E293B] border border-[#2D3748] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white"
        >
          <option value="">Select a topic</option>
          {SUBJECT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#E2E8F0] mb-2">
          Message <span className="text-[#EF4444]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className={`w-full px-4 py-2 bg-[#1E293B] border ${
            errors.message ? 'border-[#EF4444]' : 'border-[#2D3748]'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white resize-none`}
          placeholder="Describe your issue or question..."
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[#EF4444]">{errors.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-[#E2E8F0] mb-2">
          Attachment (optional)
        </label>
        <div className="relative">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <label
            htmlFor="file"
            className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#2D3748] rounded-lg cursor-pointer hover:bg-[#2D3748] transition-colors"
          >
            <FiUpload className="w-5 h-5 text-[#94A3B8]" />
            <span className="text-[#94A3B8]">
              {formData.file ? formData.file.name : 'Upload a file (max 5MB)'}
            </span>
          </label>
          {formData.file && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, file: null }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
