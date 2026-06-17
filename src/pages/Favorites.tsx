import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useSEO } from '../hooks/useSEO';

const Favorites: React.FC = () => {
 const { favorites, toggleFavorite } = useFavorites();
 const { addToCart, cart } = useCart();

 useSEO({
  title: 'Your Favorites',
  description: 'Your saved favorite products on Shopix. Add them to your cart and complete your purchase.',
  noIndex: true,
 });

 return (
 <div className="pt-32 pb-40 px-10 min-h-screen bg-surface transition-colors duration-300">
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
 <div className="space-y-4 text-center md:text-left">
 <h1 className="text-6xl text-on-surface font-bold">Your Favorites</h1>
 <p className="text-on-surface-variant">Products you've saved for later.</p>
 </div>
 <Link to="/shop" className="text-xs font-bold uppercase border-b-2 border-on-surface pb-2 hover:text-on-surface-variant hover:border-on-surface-variant transition-all text-on-surface text-center">Continue Shopping</Link>
 </div>

 {favorites.length === 0 ? (
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex flex-col items-center justify-center py-40 text-center space-y-8 bg-surface-container-low rounded-[3rem] border border-outline/5"
 >
 <div className="w-24 h-24 bg-surface-container flex items-center justify-center rounded-full">
 <Heart className="w-10 h-10 text-on-surface-variant opacity-20" />
 </div>
 <div className="space-y-2">
 <h2 className="text-3xl font-bold text-on-surface">No favorites yet</h2>
 <p className="text-on-surface-variant max-w-sm mx-auto">Start exploring and save the items that catch your eye to your personal favorites.</p>
 </div>
 <Link 
 to="/shop" 
 className="luxury-button !px-10"
 >
 Explore Shop
 </Link>
 </motion.div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
 <AnimatePresence mode="popLayout">
 {favorites.map((product) => {
 const isInCart = cart.some(item => item.id === product.id);
 return (
 <motion.div
 key={product.id}
 layout
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 whileHover={{ y: -6 }}
 exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
 className="group flex flex-col"
 >
 <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-low mb-6 group/item transition-all duration-500 border border-outline/5 hover:border-[#00619E]/20 hover:shadow-2xl hover:shadow-[#00619E]/10">
 {isInCart && (
 <motion.div 
 initial={{ y: -30, opacity: 0, x:"-50%" }}
 animate={{ y: 0, opacity: 1, x:"-50%" }}
 transition={{ type:"spring", stiffness: 120, damping: 14 }}
 className="absolute top-2 left-1/2 bg-[#00619E] text-white px-3 py-1 text-[9px] font-bold uppercase rounded-none shadow-md z-30"
 >
 In Cart
 </motion.div>
 )}

 <img
 src={product.image}
 referrerPolicy="no-referrer"
 className="w-full h-full object-contain p-12 transition-transform duration-1000 ease-out group-hover/item:scale-110"
 alt={product.name}
 />
 
 
 <motion.button 
 whileHover={{ scale: 1.15 }}
 whileTap={{ scale: 0.9 }}
 onClick={() => toggleFavorite(product)}
 className="absolute top-5 right-5 p-3 bg-error/10 backdrop-blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover/item:translate-y-0 hover:bg-error hover:text-white text-error shadow-xl z-20"
 >
 <Trash2 className="w-5 h-5" />
 </motion.button>

 
 <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover/item:opacity-100 transition-all duration-700 ease-out z-10 bg-gradient-to-t from-black/20 to-transparent">
 <motion.button 
 whileHover={isInCart ? {} : { scale: 1.04, y: -2 }}
 whileTap={isInCart ? {} : { scale: 0.96 }}
 onClick={() => !isInCart && addToCart(product)}
 disabled={isInCart}
 className={cn("w-full py-4 rounded-xl text-sm font-bold transition-all transform translate-y-4 group-hover/item:translate-y-0 duration-700 ease-out shadow-2xl flex items-center justify-center gap-2",
 isInCart 
 ?"bg-neutral-400 text-white cursor-not-allowed opacity-90" 
 :"bg-[#00619E] text-white hover:bg-[#004a7a]"
 )}
 >
 <ShoppingBag className="w-4 h-4" />
 {isInCart ? 'In Your Cart' : 'Add to Cart'}
 </motion.button>
 </div>
 </div>

 <div className="space-y-3 px-1 mt-4">
 <div className="flex justify-between items-start gap-4">
 <Link to={`/product/${product.id}`} className="flex-1">
 <h3 className="font-medium text-lg text-on-surface hover:text-[#00619E] transition-colors line-clamp-2">
 {product.name}
 </h3>
 </Link>
 <span className="text-lg font-bold text-[#00619E] whitespace-nowrap">
 ${product.price.toFixed(2)}
 </span>
 </div>
 
 <div className="flex items-center gap-1.5 pt-1">
 <div className="flex items-center gap-0.5">
 {[1, 2, 3, 4, 5].map((i) => (
 <Star key={i} className={cn("w-3.5 h-3.5", i <= Math.floor(product.rating) ?"fill-on-surface text-[#00619E]" :"text-neutral-300")} />
 ))}
 </div>
 <span className="text-sm font-medium text-neutral-400">({product.reviews})</span>
 </div>
 </div>
 </motion.div>
 ); })}
 </AnimatePresence>
 </div>
 )}
 </div>
 </div>
 );
};

export default Favorites;
