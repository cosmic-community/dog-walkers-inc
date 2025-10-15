'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <span className="text-3xl">🐾</span>
            <span>Dog Walkers Inc.</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/team" className="hover:text-primary transition-colors">Team</Link>
            <Link href="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
            <Link href="/book" className="hover:text-primary transition-colors">Book Now</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/about" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/team" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/testimonials" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="/book" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}