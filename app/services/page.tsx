import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/types'

export const metadata = {
  title: 'Our Services - Dog Walkers Inc.',
  description: 'Explore our dog walking services including basic walks, premium adventures, and puppy care packages.',
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await getServices() as Service[]
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional dog walking tailored to your pet's needs. From quick walks to extended adventures, we've got you covered.
          </p>
        </div>
        
        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services available at the moment. Please check back soon!</p>
          </div>
        )}
        
        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-lg mb-2">Certified Professionals</h3>
              <p className="text-gray-600">All our walkers are certified in pet first aid and CPR</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2">Photo Updates</h3>
              <p className="text-gray-600">Receive photos and updates during every walk</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Insured & Bonded</h3>
              <p className="text-gray-600">Complete peace of mind with full insurance coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}