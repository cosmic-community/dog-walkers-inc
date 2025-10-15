import { getServices } from '@/lib/cosmic'
import BookingForm from '@/components/BookingForm'
import type { Service } from '@/types'

export const metadata = {
  title: 'Book a Service - Dog Walkers Inc.',
  description: 'Book your dog walking service with us. Fill out the form and we\'ll get back to you shortly.',
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: { service?: string }
}) {
  const services = await getServices() as Service[]
  const preselectedService = searchParams.service || ''

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book a Service
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you shortly to confirm your booking.
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <BookingForm services={services} preselectedService={preselectedService} />
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-600">
            <strong>Need help?</strong> Call us at{' '}
            <a href="tel:+15551234567" className="text-primary hover:underline">
              (555) 123-4567
            </a>{' '}
            or email{' '}
            <a href="mailto:info@dogwalkersinc.com" className="text-primary hover:underline">
              info@dogwalkersinc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}