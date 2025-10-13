import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'
import type { Testimonial } from '@/types'

export const metadata = {
  title: 'Client Testimonials - Dog Walkers Inc.',
  description: 'Read what our happy clients have to say about our professional dog walking services.',
}

export const revalidate = 60

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials() as Testimonial[]
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the happy dog owners who trust us with their furry family members.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials available at the moment. Please check back soon!</p>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our growing family of happy clients and give your dog the care they deserve.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
            Book Your First Walk
          </button>
        </div>
      </div>
    </div>
  )
}