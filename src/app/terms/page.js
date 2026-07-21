'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function TermsAndConditions() {
  const lastUpdated = "July 21, 2026";

  return (
    <div className="flex flex-col w-full font-sans bg-[#FDFBF7] min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EBE3D5]/40 via-[#FDFBF7] to-[#FDFBF7] py-16 text-center border-b border-[#EBE3D5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B5F43]/10 text-[#3B5F43] text-xs font-bold uppercase tracking-wider">
            <FileText className="h-3.5 w-3.5" />
            Legal Agreement
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Terms & Conditions
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
              Welcome to Beauti Luuk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              These Terms and Conditions govern your use of the **Beauti Luuk** website and services. By accessing or purchasing from our platform, you agree to be bound by the terms outlined below.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">1. Ownership & Operation</h2>
            <p>
              This website is owned, operated, and marketed by **Unitech Corporation** (ISO 9001:2015 Certified Company), registered in Maharashtra, India. All cosmetic and skincare products listed on this platform are manufactured under approved cosmetics license parameters by **Amoha Herbals Pvt. Ltd.**
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">2. Cosmetic Product Usage & Disclaimer</h2>
            <p>
              All **Beauti Luuk** products (including Face Washes, Moisturizing Creams, and Body Lotions) are designed exclusively for **external cosmetic use**.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Patch Test Advisory:</strong> Even though our formulations use natural, botanical, and organic base ingredients, we recommend performing a small skin patch test before full application.</li>
              <li><strong>Allergy & Sensitivity:</strong> Discontinue use immediately if irritation, redness, or rash occurs. Avoid direct contact with eyes.</li>
              <li><strong>Medical Disclaimer:</strong> Our products are non-prescriptive cosmetic skin care formulas and are not intended to diagnose, treat, cure, or prevent any medical skin disease.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">3. Pricing & Product Availability</h2>
            <p>
              All prices listed on the website are displayed in **Indian Rupees (INR ₹)**. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>We reserve the right to modify prices, update promotional discount rates (such as Independence Day or Festival offers), or discontinue items without prior notice.</li>
              <li>Product availability is subject to stock quantities. In the rare event an item is unavailable after placing a query, our support team will notify you immediately.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">4. Orders & Customer Support Redirection</h2>
            <p>
              When placing inquiries or support requests on our website, submissions may be redirected to our official business **WhatsApp Customer Care (+91 8655550456)** to provide fast, personalized, and direct service.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">5. Intellectual Property</h2>
            <p>
              All content on this website—including the brand name **Beauti Luuk**, slogan (*"Har Bund Me Narmi, Har Bond Me Chamak"*), logos, product photography, banner designs, and textual content—is the intellectual property of **Unitech Corporation** and is protected under Indian Copyright and Trademark laws. Unauthorized reproduction or copying is strictly prohibited.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="font-serif text-xl font-bold text-slate-800">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of **India**. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in **Mumbai / Thane, Maharashtra, India**.
            </p>
          </div>

          {/* Section 7 - Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-800">Contact & Legal Inquiries</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have any questions regarding these Terms & Conditions, please contact us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3B5F43]" />
                <span><strong>Customer Support:</strong> +91 8655550456</span>
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
