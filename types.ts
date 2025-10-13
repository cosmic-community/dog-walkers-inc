// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service interface
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    description: string;
    price: string;
    duration: string;
    service_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Team Member interface
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    name: string;
    bio: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    specialties?: string;
  };
}

// Testimonial interface with select-dropdown rating
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    pet_name?: string;
    review: string;
    rating: {
      key: string;
      value: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
// Booking Submission interface
export interface BookingSubmission extends CosmicObject {
  type: 'booking-submissions';
  metadata: {
    client_name: string;
    email: string;
    phone: string;
    dog_name: string;
    service_type: {
      key: string;
      value: string;
    };
    preferred_date: string;
    message?: string;
    status: {
      key: string;
      value: string;
    };
  };
}

export function isBookingSubmission(obj: CosmicObject): obj is BookingSubmission {
  return obj.type === 'booking-submissions';
}