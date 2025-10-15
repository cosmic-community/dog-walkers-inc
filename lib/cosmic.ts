import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
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
}

// Fetch service by slug
export async function getServiceBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'services',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch service');
  }
}

// Create order after successful payment
export async function createOrder(orderData: {
  clientName: string;
  email: string;
  phone: string;
  dogName: string;
  serviceType: string;
  servicePrice: string;
  preferredDate: string;
  message?: string;
  stripeSessionId: string;
  stripePaymentIntent: string;
  amountTotal: number;
  currency: string;
}) {
  try {
    const result = await cosmic.objects.insertOne({
      title: `${orderData.clientName} - ${orderData.serviceType}`,
      type: 'orders',
      metadata: {
        client_name: orderData.clientName,
        email: orderData.email,
        phone: orderData.phone,
        dog_name: orderData.dogName,
        service_type: orderData.serviceType,
        service_price: orderData.servicePrice,
        preferred_date: orderData.preferredDate,
        message: orderData.message || '',
        stripe_session_id: orderData.stripeSessionId,
        stripe_payment_intent: orderData.stripePaymentIntent,
        payment_status: 'Paid',
        amount_total: orderData.amountTotal,
        currency: orderData.currency
      }
    });
    
    return result.object;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}