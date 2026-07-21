'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setIsSubmitting(true);

    // Format the WhatsApp message body
    const messageText = `Hi Beauti Luuk! 🌸\n\nI want to submit customer feedback.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n${formData.email ? `*Email:* ${formData.email}\n` : ''}${formData.subject ? `*Subject:* ${formData.subject}\n` : ''}\n*Feedback:* ${formData.message}`;

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/918655550456?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset form and show success state
    setIsSubmitting(false);
    setSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="flex flex-col w-full font-sans bg-[#FDFBF7]">
      
      {/* 1. Header Section */}
      <section className="bg-gradient-to-b from-[#EBE3D5]/40 to-[#FDFBF7] py-16 text-center border-b border-[#EBE3D5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="text-xs text-[#C5A880] font-bold uppercase tracking-widest">Get In Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mt-2">
            Contact Beauti Luuk
          </h1>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
            Have a question about our skincare products, bulk order requirements, or need help with a purchase? Contact our team.
          </p>
        </div>
      </section>

      {/* 2. Contact Columns */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl border border-[#EBE3D5] p-6 sm:p-8 shadow-sm space-y-8">
                
                <h2 className="font-serif text-2xl font-bold text-slate-800 border-b pb-3 flex items-center">
                  <MessageSquare className="mr-2.5 h-6 w-6 text-[#C5A880]" />
                  Contact Info
                </h2>

                <ul className="space-y-6 text-sm">
                  
                  {/* Phone */}
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-xl flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-800 text-base">Customer Support</strong>
                      <span className="block text-slate-500 mt-1 font-medium text-sm">+91 8655550456</span>
                      <span className="block text-xs text-slate-400 mt-0.5">(Marketing Care representative)</span>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-xl flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-800 text-base">Email Inquiries</strong>
                      <span className="block text-slate-500 mt-1 font-medium text-sm">beautiluuk@gmail.com</span>
                      <span className="block text-xs text-slate-400 mt-0.5">Send us your suggestions or trade queries.</span>
                    </div>
                  </li>

                  {/* Location Address */}
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#3B5F43]/10 text-[#3B5F43] rounded-xl flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-800 text-base">Corporate Office</strong>
                      <p className="text-slate-500 mt-1 leading-relaxed text-sm">
                        <strong>Unitech Corporation</strong><br />
                        704/A Vatsalya CHS, RBB Marg,<br />
                        Mumbai, Maharashtra, India - 400010.
                      </p>
                    </div>
                  </li>

                </ul>

              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EBE3D5] p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-slate-800 border-b pb-3 mb-6">
                Send Us Your Feedback
              </h2>

              {success ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-3">
                  <div className="mx-auto h-12 w-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-green-800">Feedback Sent Successfully!</h3>
                  <p className="text-xs text-green-700 max-w-sm mx-auto leading-relaxed">
                    Thank you for sharing your feedback with Beauti Luuk. We highly value your opinion and support.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-xs font-bold text-[#3B5F43] hover:underline"
                  >
                    Send another feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:border-[#3B5F43] focus:outline-none"
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:border-[#3B5F43] focus:outline-none"
                        placeholder="Mobile No."
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:border-[#3B5F43] focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Subject (Optional)</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:border-[#3B5F43] focus:outline-none"
                      placeholder="What is your feedback about?"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Your Feedback *</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:border-[#3B5F43] focus:outline-none"
                      placeholder="Type your feedback details here..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white px-6 py-3 text-sm font-semibold shadow-md transition-colors disabled:bg-slate-400"
                    >
                      {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
