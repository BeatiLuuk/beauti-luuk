'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, Home, Sparkles, HelpCircle, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
          
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="flex flex-col items-center text-center">
            <span className="font-serif text-2xl font-bold tracking-widest text-[#1E293B] hover:text-[#C5A880] transition-colors">
              BEAUTI LUUK
            </span>
            <span className="hidden sm:block text-[8px] tracking-[0.25em] text-[#C5A880] font-sans font-semibold uppercase">
              Khoobsurti Aur Khushboo Naye Andaz Mai
            </span>
          </Link>

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

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-slate-200 hover:border-[#C5A880] hover:text-[#C5A880] transition-all"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md transform bg-[#FDFBF7] shadow-2xl transition-all duration-350 ease-in-out">
              <div className="flex h-full flex-col">
                
                <div className="flex items-center justify-between border-b border-[#EBE3D5] px-4 py-6 sm:px-6 bg-white">
                  <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-[#C5A880]" />
                    Shopping Cart ({cartCount})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="rounded-full bg-slate-100 p-6 text-slate-400 mb-4">
                        <ShoppingBag className="h-12 w-12" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-slate-700">Your cart is empty</h3>
                      <p className="mt-1 text-sm text-slate-500 max-w-xs">
                        Add natural products from our shop to start your glowing skin routine.
                      </p>
                      <Link
                        href="/shop"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-6 inline-flex items-center justify-center rounded-md bg-[#3B5F43] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#2A4430] transition-colors"
                      >
                        Shop Catalog
                      </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#EBE3D5]">
                      {cartItems.map((item) => (
                        <li key={item.productId} className="flex py-6">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-[#EBE3D5] bg-white flex items-center justify-center relative">
                            <span className="font-serif font-bold text-xs text-[#C5A880]">
                              {item.name.substring(0, 2).toUpperCase()}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/10 to-[#3B5F43]/10" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-sm font-medium text-slate-800">
                                <h3 className="font-serif truncate max-w-[180px]">{item.name}</h3>
                                <p className="ml-4 font-semibold text-slate-900">₹{item.price * item.quantity}</p>
                              </div>
                              <p className="mt-1 text-xs text-slate-500">{item.category}</p>
                            </div>
                            
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border border-slate-300 rounded bg-white">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="p-1 hover:text-[#C5A880]"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="px-2 text-xs font-semibold text-slate-800">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="p-1 hover:text-[#C5A880]"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="flex items-center text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-[#EBE3D5] bg-white px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-semibold text-slate-800">
                      <p>Subtotal</p>
                      <p className="text-[#C5A880] text-lg font-bold">₹{cartSubtotal}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Shipping and COD charges calculated at checkout.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                      <Link
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="flex items-center justify-center rounded-md bg-[#3B5F43] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2A4430] transition-colors"
                      >
                        Proceed to Checkout
                      </Link>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="flex items-center justify-center rounded-md border border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

                <div className="border-t border-[#EBE3D5] px-6 pt-5 bg-white">
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
