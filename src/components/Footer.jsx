'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldAlert, Award, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      
      {/* Certifications Ribbon */}
      <div className="bg-[#3B5F43] py-6 text-white text-xs font-semibold uppercase tracking-wider">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Award className="h-5 w-5 text-[#C5A880]" />
              <span>GMP Certified Practice</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Award className="h-5 w-5 text-[#C5A880]" />
              <span>ISO 9001:2015 Company</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-[#C5A880]" />
              <span>Cruelty-Free (No Animal Testing)</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Award className="h-5 w-5 text-[#C5A880]" />
              <span>ISO 14001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Info Column */}
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="Beauti Luuk Logo" 
              width={150}
              height={50}
              className="h-12 w-auto object-contain bg-white/95 p-1 rounded border border-[#EBE3D5]"
            />
          </Link>
          <p className="text-xs tracking-wider text-[#C5A880] uppercase font-semibold">
            Khoobsurti Aur Khushboo Naye Andaz Mai
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium natural skincare and cosmetics range designed for all skin types. Pamper your skin with our refreshing formulas crafted with love in India.
          </p>
          <div className="flex space-x-3 pt-2">
            <a 
              href="https://www.facebook.com/profile.php?id=61591872197181" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-800 rounded-full hover:bg-[#3B5F43] hover:text-white transition-all text-slate-400"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/beautiluuk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-800 rounded-full hover:bg-[#3B5F43] hover:text-white transition-all text-slate-400"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation links Column */}
        <div>
          <h3 className="font-serif text-base font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-[#C5A880] transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[#C5A880] transition-colors">Shop Skincare</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C5A880] transition-colors">Our Story (About)</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C5A880] transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact info Column */}
        <div>
          <h3 className="font-serif text-base font-bold text-white mb-4">Contact Support</h3>
          <ul className="space-y-3.5 text-sm text-slate-400">
            <li className="flex items-start">
              <Phone className="mr-3 h-4 w-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Customer Care:</strong><br />
                +91 8655550456
              </span>
            </li>
            <li className="flex items-start">
              <Mail className="mr-3 h-4 w-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span>
                <strong>E-mail:</strong><br />
                beautiluuk@gmail.com
              </span>
            </li>
            <li className="flex items-start">
              <MapPin className="mr-3 h-4 w-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Mkt by:</strong> Unitech Corporation<br />
                Mumbai, Maharashtra, India.
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Beauti Luuk Cosmetics. Built with care in India.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
