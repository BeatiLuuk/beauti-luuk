'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle, ArrowLeft, Phone, Mail, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "July 21, 2026";

  return (
    <div className="flex flex-col w-full font-sans bg-[#FDFBF7] min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EBE3D5]/40 via-[#FDFBF7] to-[#FDFBF7] py-16 text-center border-b border-[#EBE3D5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B5F43]/10 text-[#3B5F43] text-xs font-bold uppercase tracking-wider">
            <Lock className="h-3.5 w-3.5" />
            Data Protection & Trust
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Effective Date: {lastUpdated} | Marketed by Unitech Corporation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* Back link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-[#3B5F43] transition-colors"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>

          {/* Intro Box */}
          <div className="bg-[#3B5F43]/5 border border-[#EBE3D5] rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#3B5F43]" />
              Your Privacy Matters to Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              At **Beauti Luuk** (operated by **Unitech Corporation**), we are committed to protecting your personal privacy. This Privacy Policy explains what information we collect, how we use it, and how we keep it safe when you visit our website.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">1. Information We Collect</h2>
            <p>
              We collect information to provide better services and respond to product inquiries. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Personal Contact Details:</strong> Name, phone number, email address, and inquiry messages voluntarily provided when submitting our contact form or connecting via WhatsApp.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, device information, and standard page view analytics collected automatically to improve website performance.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">2. How We Use Your Information</h2>
            <p>
              Your personal information is strictly used for legitimate business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>To respond to your product inquiries and skincare assistance requests.</li>
              <li>To route order inquiries directly to our official WhatsApp Customer Support (+91 8655550456).</li>
              <li>To improve website speed, navigation layout, and mobile compatibility.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">3. Data Sharing & Third Parties</h2>
            <p>
              **We do NOT sell, rent, trade, or leak your personal contact details to third-party advertisers.**
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Information may only be shared with trusted technical infrastructure partners (e.g., Vercel for cloud web hosting or Cloudinary for secure media delivery) strictly necessary to run this platform, or if required by Indian legal authorities.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">4. Cookies & Tracking Technologies</h2>
            <p>
              Our website uses essential functional cookies:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Session Cookies:</strong> Used for secure administrative login session authentication.</li>
              <li><strong>Performance Analytics:</strong> Basic anonymous metrics to understand page traffic and improve load times. You can disable cookies in your browser settings if preferred.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">5. Data Security</h2>
            <p>
              We implement industry-standard security measures—including SSL/HTTPS encryption—to protect your personal information against unauthorized access, loss, or misuse.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-1xl font-bold text-slate-800 text-lg">6. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal contact information from our customer records. Simply contact our support team to submit a request.
            </p>
          </div>

          {/* Section 7 - Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-800">Privacy Support & Contact</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have any questions or privacy concerns regarding this Privacy Policy, please reach out to us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3B5F43]" />
                <span><strong>WhatsApp Support:</strong> +91 8655550456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3B5F43]" />
                <span><strong>Email:</strong> beautiluuk@gmail.com</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
