import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, ChevronLeft, Minus, Plus, ShoppingBag, Heart, Truck, ShieldCheck, GitCompareArrows } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '../lib/utils';
import { useProduct, useProducts } from '../hooks/useProductQueries';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import { useSEO, buildProductStructuredData } from '../hooks/useSEO';

export default function ProductDetail() {
 const { id } = useParams<{ id: string }>();
 const { data: product = null, isLoading: loading } = useProduct(id ?? '');
 const { data: allProducts = [] } = useProducts();
 const relatedProducts = useMemo(() => {
 if (!product || !id) return [];
 const matchingCategory = allProducts.filter(p => p.id !== id && p.category === product.category);
 return matchingCategory.length > 0
 ? matchingCategory
 : allProducts.filter(p => p.id !== id).slice(0, 10);
 }, [product, allProducts, id]);
 const [quantity, setQuantity] = useState(1);
 const [activeTab, setActiveTab] = useState('Product Description');
 const [selectedImage, setSelectedImage] = useState(0);
 const [selectedColor, setSelectedColor] = useState(0);
 const [isHovered, setIsHovered] = useState(false);

 const { addToCart, cart } = useCart();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { toggleCompare, isInCompare, compareList, isReady } = useComparison();
 const sliderRef = useRef<HTMLDivElement>(null);

 useSEO({
  title: product ? product.name : 'Product',
  description: product
   ? `Buy ${product.name} – ${product.description.slice(0, 140).replace(/\n/g, ' ')}...`
   : 'View product details on Shopix.',
  keywords: product
   ? `${product.name}, ${product.category}, buy online, shopix`
   : undefined,
  ogImage: product?.image,
  ogType: 'product',
  canonicalPath: product ? `/product/${product.id}` : undefined,
  structuredData: product ? buildProductStructuredData(product) : undefined,
 });

 const scrollLeft = () => {
 if (sliderRef.current) sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
 };
 const scrollRight = () => {
 if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
 };
 const handleScroll = () => {
 const slider = sliderRef.current;
 if (!slider || relatedProducts.length <= 1) return;
 const oneSetWidth = slider.scrollWidth / 3;
 if (slider.scrollLeft >= oneSetWidth * 2) slider.scrollLeft -= oneSetWidth;
 else if (slider.scrollLeft <= 10) slider.scrollLeft += oneSetWidth;
 };

 useEffect(() => {
 if (relatedProducts.length <= 1 || isHovered) return;
 const interval = setInterval(() => {
 if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
 }, 1800);
 return () => clearInterval(interval);
 }, [relatedProducts, isHovered]);

 useEffect(() => {
 if (relatedProducts.length > 0 && sliderRef.current) {
 const slider = sliderRef.current;
 const timer = setTimeout(() => {
 const oneSetWidth = slider.scrollWidth / 3;
 slider.scrollLeft = oneSetWidth;
 }, 100);
 return () => clearTimeout(timer);
 }
 }, [relatedProducts, id]);

 useEffect(() => {
 if (!id) return;
 setSelectedImage(0);
 setSelectedColor(0);
 setQuantity(1);
 window.scrollTo(0, 0);
 }, [id]);

 if (loading) {
 return (
 <div className="min-h-screen bg-surface flex justify-center items-center">
 <div className="animate-spin rounded-full h-10 w-10 border-[1.5px] border-outline-variant border-t-primary" />
 </div>
 );
 }

 if (!product) {
 return (
 <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 gap-4">
 <h1 className="text-2xl font-bold text-on-surface">Product not found.</h1>
 <Link to="/shop" className="text-primary hover:underline text-sm font-medium">Return to Shop</Link>
 </div>
 );
 }

 const thumbnails = product.images?.length > 0 ? product.images : [product.image];
 const discountAmount = product.price * (product.discountPercentage ? product.discountPercentage / 100 : 0);
 const originalPrice = product.price + discountAmount;
 const isInCart = cart.some(item => item.id === product.id);

 return (
 <div className="bg-surface min-h-screen pb-20 transition-colors duration-300">



 <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

 <nav className="flex items-center gap-2 text-on-surface-variant text-xs mb-8">
 <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
 <ChevronRight className="w-3 h-3 opacity-40" />
 <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-on-surface transition-colors capitalize">
 {product.category.replace('-', ' ')}
 </Link>
 <ChevronRight className="w-3 h-3 opacity-40" />
 <span className="text-on-surface font-medium truncate">{product.name}</span>
 </nav>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

 <div className="space-y-4">
 <div className="relative aspect-square overflow-hidden group">
 <motion.img
 key={selectedImage}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.35 }}
 src={thumbnails[selectedImage]}
 referrerPolicy="no-referrer"
 alt={product.name}
 className="w-full h-full object-cover"
 />

 </div>

 {thumbnails.length > 1 && (
 <div className="grid grid-cols-4 gap-3">
 {thumbnails.map((thumb, i) => (
 <button
 key={i}
 onClick={() => setSelectedImage(i)}
 className={cn(
 'aspect-square overflow-hidden border-2 transition-all p-1 bg-surface-container-low',
 selectedImage === i
 ? 'border-primary'
 : 'border-transparent opacity-60 hover:opacity-100'
 )}
 >
 <img src={thumb} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={`View ${i + 1}`} />
 </button>
 ))}
 </div>
 )}
 </div>

 <div className="flex flex-col space-y-7">

 <div className="space-y-4">
 <div className="flex items-center gap-3">
 <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">
 {product.category.replace('-', ' ')}
 </span>
 </div>
 <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
 {product.name}
 </h1>
 <div className="flex items-center gap-5">
 <div className="flex items-center gap-1.5">
 <div className="flex">
 {[1, 2, 3, 4, 5].map(i => (
 <Star key={i} className={cn('w-4 h-4', i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-outline-variant')} />
 ))}
 </div>
 <span className="text-xs text-on-surface-variant">{product.rating} ({product.reviews} reviews)</span>
 </div>
 <div className="h-4 w-px bg-outline-variant" />
 <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
 In Stock {product.stock ? `(${product.stock})` : ''}
 </span>
 </div>
 </div>

 <div className="space-y-1">
 <div className="flex items-baseline gap-4">
 <span className="text-4xl font-bold text-on-surface">${product.price.toFixed(2)}</span>
 {product.discountPercentage && product.discountPercentage > 0 && (
 <span className="text-lg text-on-surface-variant line-through">${originalPrice.toFixed(2)}</span>
 )}
 {product.discountPercentage && product.discountPercentage > 0 && (
 <span className="text-xs font-bold bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-2 py-1 border border-red-200 dark:border-red-800">
 -{product.discountPercentage}% OFF
 </span>
 )}
 </div>
 </div>

 {product.colors && product.colors.length > 0 && (
 <div className="space-y-3">
 <span className="block text-xs font-bold text-on-surface uppercase">Color</span>
 <div className="flex gap-3">
 {product.colors.map((color, idx) => (
 <button
 key={idx}
 onClick={() => setSelectedColor(idx)}
 className={cn(
 'w-8 h-8 border-2 transition-all',
 selectedColor === idx ? 'border-on-surface scale-110' : 'border-outline-variant hover:scale-105'
 )}
 style={{ backgroundColor: color }}
 aria-label={`Color ${idx + 1}`}
 />
 ))}
 </div>
 </div>
 )}

 <div className="space-y-3">
 <span className="block text-xs font-bold text-on-surface uppercase">Quantity</span>
 <div className="flex items-center border border-outline-variant w-fit bg-surface">
 <button
 onClick={() => setQuantity(Math.max(1, quantity - 1))}
 className="px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
 >
 <Minus className="w-3.5 h-3.5" />
 </button>
 <span className="text-sm font-bold text-on-surface w-10 text-center border-x border-outline-variant py-3">
 {quantity}
 </span>
 <button
 onClick={() => setQuantity(quantity + 1)}
 className="px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
 >
 <Plus className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row gap-3">
 <motion.button
 onClick={() => product && !isInCart && addToCart(product, quantity)}
 disabled={isInCart}
 whileHover={isInCart ? {} : { scale: 1.08 }}
 whileTap={isInCart ? {} : { scale: 0.97 }}
 transition={{ duration: 0.4, ease: 'easeOut' }}
 className={cn(
 'flex-[2] py-4 text-sm font-bold flex items-center justify-center gap-2',
 isInCart
 ? 'bg-surface-container text-on-surface-variant cursor-not-allowed border border-outline-variant'
 : 'bg-black text-white border border-black dark:bg-[#1a1a1a] dark:border-[#333] dark:text-white shadow-lg'
 )}
 >
 <ShoppingBag className="w-4 h-4" />
 {isInCart ? 'Already In Cart' : 'Add to Cart'}
 </motion.button>
 <motion.button
 onClick={() => toggleFavorite(product)}
 whileHover={{ scale: 1.08 }}
 whileTap={{ scale: 0.97 }}
 transition={{ duration: 0.4, ease: 'easeOut' }}
 className={cn(
 'flex-1 py-4 border text-sm font-bold flex items-center justify-center gap-2',
 isFavorite(product.id)
 ? 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
 : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
 )}
 >
 <Heart className={cn('w-4 h-4 transition-transform duration-300', isFavorite(product.id) ? 'fill-current scale-110' : '')} />
 Favourite
 </motion.button>
 <motion.button
 onClick={() => toggleCompare(product)}
 whileHover={{ scale: 1.08 }}
 whileTap={{ scale: 0.97 }}
 transition={{ duration: 0.4, ease: 'easeOut' }}
 className={cn(
 'flex-1 py-4 border text-sm font-bold flex items-center justify-center gap-2',
 isInCompare(product.id)
 ? 'bg-primary/10 border-primary/30 text-primary'
 : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
 )}
 >
 <GitCompareArrows className="w-4 h-4" />
 {isInCompare(product.id) ? 'In Compare' : 'Compare'}
 </motion.button>
 </div>

 {isReady && (
 <Link
 to={`/compare?ids=${compareList.map(p => p.id).join(',')}`}
 className="block w-full text-center py-3 text-[10px] font-bold uppercase text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
 >
 View side-by-side comparison
 </Link>
 )}

 <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-primary/10 border border-primary/20">
 <Truck className="w-4 h-4 text-primary" />
 </div>
 <div>
 <p className="text-xs font-bold text-on-surface">Free Shipping</p>
 <p className="text-[10px] text-on-surface-variant">On orders over $150</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className="p-2 bg-primary/10 border border-primary/20">
 <ShieldCheck className="w-4 h-4 text-primary" />
 </div>
 <div>
 <p className="text-xs font-bold text-on-surface">2 Year Warranty</p>
 <p className="text-[10px] text-on-surface-variant">Manufacturer care</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-20">
 <div className="flex gap-0 border-b border-outline-variant mb-12 overflow-x-auto no-scrollbar">
 {['Product Description', 'Technical Specifications', `Reviews (${product.reviews})`, 'FAQ'].map(tab => (
 <button
 key={tab}
 onClick={() => setActiveTab(tab)}
 className={cn(
 'flex-shrink-0 px-6 pb-4 pt-2 text-xs font-bold uppercase transition-all border-b-2 whitespace-nowrap',
 activeTab === tab
 ? 'text-primary border-primary'
 : 'text-on-surface-variant border-transparent hover:text-on-surface'
 )}
 >
 {tab}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
 <div className="lg:col-span-8 space-y-10">
 <AnimatePresence mode="wait">
 <motion.div
 key={activeTab}
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="space-y-6"
 >
 {activeTab === 'Product Description' && (
 <>
 <div className="space-y-4 text-sm text-on-surface-variant">
 {product.description.split('\n\n').map((para, i) => (
 <p key={i}>{para}</p>
 ))}
 </div>
 {product.features && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
 {product.features.map((feature, idx) => (
 <div key={idx} className="bg-surface-container-low border border-outline-variant p-6 space-y-2">
 <span className="text-[10px] uppercase text-primary font-bold">
 {String(idx + 1).padStart(2, '0')}
 </span>
 <h4 className="text-base font-bold text-on-surface">{feature.title}</h4>
 <p className="text-xs text-on-surface-variant">{feature.description}</p>
 </div>
 ))}
 </div>
 )}
 </>
 )}

 {activeTab === 'Technical Specifications' && (
 <div className="border border-outline-variant divide-y divide-outline-variant">
 {product.specifications ? (
 Object.entries(product.specifications).map(([key, value]) => (
 <div key={key} className="flex justify-between items-center px-6 py-4">
 <span className="text-xs text-on-surface-variant">{key}</span>
 <span className="text-xs font-bold text-on-surface">{value}</span>
 </div>
 ))
 ) : (
 <>
 <div className="flex justify-between items-center px-6 py-4">
 <span className="text-xs text-on-surface-variant">Material</span>
 <span className="text-xs font-bold text-on-surface">Premium Grade</span>
 </div>
 <div className="flex justify-between items-center px-6 py-4">
 <span className="text-xs text-on-surface-variant">Origin</span>
 <span className="text-xs font-bold text-on-surface">Direct Import</span>
 </div>
 </>
 )}
 </div>
 )}

 {activeTab.startsWith('Reviews') && (
 <div className="space-y-6">
 <div className="flex items-center gap-6 border border-outline-variant p-6">
 <span className="text-5xl font-bold text-on-surface">{product.rating}</span>
 <div className="space-y-2">
 <div className="flex gap-1">
 {[1, 2, 3, 4, 5].map(i => (
 <Star key={i} className={cn('w-5 h-5', i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-outline-variant')} />
 ))}
 </div>
 <p className="text-xs text-on-surface-variant uppercase">
 Based on {product.reviews} reviews
 </p>
 </div>
 </div>
 <p className="text-xs text-on-surface-variant text-center py-8 border border-outline-variant">
 Reviews are being moderated and will appear shortly.
 </p>
 </div>
 )}

 {activeTab === 'FAQ' && (
 <div className="border border-outline-variant divide-y divide-outline-variant">
 {[
 { q: 'What is the return policy?', a: 'We offer a 30-day return window for all items in their original condition and packaging.' },
 { q: 'How long does shipping take?', a: 'Standard shipping is 3–5 business days. Express shipping delivers next day.' },
 { q: 'Is this product covered by warranty?', a: 'Yes, all items carry a 2-year manufacturer warranty.' },
 { q: 'Can I change my order after placing it?', a: 'Orders can be modified within 1 hour of placement.' },
 ].map(({ q, a }) => (
 <div key={q} className="px-6 py-5 space-y-1.5">
 <p className="text-xs font-bold text-on-surface">{q}</p>
 <p className="text-xs text-on-surface-variant">{a}</p>
 </div>
 ))}
 </div>
 )}
 </motion.div>
 </AnimatePresence>
 </div>

 <div className="lg:col-span-4">
 <div className="bg-surface-container-low border border-outline-variant p-8 space-y-6 sticky top-24">
 <h3 className="text-xs font-bold text-on-surface uppercase border-b border-outline-variant pb-4">
 Key Specifications
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center text-xs">
 <span className="text-on-surface-variant">SKU</span>
 <span className="font-bold text-on-surface">#{product.id?.slice(0, 8).toUpperCase()}</span>
 </div>
 {product.specifications ? (
 Object.entries(product.specifications).slice(0, 6).map(([key, value]) => (
 <div key={key} className="flex justify-between items-center text-xs">
 <span className="text-on-surface-variant">{key}</span>
 <span className="font-bold text-on-surface">{value}</span>
 </div>
 ))
 ) : (
 <>
 <div className="flex justify-between items-center text-xs">
 <span className="text-on-surface-variant">Material</span>
 <span className="font-bold text-on-surface">Premium Grade</span>
 </div>
 <div className="flex justify-between items-center text-xs">
 <span className="text-on-surface-variant">Origin</span>
 <span className="font-bold text-on-surface">Direct Import</span>
 </div>
 </>
 )}
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-32">
 <div className="flex justify-between items-end mb-12">
 <div className="space-y-2">
 <h2 className="text-3xl font-bold text-on-surface">Related Products</h2>
 <p className="text-xs text-on-surface-variant uppercase">
 More from{' '}
 <span className="text-primary capitalize font-bold">{product.category.replace('-', ' ')}</span>
 </p>
 </div>
 <div className="flex items-center gap-3">
 <div className="hidden sm:flex items-center gap-2">
 <button
 onClick={scrollLeft}
 className="p-2.5 border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all"
 aria-label="Scroll left"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 <button
 onClick={scrollRight}
 className="p-2.5 border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all"
 aria-label="Scroll right"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 <Link
 to="/shop"
 className="text-primary font-bold text-xs hover:underline flex items-center gap-1 uppercase transition-all"
 >
 View All <ChevronRight className="w-3 h-3" />
 </Link>
 </div>
 </div>

 <div
 ref={sliderRef}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 onScroll={handleScroll}
 className="flex gap-10 overflow-x-auto pb-6 pt-1 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden"
 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
 >
 {Array.from({ length: 3 }).flatMap((_, setIdx) =>
 relatedProducts.map(item => {
 const itemInCart = cart.some(c => c.id === item.id);
 return (
 <motion.div
 key={`${setIdx}-${item.id}`}
 layout
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 whileHover={{ y: -6 }}
 transition={{ type: 'spring', stiffness: 300, damping: 25 }}
 className="flex-shrink-0 w-[220px] sm:w-[260px] snap-start group relative flex flex-col"
 >
 <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden mb-6 group/item transition-all duration-500 border border-outline/5 hover:border-[#00619E]/20 hover:shadow-2xl hover:shadow-[#00619E]/10">
 {itemInCart && (
 <motion.div
 initial={{ y: -30, opacity: 0, x: '-50%' }}
 animate={{ y: 0, opacity: 1, x: '-50%' }}
 transition={{ type: 'spring', stiffness: 120, damping: 14 }}
 className="absolute top-2 left-1/2 bg-[#00619E] text-white px-3 py-1 text-[9px] font-bold uppercase rounded-none shadow-md z-30"
 >
 In Cart
 </motion.div>
 )}

 <img
 src={item.image}
 referrerPolicy="no-referrer"
 className="w-full h-full object-contain p-10 transition-transform duration-1000 ease-out group-hover/item:scale-110"
 alt={item.name}
 />

 <motion.button
 whileHover={{ scale: 1.15 }}
 whileTap={{ scale: 0.9 }}
 onClick={e => { e.preventDefault(); toggleFavorite(item); }}
 className={cn(
 'absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover/item:translate-y-0 shadow-xl z-20',
 isFavorite(item.id) ? 'bg-[#00619E] text-white opacity-100 translate-y-0' : 'bg-surface/90 text-on-surface hover:bg-[#00619E] hover:text-white'
 )}
 >
 <Heart className={cn('w-4 h-4', isFavorite(item.id) && 'fill-current')} />
 </motion.button>

 <motion.button
 whileHover={{ scale: 1.15 }}
 whileTap={{ scale: 0.9 }}
 onClick={e => { e.preventDefault(); toggleCompare(item); }}
 className={cn(
 'absolute top-4 left-4 p-2.5 backdrop-blur-sm rounded-full transition-all duration-500 shadow-xl z-20',
 isInCompare(item.id) ? 'bg-primary text-white opacity-100' : 'bg-surface/90 text-on-surface opacity-0 group-hover/item:opacity-100 hover:bg-primary hover:text-white'
 )}
 >
 <GitCompareArrows className="w-4 h-4" />
 </motion.button>

 <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover/item:opacity-100 transition-all duration-700 ease-out z-10 bg-gradient-to-t from-black/20 to-transparent">
 <motion.button
 whileHover={itemInCart ? {} : { scale: 1.04, y: -2 }}
 whileTap={itemInCart ? {} : { scale: 0.96 }}
 onClick={e => { e.preventDefault(); !itemInCart && addToCart(item); }}
 disabled={itemInCart}
 className={cn(
 'w-full py-3 rounded-xl text-xs font-bold transition-all transform translate-y-4 group-hover/item:translate-y-0 duration-700 ease-out shadow-2xl flex items-center justify-center gap-2',
 itemInCart
 ? 'bg-neutral-400 text-white cursor-not-allowed opacity-90'
 : 'bg-on-surface text-surface hover:opacity-80'
 )}
 >
 {itemInCart ? 'Already In Cart' : 'Add to Bag'}
 </motion.button>
 </div>

 {item.isNew && (
 <span className="absolute top-4 left-4 bg-on-surface text-surface px-2 py-0.5 rounded-none text-[7px] font-bold uppercase z-10">New</span>
 )}
 </div>

 <div className="space-y-4 flex flex-col flex-grow">
 <div className="space-y-1 text-center">
 <p className="text-[10px] uppercase text-on-surface-variant font-bold underline underline-offset-8 decoration-outline-variant">
 {item.category.replace('-', ' ')}
 </p>
 <Link to={`/product/${item.id}`}>
 <h4 className="text-xl font-bold text-on-surface hover:text-on-surface-variant transition-colors mt-4 line-clamp-2">
 {item.name}
 </h4>
 </Link>
 </div>
 <div className="flex flex-col items-center gap-2 mt-auto text-on-surface">
 <span className="text-lg font-light">${item.price.toFixed(2)}</span>
 <div className="flex items-center gap-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className={cn('w-3 h-3', i < Math.floor(item.rating) ? 'fill-on-surface text-on-surface' : 'text-outline-variant')} />
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 );
 })
 )}
 </div>
 </div>

 </div>
 </div>
 );
}
