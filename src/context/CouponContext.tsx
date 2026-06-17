import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Coupon } from '../types';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { findCoupon, validateCoupon, calculateDiscount } from '../lib/coupons';

interface CouponContextType {
  appliedCoupon: Coupon | null;
  discount: number;
  freeShipping: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  couponError: string | null;
  clearCouponError: () => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);
const STORAGE_KEY = 'applied-coupon';

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useCart();
  const toast = useToast();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return findCoupon(saved) ?? null;
  });
  const [couponError, setCouponError] = useState<string | null>(null);
  const appliedCouponRef = useRef(appliedCoupon);
  appliedCouponRef.current = appliedCoupon;

  const { discount, freeShipping } = useMemo(() => {
    if (!appliedCoupon) return { discount: 0, freeShipping: false };
    const result = calculateDiscount(appliedCoupon, cart);
    return { discount: result.amount, freeShipping: result.freeShipping };
  }, [appliedCoupon, cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEY, appliedCoupon.code);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    const coupon = appliedCouponRef.current;
    if (!coupon || cart.length === 0) return;

    const { valid, error } = validateCoupon(coupon, cart);
    if (!valid) {
      setAppliedCoupon(null);
      toast.warning(error ?? 'Coupon removed — cart no longer qualifies', 4000);
    }
  }, [cart, toast]);

  const clearCouponError = useCallback(() => setCouponError(null), []);

  const applyCoupon = useCallback((code: string): boolean => {
    setCouponError(null);
    const trimmed = code.trim();
    if (!trimmed) {
      setCouponError('Enter a promo code');
      return false;
    }

    const coupon = findCoupon(trimmed);
    if (!coupon) {
      const msg = 'Code not recognized';
      setCouponError(msg);
      toast.warning(msg, 3000);
      return false;
    }

    const { valid, error } = validateCoupon(coupon, cart);
    if (!valid) {
      const msg = error ?? 'Code cannot be applied';
      setCouponError(msg);
      toast.warning(msg, 4000);
      return false;
    }

    setAppliedCoupon(coupon);

    const { amount, freeShipping: shipsFree } = calculateDiscount(coupon, cart);
    const savings = shipsFree
      ? 'Express shipping waived'
      : `You saved $${amount.toFixed(2)}`;

    toast.success(`${coupon.code} applied — ${savings}`, 3500);
    return true;
  }, [cart, toast]);

  const removeCoupon = useCallback(() => {
    if (appliedCoupon) {
      toast.info(`${appliedCoupon.code} removed`);
    }
    setAppliedCoupon(null);
    setCouponError(null);
  }, [appliedCoupon, toast]);

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        discount,
        freeShipping,
        applyCoupon,
        removeCoupon,
        couponError,
        clearCouponError,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};
