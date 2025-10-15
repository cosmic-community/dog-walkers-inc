'use client'

import { useState } from 'react'
import { submitBooking } from '@/app/actions/booking'
import type { Service } from '@/types'

interface BookingFormProps {
  services: Service[]
  preselectedService: string
}

interface BookingResult {
  success: boolean
  error?: string
  details?: string
}

export default function BookingForm({ services, preselectedService }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
    const formElement = event.currentTarget // Changed: Capture form reference before async operations
    
    try {
      const result = await submitBooking(formData) as BookingResult
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Booking request submitted successfully! We\'ll contact you soon.' })
        // Reset form using captured reference
        formElement.reset() // Changed: Use captured form reference instead of event.currentTarget
      } else {
        // Show detailed error message for debugging
        const errorText = result.details 
          ? `${result.error}\n\nDebug info: ${result.details}`
          : result.error || 'Failed to submit booking. Please try again.'
        
        setMessage({ type: 'error', text: errorText })
        console.error('Booking submission failed:', result)
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setMessage({ type: 'error', text: `An unexpected error occurred: ${errorMessage}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <pre className="whitespace-pre-wrap text-sm">{message.text}</pre>
        </div>
      )}

      {/* Client Name */}
      <div>
        <label htmlFor="client_name" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="client_name"
          name="client_name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="John Smith"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Dog Name */}
      <div>
        <label htmlFor="dog_name" className="block text-sm font-semibold text-gray-700 mb-2">
          Dog's Name *
        </label>
        <input
          type="text"
          id="dog_name"
          name="dog_name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Buddy"
        />
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 mb-2">
          Service Type *
        </label>
        <select
          id="service_type"
          name="service_type"
          required
          defaultValue={preselectedService}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.slug}>
              {service.metadata.service_name}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="preferred_date" className="block text-sm font-semibold text-gray-700 mb-2">
          Preferred Date *
        </label>
        <input
          type="date"
          id="preferred_date"
          name="preferred_date"
          required
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Any special requirements or information we should know..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
      </button>
    </form>
  )
}