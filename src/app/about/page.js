'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Leaf, Heart, ShieldCheck, ArrowRight, ShieldAlert } from 'lucide-react';

export default function About() {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const values = [
    {
      icon: Leaf,
      title: "Botanical Ingredients",
      description: "We harness natural extracts like saffron (keshar), cucumber, lemon, aloe vera, and almond oil to nourish and refresh your skin organically."
    },
    {
      icon: Heart,
      title: "Cruelty-Free Practice",
      description: "Our cosmetic formulas are 100% cruelty-free. We strictly ensure that none of our products are tested on animals."
    },
    {
      icon: ShieldCheck,
      title: "GMP & ISO Certified",
      description: "Manufactured and distributed under strict laboratory and environmental conditions (GMP, ISO 9001:2015 & ISO 14001:2015) to guarantee clean, safe, and sustainable products."
    }
  ];

  return (
    <div className="flex flex-col w-full font-sans bg-[#FDFBF7]">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#EBE3D5]/40 to-[#FDFBF7] py-16 text-center border-b border-[#EBE3D5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="text-xs text-[#C5A880] font-bold uppercase tracking-widest">Our Heritage</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mt-2">
            About Beauti Luuk
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-500 italic max-w-xl mx-auto">
            "Khoobsurti Aur Khushboo Naye Andaz Mai"
          </p>
        </div>
      </section>

      {/* 2. Brand Story Narrative */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
              The Intersection of Nature & Science
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At **Beauti Luuk**, we believe that skincare should be simple, pure, and deeply restorative. Founded with the mission to merge traditional Indian skincare ingredients with modern dermatological science, we design products that bring out your natural skin glow.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our botanical face washes, creams, and lotions utilize potent ingredients like Saffron, Aloe Vera, Cucumber, and Neem to fight acne, blemishes, and dryness. Formulated under clean lab conditions, we ensure every drop is gentle yet highly effective.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-sm aspect-square rounded-2xl border-2 border-double border-[#C5A880] bg-white flex flex-col items-center justify-center text-center shadow-sm select-none animate-fade-in">
              <Image 
                src="/images/logo-with-tagline.png" 
                alt="Beauti Luuk Logo" 
                width={250}
                height={125}
                className="h-44 sm:h-48 w-auto object-contain mb-2"
                priority
              />
              <div className="w-20 h-px bg-[#EBE3D5] my-4" />
              <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider font-sans">
                100% For All Skin Types
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 border-y border-[#EBE3D5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800">Our Core Pillars</h2>
            <p className="text-sm text-slate-500 mt-2">The guidelines behind every cosmetic product we formulate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const ValueIcon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#EBE3D5] p-8 shadow-sm text-center space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto h-12 w-12 bg-[#3B5F43]/10 text-[#3B5F43] rounded-full flex items-center justify-center">
                    <ValueIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Manufacturing Profile & Lab Info */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
          
          <div className="mx-auto max-w-4xl bg-[#3B5F43]/5 rounded-2xl border border-[#EBE3D5] p-8 sm:p-10 space-y-8 shadow-sm">
            
            <div className="text-center space-y-2 border-b border-[#EBE3D5] pb-6">
              <h2 className="font-serif text-2xl font-bold text-slate-800">Manufacturing & Lab Details</h2>
              <p className="text-xs tracking-wider text-[#C5A880] uppercase font-bold">
                Complete Credibility and Lab Registrations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
              
              {/* Manufacturing Lab */}
              <div className="space-y-2">
                <span className="block font-bold text-[#3B5F43] font-serif text-base">Manufactured By:</span>
                <p className="font-semibold text-slate-800">Amoha Herbals Pvt. Ltd.</p>
                <p className="text-slate-500 leading-relaxed">
                  13, Yashashree, 3/3A Karve Nagar,<br />
                  Pune, Maharashtra, India - 411052.<br />
                  <span className="text-xs text-[#C5A880]">www.amohaherbals.com</span>
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  <strong>Mfg. Lic. No:</strong> MH/104767A
                </p>
              </div>

              {/* Marketing Partner */}
              <div className="space-y-2">
                <span className="block font-bold text-[#3B5F43] font-serif text-base">Marketed By:</span>
                <p className="font-semibold text-slate-800">Unitech Corporation</p>
                <p className="text-slate-500 leading-relaxed">
                  A1 908, Trinity Paradise, Shil Gaon,<br />
                  Kalyan Phata, Shil Kalyan Road, Thane,<br />
                  Mumbai, Maharashtra, India - 421204.
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  <strong>ISO 9001:2015</strong> Quality Registered Standard
                </p>
              </div>

            </div>

            {/* Slogan callout */}
            <div className="pt-6 border-t border-[#EBE3D5] text-center italic text-sm text-[#3B5F43] font-serif">
              "Har Bund Me Narmi, Har Bond Me Chamak" — Softness in every drop, glow in every bond.
            </div>

          </div>

          {/* ISO 9001:2015 Certificate Showcase Card */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-white rounded-2xl border-2 border-[#C5A880]/40 p-6 sm:p-10 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Certificate Preview Frame */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div 
                onClick={() => {
                  setModalImage('/images/iso-certificate.jpg');
                  setModalTitle('ISO 9001:2015 Certificate of Registration');
                }}
                className="relative group cursor-pointer w-full max-w-[280px] aspect-[1/1.4] rounded-xl overflow-hidden border-2 border-[#EBE3D5] bg-white p-2 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src="/images/iso-certificate.jpg"
                  alt="ISO 9001:2015 Certificate of Registration - Unitech Corporation"
                  fill
                  sizes="300px"
                  className="object-contain p-1"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1">
                  <Award className="h-8 w-8 text-[#C5A880] animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider">Click to Enlarge</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setModalImage('/images/iso-certificate.jpg');
                  setModalTitle('ISO 9001:2015 Certificate of Registration');
                }}
                className="mt-3 inline-flex items-center text-xs font-bold text-[#3B5F43] hover:text-[#2A4430] underline cursor-pointer"
              >
                🔍 View Full High-Res Certificate
              </button>
            </div>

            {/* Right Column: Certificate Details */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B5F43]/10 text-[#3B5F43] text-xs font-bold uppercase tracking-wider">
                <Award className="h-4 w-4 text-[#C5A880]" />
                Certified Quality Management
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
                ISO 9001:2015 Certified System
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Beauti Luuk products are marketed and distributed under **Unitech Corporation’s** Quality Management System, officially audited and registered in accordance with **ISO 9001:2015** standards.
              </p>

              <div className="bg-white p-4 rounded-xl border border-[#EBE3D5] space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="font-semibold text-slate-500">Certified Organization:</span>
                  <span className="font-bold text-slate-800">UNITECH CORPORATION</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="font-semibold text-slate-500">Certificate Number:</span>
                  <span className="font-bold text-[#3B5F43]">25UQLP26</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="font-semibold text-slate-500">Audit Scope:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[220px]">Cosmetics, Herbal & Ayurvedic Care</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="font-semibold text-slate-500">Registration Date:</span>
                  <span className="font-bold text-slate-800">02/01/2026</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ISO Certificate Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#C5A880]" />
                <span className="font-serif text-sm font-bold">{modalTitle}</span>
              </div>
              <button 
                onClick={() => {
                  setModalImage(null);
                  setModalTitle('');
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer text-sm"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100">
              <img
                src={modalImage}
                alt="ISO Certification Details"
                className="max-h-[75vh] w-auto object-contain rounded border border-slate-300 shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Call to Action */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
          <h2 className="font-serif text-3xl font-bold">Ready to Experience Glowing Skin?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Browse our botanical facewash and moisturizing cream catalog to build your daily skin routing.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[#C5A880] hover:bg-[#A88F6A] text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors shadow-md group"
            >
              Explore Shop Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
