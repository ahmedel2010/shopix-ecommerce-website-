import { Minus, Plus, Trash2, ArrowRight, HelpCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';

export default function Cart() {
 const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

 useSEO({
  title: 'Your Cart',
  description: 'Review your selected items and proceed to checkout on Shopix.',
  noIndex: true,
 });

 const tax = totalPrice * 0.08;

 return (
 <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 w-full bg-surface transition-colors duration-300 text-on-surface">
 <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 mb-12 border-b border-outline-variant pb-8 text-center md:text-left">
 <h1 className="text-5xl md:text-6xl font-light">Your Cart</h1>
 <span className="text-on-surface-variant text-sm uppercase font-medium">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
 </div>

 {cart.length > 0 ? (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
 <div className="lg:col-span-8 divide-y divide-outline-variant">
 {cart.map((item) => (
 <motion.div
 key={item.id}
 layout
 className="group py-8 first:pt-0 last:pb-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-center justify-between text-center sm:text-left"
 >
 
 <div className="w-32 h-40 sm:w-24 sm:h-32 bg-surface-container rounded-none overflow-hidden shrink-0 border border-outline-variant flex items-center justify-center p-2">
 <img 
 src={item.image} 
 referrerPolicy="no-referrer" 
 className="max-w-full max-h-full object-contain dark:brightness-95 group-hover:scale-105 transition-transform duration-500" 
 alt={item.name} 
 />
 </div>

 
 <div className="flex-grow space-y-1 flex flex-col items-center sm:items-start">
 <span className="text-[10px] uppercase text-on-surface-variant font-bold">
 {item.category}
 </span>
 <h3 className="text-2xl md:text-3xl font-normal text-on-surface transition-colors">
 {item.name}
 </h3>
 
 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4">
 <div className="flex items-center border border-outline-variant text-on-surface bg-surface">
 <button 
 onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
 disabled={item.quantity <= 1}
 className="px-3 py-2 hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:pointer-events-none"
 aria-label="Decrease quantity"
 >
 <Minus className="w-3.5 h-3.5" />
 </button>
 <span className="font-medium text-sm px-4 w-10 text-center select-none">
 {item.quantity}
 </span>
 <button 
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 className="px-3 py-2 hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface"
 aria-label="Increase quantity"
 >
 <Plus className="w-3.5 h-3.5" />
 </button>
 </div>

 <button 
 onClick={() => removeFromCart(item.id)}
 className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase"
 >
 <Trash2 className="w-4 h-4" />
 <span>Remove</span>
 </button>
 </div>
 </div>

 
 <div className="text-center sm:text-right shrink-0 mt-4 sm:mt-0">
 <span className="text-lg font-medium text-on-surface">
 ${(item.price * item.quantity).toFixed(2)}
 </span>
 {item.quantity > 1 && (
 <p className="text-xs text-on-surface-variant mt-1">
 ${item.price.toFixed(2)} each
 </p>
 )}
 </div>
 </motion.div>
 ))}
 
 <div className="pt-8 flex justify-center sm:justify-start">
 <Link 
 to="/shop" 
 className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase transition-colors"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Return to shopping</span>
 </Link>
 </div>
 </div>

 <aside className="lg:col-span-4 sticky top-28 space-y-6">
 <div className="bg-surface-container-low border-t-2 border-primary p-8 md:p-10 space-y-8 rounded-none border border-outline-variant">
 <h2 className="text-xs font-bold uppercase text-on-surface border-b border-outline-variant pb-4">
 Summary Manifest
 </h2>
 
 <div className="space-y-4">
 <div className="flex justify-between text-on-surface-variant text-xs font-bold uppercase">
 <span>Subtotal</span>
 <span className="text-on-surface font-medium">${totalPrice.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-on-surface-variant text-xs font-bold uppercase">
 <span>Shipping</span>
 <span className="text-on-surface lowercase font-normal">Free</span>
 </div>
 <div className="flex justify-between text-on-surface-variant text-xs font-bold uppercase">
 <span>Tax (8%)</span>
 <span className="text-on-surface font-medium">${tax.toFixed(2)}</span>
 </div>
 
 <div className="pt-6 border-t border-outline-variant flex justify-between items-baseline">
 <span className="text-xs uppercase font-bold text-on-surface">Total</span>
 <span className="text-3xl font-regular text-on-surface">${(totalPrice + tax).toFixed(2)}</span>
 </div>
 </div>

 
 <div className="space-y-3 pt-4 border-t border-outline-variant/60">
 <label className="block text-[10px] uppercase font-bold text-on-surface-variant">
 Promo Key
 </label>
 <div className="flex">
 <input 
 type="text" 
 placeholder="ENTER CODE" 
 className="flex-grow border-b border-outline-variant bg-transparent py-2.5 focus:border-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 text-on-surface text-xs font-medium" 
 />
 <button className="text-on-surface hover:text-on-surface-variant px-4 border-b border-outline-variant text-[10px] font-bold uppercase transition-colors">
 Apply
 </button>
 </div>
 </div>

 <Link 
 to="/checkout" 
 className="luxury-button w-full flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase transition-colors"
 >
 <span>Proceed to Checkout</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>


 </aside>
 </div>
 ) : (
 <div className="py-24 flex flex-col items-center justify-center space-y-6 bg-surface-container border border-outline-variant rounded-none">
 <div className="w-16 h-16 bg-surface border border-outline-variant flex items-center justify-center rounded-none">
 <ShoppingBag className="w-6 h-6 text-on-surface stroke-[1.5]" />
 </div>
 <div className="text-center space-y-2">
 <h2 className="text-4xl font-light text-on-surface">Your Cart is Empty</h2>
 <p className="text-on-surface-variant max-w-sm text-sm">
 You have not curated any pieces for your collection yet.
 </p>
 </div>
 <Link to="/shop" className="luxury-button !px-16 mt-4">
 Explore the Gallery
 </Link>
 </div>
 )}
 </div>
 );
}
