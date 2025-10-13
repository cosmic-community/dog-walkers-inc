import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { client_name, pet_name, review, rating } = testimonial.metadata
  
  // Convert rating key to number for star display
  const ratingValue = parseInt(rating.key)
  
  // Generate star display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      )
    })
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex text-yellow-400 mb-4">
        {renderStars(ratingValue)}
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        "{review}"
      </p>
      
      <div className="border-t pt-4">
        <p className="font-semibold text-gray-900">
          {client_name}
        </p>
        {pet_name && (
          <p className="text-sm text-gray-600">
            Pet parent to {pet_name}
          </p>
        )}
      </div>
    </div>
  )
}