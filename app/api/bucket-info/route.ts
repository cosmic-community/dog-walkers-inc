import { NextResponse } from 'next/server'

export async function GET() {
  console.log('LFG!!!!')
  return NextResponse.json({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG
  })
}