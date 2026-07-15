'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Sparkles, HelpCircle, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/shop', icon: Sparkles },
    { name: 'About Us', href: '/about', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#EBE3D5] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Hamburger Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo Brand Header */}
          <Link href="/" className="flex flex-col items-center text-center">
            <span className="font-serif text-2xl font-bold tracking-widest text-[#1E293B] hover:text-[#C5A880] transition-colors">
              BEAUTI LUUK
            </span>
            <span className="hidden sm:block text-[8px] tracking-[0.25em] text-[#C5A880] font-sans font-semibold uppercase">
              Khoobsurti Aur Khushboo Naye Andaz Mai
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 font-sans font-medium text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[#C5A880] relative py-2 ${
                  isActive(link.href) ? 'text-[#C5A880]' : ''
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A880] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Contact Hotline CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="https://wa.me/918655550456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white px-4 py-2 text-xs font-bold transition-colors shadow-sm"
            >
              Order on WhatsApp
            </a>
          </div>

        </div>
      </header>

      {/* Slide-out Mobile Menu (Hamburger Menu) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 left-0 flex max-w-full pr-10">
            <div className="w-screen max-w-xs transform bg-[#FDFBF7] shadow-2xl transition-all duration-200">
              <div className="flex h-full flex-col py-6">
                
                <div className="flex items-center justify-between px-6 border-b border-[#EBE3D5] pb-5 bg-white">
                  <span className="font-serif text-lg font-bold tracking-wider text-slate-800">
                    BEAUTI LUUK
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex-1 px-4">
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                            isActive(link.href)
                              ? 'bg-[#3B5F43] text-white'
                              : 'text-slate-600 hover:bg-[#3B5F43]/10 hover:text-[#3B5F43]'
                          }`}
                        >
                          <LinkIcon className="mr-3 h-5 w-5" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="border-t border-[#EBE3D5] px-6 pt-5 bg-white space-y-4">
                  <a
                    href="https://wa.me/918655550456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white py-3 text-xs font-bold transition-colors shadow-sm"
                  >
                    Order on WhatsApp
                  </a>
                  <p className="text-center text-[10px] text-slate-400">
                    © 2026 Beauti Luuk Cosmetics. All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
