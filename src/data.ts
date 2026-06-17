import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    name: 'SonicZen Pro Wireless Noise-Cancelling Headphones',
    category: 'mobile-accessories',
    price: 299.00,
    discountPercentage: 15,
    image: '/images/img_1.jpg',
    thumbnail: '/images/img_2.jpg',
    images: [
      '/images/img_1.jpg',
      '/images/img_3.jpg',
      '/images/img_4.jpg',
      '/images/img_5.jpg'
    ],
    rating: 4.8,
    reviews: 1240,
    description: 'The SonicZen Pro Wireless redefines what\'s possible in audio technology. Engineered with our proprietary 45mm liquid crystal polymer drivers, these headphones deliver breath-taking clarity across a wide frequency range. Our advanced Adaptive Noise Cancellation (ANC) monitors surrounding noise 700 times per second to create a cocoon of silence, whether you\'re in a crowded office or on a trans-oceanic flight.\n\nWith up to 40 hours of battery life on a single charge and ultra-fast charging (3 hours of playback in just 5 minutes), the SonicZen Pro is built for life on the move. The ergonomic headband and cloud-soft earpads ensure fatigue-free listening for even the longest sessions.',
    isNew: true,
    brand: 'SonicZen',
    stock: 42,
    colors: ['#000000', '#D1D5DB', '#FFFFFF'],
    specifications: {
      'Driver Size': '45mm LCP',
      'Frequency': '4Hz - 40kHz',
      'Bluetooth': 'Version 5.3',
      'Charging': 'USB-C Fast',
      'Weight': '254g'
    },
    features: [
      {
        title: 'Immersive Audio',
        description: 'Hi-Res Audio Wireless support and LDAC codec for the best possible sound quality.'
      },
      {
        title: 'Smart Features',
        description: 'Proximity sensors, touch controls, and multipoint Bluetooth connection for two devices.'
      }
    ]
  },
  {
    id: 'mock-2',
    name: 'Minimalist Silver Watch',
    category: 'mens-watches',
    price: 249.00,
    discountPercentage: 10,
    image: '/images/img_6.jpg',
    thumbnail: '/images/img_7.jpg',
    images: [
      '/images/img_6.jpg',
      '/images/img_8.jpg',
      '/images/img_9.jpg'
    ],
    rating: 4.9,
    reviews: 320,
    description: 'A premium minimalist designer wristwatch with a clean white face and brushed silver body. Styled for the modern workspace and formal evenings alike.',
    isNew: true,
    brand: 'Minimalist',
    stock: 12,
    colors: ['#D1D5DB', '#374151', '#000000'],
    specifications: {
      'Movement': 'Japanese Quartz Precision',
      'Water Resistance': '5ATM',
      'Strap Material': 'Italian Calfskin Leather',
      'Dial Diameter': '40mm',
      'Warranty': '2 Year Warranty'
    },
    features: [
      {
        title: 'Sapphire Crystal',
        description: 'Constructed with premium scratch-resistant window glass.'
      },
      {
        title: 'Calfskin Leather',
        description: 'Hypoallergenic premium leather straps that age beautifully.'
      }
    ]
  },
  {
    id: 'mock-3',
    name: 'Aura Wireless Pro',
    category: 'mobile-accessories',
    price: 249.00,
    discountPercentage: 20,
    image: '/images/img_10.jpg',
    thumbnail: '/images/img_11.jpg',
    images: [
      '/images/img_10.jpg',
      '/images/img_12.jpg'
    ],
    rating: 4.7,
    reviews: 450,
    description: 'Professional-grade wireless noise-canceling over-ear headphones. Designed in collaboration with leading audio engineers for perfect acoustic balance.',
    isNew: false,
    brand: 'Aura',
    stock: 25,
    colors: ['#000000', '#F3F4F6'],
    specifications: {
      'Driver Size': '40mm Neodymium',
      'Frequency': '10Hz - 22kHz',
      'Bluetooth': 'Version 5.2',
      'Battery Life': '30 Hours',
      'Weight': '230g'
    },
    features: [
      {
        title: 'Studio Tuned',
        description: 'Impeccable balance curated for professional studio mixing and relaxed daily listening.'
      },
      {
        title: 'Ergonomic Pads',
        description: 'High elasticity memory foam ear cups for maximum long-wear comfort.'
      }
    ]
  },
  {
    id: 'mock-4',
    name: 'Precision Run Pro',
    category: 'mens-shoes',
    price: 120.00,
    discountPercentage: 5,
    image: '/images/img_13.jpg',
    thumbnail: '/images/img_14.jpg',
    images: [
      '/images/img_13.jpg',
      '/images/img_15.jpg'
    ],
    rating: 4.6,
    reviews: 580,
    description: 'Vibrant crimson red athletic sneaker with sleek aerodynamic lines. Highly responsive high-traction rubber soles engineered for peak aerobic performance on all tracks.',
    isNew: true,
    brand: 'RunPro',
    stock: 18,
    colors: ['#EF4444', '#111827'],
    specifications: {
      'Upper Material': 'AeroKnit Mesh',
      'Midsole': 'Propulsive Cushioning Tech',
      'Outsole': 'High-Traction Carbon Rubber',
      'Weight': '210g Superlight',
      'Fit': 'True to Size'
    },
    features: [
      {
        title: 'AeroKnit Mesh',
        description: 'Ultra-breathable weave pattern that regulates temperature and expels vapor.'
      },
      {
        title: 'Propulsive Energy',
        description: 'Advanced foam composites return maximum energy with each stride.'
      }
    ]
  }
];
