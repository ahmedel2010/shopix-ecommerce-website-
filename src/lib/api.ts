import { Product, Category } from '../types';
import { PRODUCTS } from '../data';

const BASE_URL = 'https://dummyjson.com';

function enrichProduct(product: Product): Product {
  const finalProduct = { ...product };

  if (!finalProduct.colors || finalProduct.colors.length === 0) {
    const defaultColors = ['#000000', '#4B5563', '#4f46e5', '#E5E7EB'];
    
    const cat = finalProduct.category.toLowerCase();
    if (cat.includes('wear') || cat.includes('clothing') || cat.includes('tops') || cat.includes('dresses') || cat.includes('shirt')) {
      finalProduct.colors = ['#1D4ED8', '#B91C1C', '#15803D', '#1F2937']; 
    } else if (cat.includes('furniture') || cat.includes('decoration')) {
      finalProduct.colors = ['#78350F', '#6B7280', '#D1D5DB', '#F3F4F6']; 
    } else if (cat.includes('beauty') || cat.includes('skin') || cat.includes('fragrance')) {
      finalProduct.colors = ['#FBCFE8', '#F3E8FF', '#FFF1F2', '#FFFFFF']; 
    } else {
      finalProduct.colors = defaultColors;
    }
  }


  if (!finalProduct.images || finalProduct.images.length === 0) {
    finalProduct.images = [finalProduct.image];
  }
  
  if (finalProduct.images.length === 1) {
    finalProduct.images = [
      finalProduct.image,
      finalProduct.image,
      finalProduct.image,
      finalProduct.image
    ];
  }

  if (!finalProduct.specifications || Object.keys(finalProduct.specifications).length === 0) {
    const cat = finalProduct.category.toLowerCase();
    const nameLower = finalProduct.name.toLowerCase();

    if (cat.includes('smartphone') || cat.includes('tablet') || cat.includes('laptop') || cat.includes('electronic') || nameLower.includes('phone') || nameLower.includes('wireless') || nameLower.includes('earbuds') || nameLower.includes('mic')) {
      finalProduct.specifications = {
        'Battery Life': 'Up to 24 hours of active use',
        'Connectivity': 'Bluetooth 5.3 / Ultra-wideband Wi-Fi',
        'Material': 'Polished Aerospace Aluminum',
        'Charging': 'USB-C 30W Fast charging supported',
        'Weight': '185g Lightweight'
      };
    } else if (cat.includes('wear') || cat.includes('clothing') || cat.includes('mens-shirts') || cat.includes('tops') || cat.includes('dresses') || cat.includes('shirt') || cat.includes('classic-wear')) {
      finalProduct.specifications = {
        'Material': '100% Organic Egyptian Cotton',
        'Fit Type': 'Premium Modern Tailored Fit',
        'Care Instructions': 'Dry clean recommended or cold machine wash',
        'Origin': 'Handcrafted in Italy',
        'Breathability': 'High Comfort Rating'
      };
    } else if (cat.includes('watch') || nameLower.includes('watch')) {
      finalProduct.specifications = {
        'Movement': 'Japanese Quartz Precision Movement',
        'Water Resistance': '5ATM (Up to 50 meters)',
        'Strap Material': 'Authentic Italian Leather',
        'Case Diameter': '40mm',
        'Dial Window': 'Scratch-Resistant Sapphire Crystal'
      };
    } else if (cat.includes('furniture') || cat.includes('decoration') || cat.includes('kitchen')) {
      finalProduct.specifications = {
        'Material': 'Solid Sustainable Oak Wood',
        'Assembly': 'Fully assembled on delivery',
        'Dimensions': '120cm x 60cm x 75cm',
        'Finish': 'Natural Matte Oil Coat',
        'Warranty': '5-Year Structural Integrity'
      };
    } else if (cat.includes('fragrance') || cat.includes('beauty') || cat.includes('skin')) {
      finalProduct.specifications = {
        'Volume': '100ml / 3.4 fl. oz.',
        'Scent Family': 'Citrus Woods & Amber',
        'Concentration': 'Eau de Parfum (EDP)',
        'Origin': 'Formulated in France',
        'Skin Type': 'Hypoallergenic, suitable for all types'
      };
    } else {
      finalProduct.specifications = {
        'Material': 'Premium Grade Premium Materials',
        'Authenticity': '100% Certified Brand Original',
        'Design': 'Modern Ergonomic Concept',
        'Origin': 'Imported Quality Checked',
        'Warranty': '1-Year Global Warranty'
      };
    }
  }

  if (!finalProduct.features || finalProduct.features.length === 0) {
    const cat = finalProduct.category.toLowerCase();
    const nameLower = finalProduct.name.toLowerCase();

    if (cat.includes('smartphone') || cat.includes('tablet') || cat.includes('laptop') || cat.includes('electronic') || nameLower.includes('phone') || nameLower.includes('wireless') || nameLower.includes('earbuds') || nameLower.includes('mic')) {
      finalProduct.features = [
        {
          title: 'Intelligent Active Mode',
          description: 'Adapts dynamically to ambient sounds and your specific activity for optimal comfort and performance.'
        },
        {
          title: 'Seamless Ecosystem',
          description: 'Instant pairing and ultra-low latency connection with multiple devices simultaneously.'
        }
      ];
    } else if (cat.includes('wear') || cat.includes('clothing') || cat.includes('mens-shirts') || cat.includes('tops') || cat.includes('dresses') || cat.includes('shirt') || cat.includes('classic-wear')) {
      finalProduct.features = [
        {
          title: 'Premium Tailored Fit',
          description: 'Expertly draped to sit comfortably and elegantly, complementing various body structures.'
        },
        {
          title: 'Luxury Thread Count',
          description: 'Woven with high-tensile sustainable fibers for an incredibly soft feel and lifetime durability.'
        }
      ];
    } else {
      finalProduct.features = [
        {
          title: 'Exquisite Craftsmanship',
          description: 'Every single component is selected with care and finished meticulously for timeless appeal.'
        },
        {
          title: 'Uncompromised Design',
          description: 'A masterpiece created by leading industry designers to perfectly balance form and function.'
        }
      ];
    }
  }

  return finalProduct;
}

const mapProduct = (item: any): Product => enrichProduct({
  id: item.id.toString(),
  name: item.title,
  category: item.category,
  price: item.price,
  image: item.thumbnail, 
  thumbnail: item.thumbnail,
  images: item.images,
  rating: item.rating,
  reviews: Math.floor(Math.random() * 200) + 20, 
  description: item.description,
  brand: item.brand,
  stock: item.stock,
  discountPercentage: item.discountPercentage,
  isNew: item.id % 7 === 0
});

const mapFakeStoreProduct = (item: any): Product => {
  const suitImages = [
    'https://images.unsplash.com/photo-1594932224010-75f4d8624415?auto=format&fit=crop&w=800&q=80',
    '/images/img_16.jpg',
    'https://images.unsplash.com/photo-1598808503744-3ede781ec652?auto=format&fit=crop&w=800&q=80',
    '/images/img_17.jpg',
    '/images/img_18.jpg',
    '/images/img_19.jpg',
    'https://images.unsplash.com/photo-1555061527-3a131ae950a4?auto=format&fit=crop&w=800&q=80',
    '/images/img_20.jpg',
  ];

  const image = suitImages[item.id % suitImages.length];
  const titleLower = item.title.toLowerCase();
  
  let displayName = item.title;
  if (!titleLower.includes('premium') && !titleLower.includes('suit')) {
    displayName = `Premium Classic ${item.title}`;
  }

  return enrichProduct({
    id: `fs-${item.id}`,
    name: displayName,
    category: 'classic-wear',
    price: item.price + 180, 
    image: image,
    thumbnail: image,
    images: [image],
    rating: item.rating.rate,
    reviews: item.rating.count,
    description: item.description,
    brand: 'Essential Classic',
    stock: 12,
    isNew: item.id % 2 === 0
  });
};

export async function fetchProducts(limit: number = 0): Promise<Product[]> {
  try {
    const dummyPromise = fetch(`${BASE_URL}/products?limit=0`).then(res => res.json());
    const fakeStorePromise = fetch(`https://fakestoreapi.com/products/category/men's clothing`).then(res => res.json());
    
    const [dummyData, fakeStoreData] = await Promise.all([dummyPromise, fakeStorePromise]);
    
    const isForbidden = (title: string) => {
      const t = title.toLowerCase();
      return (t.includes("mens casual") && t.includes("slim fit") && t.includes("t-shirt")) || 
             t.includes("mens casual premium slim fit t-shirts");
    };

    const products = dummyData.products
      .filter((item: any) => !isForbidden(item.title))
      .map(mapProduct);
    const classicWear = fakeStoreData
      .filter((item: any) => !isForbidden(item.title))
      .map(mapFakeStoreProduct);
    
    const combined = [...PRODUCTS, ...products, ...classicWear];
    if (limit > 0) {
      return combined.slice(0, limit);
    }
    return combined;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return PRODUCTS;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    
    const mockProduct = PRODUCTS.find(p => p.id === id);
    if (mockProduct) return mockProduct;

    let item;
    if (id.startsWith('fs-')) {
      const realId = id.replace('fs-', '');
      const response = await fetch(`https://fakestoreapi.com/products/${realId}`);
      if (!response.ok) return null;
      item = await response.json();
      
      const t = item.title.toLowerCase();
      if ((t.includes("mens casual") && t.includes("slim fit") && t.includes("t-shirt")) || 
          t.includes("mens casual premium slim fit t-shirts")) {
        return null;
      }
      
      return mapFakeStoreProduct(item);
    }

    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) return null;
    item = await response.json();
    
    const t = item.title.toLowerCase();
    if ((t.includes("mens casual") && t.includes("slim fit") && t.includes("t-shirt")) || 
        t.includes("mens casual premium slim fit t-shirts")) {
      return null;
    }
    
    return mapProduct(item);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    
    const isForbidden = (title: string) => {
      const t = title.toLowerCase();
      return (t.includes("mens casual") && t.includes("slim fit") && t.includes("t-shirt")) || 
             t.includes("mens casual premium slim fit t-shirts");
    };

    return data.products
      .filter((item: any) => !isForbidden(item.title))
      .map(mapProduct);
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    return [];
  }
}
