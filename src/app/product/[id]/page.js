'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Share2, QrCode, X, ArrowLeft, ShieldAlert, Award, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  // State managers
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    async function fetchProductDetails() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          // Load related products
          const relatedRes = await fetch(`/api/products?category=${encodeURIComponent(data.product.category)}`);
          const relatedData = await relatedRes.json();
          if (relatedData.success && relatedData.products) {
            const filtered = relatedData.products.filter(p => p._id !== data.product._id).slice(0, 3);
            setRelatedProducts(filtered);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log('Error fetching product details:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: product ? product.name : 'Beauti Luuk Skincare',
      text: product ? `${product.name} - ${product.description.substring(0, 100)}...` : 'Beauti Luuk Organic Skincare',
      url: window.location.href,
    };

    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing product:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 2000);
      } catch (err) {
        console.log('Clipboard copy failed:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-48">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center space-y-4">
        <div className="bg-[#3B5F43]/5 border border-[#EBE3D5] p-8 rounded-2xl">
          <h2 className="font-serif text-xl font-bold text-slate-800">Product Not Found</h2>
          <p className="text-xs text-slate-500 mt-2">
            The skincare item you are trying to view is not registered in the database, or the catalog database is offline.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white py-2.5 text-xs font-semibold shadow-sm"
            >
              Back to Catalog Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => router.push('/shop')}
          className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-[#C5A880] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </button>
        
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-sans">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-[#C5A880]">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-medium truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 border-b border-[#EBE3D5] pb-16">
        
        {/* Left Column: Product Image Display with initials */}
        <div className="flex flex-col space-y-6">
          {product.images && product.images.length > 0 && product.images[0] ? (
            <div className="relative bg-white border border-[#EBE3D5] rounded-2xl p-4 shadow-sm w-fit mx-auto flex items-center justify-center overflow-hidden">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                width={400}
                height={500}
                className="max-h-[500px] w-auto object-contain animate-fade-in"
                priority
              />
              
              {/* Visual badges overlay */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 items-end">
                <span className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-2 py-0.5 text-[8px] font-bold text-[#3B5F43] flex items-center gap-1 uppercase tracking-wider">
                  <Heart className="h-3 w-3 fill-[#3B5F43] text-transparent" />
                  Cruelty Free
                </span>
                <span className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-2 py-0.5 text-[8px] font-bold text-[#C5A880] flex items-center gap-1 uppercase tracking-wider">
                  <Award className="h-3 w-3" />
                  GMP Certified
                </span>
              </div>
            </div>
          ) : (
            <div className="aspect-square rounded-2xl bg-white border border-[#EBE3D5] flex items-center justify-center relative overflow-hidden shadow-sm">
              <span className="font-serif font-bold text-6xl text-[#C5A880] select-none">
                {product.name.substring(0, 2).toUpperCase()}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
            </div>
          )}
          
          {/* Quality Certifications Ribbon */}
          <div className="grid grid-cols-3 gap-4 text-center bg-[#3B5F43]/5 rounded-xl border border-[#EBE3D5]/50 p-4">
            <div>
              <span className="block text-xs font-bold text-slate-700">Made in</span>
              <span className="text-[10px] font-bold text-[#3B5F43] tracking-wide uppercase">India 🇮🇳</span>
            </div>
            <div className="border-x border-[#EBE3D5] px-2">
              <span className="block text-xs font-bold text-slate-700">For Skin</span>
              <span className="text-[10px] font-bold text-[#3B5F43] tracking-wide uppercase">All Types</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-700">Shelf Life</span>
              <span className="text-[10px] font-bold text-[#3B5F43] tracking-wide uppercase">24 Months</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information details and checkout actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs text-[#C5A880] font-bold uppercase tracking-widest">{product.category}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">{product.name}</h1>
            
            {/* Price comparisons */}
            <div className="flex items-baseline gap-3 pt-2">
              {product.discountPrice > 0 ? (
                <>
                  <span className="text-2xl font-bold text-[#3B5F43]">₹{product.discountPrice}</span>
                  <span className="text-sm text-slate-400 line-through">MRP: ₹{product.price}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-100 rounded px-1.5 py-0.5">
                    Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-[#3B5F43]">₹{product.price}</span>
              )}
            </div>
            
            {/* Weight & Barcode specs */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <div>
                Net Weight: <strong className="text-slate-800">{product.weight}</strong>
              </div>
              <div className="hidden sm:block w-px h-3.5 bg-[#EBE3D5]" />
              <div>
                SKU / Barcode: <strong className="text-slate-800 font-mono text-xs">{product.productId}</strong>
              </div>
            </div>

            <div className="w-full h-px bg-[#EBE3D5] my-6" />

            {/* Buying / Inquire Controls */}
            <div className="space-y-4 pt-4">
              {product.stock > 0 ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/918655550456?text=${encodeURIComponent(
                        `Hi Beauti Luuk! 🌸\n\nI am interested in ordering the *${product.name}* (${product.weight}).\n\nPrice: ₹${product.discountPrice > 0 ? product.discountPrice : product.price}\n\nPlease guide me on how to proceed with payment and delivery!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white px-8 py-3.5 text-sm font-bold shadow-md transition-colors"
                    >
                      <Phone className="mr-2 h-4.5 w-4.5 fill-white text-transparent" />
                      Order via WhatsApp
                    </a>

                    <button
                      onClick={handleShare}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 hover:border-[#C5A880] hover:text-[#C5A880] text-slate-600 bg-white px-5 py-3.5 text-sm font-semibold transition-all relative"
                      title="Share Product"
                    >
                      <Share2 className="mr-2 h-4.5 w-4.5" />
                      Share
                      {showCopiedToast && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] px-2.5 py-1 rounded shadow-md whitespace-nowrap animate-fade-in font-sans">
                          Link copied!
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setShowQrModal(true)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 hover:border-[#C5A880] hover:text-[#C5A880] text-slate-600 bg-white px-5 py-3.5 text-sm font-semibold transition-all"
                      title="Show QR Code"
                    >
                      <QrCode className="mr-2 h-4.5 w-4.5" />
                      QR Code
                    </button>
                  </div>
                  <p className="text-xs text-[#3B5F43] font-semibold">✓ In Stock (Ships in 24 Hours)</p>
                </>
              ) : (
                <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-center">
                  <span className="block font-bold text-slate-600">Product Temporarily Out of Stock</span>
                  <span className="text-xs text-slate-500">We are manufacturing a fresh batch. Please check back soon!</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Tabs / Information Section */}
          <div className="mt-8 border border-[#EBE3D5] rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="flex border-b border-[#EBE3D5] bg-slate-50 text-sm font-semibold text-slate-500">
              {['description', 'ingredients', 'benefits', 'instructions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-center border-b-2 capitalize transition-all ${
                    activeTab === tab
                      ? 'border-[#3B5F43] text-[#3B5F43] bg-white font-bold'
                      : 'border-transparent hover:text-slate-700 hover:bg-slate-100/50'
                  }`}
                >
                  {tab === 'instructions' ? 'How to Use' : tab}
                </button>
              ))}
            </div>
            
            <div className="p-6 text-sm text-slate-600 leading-relaxed min-h-[150px]">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  <h4 className="font-serif font-bold text-slate-800 mb-2">Key Ingredients:</h4>
                  <p className="italic text-xs font-mono bg-slate-50 rounded border p-3">{product.ingredients}</p>
                  <span className="block text-[10px] text-slate-400 mt-2">
                    *For external cosmetic use only. Protect from direct heat & sunlight. Store below 25°C.
                  </span>
                </div>
              )}
              {activeTab === 'benefits' && (
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#3B5F43] flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'instructions' && (
                <div>
                  <p>{product.howToUse}</p>
                  <p className="mt-3 text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    Caution: In case of irritation, discontinue use immediately. Contact customer care.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-slate-800 mb-8 text-center sm:text-left">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="rounded-xl overflow-hidden border border-[#EBE3D5] bg-white shadow-sm flex flex-col group hover:shadow-md transition-all duration-200"
              >
                <Link href={`/product/${p._id}`} className="h-64 w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                  {p.images && p.images.length > 0 && p.images[0] ? (
                    <Image 
                      src={p.images[0]} 
                      alt={p.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300 bg-white"
                    />
                  ) : (
                    <>
                      <span className="font-serif font-bold text-xl text-[#C5A880]">
                        {p.name.substring(0, 2).toUpperCase()}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
                    </>
                  )}
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-[#C5A880] font-bold uppercase tracking-wider">{p.category}</span>
                    <Link href={`/product/${p._id}`} className="block mt-0.5">
                      <h3 className="font-serif font-bold text-slate-800 text-sm hover:text-[#C5A880] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#EBE3D5]/60 pt-3">
                    <span className="text-slate-900 font-bold text-xs">
                      ₹{p.discountPrice > 0 ? p.discountPrice : p.price}
                    </span>
                    <Link
                      href={`/product/${p._id}`}
                      className="text-xs text-[#3B5F43] hover:text-[#C5A880] font-bold flex items-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal Overlay */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div
            onClick={() => setShowQrModal(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          <div className="relative bg-[#FDFBF7] border border-[#EBE3D5] rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 shadow-2xl z-10 text-center space-y-5 animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EBE3D5] pb-3">
              <span className="font-serif font-bold text-slate-800 text-base">Product QR Code</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* QR Body */}
            <div className="py-2 space-y-4">
              <div className="mx-auto border-2 border-double border-[#C5A880] p-3 bg-white rounded-xl shadow-inner w-48 h-48 flex items-center justify-center">
                {currentUrl ? (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=3B5F43&data=${encodeURIComponent(currentUrl)}`}
                    alt="Product Details QR Code"
                    className="w-full h-full object-contain animate-fade-in"
                  />
                ) : (
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
                )}
              </div>
              <h3 className="font-serif font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Scan this QR code with your smartphone camera to open this product catalogue page instantly on your phone!
              </p>
            </div>

            {/* Done Button */}
            <div>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white py-2.5 text-xs font-semibold shadow-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
