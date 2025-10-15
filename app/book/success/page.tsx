import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Booking Confirmed - Dog Walkers Inc.',
  description: 'Your booking has been confirmed and payment processed successfully.',
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  return (
    <div className="py-16 min-h-[60vh]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your payment. Your dog walking service has been booked successfully.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-green-800 mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left text-green-700 space-y-2">
              <li>✓ You'll receive a confirmation email shortly</li>
              <li>✓ Our team will contact you to finalize the details</li>
              <li>✓ We'll confirm the exact time for your scheduled service</li>
            </ul>
          </div>

          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              Session ID: {sessionId}
            </p>
          )}

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
            >
              Return to Home
            </Link>
            
            <div className="pt-4">
              <p className="text-gray-600">
                Questions? Contact us at{' '}
                <a href="tel:+15551234567" className="text-primary hover:underline">
                  (555) 123-4567
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}