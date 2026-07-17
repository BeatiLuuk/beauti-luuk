import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { verifySession } from '@/lib/auth';

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

export async function POST(req) {
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
    const body = await req.json();

    // 2. Validate required inputs
    const { name, productId, category, description, price } = body;
    if (!name || !productId || !category || !description || price === undefined) {
      return NextResponse.json(
        { success: false, message: 'Missing required product fields (name, productId, category, description, price).' },
        { status: 400 }
      );
    }

    // 3. Prevent duplicate SKU barcodes
    const existing = await Product.findOne({ productId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Product ID / Barcode '${productId}' already exists.` },
        { status: 409 }
      );
    }

    // 4. Create new product
    const newProduct = await Product.create(body);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully.',
      product: newProduct
    }, { status: 201 });
  } catch (error) {
    console.error('API Error in POST /api/products:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
