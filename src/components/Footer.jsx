'use client';

import React from 'react';
import Link from 'next/link';
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
              <ShieldAlert className="h-5 w-5 text-[#C5A880]" />
              <span>100% External / Organic Base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Info Column */}
        <div className="flex flex-col space-y-4">
          <span className="font-serif text-xl font-bold tracking-widest text-white">
            BEAUTI LUUK
          </span>
          <p className="text-xs tracking-wider text-[#C5A880] uppercase font-semibold">
            Khoobsurti Aur Khushboo Naye Andaz Mai
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium natural skincare and cosmetics range designed for all skin types. Pamper your skin with our refreshing formulas crafted with love in India.
          </p>
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

        {/* Administration Column */}
        <div>
          <h3 className="font-serif text-base font-bold text-white mb-4">Store Management</h3>
          <p className="text-sm text-slate-400 mb-4">
            Authorized administrator login to edit inventory, update discount rates, and manage customer orders.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 text-sm font-semibold text-[#C5A880] transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Beauti Luuk Cosmetics. Built with care in India.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">Privacy Policy</Link>
            <Link href="/about" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
