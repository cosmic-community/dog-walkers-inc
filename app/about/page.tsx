import Link from 'next/link'

export const metadata = {
  title: 'About Us - Dog Walkers Inc.',
  description: 'Learn about Dog Walkers Inc., our mission, values, and commitment to providing the best dog walking services in the city.',
}

export default function AboutPage() {
  console.log('LFG!!!')
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Dog Walkers Inc.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in professional dog walking services since 2015
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              At Dog Walkers Inc., our mission is to provide exceptional care and exercise for your furry family members. We believe every dog deserves quality time outdoors with experienced, loving professionals who understand their unique needs and personalities.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Founded in 2015 by a group of passionate dog lovers, Dog Walkers Inc. started with a simple idea: every dog deserves the best care and attention, even when their owners are busy with work or other commitments.
            </p>
            <p className="mb-4">
              What began as a small team of three walkers has grown into a trusted network of certified professionals serving hundreds of happy dogs and their families throughout the city. Our commitment to quality, safety, and genuine love for animals has made us the premier choice for dog walking services.
            </p>
            <p>
              Today, we continue to uphold the same values that started our journey: personalized care, professional service, and an unwavering dedication to the wellbeing of every dog in our care.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassionate Care</h3>
              <p className="text-gray-600">
                We treat every dog as if they were our own, providing loving attention and personalized care that meets their individual needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600">
                All our walkers are certified in pet first aid and CPR, fully insured, and background checked for your complete peace of mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards of professionalism, reliability, and service quality in everything we do.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Experienced Team</h3>
                <p className="text-gray-600">All our walkers have extensive experience working with dogs of all breeds, sizes, and temperaments.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">We work around your schedule with morning, afternoon, and evening walk options available.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Updates</h3>
                <p className="text-gray-600">Receive photos, GPS tracking, and updates during every walk so you're always connected.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Personalized Service</h3>
                <p className="text-gray-600">We get to know your dog's personality, preferences, and special needs to provide tailored care.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-secondary to-orange-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Family?
          </h2>
          <p className="text-lg mb-8 text-orange-100 max-w-2xl mx-auto">
            Experience the difference that professional, caring dog walking services can make for you and your furry friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-semibold rounded-lg transition-colors"
            >
              View Our Services
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white transition-colors"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}