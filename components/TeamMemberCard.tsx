import type { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, bio, photo, specialties } = member.metadata
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {photo && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {name}
        </h3>
        
        {specialties && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {specialties}
            </span>
          </div>
        )}
        
        <p className="text-gray-600 leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  )
}