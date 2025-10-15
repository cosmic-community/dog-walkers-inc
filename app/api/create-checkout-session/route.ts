import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServiceBySlug } from '@/lib/cosmic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any, // Using latest stable API version with type assertion
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      email,
      phone,
      dogName,
      serviceType,
      preferredDate,
      message
    } = body;

    // Validate required fields
    if (!clientName || !email || !phone || !dogName || !serviceType || !preferredDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get service details to determine price
    const service = await getServiceBySlug(serviceType);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Extract price from service (assuming format like "$25/walk")
    const priceMatch = service.metadata.price?.match(/\$(\d+)/);
    const priceAmount = priceMatch ? parseInt(priceMatch[1]) : 25;
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.metadata.service_name || service.title,
              description: `Dog walking service for ${dogName}`,
            },
            unit_amount: priceAmount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book?service=${serviceType}`,
      customer_email: email,
      metadata: {
        clientName,
        email,
        phone,
        dogName,
        serviceType,
        serviceName: service.metadata.service_name || service.title,
        servicePrice: service.metadata.price || `$${priceAmount}`,
        preferredDate,
        message: message || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}