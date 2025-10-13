import { getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'
import type { TeamMember } from '@/types'

export const metadata = {
  title: 'Our Team - Dog Walkers Inc.',
  description: 'Meet our experienced team of professional dog walkers who are passionate about caring for your pets.',
}

export const revalidate = 60

export default async function TeamPage() {
  const teamMembers = await getTeamMembers() as TeamMember[]
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our experienced, certified dog walkers are passionate about providing the best care for your furry friends.
          </p>
        </div>
        
        {/* Team Grid */}
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members available at the moment. Please check back soon!</p>
          </div>
        )}
        
        {/* Join Team CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
            We're always looking for passionate dog lovers to join our team. If you're experienced, reliable, and love working with dogs, we'd love to hear from you!
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}