import React, { useState } from 'react';
import { MapPin, Truck, CreditCard, Lock, ChevronRight, Phone, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCoupon } from '../context/CouponContext';
import PromoCodeInput from '../components/ui/PromoCodeInput';
import { useSEO } from '../hooks/useSEO';

export default function Checkout() {
 const { cart, totalPrice } = useCart();
 const { discount, freeShipping } = useCoupon();
 const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

 const subtotalAfterDiscount = Math.max(totalPrice - discount, 0);
 const tax = subtotalAfterDiscount * 0.08;
 const shippingCost = deliveryMethod === 'express' ? (freeShipping ? 0 : 15) : 0;
 const orderTotal = subtotalAfterDiscount + tax + shippingCost;

 useSEO({
  title: 'Secure Checkout',
  description: 'Complete your Shopix order securely. Fast shipping and encrypted payment processing.',
  noIndex: true,
 });

 return (
 <div className="max-w-7xl mx-auto px-4 md:px-10 py-20 w-full bg-surface transition-colors duration-300">
 <h1 className="text-7xl font-bold mb-20 text-on-surface">Checkout</h1>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
 <div className="lg:col-span-8 space-y-16">
 <section className="space-y-12">
 <div className="flex items-center gap-6 border-b border-on-surface pb-6">
 <span className="text-xs font-bold text-on-surface-variant">01</span>
 <h2 className="text-4xl font-bold text-on-surface">Shipping Information</h2>
 </div>
 <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">First Name</label>
 <input type="text" placeholder="Ahmed" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Last Name</label>
 <input type="text" placeholder="Elsayed" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="md:col-span-2 space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Address Line 1</label>
 <input type="text" placeholder="123 Ramadan Street" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">City</label>
 <input type="text" placeholder="Cairo" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Postal Code</label>
 <input type="text" placeholder="11511" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="md:col-span-2 space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Phone Number</label>
 <input type="tel" placeholder="+20 101 234 5678" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 </form>
 </section>

 <section className="space-y-12">
 <div className="flex items-center gap-6 border-b border-on-surface pb-6">
 <span className="text-xs font-bold text-on-surface-variant">02</span>
 <h2 className="text-4xl font-bold text-on-surface">Delivery Method</h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <label 
 onClick={() => setDeliveryMethod('standard')}
 className={`relative flex flex-col p-8 border cursor-pointer transition-all ${
 deliveryMethod === 'standard' ?"border-on-surface bg-surface-container" :"border-outline-variant hover:border-on-surface"
 }`}
 >
 <input type="radio" name="delivery" checked={deliveryMethod === 'standard'} onChange={() => {}} className="hidden" />
 <span className="font-bold text-2xl mb-1 text-on-surface">Standard</span>
 <span className="text-[10px] uppercase text-on-surface-variant font-bold">3-5 Business Days — Free</span>
 </label>
 <label 
 onClick={() => setDeliveryMethod('express')}
 className={`relative flex flex-col p-8 border cursor-pointer transition-all ${
 deliveryMethod === 'express' ?"border-on-surface bg-surface-container" :"border-outline-variant hover:border-on-surface"
 }`}
 >
 <input type="radio" name="delivery" checked={deliveryMethod === 'express'} onChange={() => {}} className="hidden" />
 <span className="font-bold text-2xl mb-1 text-on-surface">Express</span>
 <span className="text-[10px] uppercase text-on-surface-variant font-bold">
 Next Day Arrival — {freeShipping ? 'Free' : '$15.00'}
 </span>
 </label>
 </div>
 </section>

 <section className="space-y-12">
 <div className="flex items-center gap-6 border-b border-on-surface pb-6">
 <span className="text-xs font-bold text-on-surface-variant">03</span>
 <h2 className="text-4xl font-bold text-on-surface">Payment</h2>
 </div>
 <div className="space-y-16">
 <div className="flex gap-10">
 <button className="flex-grow border-b-2 border-on-surface pb-2 text-[10px] uppercase font-bold text-on-surface">Credit Card</button>
 <button className="flex-grow border-b border-outline-variant pb-2 text-[10px] uppercase font-bold text-on-surface-variant/40 hover:text-on-surface transition-colors">PayPal</button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-10">
 <div className="md:col-span-2 space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Card Number</label>
 <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Expiry Date</label>
 <input type="text" placeholder="MM / YY" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 <div className="space-y-4 border-b border-outline-variant pb-2">
 <label className="text-[10px] uppercase text-on-surface-variant font-bold">Security Code</label>
 <input type="text" placeholder="CVV" className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg w-full placeholder:text-on-surface-variant/30 text-on-surface" />
 </div>
 </div>
 </div>
 </section>
 </div>

 <aside className="lg:col-span-4 sticky top-32">
 <div className="bg-surface-container p-12 space-y-12 border border-outline-variant">
 <h3 className="text-3xl font-bold border-b border-outline-variant pb-6 uppercase text-[10px] not-text-on-surface">Manifest</h3>
 <div className="space-y-8">
 {cart.map(item => (
 <div key={item.id} className="flex gap-6">
 <div className="w-20 h-24 bg-white overflow-hidden shrink-0 border border-outline-variant p-2">
 <img src={item.image} referrerPolicy="no-referrer" className="w-full h-full object-contain grayscale" alt={item.name} />
 </div>
 <div className="flex flex-col justify-center">
 <h4 className="font-bold text-lg text-on-surface line-clamp-1">{item.name}</h4>
 <span className="text-[10px] text-on-surface-variant uppercase mt-2">{item.category} / Qty {item.quantity}</span>
 <span className="text-sm font-bold mt-2 text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
 </div>
 </div>
 ))}
 </div>

 <div className="pt-10 border-t border-outline-variant space-y-6">
 <div className="flex justify-between text-on-surface-variant text-[10px] uppercase font-bold">
 <span>Subtotal</span>
 <span className="text-on-surface text-sm">${totalPrice.toFixed(2)}</span>
 </div>
 {discount > 0 && (
 <div className="flex justify-between text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-bold">
 <span>Discount</span>
 <span className="text-sm">−${discount.toFixed(2)}</span>
 </div>
 )}
 <div className="flex justify-between text-on-surface-variant text-[10px] uppercase font-bold">
 <span>Shipping</span>
 <span className="text-on-surface text-sm">
 {deliveryMethod === 'express'
   ? freeShipping ? 'Free (promo)' : '$15.00'
   : 'Free'}
 </span>
 </div>
 <div className="flex justify-between text-on-surface-variant text-[10px] uppercase font-bold">
 <span>Tax (8%)</span>
 <span className="text-on-surface text-sm">${tax.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center pt-8 text-on-surface border-t border-on-surface">
 <span className="text-base font-bold uppercase">Total</span>
 <span className="text-3xl font-bold">${orderTotal.toFixed(2)}</span>
 </div>
 </div>

 <PromoCodeInput />

 <button className="luxury-button w-full !py-6 text-sm">
 Finalize Order
 </button>
 <div className="flex items-center justify-center gap-3 text-on-surface-variant/40 text-[8px] uppercase font-bold">
 <Lock className="w-3 h-3" />
 <span>Encrypted Secure Protocol</span>
 </div>
 </div>
 </aside>
 </div>
 </div>
 );
}
