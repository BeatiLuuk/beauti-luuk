'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, AlertCircle, Save, HelpCircle } from 'lucide-react';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    productId: '',
    category: 'Face Wash',
    description: '',
    ingredients: '',
    benefits: '',
    howToUse: '',
    weight: '',
    price: '',
    discountPrice: '',
    stock: 10,
    images: [''],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length === 1) {
      handleImageChange(0, '');
      return;
    }
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const [uploadingIdx, setUploadingIdx] = useState(null);

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    setUploadingIdx(index);

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'ml_default');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/vxp8medc/image/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.secure_url) {
        handleImageChange(index, data.secure_url);
      } else {
        alert(data.error?.message || 'Upload Preset Error: Please make sure unsigned uploads are allowed in your Cloudinary settings or paste the URL manually.');
      }
    } catch (err) {
      alert('Network connection error while uploading photo.');
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Field Validations
    if (!formData.name || !formData.productId || !formData.category || !formData.description || !formData.price || !formData.weight) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);

    // Format fields (convert prices/stocks to numbers)
    const formattedData = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock),
      // Filter out empty image string URLs
      images: formData.images.filter(img => img.trim() !== ''),
      // Ingredients should be sent as a raw string
      ingredients: formData.ingredients,
      // Convert comma-separated strings to clean lists
      benefits: formData.benefits.split(',').map((item) => item.trim()).filter(Boolean),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Product listing created successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 1500);
      } else {
        setError(data.message || 'Failed to create product listing.');
      }
    } catch (err) {
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#3B5F43] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Title */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">Add New Inventory Listing</h1>
          <p className="text-xs text-slate-500 mt-1">
            Specify the name, SKU barcode, list pricing parameters, categories, and ingredients of the formula.
          </p>
        </div>

        {/* Alert Windows */}
        {error && (
          <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs text-rose-600 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-600 animate-fade-in">
            <Check className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Input Form Layout */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: General info card */}
            <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE3D5] shadow-sm space-y-6">
              <h2 className="text-xs font-bold text-[#C5A880] uppercase tracking-wider border-b border-[#EBE3D5] pb-2">
                General Product Information
              </h2>

              <div className="space-y-4">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Neem Menthol Lemon Face Wash"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                  />
                </div>

                {/* SKU Barcode & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="productId" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      SKU Barcode ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="productId"
                      name="productId"
                      required
                      value={formData.productId}
                      onChange={handleChange}
                      placeholder="e.g. MH104767012A"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-650 bg-white focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    >
                      <option value="Face Wash">Face Wash</option>
                      <option value="Creams & Lotions">Creams & Lotions</option>
                    </select>
                  </div>
                </div>

                {/* Description field */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Product Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter full descriptive overview of the skin benefits, notes, and formulas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Ingredients & Benefits lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ingredients" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Key Ingredients <span className="text-xs text-slate-400 font-normal">(Comma-separated)</span>
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      rows={3}
                      value={formData.ingredients}
                      onChange={handleChange}
                      placeholder="e.g. Neem Extract, Menthol Crystals, Lemon Oil"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="benefits" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Benefits & Features <span className="text-xs text-slate-400 font-normal">(Comma-separated)</span>
                    </label>
                    <textarea
                      id="benefits"
                      name="benefits"
                      rows={3}
                      value={formData.benefits}
                      onChange={handleChange}
                      placeholder="e.g. Prevents Acne, Cooling Sensation, Oil Control"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* How to use field */}
                <div>
                  <label htmlFor="howToUse" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    How To Use <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="howToUse"
                    name="howToUse"
                    rows={2}
                    value={formData.howToUse}
                    onChange={handleChange}
                    placeholder="e.g. Apply small amount on wet face, rub in circular motion and rinse off."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors resize-none"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Pricing, Inventory & Image URL card */}
            <div className="md:col-span-4 space-y-6">
              
              {/* Sizing & pricing block */}
              <div className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-sm space-y-6">
                <h2 className="text-xs font-bold text-[#C5A880] uppercase tracking-wider border-b border-[#EBE3D5] pb-2">
                  Inventory & Pricing
                </h2>

                <div className="space-y-4">
                  {/* Weight/Volume */}
                  <div>
                    <label htmlFor="weight" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Net Weight / Volume <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      required
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 100 ml, 50 gm"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Regular Price */}
                  <div>
                    <label htmlFor="price" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Regular Price (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min={0}
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 299"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Discount Price */}
                  <div>
                    <label htmlFor="discountPrice" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Discount Price (₹) <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      min={0}
                      value={formData.discountPrice}
                      onChange={handleChange}
                      placeholder="e.g. 249"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <label htmlFor="stock" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Stock Quantity <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      required
                      min={0}
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-755 focus:border-[#3B5F43] focus:ring-1 focus:ring-[#3B5F43] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Cloudinary Photo Upload & URL block */}
              <div className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-sm space-y-4">
                <h2 className="text-xs font-bold text-[#C5A880] uppercase tracking-wider border-b border-[#EBE3D5] pb-2">
                  Product Image Files & URLs
                </h2>

                <div className="space-y-4">
                  {formData.images.map((image, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Image #{idx + 1}</span>
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(idx)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Direct file selection input */}
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer bg-white border border-dashed border-[#3B5F43]/40 hover:border-[#3B5F43] rounded-lg p-2.5 text-center transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                          <span className="text-xs font-semibold text-[#3B5F43] flex items-center justify-center gap-1.5">
                            {uploadingIdx === idx ? (
                              <>
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#3B5F43] border-t-transparent" />
                                Uploading to Cloudinary...
                              </>
                            ) : (
                              '📁 Choose Image File'
                            )}
                          </span>
                        </label>
                      </div>

                      {/* Text URL fallback */}
                      <input
                        type="url"
                        required={idx === 0}
                        value={image}
                        onChange={(e) => handleImageChange(idx, e.target.value)}
                        placeholder="Or paste Cloudinary HTTPS URL"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-755 bg-white focus:border-[#3B5F43] focus:outline-none transition-colors"
                      />

                      {/* Thumbnail Preview */}
                      {image && (
                        <div className="relative h-16 w-16 rounded border border-slate-200 overflow-hidden bg-white mt-1">
                          <img src={image} alt="Preview" className="h-full w-full object-contain" />
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addImageField}
                    className="w-full py-2 border border-dashed border-slate-300 hover:border-[#3B5F43] text-slate-500 hover:text-[#3B5F43] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    + Add Another Image Slot
                  </button>
                </div>
              </div>

              {/* Save Panel Button */}
              <button
                type="submit"
                disabled={loading || success}
                className={`w-full py-4 rounded-xl text-sm font-semibold text-white bg-[#3B5F43] hover:bg-[#2A4430] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  loading || success ? 'opacity-70 pointer-events-none' : ''
                }`}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving Listing...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Product Listing
                  </>
                )}
              </button>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
