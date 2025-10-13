import Link from 'next/link'
import { getServices, getTeamMembers, getTestimonials } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import TeamMemberCard from '@/components/TeamMemberCard'
import TestimonialCard from '@/components/TestimonialCard'
import type { Service, TeamMember, Testimonial } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const services = await getServices() as Service[]
  const teamMembers = await getTeamMembers() as TeamMember[]
  const testimonials = await getTestimonials() as Testimonial[]
  
  // Get first 3 items for homepage preview
  const featuredServices = services.slice(0, 3)
  const featuredTeam = teamMembers.slice(0, 2)
  const featuredTestimonials = testimonials.slice(0, 3)
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Dog Walking You Can Trust
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Expert care for your furry friend. Flexible schedules, experienced walkers, and complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-colors"
              >
                View Our Services
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-colors"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect walking package for your dog's needs
            </p>
          </div>
          
          {featuredServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              
              {services.length > 3 && (
                <div className="text-center">
                  <Link
                    href="/services"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced, certified dog walkers who love what they do
            </p>
          </div>
          
          {featuredTeam.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
                {featuredTeam.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
              
              {teamMembers.length > 2 && (
                <div className="text-center">
                  <Link
                    href="/team"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    Meet All Team Members
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No team members available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from happy dog owners
            </p>
          </div>
          
          {featuredTestimonials.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
              
              {testimonials.length > 3 && (
                <div className="text-center">
                  <Link
                    href="/testimonials"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    Read More Reviews
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-secondary to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Give Your Dog the Best?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Book your first walk today and see why pet owners trust us with their furry family members.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-semibold rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}