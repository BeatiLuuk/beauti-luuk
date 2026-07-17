'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, LogOut, Package, Tag, AlertTriangle, ExternalLink, HelpCircle, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingName, setDeletingName] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?sortBy=name-asc');
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching catalog products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Trigger double-confirm deletion modal
  const openDeleteModal = (product) => {
    setDeletingId(product._id);
    setDeletingName(product.name);
    setDeleteError('');
    setDeleteSuccess('');
  };

  // Perform delete operation
  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch(`/api/products/${deletingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDeleteSuccess('Product removed successfully!');
        // Update local state grid
        setProducts(products.filter((p) => p._id !== deletingId));
        setTimeout(() => {
          setDeletingId(null);
          setDeleteSuccess('');
        }, 1500);
      } else {
        setDeleteError(data.message || 'Failed to remove the product.');
      }
    } catch (err) {
      setDeleteError('A connection error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper metrics
  const totalProducts = products.length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EBE3D5] px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="relative h-10 w-24 select-none hover:opacity-95 transition-opacity">
              <Image 
                src="/images/logo.png" 
                alt="Beauti Luuk Logo" 
                fill
                className="object-contain"
              />
            </Link>
            <div className="h-6 w-px bg-slate-300 hidden sm:block" />
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded px-2.5 py-1 uppercase tracking-wider hidden sm:inline-block">
              Admin Control Center
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#3B5F43] transition-colors"
            >
              Go to Shop
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 border border-rose-100 hover:bg-rose-100/70 text-rose-700 text-xs font-bold px-4 py-2 transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Total Products */}
          <div className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#3B5F43]/10 flex items-center justify-center text-[#3B5F43]">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</span>
              <span className="text-2xl font-serif font-bold text-slate-800">{totalProducts}</span>
            </div>
          </div>

          {/* Card 2: Categories Count */}
          <div className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Categories</span>
              <span className="text-2xl font-serif font-bold text-slate-800">{categoriesCount}</span>
            </div>
          </div>

          {/* Card 3: Low Stock Warnings */}
          <div className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
              <span className="text-2xl font-serif font-bold text-slate-800">{lowStockCount}</span>
            </div>
          </div>
        </div>

        {/* Catalog Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
              Database Catalog Products
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Add new inventory listings, update weights, edit pricing attributes, and delete obsolete cosmetic formulas.
            </p>
          </div>
          <Link
            href="/admin/dashboard/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B5F43] hover:bg-[#2A4430] text-white text-sm font-semibold px-5 py-3 transition-colors shadow-sm hover:shadow"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Table/Listing Block */}
        <div className="bg-white rounded-2xl border border-[#EBE3D5] shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B5F43] border-t-transparent" />
              <span className="text-xs text-slate-500 font-medium">Querying MongoDB container...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 px-4">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-slate-700">Catalog is empty</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                No products are currently seeded or added in your MongoDB instance. Click "+ Add New Product" to start building your shop inventory.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-55 border-b border-[#EBE3D5] text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6 text-center">Stock Level</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE3D5] text-sm text-slate-700">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                      
                      {/* Product Thumbnail & SKU */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-lg border border-slate-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                            {product.images && product.images.length > 0 && product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xs font-bold text-[#C5A880] select-none">
                                {product.name.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="block font-semibold text-slate-800 hover:text-[#3B5F43] transition-colors">
                              {product.name}
                            </span>
                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                              SKU/Barcode: {product.productId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EBE3D5]/40 text-[#8c7453]">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          {product.discountPrice ? (
                            <>
                              <span className="font-bold text-[#3B5F43]">₹{product.discountPrice}</span>
                              <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                            </>
                          ) : (
                            <span className="font-bold text-slate-850">₹{product.price}</span>
                          )}
                          <span className="text-[10px] text-slate-400 font-medium">Net: {product.weight}</span>
                        </div>
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-4 px-6 text-center">
                        {product.stock === 0 ? (
                          <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 border border-rose-100">
                            Out of Stock
                          </span>
                        ) : product.stock <= 5 ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 border border-amber-100">
                            Low Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100">
                            In Stock ({product.stock})
                          </span>
                        )}
                      </td>

                      {/* CRUD Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link
                            href={`/admin/dashboard/edit/${product._id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-[#3B5F43] hover:text-[#3B5F43] transition-all shadow-sm hover:shadow"
                            title="Edit Product"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100/75 hover:text-rose-700 transition-all shadow-sm hover:shadow cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Delete Confirmation Dialog Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#EBE3D5] max-w-md w-full p-6 shadow-xl space-y-6 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-slate-800">
                  Delete Inventory Product?
                </h3>
                <p className="text-xs text-slate-500">
                  This action cannot be undone. This will permanently remove <strong className="text-slate-800">"{deletingName}"</strong> from the MongoDB catalog.
                </p>
              </div>
            </div>

            {/* Error alerts */}
            {deleteError && (
              <div className="flex items-start gap-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg p-3 text-xs">
                <X className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{deleteError}</span>
              </div>
            )}

            {/* Success alerts */}
            {deleteSuccess && (
              <div className="flex items-start gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg p-3 text-xs">
                <Check className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{deleteSuccess}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingId(null)}
                className="rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 text-xs font-semibold px-4.5 py-2.5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting || deleteSuccess}
                onClick={confirmDelete}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-5 py-2.5 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
