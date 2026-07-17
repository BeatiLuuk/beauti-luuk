import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import { verifySession } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; // resolve dynamic route params safely

    let product = null;

    // Check if the provided id is a valid Mongoose ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).lean();
    }

    // If not found by ObjectId, try querying by barcode ID (productId)
    if (!product) {
      product = await Product.findOne({ productId: id }).lean();
    }

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('API Error in /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    // 1. Verify admin session cookie
    const token = req.cookies.get('admin_session')?.value;
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin session is invalid or expired.' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // 2. Prevent duplicate SKU barcode updates
    const { productId } = body;
    if (productId) {
      const duplicate = await Product.findOne({ productId, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json(
          { success: false, message: `Product ID / Barcode '${productId}' already in use by another product.` },
          { status: 409 }
        );
      }
    }

    // 3. Find and update
    let updatedProduct = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    }

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      product: updatedProduct
    });
  } catch (error) {
    console.error('API Error in PUT /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    // 1. Verify admin session cookie
    const token = req.cookies.get('admin_session')?.value;
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin session is invalid or expired.' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    // 2. Find and delete
    let deletedProduct = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedProduct = await Product.findByIdAndDelete(id);
    }

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    console.error('API Error in DELETE /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
