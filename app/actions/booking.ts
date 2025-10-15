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

    // Get the service to find its display name
    const servicesResponse = await cosmic.objects.findOne({
      type: 'services',
      slug: serviceTypeSlug
    }).props(['id', 'metadata'])

    const serviceName = servicesResponse.object?.metadata?.service_name || 'Unknown Service'

    // Create the booking submission in Cosmic
    await cosmic.objects.insertOne({
      title: `${clientName} - ${serviceName}`,
      type: 'booking-submissions',
      metadata: {
        client_name: clientName,
        email: email,
        phone: phone,
        dog_name: dogName,
        service_type: {
          key: serviceTypeSlug,
          value: serviceName
        },
        preferred_date: preferredDate,
        message: message,
        status: {
          key: 'new',
          value: 'New'
        }
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting booking:', error)
    return { success: false, error: 'Failed to submit booking' }
  }
}