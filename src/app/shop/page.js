'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowUpDown, Tag } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State managers
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('price-asc'); // default price low to high

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Filter products based on search, category and sorting selection
  useEffect(() => {
    async function fetchFilteredProducts() {
      setLoading(true);
      try {
        let url = `/api/products?sortBy=${sortBy}&`;
        if (activeCategory && activeCategory !== 'All') {
          url += `category=${encodeURIComponent(activeCategory)}&`;
        }
        if (searchQuery) {
          url += `search=${encodeURIComponent(searchQuery)}&`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log('Error querying database catalog:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 150); // debounce search query input

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (val === '') {
      params.delete('search');
    } else {
      params.set('search', val);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const categories = ['All', 'Face Wash', 'Creams & Lotions'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EBE3D5] pb-6 mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Organic Skincare Collection
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-md">
            Find the perfect face wash, moisturizing cream, or body lotion. Formulated for all skin types.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filters Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          
          {/* Categories list */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] shadow-sm">
            <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center mb-4">
              <SlidersHorizontal className="mr-2 h-4 w-4 text-[#C5A880]" />
              Categories
            </h2>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-md text-left text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[#3B5F43] text-white'
                      : 'text-slate-600 hover:bg-[#3B5F43]/10 hover:text-[#3B5F43] bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting panel */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] shadow-sm">
            <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center mb-4">
              <ArrowUpDown className="mr-2 h-4 w-4 text-[#C5A880]" />
              Sort By
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm focus:border-[#3B5F43] focus:outline-none"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Product Name: A to Z</option>
            </select>
          </div>

        </div>

        {/* Right Column: Search bar and Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Search Input bar */}
          <div className="relative">
            <Search className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, ingredients, or scan barcode ID..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#EBE3D5] bg-white text-sm text-slate-700 shadow-sm focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none"
            />
          </div>

          {/* Search Result Stats */}
          {!loading && (
            <div className="text-xs text-slate-500 flex justify-between items-center">
              <span>Showing {products.length} products</span>
              {searchQuery && (
                <span>Search results for: "<strong>{searchQuery}</strong>"</span>
              )}
            </div>
          )}

          {/* Products Grid Content */}
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white p-16 rounded-xl border border-[#EBE3D5] text-center shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-700">No products found</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                We couldn't find any cosmetics matching your filters. Try checking your spelling or clearing the search box.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('All');
                }}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#3B5F43] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2A4430] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl overflow-hidden border border-[#EBE3D5] bg-white shadow-sm flex flex-col group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Image container */}
                  <Link
                    href={`/product/${product._id}`}
                    className="h-72 w-full bg-slate-50 flex items-center justify-center relative overflow-hidden"
                  >
                    {product.images && product.images.length > 0 && product.images[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 bg-white"
                      />
                    ) : (
                      <>
                        <span className="font-serif font-bold text-2xl text-[#C5A880] select-none group-hover:scale-105 transition-transform duration-300">
                          {product.name.substring(0, 2).toUpperCase()}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/5 to-[#3B5F43]/5 opacity-60" />
                      </>
                    )}
                    
                    {/* Stock Alert */}
                    {product.stock === 0 ? (
                      <div className="absolute top-3 right-3 bg-slate-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        Out of Stock
                      </div>
                    ) : product.stock <= 5 ? (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        Only {product.stock} Left!
                      </div>
                    ) : null}
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <Link href={`/product/${product._id}`} className="block mt-1">
                        <h3 className="font-serif text-base font-bold text-slate-800 hover:text-[#C5A880] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing details and actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-[#EBE3D5]/60 pt-4">
                      <div>
                        {product.discountPrice > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#3B5F43] font-bold text-sm">₹{product.discountPrice}</span>
                            <span className="text-slate-400 line-through text-[10px]">₹{product.price}</span>
                          </div>
                        ) : (
                          <span className="text-[#3B5F43] font-bold text-sm">₹{product.price}</span>
                        )}
                        <span className="block text-[8px] text-slate-400">Net: {product.weight}</span>
                      </div>

                      <Link
                        href={`/product/${product._id}`}
                        className="inline-flex items-center justify-center rounded-md border border-[#3B5F43] text-[#3B5F43] hover:bg-[#3B5F43] hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
