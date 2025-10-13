import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { service_name, description, price, duration, service_image } = service.metadata
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {service_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${service_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={service_name}
            className="w-full h-full object-cover"
            width={400}
            height={200}
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {service_name}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1 font-semibold text-primary text-lg">
            {price}
          </span>
        </div>
        
        <div 
          className="text-gray-600 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
        <button className="mt-6 w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
          Book This Service
        </button>
      </div>
    </div>
  )
}