import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/cosmic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order in Cosmic
      try {
        await createOrder({
          clientName: session.metadata?.clientName || '',
          email: session.metadata?.email || session.customer_email || '',
          phone: session.metadata?.phone || '',
          dogName: session.metadata?.dogName || '',
          serviceType: session.metadata?.serviceName || '',
          servicePrice: session.metadata?.servicePrice || '',
          preferredDate: session.metadata?.preferredDate || '',
          message: session.metadata?.message,
          stripeSessionId: session.id,
          stripePaymentIntent: session.payment_intent as string,
          amountTotal: session.amount_total || 0,
          currency: session.currency || 'usd',
        });

        console.log('Order created successfully for session:', session.id);
      } catch (error) {
        console.error('Error creating order:', error);
        // Don't return error to Stripe - order creation failure shouldn't affect payment
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}