import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    label: 'New Member',
    type: 'percentage',
    value: 10,
    minOrder: 25,
    maxDiscount: 40,
    description: '10% off orders over $25',
  },
  {
    code: 'CLASSIC15',
    label: 'Classic Wear',
    type: 'percentage',
    value: 15,
    minOrder: 80,
    category: 'classic-wear',
    maxDiscount: 75,
    description: '15% off Classic Wear pieces',
  },
  {
    code: 'TECH20',
    label: 'Tech Gallery',
    type: 'percentage',
    value: 20,
    minOrder: 100,
    category: 'mobile-accessories',
    maxDiscount: 60,
    description: '20% off electronics and accessories',
  },
  {
    code: 'SAVE25',
    label: 'Seasonal',
    type: 'fixed',
    value: 25,
    minOrder: 150,
    description: '$25 off orders over $150',
  },
  {
    code: 'SHIPFREE',
    label: 'Express Delivery',
    type: 'free_shipping',
    value: 0,
    minOrder: 75,
    description: 'Complimentary express shipping',
  },
];
