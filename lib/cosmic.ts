import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Helper function to handle 404 errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all services
export async function getServices() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Ensure we return an array even if objects is undefined
    return objects || []
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching services:', error)
    throw error
  }
}

// Fetch all team members
export async function getTeamMembers() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

// Fetch all testimonials
export async function getTestimonials() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

// Create a new booking submission
interface BookingSubmissionData {
  client_name: string
  email: string
  phone: string
  dog_name: string
  service_type: string
  preferred_date: string
  message?: string
}

export async function createBookingSubmission(data: BookingSubmissionData) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${data.client_name} - ${data.service_type}`,
      type: 'booking-submissions',
      metadata: {
        client_name: data.client_name,
        email: data.email,
        phone: data.phone,
        dog_name: data.dog_name,
        service_type: {
          key: data.service_type.toLowerCase().replace(/\s+/g, '_'),
          value: data.service_type
        },
        preferred_date: data.preferred_date,
        message: data.message || '',
        status: {
          key: 'new',
          value: 'New'
        }
      }
    })
    
    return response
  } catch (error) {
    console.error('Error creating booking submission:', error)
    throw error
  }
}