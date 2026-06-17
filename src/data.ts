import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sp-1',
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
        title: '45mm LCP Drivers',
        description: 'Liquid crystal polymer diaphragms in the SonicZen Pro deliver studio-grade clarity from 4Hz to 40kHz.'
      },
      {
        title: '700Hz ANC Processor',
        description: 'Adaptive noise cancellation samples ambient sound 700 times per second and adjusts in real time.'
      },
      {
        title: '40-Hour Battery',
        description: 'A full charge lasts 40 hours with ANC on. Five minutes on USB-C adds three hours of playback.'
      },
      {
        title: 'LDAC Hi-Res Audio',
        description: 'Stream lossless audio over Bluetooth 5.3 with LDAC codec support and dual-device multipoint pairing.'
      }
    ]
  },
  {
    id: 'sp-2',
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
        title: 'Miyota 9039 Movement',
        description: 'Japanese quartz movement rated ±15 seconds per month — no manual winding required.'
      },
      {
        title: '5ATM Water Seal',
        description: 'Swim-safe to 50 metres. The screw-down crown keeps moisture out during daily wear.'
      },
      {
        title: 'Italian Calfskin Strap',
        description: 'Vegetable-tanned leather that develops a unique patina. Quick-release pins for easy swaps.'
      },
      {
        title: 'Sapphire Crystal Face',
        description: 'Mohs 9 hardness crystal resists scratches from keys, desks, and everyday contact.'
      }
    ]
  },
  {
    id: 'sp-3',
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
        title: '40mm Neodymium Drivers',
        description: 'Neodymium magnets in the Aura Wireless Pro push 10Hz–22kHz response with low harmonic distortion.'
      },
      {
        title: 'Studio Reference Tuning',
        description: 'EQ curve calibrated against studio monitors — flat mids, controlled bass, open treble.'
      },
      {
        title: '30-Hour Playtime',
        description: 'Thirty hours per charge with ANC off, twenty-four with ANC on. Fold-flat hinge for travel.'
      },
      {
        title: 'Memory Foam Ear Cups',
        description: 'Slow-rebound foam distributes pressure evenly — comfortable through multi-hour sessions.'
      }
    ]
  },
  {
    id: 'sp-4',
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
        title: 'AeroKnit Upper',
        description: 'Engineered mesh zones over the toe box and arch — 30% more airflow than standard knit uppers.'
      },
      {
        title: 'Carbon Rubber Outsole',
        description: 'High-abrasion carbon compound grips wet asphalt and track rubber at every stride angle.'
      },
      {
        title: '210g Race Weight',
        description: 'One of the lightest in its class at 210g — less shoe means faster turnover on tempo runs.'
      },
      {
        title: 'Propulsive Midsole',
        description: 'Dual-density foam stack returns 78% of impact energy — noticeable spring on toe-off.'
      }
    ]
  }
];
