import { useState, useEffect, useMemo } from 'react';
import { Search, Star, Filter, ChevronLeft, ChevronRight, ShoppingBag, ChevronDown, GitCompareArrows } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useProducts, useCategories } from '../hooks/useProductQueries';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import { Product } from '../types';
import { Heart } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Shop() {
 const [searchParams] = useSearchParams();
 const initialCategory = searchParams.get('category') || 'all';
 const initialSearch = searchParams.get('search') || '';
 
 const { data: products = [], isLoading: loading } = useProducts();
 const { data: categoriesData = [] } = useCategories();
 const [selectedCategory, setSelectedCategory] = useState(initialCategory);
 const [searchQuery, setSearchQuery] = useState(initialSearch);
 const [maxPrice, setMaxPrice] = useState(3000);
 const [minRating, setMinRating] = useState(0);
 const [sortBy, setSortBy] = useState('Most Coveted');
 const { addToCart, cart } = useCart();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { toggleCompare, isInCompare } = useComparison();

 const categoryLabels: Record<string, { title: string; description: string }> = {
  all: { title: 'The Collection', description: 'Browse all Shopix products: premium fashion, electronics, and home décor. Curated world-class pieces for the modern lifestyle.' },
  'classic-wear': { title: 'Classic Wear', description: 'Discover Shopix Classic Wear collection – bespoke tailoring and timeless elegance for the discerning wardrobe.' },
  'home-decoration': { title: 'Home Decoration', description: 'Transform your living space with Shopix artisanal home décor. Curated pieces that blend beauty with purpose.' },
  'mobile-accessories': { title: 'Tech Gallery', description: 'Cutting-edge mobile accessories and electronics on Shopix. Upgrade your digital lifestyle with premium tech.' },
  'mens-shirts': { title: "Men's Wear", description: "Shop Shopix men's shirts and apparel – modern silhouettes and sustainable comfort for the contemporary man." },
 };

 const seoInfo = categoryLabels[selectedCategory] || categoryLabels['all'];

 useSEO({
  title: seoInfo.title,
  description: seoInfo.description,
  keywords: `${seoInfo.title.toLowerCase()}, shop online, shopix, buy ${seoInfo.title.toLowerCase()}`,
  canonicalPath: selectedCategory === 'all' ? '/shop' : `/shop?category=${selectedCategory}`,
 });

 const clearFilters = () => {
 setSelectedCategory('all');
 setSearchQuery('');
 setMaxPrice(3000);
 setMinRating(0);
 setSortBy('Most Coveted');
 };

 useEffect(() => {
 const categoryFromUrl = searchParams.get('category');
 const searchFromUrl = searchParams.get('search');
 
 if (categoryFromUrl) {
 setSelectedCategory(categoryFromUrl);
 }
 if (searchFromUrl !== null) {
 setSearchQuery(searchFromUrl);
 }
 }, [searchParams]);

 const categories = useMemo(() => {
 const manualCategories = [
 {name: 'All Products', slug: 'all'}, 
 {name: 'Classic Wear', slug: 'classic-wear'},
 {name: 'Home Decoration', slug: 'home-decoration'},
 ];
 const manualSlugs = manualCategories.map(c => c.slug);
 const filteredApiCategories = categoriesData
 .filter(c => !manualSlugs.includes(c.slug))
 .map(c => ({ name: c.name, slug: c.slug }));
 return [...manualCategories, ...filteredApiCategories];
 }, [categoriesData]);

 const getCategoryTheme = (slug: string) => {
 const themes: Record<string, { title: string, subtitle: string, image: string }> = {
 'all': { 
 title: 'The Collection', 
 subtitle: 'Curated world-class pieces for the modern lifestyle', 
 image: '/images/img_29.jpg' 
 },
 'classic-wear': { 
 title: 'Classic Wear', 
 subtitle: 'Bespoke tailoring and timeless elegance', 
 image: '/images/img_30.jpg' 
 },
 'home-decoration': { 
 title: 'Curated Living', 
 subtitle: 'Artisanal decor items to transform your personal sanctuary', 
 image: '/images/img_31.jpg' 
 },
 'mobile-accessories': { 
 title: 'Tech Gallery', 
 subtitle: 'Cutting-edge accessories for your digital lifestyle', 
 image: '/images/img_32.jpg' 
 },
 'mens-shirts': { 
 title:"Men's Wear", 
 subtitle: 'Modern silhouettes and sustainable comfort', 
 image: '/images/img_33.jpg' 
 }
 };
 return themes[slug] || themes['all'];
 };

 const currentTheme = getCategoryTheme(selectedCategory);

 const filteredProducts = products.filter(p => {
 const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
 const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
 const matchesPrice = p.price <= maxPrice;
 const matchesRating = p.rating >= minRating;
 return matchesCategory && matchesSearch && matchesPrice && matchesRating;
 });

 const sortedProducts = [...filteredProducts].sort((a, b) => {
 if (sortBy === 'Price: Low to High') return a.price - b.price;
 if (sortBy === 'Price: High to Low') return b.price - a.price;
 if (sortBy === 'Newest Arrivals') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
 return 0; 
 });

 return (
 <div className="bg-surface transition-colors duration-300 text-on-surface">
 <motion.div 
 key={selectedCategory}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="relative h-[400px] overflow-hidden group"
 >
 <img 
 src={currentTheme.image} 
 className="w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100"
 alt={currentTheme.title} 
 />
 <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

 <motion.h1 
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="text-6xl md:text-8xl font-bold text-white"
 >
 {currentTheme.title}
 </motion.h1>
 <motion.p 
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="text-white/80 text-sm font-light uppercase mt-6 max-w-xl"
 >
 {currentTheme.subtitle}
 </motion.p>
 </div>
 </motion.div>

 <div className="max-w-7xl mx-auto px-4 md:px-10 py-20 w-full flex flex-col md:flex-row gap-16">
 <aside className="w-full md:w-64 flex-shrink-0 space-y-12">
 <div className="space-y-10">
 <h3 className="text-4xl font-bold border-b border-on-surface pb-4">Filters</h3>
 
 <div className="space-y-6">
 <p className="text-xs font-bold text-on-surface-variant uppercase">Search</p>
 <div className="relative group">
 <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-on-surface transition-colors" />
 <input 
 type="text" 
 placeholder="Find pieces..." 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-transparent border-none focus:ring-0 pl-7 text-sm placeholder:text-on-surface-variant/30 text-on-surface"
 />
 </div>
 </div>

 <div className="space-y-6">
 <p className="text-xs font-bold text-on-surface-variant uppercase">Category</p>
 <div className="space-y-4">
 {categories.map((cat) => (
 <label key={cat.slug} className="flex items-center group cursor-pointer">
 <input
 type="radio"
 name="category"
 checked={selectedCategory === cat.slug}
 onChange={() => setSelectedCategory(cat.slug)}
 className="hidden"
 />
 <span className={cn("text-sm transition-all border-b border-transparent hover:border-on-surface",
 selectedCategory === cat.slug ?"text-on-surface font-bold border-on-surface" :"text-on-surface-variant"
 )}>
 {cat.name}
 </span>
 </label>
 ))}
 </div>
 </div>

 <div className="space-y-8">
 <div className="flex justify-between items-center">
 <p className="text-xs font-bold text-on-surface-variant uppercase">Price Range</p>
 <span className="text-[10px] font-bold font-mono">${maxPrice}</span>
 </div>
 <input 
 type="range" 
 min="0"
 max="3000"
 value={maxPrice}
 onChange={(e) => setMaxPrice(Number(e.target.value))}
 className="w-full h-[1px] bg-outline-variant appearance-none cursor-pointer accent-on-surface" 
 />
 <div className="flex justify-between text-[10px] uppercase font-bold text-on-surface-variant">
 <span>$0</span>
 <span>$3,000+</span>
 </div>
 </div>

 <div className="space-y-6">
 <p className="text-xs font-bold text-on-surface-variant uppercase">Rating</p>
 <div className="flex flex-col gap-3">
 {[4, 3, 2, 1, 0].map((r) => (
 <button 
 key={r} 
 onClick={() => setMinRating(r)}
 className={cn("flex items-center transition-colors gap-2 text-sm",
 minRating === r ?"text-on-surface font-bold" :"text-on-surface-variant hover:text-on-surface"
 )}
 >
 <div className="flex">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className={cn("w-3 h-3", i < r ?"fill-on-surface text-on-surface" :"text-outline-variant")} />
 ))}
 </div>
 <span>{r > 0 ? `& up` : 'All Ratings'}</span>
 </button>
 ))}
 </div>
 </div>
 </div>
 </aside>

 <div className="flex-grow">
 <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-16 gap-6">
 <div className="space-y-2 text-center sm:text-left">
 <h1 className="text-5xl font-bold text-on-surface">{selectedCategory === 'all' ? 'The Collection' : categories.find(c => c.slug === selectedCategory)?.name}</h1>
 <p className="text-on-surface-variant text-sm font-light uppercase">
 {loading ? 'Sourcing items...' : `Showing ${sortedProducts.length} curated pieces`}
 </p>
 </div>
 <div className="flex items-center gap-4 w-full sm:w-auto">
 <div className="relative w-full sm:w-64 group">
 <select 
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value)}
 className="w-full appearance-none bg-surface border-b border-outline-variant rounded-none px-0 py-3 text-xs uppercase focus:border-on-surface outline-none transition-all cursor-pointer text-on-surface"
 >
 <option>Most Coveted</option>
 <option>Price: Low to High</option>
 <option>Price: High to Low</option>
 <option>Newest Arrivals</option>
 </select>
 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant group-hover:text-on-surface transition-colors">
 <ChevronDown className="w-4 h-4" />
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
 {!loading && sortedProducts.length === 0 && (
 <div className="col-span-full py-32 text-center space-y-6">
 <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto">
 <ShoppingBag className="w-8 h-8 text-on-surface-variant opacity-40" />
 </div>
 <div className="space-y-2">
 <p className="text-3xl text-on-surface font-bold">No pieces found</p>
 <p className="text-on-surface-variant text-sm max-w-xs mx-auto">We couldn't find any items matching your current filters. Try adjusting your search or criteria.</p>
 </div>
 <button 
 onClick={clearFilters}
 className="text-xs font-bold uppercase border-b border-on-surface pb-1 hover:text-on-surface-variant hover:border-on-surface-variant transition-all"
 >
 Clear all filters
 </button>
 </div>
 )}
 {loading ? (
 [...Array(6)].map((_, i) => (
 <div key={i} className="animate-pulse space-y-4">
 <div className="aspect-[3/4] bg-neutral-100"></div>
 <div className="h-4 bg-neutral-100 w-2/3 mx-auto"></div>
 <div className="h-4 bg-neutral-100 w-1/3 mx-auto"></div>
 </div>
 ))
 ) : (
 sortedProducts.map((product) => {
 const isInCart = cart.some(item => item.id === product.id);
 return (
 <motion.div
 key={product.id}
 layout
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 whileHover={{ y: -6 }}
 transition={{ type:"spring", stiffness: 300, damping: 25 }}
 className="group relative flex flex-col"
 >
 <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden mb-6 group/item transition-all duration-500 border border-outline/5 hover:border-[#00619E]/20 hover:shadow-2xl hover:shadow-[#00619E]/10">
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
 className="w-full h-full object-contain p-10 transition-transform duration-1000 ease-out group-hover/item:scale-110"
 alt={product.name}
 onError={(e) => {
 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594932224010-75f4d8624415?auto=format&fit=crop&w=800&q=80';
 }}
 />

 <motion.button 
 whileHover={{ scale: 1.15 }}
 whileTap={{ scale: 0.9 }}
 onClick={() => toggleFavorite(product)}
 className={cn("absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover/item:translate-y-0 shadow-xl z-20",
 isFavorite(product.id) ?"bg-[#00619E] text-white opacity-100 translate-y-0" :"bg-surface/90 text-on-surface hover:bg-[#00619E] hover:text-white"
 )}
 >
 <Heart className={cn("w-4 h-4", isFavorite(product.id) &&"fill-current")} />
 </motion.button>

 <motion.button 
 whileHover={{ scale: 1.15 }}
 whileTap={{ scale: 0.9 }}
 onClick={() => toggleCompare(product)}
 className={cn("absolute top-4 left-4 p-2.5 backdrop-blur-sm rounded-full transition-all duration-500 shadow-xl z-20",
 isInCompare(product.id) ?"bg-primary text-white opacity-100" :"bg-surface/90 text-on-surface opacity-0 group-hover/item:opacity-100 hover:bg-primary hover:text-white"
 )}
 >
 <GitCompareArrows className="w-4 h-4" />
 </motion.button>

 <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover/item:opacity-100 transition-all duration-700 ease-out z-10 bg-gradient-to-t from-black/20 to-transparent">
 <motion.button 
 whileHover={isInCart ? {} : { scale: 1.04, y: -2 }}
 whileTap={isInCart ? {} : { scale: 0.96 }}
 onClick={() => !isInCart && addToCart(product)}
 disabled={isInCart}
 className={cn("w-full py-3 rounded-xl text-xs font-bold transition-all transform translate-y-4 group-hover/item:translate-y-0 duration-700 ease-out shadow-2xl flex items-center justify-center gap-2",
 isInCart 
 ?"bg-neutral-400 text-white cursor-not-allowed opacity-90" 
 :"bg-[#00619E] text-white hover:bg-[#004a7a]"
 )}
 >
 {isInCart ? 'Already In Cart' : 'Add to Bag'}
 </motion.button>
 </div>
 {product.isNew && (
 <span className="absolute top-4 left-4 bg-on-surface text-surface px-2 py-0.5 rounded-none text-[7px] font-bold uppercase z-10">New</span>
 )}
 </div>
 
 <div className="space-y-4 flex flex-col flex-grow">
 <div className="space-y-1 text-center">
 <p className="text-[10px] uppercase text-on-surface-variant font-bold underline underline-offset-8 decoration-outline-variant">{product.category}</p>
 <Link to={`/product/${product.id}`}>
 <h4 className="text-2xl font-bold text-on-surface hover:text-on-surface-variant transition-colors mt-4 line-clamp-2">{product.name}</h4>
 </Link>
 </div>
 <div className="flex flex-col items-center gap-2 mt-auto text-on-surface">
 <span className="text-lg font-light">${product.price.toFixed(2)}</span>
 <div className="flex items-center gap-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ?"fill-on-surface text-on-surface" :"text-outline-variant")} />
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 );
 })
 )}
 </div>

 {!loading && (
 <div className="mt-32 flex justify-center items-center gap-8 border-t border-outline-variant pt-12 text-on-surface">
 <button className="text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2 group">
 <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
 <span className="text-xs uppercase">Previous</span>
 </button>
 <div className="flex gap-6">
 <button className="text-xs font-bold border-b border-on-surface pb-1 text-on-surface">01</button>
 <button className="text-xs text-on-surface-variant hover:text-on-surface transition-colors">02</button>
 <button className="text-xs text-on-surface-variant hover:text-on-surface transition-colors">03</button>
 </div>
 <button className="text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2 group">
 <span className="text-xs uppercase">Next</span>
 <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
