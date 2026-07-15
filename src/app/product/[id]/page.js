'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, ArrowLeft, ShieldAlert, Award, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

// Hardcoded fallback data in case database is not initialized yet
const localFallbackCatalog = [
  {
    _id: "seed-orange",
    name: "Orange & Vitamin C Face Wash",
    productId: "MH104767012A",
    category: "Face Wash",
    images: [],
    description: "Orange & Vitamin C Face Wash is formulated for deep skin refreshing and pimple cleansing. Packed with Vitamin C and natural fruit extracts, it cleanses skin impurities, combats acne-causing bacteria, and restores a natural, bright skin glow.",
    ingredients: "DM Water, Sodium C14 -16 olefin sulfonate, Cocamidopropyl betaine, Citrus aurantium (Orange) fruit extract, Phyllanthus emblica (Amla) fruit extract, Acrylate copolymer, Glycerine, Decyl glucoside, Triethanolamine, Xylitylglucoside (and) Anhydroxylitol (and) Xylitol, Dispersible beads, Disodium EDTA, Vitamin C, DMDM Hydantoin, Perfume, Colour CIN (15985).",
    benefits: [
      "Cleanses Pimples & Impurities",
      "Refreshes & Revitalizes Skin",
      "Smoothens Skin Texture",
      "Improves Natural Skin Glow"
    ],
    howToUse: "Wet your face with water. Take a coin-sized amount on your palm. Apply all over the face. Rinse off and pat dry with a towel. For best results, use twice a day. Store below 25°C.",
    skinType: "For All Skin Types",
    weight: "100 ML",
    price: 299,
    discountPrice: 249,
    stock: 50
  },
  {
    _id: "seed-aloe",
    name: "Aloe Cucumber Face Wash",
    productId: "MH104767013A",
    category: "Face Wash",
    images: [],
    description: "Aloe Cucumber Face Wash combines the healing properties of Aloe Vera with the cooling sensation of fresh Cucumber. This hydrating formula cleanses pimples, removes excess sebum, and deeply hydrates, leaving the skin feeling moisturized and refreshed.",
    ingredients: "DM Water, Sodium C14-16 olefin sulfonate, Cocamidopropyl betaine, Acrylate copolymer, Cucumis sativus (Cucumber) fruit extract, Aloe barbadensis leaf extract, Glycerine, Decyl glucoside, Triethanolamine, Aquamix, Xylitylglucoside (and) Anhydroxylitol (and) Xylitol, Disodium EDTA, Colour CIN (19140, 42090), DMDM Hydantoin, Perfume.",
    benefits: [
      "Cleanses Pimples",
      "Refreshes & Cools Skin",
      "Deeply Smoothens & Softens",
      "Improves Hydration & Glow"
    ],
    howToUse: "Wet your face with water. Take a coin-sized amount on your palm. Apply all over the face. Rinse off and pat dry with a towel. For best results, use twice a day. Store below 25°C.",
    skinType: "For All Skin Types",
    weight: "100 ML",
    price: 299,
    discountPrice: 249,
    stock: 45
  },
  {
    _id: "seed-neem",
    name: "Neem Menthol Lemon Face Wash",
    productId: "MH104767014A",
    category: "Face Wash",
    images: [],
    description: "Neem Menthol Lemon Face Wash is the ultimate pimple-cleansing, cooling, and oil-control formula. Neem fights acne bacteria, Lemon provides natural clarifying properties, and Menthol gives a long-lasting cooling effect that wakes up tired skin.",
    ingredients: "DM Water, Sodium C14 -16 olefin sulfonate, Cocamidopropyl betaine, Acrylate copolymer, Citrus limon (Lemon) fruit extract, Melia azadirachta (Neem) leaf extract, Glycerine, Decyl glucoside, Ethylene glycol mono stearate, Xylitylglucoside (and) Anhydroxylitol (and) Xylitol, Peppermint essential oil, Disodium EDTA, Menthol, DMDM Hydantoin, Colour CIN (42090).",
    benefits: [
      "Fights Pimple-Causing Bacteria",
      "Intense Cooling & Refreshing",
      "Controls Excess Oil & Shine",
      "Improves Complexion and Glow"
    ],
    howToUse: "Wet your face with water. Take a coin-sized amount on your palm. Apply all over the face. Rinse off and pat dry with a towel. For best results, use twice a day. Store below 25°C.",
    skinType: "For All Skin Types",
    weight: "100 ML",
    price: 299,
    discountPrice: 249,
    stock: 30
  },
  {
    _id: "seed-keshar",
    name: "Keshar Ubtan Face Wash",
    productId: "MH104767015A",
    category: "Face Wash",
    images: [],
    description: "Keshar Ubtan Face Wash brings the traditional Indian Ubtan recipe into a convenient wash. Loaded with Saffron (Keshar), Kumkumadi Oil, and traditional herbs, it deeply purifies skin, brightens dark spots, and reveals a glowing complexion.",
    ingredients: "DM Water, Sodium C14-16 olefin sulfonate, Cocamidopropyl betaine, Acrylate copolymer, Glycerine, Decyl glucoside, Ethylene glycol mono stearate, Crocus sativus (Saffron) flower extract, Xylitylglucoside (and) Anhydroxylitol (and) Xylitol, Disodium EDTA, Kumkumadi oil, Ubtan powder, Phenoxyethanol (and) Ethylhexylglycerine (and) Octenidine HCl, DMDM Hydantoin, Perfume, Colour CIN (15985).",
    benefits: [
      "Cleanses Pimples & Marks",
      "Brightens Skin Tone & Tanning",
      "Smoothens Out Fine Texture",
      "Improves Radiance & Glow"
    ],
    howToUse: "Wet your face with water. Take a coin-sized amount on your palm. Apply all over the face. Rinse off and pat dry with a towel. For best results, use twice a day. Store below 25°C.",
    skinType: "For All Skin Types",
    weight: "100 ML",
    price: 349,
    discountPrice: 299,
    stock: 40
  },
  {
    _id: "seed-cream",
    name: "Milk, Honey & Keshar Moisturising Cream",
    productId: "MH104767016A",
    category: "Creams & Lotions",
    images: [],
    description: "Milk, Honey & Keshar Moisturising Cream is a rich, luxury face cream designed to provide intensive hydration and lock in skin moisture. Combining natural milk proteins, nourishing honey, and skin-brightening saffron, it provides baby-soft skin with a luminous glow.",
    ingredients: "DM Water, Light liquid paraffin, Stearic acid, Ethylene glycol mono stearate, Petroleum jelly, Prunus amygdalus (Sweet almond) oil, PEG 100 stearate (and) Glyceryl stearate, Cetyl alcohol, Triethanolamine, Lactic acid (Milk derivative), Honey, Crocus sativus (Saffron) flower extract, Disodium EDTA, Perfume, DMDM Hydantoin, Colour CIN (19140).",
    benefits: [
      "Intensely Moisturises & Softens",
      "Smoothens Fine Lines & Dry Patches",
      "Refreshes Tired Skin Cells",
      "Improves Luminous Skin Glow"
    ],
    howToUse: "Apply to slightly damp skin immediately after cleansing, ideally within three seconds, to lock in hydration. Take a pea-sized amount and gently massage it onto the face and neck using upward and outward strokes. Apply after serums and before sunscreen.",
    skinType: "For All Skin Types",
    weight: "100 G",
    price: 399,
    discountPrice: 349,
    stock: 25
  },
  {
    _id: "seed-lotion",
    name: "Hydrating Aqua Almond Milk Lotion",
    productId: "MH104767017A",
    category: "Creams & Lotions",
    images: [],
    description: "Hydrating Aqua Almond Milk Lotion is a lightweight, non-sticky body and face lotion. It provides an incredible 72-hour hydration barrier. Enriched with real Sweet Almond oil, cooling Aloe Vera, Niacinamide, and Vitamin B5, it absorbs instantly to leave skin feeling soft and healthy.",
    ingredients: "DM Water, Aloe barbadensis (Aloe) leaf extract, Light liquid paraffin, Stearic acid, Glycerine, Propylene glycol, Cetyl alcohol, PEG 100 stearate (and) Glyceryl stearate, Prunus amygdalus (Sweet almond) oil, Niacinamide, DL Panthenol, Disodium EDTA, Tocopheryl acetate, Lactic acid (Milk derivative), DMDM Hydantoin, Perfume.",
    benefits: [
      "Provides 72 Hours Hydration",
      "Instant Non-Greasy Absorption",
      "Non-Sticky Featherlight Texture",
      "Maintains Soft, Healthy Looking Skin"
    ],
    howToUse: "Take an adequate amount of lotion and apply evenly. Massage gently in circular motions until absorbed. Use morning and evening, or as needed, to keep skin soft, smooth, and hydrated.",
    skinType: "For All Skin Types",
    weight: "100 ML",
    price: 449,
    discountPrice: 379,
    stock: 35
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  // State managers
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    async function fetchProductData() {
      if (!id) return;
      setLoading(true);
      try {
        // Fetch current product from MongoDB API
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (data.success && data.product) {
          setProduct(data.product);
          fetchRelated(data.product);
        } else {
          // Fallback lookup from hardcoded local catalog
          const localProd = localFallbackCatalog.find(p => p._id === id || p.productId === id);
          if (localProd) {
            setProduct(localProd);
            fetchRelated(localProd);
          } else {
            router.push('/shop');
          }
        }
      } catch (error) {
        // Fallback lookup on API error
        const localProd = localFallbackCatalog.find(p => p._id === id || p.productId === id);
        if (localProd) {
          setProduct(localProd);
          fetchRelated(localProd);
        } else {
          router.push('/shop');
        }
      } finally {
        setLoading(false);
      }
    }

    // Related helper
    async function fetchRelated(currentProd) {
      try {
        const relatedRes = await fetch(`/api/products?category=${encodeURIComponent(currentProd.category)}`);
        const relatedData = await relatedRes.json();
        if (relatedData.success && relatedData.products && relatedData.products.length > 0) {
          const filtered = relatedData.products.filter(p => p._id !== currentProd._id).slice(0, 3);
          setRelatedProducts(filtered);
        } else {
          loadLocalRelated(currentProd);
        }
      } catch (e) {
        loadLocalRelated(currentProd);
      }
    }

    // Offline related fallback helper
    function loadLocalRelated(currentProd) {
      const filtered = localFallbackCatalog
        .filter(p => p.category === currentProd.category && p.productId !== currentProd.productId)
        .slice(0, 3);
      setRelatedProducts(filtered);
    }

    fetchProductData();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-48">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
      </div>
    );
  }

  if (!product) return null;

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
          <div className="aspect-square rounded-2xl bg-white border border-[#EBE3D5] flex items-center justify-center relative overflow-hidden shadow-sm">
            <span className="font-serif font-bold text-6xl text-[#C5A880] select-none">
              {product.name.substring(0, 2).toUpperCase()}
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
            
            {/* Visual badges overlay */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-end">
              <span className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-3 py-1 text-[10px] font-bold text-[#3B5F43] flex items-center gap-1 uppercase tracking-wider">
                <Heart className="h-3.5 w-3.5 fill-[#3B5F43] text-transparent" />
                Cruelty Free
              </span>
              <span className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-3 py-1 text-[10px] font-bold text-[#C5A880] flex items-center gap-1 uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" />
                GMP Certified
              </span>
            </div>
            
            {/* Barcode ID Display */}
            <div className="absolute top-6 left-6 bg-slate-900 text-white font-mono text-xs px-3 py-1 rounded shadow-md border border-slate-700">
              Barcode: {product.productId}
            </div>
          </div>
          
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
            
            {/* Weight specs */}
            <div className="text-sm text-slate-500">
              Net Weight / Volume: <strong className="text-slate-800">{product.weight}</strong>
            </div>

            <div className="w-full h-px bg-[#EBE3D5] my-6" />

            {/* Buying / Inquire Controls */}
            <div className="space-y-4 pt-4">
              {product.stock > 0 ? (
                <>
                  <a
                    href={`https://wa.me/918655550456?text=${encodeURIComponent(
                      `Hi Beauti Luuk! 🌸\n\nI am interested in ordering the *${product.name}* (${product.weight}).\n\nPrice: ₹${product.discountPrice > 0 ? product.discountPrice : product.price}\n\nPlease guide me on how to proceed with payment and delivery!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#3B5F43] hover:bg-[#2A4430] text-white px-8 py-3.5 text-sm font-bold shadow-md transition-colors"
                  >
                    <Phone className="mr-2 h-4.5 w-4.5 fill-white text-transparent" />
                    Order via WhatsApp
                  </a>
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
                <Link href={`/product/${p._id}`} className="h-48 w-full bg-slate-50 flex items-center justify-center relative">
                  <span className="font-serif font-bold text-xl text-[#C5A880]">
                    {p.name.substring(0, 2).toUpperCase()}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
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

    </div>
  );
}
