import { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'
import { getServices } from '@/lib/cosmic'

export const metadata = {
  title: 'Contact Us - Book Your Service | Dog Walkers Inc.',
  description: 'Book a dog walking service with Dog Walkers Inc. Fill out our contact form to schedule your first walk.',
}

export const revalidate = 60

export default async function ContactPage() {
  const servicesData = await getServices()
  const services = (servicesData || []) as Service[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Service
            </h1>
            <p className="text-xl text-blue-100">
              Ready to give your dog the exercise and care they deserve? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Schedule Your First Walk
              </h2>
                <Suspense fallback={
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-600">Loading form...</div>
                  </div>
                }>
                  <ContactForm services={services} />
                </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">📧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">info@dogwalkersinc.com</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Main St, Your City</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}