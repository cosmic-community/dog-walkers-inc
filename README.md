# 🐾 Dog Walkers Inc.

A modern, professional website for a local dog walking service built with Next.js 15 and powered by Cosmic CMS. This application showcases dog walking services, team members, and client testimonials in a beautiful, user-friendly interface.

![App Preview](https://imgix.cosmicjs.com/122b45d0-a7f4-11f0-8dcc-651091f6a7c0-photo-1587300003388-59208cc962cb-1760332716391.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## ✨ Features

- 🐕 **Service Showcase** - Display dog walking services with detailed descriptions, pricing, and images
- 👥 **Team Profiles** - Highlight experienced dog walkers with photos and specialties
- ⭐ **Client Testimonials** - Feature authentic reviews with star ratings
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🚀 **Lightning Fast** - Built with Next.js 15 App Router and server-side rendering
- 🎨 **Modern Design** - Clean, professional interface with Tailwind CSS
- 🔄 **Real-time Updates** - Content managed through Cosmic CMS
- ♿ **Accessible** - WCAG compliant with semantic HTML

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68ec8b552d05ee82552d3a94&clone_repository=68ec8cbe2d05ee82552d3aac)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for a local dog walking service"

### Code Generation Prompt

> Based on the content model I created for "Create a website for a local dog walking service", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Cosmic
- **Package Manager:** Bun
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd dog-walkers-inc
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

You can find these values in your Cosmic dashboard under Bucket Settings > API Access.

### 4. Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

async function getServices() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'services'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Team Members

```typescript
async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'team-members'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Testimonials

```typescript
async function getTestimonials() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

This application uses three main object types from your Cosmic bucket:

### Services
- **Service Name** (text) - Name of the dog walking service
- **Description** (html-textarea) - Detailed service description with features
- **Price** (text) - Service pricing
- **Duration** (text) - Service duration
- **Service Image** (file) - Visual representation of the service

### Team Members
- **Name** (text) - Dog walker's name
- **Bio** (textarea) - Professional background and experience
- **Photo** (file) - Professional headshot
- **Specialties** (text) - Areas of expertise

### Testimonials
- **Client Name** (text) - Name of the satisfied client
- **Pet Name** (text) - Name of the dog
- **Review** (textarea) - Detailed testimonial
- **Rating** (select-dropdown) - Star rating (3-5 stars)

All content is dynamically fetched from Cosmic CMS, allowing you to update your website content without touching code.

## 📁 Project Structure

```
dog-walkers-inc/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage
│   ├── services/
│   │   └── page.tsx        # Services listing page
│   ├── team/
│   │   └── page.tsx        # Team members page
│   └── testimonials/
│       └── page.tsx        # Testimonials page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── ServiceCard.tsx     # Service display card
│   ├── TeamMemberCard.tsx  # Team member profile card
│   ├── TestimonialCard.tsx # Testimonial display card
│   └── CosmicBadge.tsx     # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
├── types.ts                # TypeScript type definitions
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For questions about Cosmic CMS, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

For Next.js questions, check out the [Next.js documentation](https://nextjs.org/docs).

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and [Next.js](https://nextjs.org)

<!-- README_END -->