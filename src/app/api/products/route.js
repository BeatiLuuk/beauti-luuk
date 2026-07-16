import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req) {
  try {
    await connectDB();

    // Parse URL query params
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'price-asc';

    // Build mongoose query
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { productId: searchRegex },
        { description: searchRegex },
      ];
    }

    // Fetch products
    let dbProducts = await Product.find(query).lean();

    // Sort by effective price (checking discountPrice fallback) or name
    if (sortBy === 'price-asc') {
      dbProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-desc') {
      dbProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'name-asc') {
      dbProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return NextResponse.json({
      success: true,
      products: dbProducts,
    });
  } catch (error) {
    console.error('API Error in /api/products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
