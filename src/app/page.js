'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Leaf, ArrowRight, ShieldCheck, Heart, RefreshCw, Zap } from 'lucide-react';

import BannerSlider from '@/components/BannerSlider';

// Fallback data in case database is not initialized yet
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setFeaturedProducts(data.products.slice(0, 3));
        }
      } catch (error) {
        console.log('Error fetching database products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const categories = [
    {
      name: 'Face Wash',
      description: 'Refreshing, pimple-cleansing formulas for all skin types.',
      imageBg: 'from-[#C5A880]/20 to-[#3B5F43]/10',
      link: '/shop?category=Face%20Wash',
    },
    {
      name: 'Creams & Lotions',
      description: '72-hour moisture and skin-brightening nourishment.',
      imageBg: 'from-[#3B5F43]/20 to-[#C5A880]/10',
      link: '/shop?category=Creams%20%26%20Lotions',
    },
  ];

  return (
    <div className="flex flex-col w-full font-sans bg-[#FDFBF7]">
      
      {/* 0. Independence Day Promotional Banner Slider */}
      <BannerSlider />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBE3D5]/40 via-[#FDFBF7] to-[#FDFBF7] py-20 lg:py-32">
        {/* Decorative blur gradients */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#3B5F43]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B5F43]/10 text-[#3B5F43] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Premium Organic Skincare
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 leading-tight">
                Reveal Your <span className="text-[#3B5F43]">Natural</span> <br className="hidden sm:inline" />
                Radiant & Glowing Skin
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Beauti Luuk brings you chemical-conscious skin refreshments. Crafted for all skin types, our botanical face washes, creams, and lotions lock in moisture and clear blemishes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-[#3B5F43] hover:bg-[#2A4430] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all group"
                >
                  Shop Skincare Range
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Product Label mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#3B5F43]/10 flex items-center justify-center border-2 border-[#EBE3D5] shadow-inner p-8">
                <div className="w-full h-full rounded-full border-4 border-double border-[#C5A880] bg-white shadow-lg flex flex-col items-center justify-center text-center p-6 select-none animate-fade-in">
                  <Image 
                    src="/images/logo-with-tagline.png" 
                    alt="Beauti Luuk Logo" 
                    width={220}
                    height={110}
                    className="h-28 w-auto object-contain mb-2"
                    priority
                  />
                  <span className="text-[7px] tracking-[0.2em] text-[#C5A880] font-sans font-bold uppercase mt-1">
                    Organic Skincare Collection
                  </span>
                  <div className="w-16 h-px bg-[#EBE3D5] my-4" />
                  <span className="text-[9px] px-2.5 py-1 rounded bg-[#3B5F43]/10 text-[#3B5F43] font-bold tracking-wide uppercase">
                    100% For All Skin Types
                  </span>
                </div>
                
                {/* Floating tags */}
                <div className="absolute -top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-[#3B5F43] flex items-center gap-1 border border-slate-100">
                  <Leaf className="h-3.5 w-3.5 text-[#C5A880]" />
                  Natural Extract
                </div>
                <div className="absolute -bottom-2 left-6 bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-[#C5A880] flex items-center gap-1 border border-slate-100">
                  <Heart className="h-3.5 w-3.5 text-[#3B5F43]" />
                  Cruelty Free
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Core Value Props */}
      <section className="bg-white py-12 border-y border-[#EBE3D5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-lg flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-800">ISO 9001 Certified</h3>
                <p className="text-xs text-slate-500 mt-1">Strict quality standards in every single batch.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-lg flex-shrink-0">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-800">Botanical Ingredients</h3>
                <p className="text-xs text-slate-500 mt-1">Harnessing Aloe Vera, Saffron, Amla & Cucumber.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-lg flex-shrink-0">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-800">Pimple Cleansing</h3>
                <p className="text-xs text-slate-500 mt-1">Refreshing formulas to combat acne and blemish lines.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-lg flex-shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-800">72h Hydration</h3>
                <p className="text-xs text-slate-500 mt-1">Almond and milk proteins lock in moisture barrier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800">Shop by Category</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Choose from our curated organic formulations for targeted skin nourishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative rounded-2xl overflow-hidden bg-white border border-[#EBE3D5] p-8 sm:p-10 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div className={`absolute top-0 right-0 w-36 h-36 rounded-bl-full bg-gradient-to-tr ${category.imageBg} opacity-60 group-hover:scale-110 transition-transform`} />
                <div className="relative z-10 max-w-xs space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-slate-800">{category.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{category.description}</p>
                </div>
                <div className="mt-8 relative z-10">
                  <Link
                    href={category.link}
                    className="inline-flex items-center text-sm font-bold text-[#3B5F43] hover:text-[#C5A880] transition-colors"
                  >
                    Explore Products
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers / Featured Products */}
      <section className="bg-white py-20 border-t border-[#EBE3D5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="font-serif text-3xl font-bold text-slate-800">Our Best Sellers</h2>
              <p className="text-sm text-slate-500 mt-2">
                Organic skincare items formulated for pristine skin health.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md border border-[#3B5F43] text-[#3B5F43] hover:bg-[#3B5F43] hover:text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              View Full Shop
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl overflow-hidden border border-[#EBE3D5] bg-[#FDFBF7] shadow-sm flex flex-col group hover:shadow-md transition-all"
                >
                  {/* Visual Image box */}
                  <Link href={`/product/${product._id}`} className="h-80 w-full bg-white flex items-center justify-center relative overflow-hidden group">
                    {product.images && product.images.length > 0 && product.images[0] ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain group-hover:scale-105 transition-transform duration-300 bg-white"
                      />
                    ) : (
                      <>
                        <span className="font-serif font-bold text-3xl text-[#C5A880] select-none group-hover:scale-105 transition-transform duration-300">
                          {product.name.substring(0, 2).toUpperCase()}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
                      </>
                    )}
                  </Link>

                  {/* Info Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <Link href={`/product/${product._id}`} className="block mt-1">
                        <h3 className="font-serif text-lg font-bold text-slate-800 hover:text-[#C5A880] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing and Cart button */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#EBE3D5]/60 pt-4">
                      <div>
                        {product.discountPrice > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#3B5F43] font-bold text-base">₹{product.discountPrice}</span>
                            <span className="text-slate-400 line-through text-xs">₹{product.price}</span>
                          </div>
                        ) : (
                          <span className="text-[#3B5F43] font-bold text-base">₹{product.price}</span>
                        )}
                        <span className="block text-[9px] text-slate-400">Net Vol: {product.weight}</span>
                      </div>
                      <Link
                        href={`/product/${product._id}`}
                        className="inline-flex items-center justify-center rounded-md border border-[#3B5F43] text-[#3B5F43] hover:bg-[#3B5F43] hover:text-white px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#3B5F43]/5 border border-[#EBE3D5] rounded-2xl max-w-md mx-auto w-full">
              <p className="text-slate-700 font-serif font-bold">Catalog Database Offline</p>
              <p className="text-xs text-slate-500 mt-2">
                Could not retrieve products from the database. Please start Docker and run seeding scripts:
              </p>
              <code className="block mt-3 bg-white p-2 rounded border font-mono text-[10px] text-slate-700 select-all">
                npm run seed
              </code>
            </div>
          )}

        </div>
      </section>

      {/* 5. Brand Heritage */}
      <section className="bg-gradient-to-tr from-[#3B5F43]/10 to-[#FDFBF7] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Heritage description */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold text-slate-800">About Beauti Luuk</h2>
              <h3 className="text-sm font-semibold tracking-widest text-[#C5A880] uppercase">
                Har Bund Me Narmi, Har Bond Me Chamak
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Beauti Luuk represents the union of traditional Indian wellness recipes with modern dermatological standards. Every product—from our orange face wash to almond milk lotions—is packed with natural botanicals, certified by ISO & GMP standards, and is 100% cruelty-free. 
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                We manufacture under strict laboratory checks (Mfg Lic No: MH/104767A) through Amoha Herbals Pvt. Ltd. to ensure that our skincare formulas deliver long-lasting hydration, smooth out skin blemishes, and improve skin health safely.
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center text-sm font-bold text-[#3B5F43] hover:text-[#C5A880] transition-colors"
                >
                  Read Our Full Story
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Verification highlights grid */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] text-center shadow-sm">
                  <span className="block font-serif text-3xl font-bold text-[#3B5F43]">100%</span>
                  <span className="block text-xs font-semibold text-slate-600 mt-1">Made in India</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] text-center shadow-sm">
                  <span className="block font-serif text-3xl font-bold text-[#3B5F43]">No</span>
                  <span className="block text-xs font-semibold text-slate-600 mt-1">Animal Testing</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] text-center shadow-sm col-span-2">
                  <span className="block font-serif text-xl font-bold text-[#C5A880]">GMP Practice</span>
                  <span className="block text-xs font-semibold text-slate-600 mt-1">Good Manufacturing Standard</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
