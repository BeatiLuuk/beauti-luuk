'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerImages = [
  'https://res.cloudinary.com/vxp8medc/image/upload/v1784636386/Gemini_Generated_Image_dro4djdro4djdro4_icxhmw.png',
  'https://res.cloudinary.com/vxp8medc/image/upload/v1784635373/Gemini_Generated_Image_wsn69wwsn69wwsn6_ryxnbb.png',
  'https://res.cloudinary.com/vxp8medc/image/upload/v1784635206/ChatGPT_Image_Jul_21_2026_05_20_31_PM_f518cn.png',
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slideshow timer if more than 1 banner exists
  useEffect(() => {
    if (isPaused || bannerImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <div 
      className="relative w-full bg-slate-950 border-b border-[#EBE3D5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Horizontal Sliding Track Container */}
      <div 
        className="relative w-full h-[180px] sm:h-[280px] md:h-[370px] lg:h-[460px] flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerImages.map((src, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0 flex items-center justify-center bg-slate-950">
            <Link href="/shop" className="relative block w-full h-full">
              <Image
                src={src}
                alt={`Independence Day Special Offer Banner ${idx + 1}`}
                fill
                priority={idx === 0}
                quality={100}
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Prev Navigation Button (Only if multiple banners) */}
      {bannerImages.length > 1 && (
        <button
          onClick={goToPrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Next Navigation Button (Only if multiple banners) */}
      {bannerImages.length > 1 && (
        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:left-auto sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Slide Indicators / Dots (Only if multiple banners) */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-10 flex items-center justify-center space-x-2 sm:space-x-3">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? 'w-7 sm:w-9 h-2 bg-[#C5A880] shadow-[0_0_8px_#C5A880]' 
                  : 'w-2 sm:w-2.5 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
