import { NextRequest, NextResponse } from 'next/server'
import { createBookingSubmission } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.client_name || !data.email || !data.phone || !data.dog_name || !data.service_type || !data.preferred_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the booking submission in Cosmic
    await createBookingSubmission({
      client_name: data.client_name,
      email: data.email,
      phone: data.phone,
      dog_name: data.dog_name,
      service_type: data.service_type,
      preferred_date: data.preferred_date,
      message: data.message
    })

    return NextResponse.json(
      { success: true, message: 'Booking submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit booking' },
      { status: 500 }
    )
  }
}