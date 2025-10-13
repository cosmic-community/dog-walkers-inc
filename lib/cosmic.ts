import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all services
export async function getServices() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'services'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch services');
  }
}

// Fetch all team members
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'team-members'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Fetch all testimonials
export async function getTestimonials() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
// Create a booking submission
export async function createBookingSubmission(data: {
  client_name: string;
  email: string;
  phone: string;
  dog_name: string;
  service_type: string;
  preferred_date: string;
  message?: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${data.client_name} - ${data.service_type}`,
      type: 'booking-submissions',
      metadata: {
        client_name: data.client_name,
        email: data.email,
        phone: data.phone,
        dog_name: data.dog_name,
        service_type: data.service_type,
        preferred_date: data.preferred_date,
        message: data.message || '',
        status: 'New'
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Failed to create booking submission:', error);
    throw new Error('Failed to create booking submission');
  }
}