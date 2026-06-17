import { COUPONS } from '../data/coupons';
import { CartItem, Coupon } from '../types';

const CATEGORY_GROUPS: Record<string, string[]> = {
  'classic-wear': ['classic-wear', 'mens-shirts', 'mens-watches', 'mens-shoes'],
  'mobile-accessories': ['mobile-accessories', 'smartphones', 'laptops', 'tablets', 'automotive'],
};

function itemPrice(item: CartItem): number {
  return Number(item.price) || 0;
}

function matchesCategory(itemCategory: string, couponCategory: string): boolean {
  if (itemCategory === couponCategory) return true;
  const group = CATEGORY_GROUPS[couponCategory];
  return group?.includes(itemCategory) ?? false;
}

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find(c => c.code === normalized);
}

function eligibleSubtotal(cart: CartItem[], coupon: Coupon): number {
  if (!coupon.category) {
    return cart.reduce((sum, item) => sum + itemPrice(item) * item.quantity, 0);
  }
  return cart
    .filter(item => matchesCategory(item.category, coupon.category!))
    .reduce((sum, item) => sum + itemPrice(item) * item.quantity, 0);
}

export interface CouponValidation {
  valid: boolean;
  error?: string;
}

export function validateCoupon(coupon: Coupon, cart: CartItem[]): CouponValidation {
  if (cart.length === 0) {
    return { valid: false, error: 'Your cart is empty' };
  }

  const subtotal = eligibleSubtotal(cart, coupon);

  if (coupon.category && subtotal === 0) {
    const label = coupon.category.replace(/-/g, ' ');
    return { valid: false, error: `This code applies to ${label} items only` };
  }

  const orderTotal = cart.reduce((sum, item) => sum + itemPrice(item) * item.quantity, 0);
  const threshold = coupon.minOrder ?? 0;

  if (coupon.category) {
    if (subtotal < threshold) {
      return { valid: false, error: `Spend $${threshold.toFixed(0)} on qualifying items to use this code` };
    }
  } else if (orderTotal < threshold) {
    return { valid: false, error: `Minimum order of $${threshold.toFixed(0)} required` };
  }

  return { valid: true };
}

export interface DiscountResult {
  amount: number;
  freeShipping: boolean;
  eligibleSubtotal: number;
}

export function calculateDiscount(coupon: Coupon, cart: CartItem[]): DiscountResult {
  const subtotal = eligibleSubtotal(cart, coupon);

  if (coupon.type === 'free_shipping') {
    return { amount: 0, freeShipping: true, eligibleSubtotal: subtotal };
  }

  if (coupon.type === 'fixed') {
    return {
      amount: Math.min(coupon.value, subtotal),
      freeShipping: false,
      eligibleSubtotal: subtotal,
    };
  }

  let amount = subtotal * (coupon.value / 100);
  if (coupon.maxDiscount) {
    amount = Math.min(amount, coupon.maxDiscount);
  }

  return {
    amount: Math.round(amount * 100) / 100,
    freeShipping: false,
    eligibleSubtotal: subtotal,
  };
}
