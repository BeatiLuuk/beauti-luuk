const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables manually from .env.local
let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  try {
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/MONGODB_URI\s*=\s*(.*)/);
      if (match && match[1]) {
        MONGODB_URI = match[1].trim();
      }
    }
  } catch (e) {
    console.log('Error reading .env.local:', e.message);
  }
}

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI connection variable is missing from environmental variables.');
  process.exit(1);
}

// Define Product Schema locally to bypass Next.js framework modules boundary
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    ingredients: { type: String },
    benefits: { type: [String], default: [] },
    howToUse: { type: String },
    skinType: { type: String, default: 'For All Skin Types' },
    weight: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { collection: 'products' }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function seed() {
  console.log('Connecting to local MongoDB container...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected!');

    // Read default catalog items from products.json
    const productsDataPath = path.join(__dirname, '../src/data/products.json');
    const seedProducts = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

    console.log('Clearing existing product catalog records...');
    await Product.deleteMany({});

    console.log(`Inserting ${seedProducts.length} skincare products...`);
    await Product.insertMany(seedProducts);

    console.log('Database seeding completed successfully! 🎉');
  } catch (err) {
    console.error('Seeding process encountered an error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seed();
