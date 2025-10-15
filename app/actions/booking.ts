'use server'

import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

export async function submitBooking(formData: FormData) {
  try {
    const clientName = formData.get('client_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const dogName = formData.get('dog_name') as string
    const serviceTypeSlug = formData.get('service_type') as string
    const preferredDate = formData.get('preferred_date') as string
    const message = formData.get('message') as string || ''

    // Validate required fields
    if (!clientName || !email || !phone || !dogName || !serviceTypeSlug || !preferredDate) {
      return { 
        success: false, 
        error: 'Missing required fields',
        details: 'Please fill in all required fields'
      }
    }

    // Get the service to find its display name
    let serviceName = 'Unknown Service'
    try {
      const servicesResponse = await cosmic.objects.findOne({
        type: 'services',
        slug: serviceTypeSlug
      }).props(['id', 'title', 'metadata'])

      serviceName = servicesResponse.object?.metadata?.service_name || servicesResponse.object?.title || 'Unknown Service'
    } catch (serviceError) {
      console.error('Error fetching service:', serviceError)
      return {
        success: false,
        error: 'Invalid service selected',
        details: 'The selected service could not be found. Please refresh the page and try again.'
      }
    }

    // Create the booking submission in Cosmic
    // CRITICAL: For select-dropdown metafields, we must use the display value (service_name)
    // not the slug or key. The API expects values like "Basic Walk", "Puppy Care", etc.
    const result = await cosmic.objects.insertOne({
      title: `${clientName} - ${serviceName}`,
      type: 'booking-submissions',
      metadata: {
        client_name: clientName,
        email: email,
        phone: phone,
        dog_name: dogName,
        service_type: serviceName, // Changed: Use service_name (display value) instead of slug
        preferred_date: preferredDate,
        message: message,
        status: 'New'
      }
    })

    console.log('Booking created successfully:', result.object?.id)
    return { success: true }
  } catch (error) {
    console.error('Error submitting booking:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error)
    
    return { 
      success: false, 
      error: 'Failed to submit booking',
      details: `${errorMessage}\n\nStack: ${errorDetails}`
    }
  }
}