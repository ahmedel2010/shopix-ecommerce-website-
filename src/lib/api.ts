import { Product, Category } from '../types';
import { PRODUCTS } from '../data';

const BASE_URL = 'https://dummyjson.com';

function blockedTitle(title: string): boolean {
  const t = title.toLowerCase();
  return (t.includes('mens casual') && t.includes('slim fit') && t.includes('t-shirt'))
    || t.includes('mens casual premium slim fit t-shirts');
}

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
  return Math.abs(h);
}

function buildProductFeatures(product: Product): { title: string; description: string }[] {
  const { name, brand, category, description, specifications, id } = product;
  const brandName = brand || name.split(' ')[0];
  const specs = specifications ?? {};
  const specEntries = Object.entries(specs);
  const cat = category.toLowerCase();
  const nameLower = name.toLowerCase();
  const features: { title: string; description: string }[] = [];
  const usedTitles = new Set<string>();

  const add = (title: string, desc: string) => {
    const key = title.toLowerCase();
    if (usedTitles.has(key) || features.length >= 4) return;
    usedTitles.add(key);
    features.push({ title, description: desc });
  };

  const nameWords = name.split(/[\s–-]+/).filter(w => w.length > 3 && !/^(the|with|and|for|from|your)$/i.test(w));

  const sentences = description
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 25);

  if (sentences.length > 0) {
    const idxA = hashSeed(id) % sentences.length;
    const idxB = (hashSeed(id + 'feat') + 1) % sentences.length;

    const titleFromSentence = (sentence: string, salt: string) => {
      const clause = sentence.split(/[,—–-]/)[0].trim();
      if (clause.length >= 10 && clause.length <= 42) return clause;
      const word = nameWords[hashSeed(id + salt) % Math.max(nameWords.length, 1)] || brandName;
      return `${word} Detail`;
    };

    add(
      titleFromSentence(sentences[idxA], 'a'),
      sentences[idxA].length > 150 ? sentences[idxA].slice(0, 147) + '…' : sentences[idxA]
    );

    if (sentences.length > 1) {
      const second = idxB !== idxA ? sentences[idxB] : sentences[(idxA + 1) % sentences.length];
      add(
        titleFromSentence(second, 'b'),
        second.length > 150 ? second.slice(0, 147) + '…' : second
      );
    }
  }

  const isAudio =
    nameLower.includes('headphone') ||
    nameLower.includes('earbud') ||
    nameLower.includes('earphone') ||
    nameLower.includes('speaker') ||
    nameLower.includes('airpod') ||
    (nameLower.includes('wireless') && (cat.includes('mobile') || cat.includes('electronic') || cat.includes('accessories')));

  const isWatch = cat.includes('watch') || nameLower.includes('watch');
  const isClothing =
    cat.includes('wear') || cat.includes('clothing') || cat.includes('shirt') ||
    cat.includes('tops') || cat.includes('dresses') || cat.includes('classic-wear');
  const isFootwear = cat.includes('shoe') || cat.includes('sneaker') || nameLower.includes('sneaker') || nameLower.includes('run');
  const isDecor = cat.includes('furniture') || cat.includes('decoration') || cat.includes('kitchen');
  const isBeauty = cat.includes('fragrance') || cat.includes('beauty') || cat.includes('skin');

  if (isAudio) {
    if (specs['Driver Size']) {
      add(
        `${specs['Driver Size']} Driver Array`,
        `The ${name} uses ${specs['Driver Size'].toLowerCase()} drivers calibrated by ${brandName} for balanced lows and crisp highs.`
      );
    }
    if (nameLower.includes('noise') || nameLower.includes('cancel') || nameLower.includes('anc')) {
      add(
        'Active Noise Cancellation',
        `Real-time ambient monitoring on the ${name} filters engine hum, office chatter, and transit noise.`
      );
    } else {
      add(
        'Sealed Acoustic Chamber',
        `Closed-back design on the ${name} passively blocks distractions without extra power draw.`
      );
    }
    if (specs['Battery Life']) {
      add(
        specs['Battery Life'],
        `Up to ${specs['Battery Life'].toLowerCase()} of wireless playback — enough for a full work week between charges.`
      );
    } else if (specs['Charging']) {
      add(
        'Quick Charge',
        `${specs['Charging']} on the ${name}: a short top-up delivers hours of listening.`
      );
    }
    if (specs['Bluetooth']) {
      add(
        specs['Bluetooth'],
        `${specs['Bluetooth']} multipoint pairing on the ${name} — switch between phone and laptop seamlessly.`
      );
    }
    if (specs['Frequency']) {
      add(
        'Wide Frequency Response',
        `${specs['Frequency']} range on the ${name} reproduces deep bass and airy treble with minimal distortion.`
      );
    }
  } else if (isWatch) {
    if (specs['Movement']) {
      add(specs['Movement'], `${specs['Movement']} inside the ${name} keeps time accurate to within seconds per month.`);
    }
    if (specs['Water Resistance']) {
      add(specs['Water Resistance'], `Rated ${specs['Water Resistance']} — the ${name} handles rain, hand-washing, and poolside wear.`);
    }
    if (specs['Strap Material']) {
      add(
        specs['Strap Material'].split(' ').slice(0, 2).join(' '),
        `${specs['Strap Material']} strap on the ${name} softens with wear and resists cracking.`
      );
    }
    if (specs['Dial Diameter'] || specs['Case Diameter']) {
      const size = specs['Dial Diameter'] || specs['Case Diameter'];
      add(`${size} Case`, `A ${size} profile on the ${name} sits flush under shirt cuffs and suit sleeves.`);
    }
    if (specs['Dial Window']) {
      add('Sapphire Crystal', `${specs['Dial Window']} protects the ${name} face from scratches and daily knocks.`);
    }
  } else if (isClothing) {
    const fabric = specs['Material'] || 'premium fabric';
    add(
      fabric.split(',')[0].slice(0, 30),
      `${fabric} construction gives the ${name} a structured drape that holds shape after repeated wear.`
    );
    if (specs['Fit Type']) {
      add(specs['Fit Type'], `${specs['Fit Type']} cut on the ${name} — tailored through the shoulders with room to move.`);
    }
    if (specs['Origin']) {
      add('Heritage Finish', `${specs['Origin']} — each ${name} is finished by hand before final inspection.`);
    }
    if (specs['Breathability']) {
      add('All-Day Comfort', `${specs['Breathability']} weave in the ${name} keeps you cool under layers.`);
    }
    const titleWords = name.split(' ').filter(w => w.length > 3).slice(0, 2);
    if (titleWords.length > 0) {
      add(
        `${titleWords.join(' ')} Cut`,
        `The ${name} silhouette is designed for versatile styling — office, weekend, or evening.`
      );
    }
  } else if (isFootwear) {
    if (specs['Upper Material']) {
      add(specs['Upper Material'], `${specs['Upper Material']} upper on the ${name} flexes with your stride and vents heat.`);
    }
    if (specs['Midsole']) {
      add(specs['Midsole'], `${specs['Midsole']} midsole in the ${name} absorbs impact on pavement and track.`);
    }
    if (specs['Outsole']) {
      add(specs['Outsole'], `${specs['Outsole']} grips wet and dry surfaces — built into every ${name} pair.`);
    }
    if (specs['Weight']) {
      add(specs['Weight'], `At ${specs['Weight'].toLowerCase()}, the ${name} reduces fatigue on long runs.`);
    }
  } else if (isDecor) {
    if (specs['Material']) {
      add(specs['Material'], `${specs['Material']} body on the ${name} — solid feel with a natural grain pattern.`);
    }
    if (specs['Finish']) {
      add(specs['Finish'], `${specs['Finish']} coating on the ${name} resists water rings and daily scuffs.`);
    }
    if (specs['Dimensions']) {
      add('Compact Footprint', `${specs['Dimensions']} — the ${name} fits standard shelves and bedside tables.`);
    }
    if (specs['Warranty']) {
      add(specs['Warranty'], `${specs['Warranty']} coverage on the ${name} — structural defects repaired or replaced.`);
    }
  } else if (isBeauty) {
    if (specs['Scent Family']) {
      add(specs['Scent Family'], `${specs['Scent Family']} notes in ${name} open fresh and dry down warm on skin.`);
    }
    if (specs['Concentration']) {
      add(specs['Concentration'], `${specs['Concentration']} formula — ${name} lasts 6–8 hours on pulse points.`);
    }
    if (specs['Volume']) {
      add(specs['Volume'], `${specs['Volume']} bottle for the ${name} — travel-friendly with spray atomizer.`);
    }
  }

  for (const [key, val] of specEntries) {
    if (features.length >= 4) break;
    if ([...usedTitles].some(t => t.includes(key.toLowerCase()))) continue;
    add(key, `The ${name} ships with ${key.toLowerCase()} rated at ${val} — a ${brandName} specification.`);
  }

  if (features.length < 2) {
    const word = nameWords[hashSeed(id) % Math.max(nameWords.length, 1)] || brandName;
    add(
      `${word} Edition`,
      `${brandName} engineered the ${name} around ${word.toLowerCase()} — purpose-built for everyday use.`
    );
  }

  return features.slice(0, 4);
}

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

    if (cat.includes('smartphone') || cat.includes('tablet') || cat.includes('laptop') || cat.includes('electronic') || nameLower.includes('phone') || nameLower.includes('wireless') || nameLower.includes('earbuds') || nameLower.includes('mic') || nameLower.includes('headphone')) {
      const brandLabel = finalProduct.brand || finalProduct.name.split(' ')[0];
      finalProduct.specifications = {
        'Driver Size': nameLower.includes('headphone') ? '40mm Dynamic' : '10mm Balanced Armature',
        'Frequency': nameLower.includes('pro') || nameLower.includes('premium') ? '5Hz - 40kHz' : '20Hz - 20kHz',
        'Bluetooth': `Version 5.${(hashSeed(finalProduct.id) % 2) + 2}`,
        'Battery Life': nameLower.includes('wireless') ? `${20 + (hashSeed(finalProduct.id) % 25)} Hours` : 'Up to 12 Hours',
        'Weight': `${160 + (hashSeed(finalProduct.id) % 120)}g`,
        'Brand': brandLabel,
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
      const seed = hashSeed(finalProduct.id + finalProduct.name);
      const highlight = nameWordsFrom(finalProduct.name, seed);
      finalProduct.specifications = {
        'Material': `${highlight} Grade Build`,
        'Weight': `${140 + (seed % 800)}g`,
        'Dimensions': `${10 + (seed % 25)} × ${8 + (seed % 18)} × ${4 + (seed % 12)} cm`,
        'Warranty': `${1 + (seed % 3)}-Year Warranty`,
        'Origin': ['Italy', 'Japan', 'Germany', 'Portugal'][seed % 4],
      };
    }
  }

  const isCatalogItem = finalProduct.id.startsWith('sp-');
  if (!isCatalogItem) {
    finalProduct.features = buildProductFeatures(finalProduct);
  } else if (!finalProduct.features?.length) {
    finalProduct.features = buildProductFeatures(finalProduct);
  }

  return finalProduct;
}

function nameWordsFrom(name: string, seed: number): string {
  const words = name.split(/[\s–-]+/).filter(w => w.length > 3);
  return words[seed % Math.max(words.length, 1)] || 'Premium';
}

export { enrichProduct };

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

    const products = dummyData.products
      .filter((item: any) => !blockedTitle(item.title))
      .map(mapProduct);
    const classicWear = fakeStoreData
      .filter((item: any) => !blockedTitle(item.title))
      .map(mapFakeStoreProduct);
    
    const combined = [...PRODUCTS, ...products, ...classicWear];
    if (limit > 0) {
      return combined.slice(0, limit);
    }
    return combined;
  } catch {
    return PRODUCTS;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    
    const catalogProduct = PRODUCTS.find(p => p.id === id);
    if (catalogProduct) return catalogProduct;

    let item;
    if (id.startsWith('fs-')) {
      const realId = id.replace('fs-', '');
      const response = await fetch(`https://fakestoreapi.com/products/${realId}`);
      if (!response.ok) return null;
      item = await response.json();

      if (blockedTitle(item.title)) {
        return null;
      }
      
      return mapFakeStoreProduct(item);
    }

    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) return null;
    item = await response.json();

    if (blockedTitle(item.title)) {
      return null;
    }
    
    return mapProduct(item);
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    
    return data.products
      .filter((item: any) => !blockedTitle(item.title))
      .map(mapProduct);
  } catch {
    return [];
  }
}
