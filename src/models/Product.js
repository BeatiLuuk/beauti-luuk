import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the product name'],
      trim: true,
    },
    productId: {
      type: String,
      required: [true, 'Please provide the barcode product ID'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide the category'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide the product description'],
    },
    ingredients: {
      type: String,
      trim: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    howToUse: {
      type: String,
    },
    skinType: {
      type: String,
      default: 'For All Skin Types',
    },
    weight: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide the base retail price'],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
