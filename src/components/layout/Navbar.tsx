import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, ShoppingCart, Menu, Sun, Moon, Search as SearchIcon, ArrowRight, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types';
import { fetchProducts } from '../../lib/api';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
 const [searchQuery, setSearchQuery] = useState('');
 const [results, setResults] = useState<Product[]>([]);
 const [allProducts, setAllProducts] = useState<Product[]>([]);
 const [isSearchActive, setIsSearchActive] = useState(false);
 const [loading, setLoading] = useState(false);
 const [activeIndex, setActiveIndex] = useState(-1);
 
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
 const searchContainerRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);
 
 const location = useLocation();
 const navigate = useNavigate();
 const { totalItems } = useCart();
 const { totalFavorites } = useFavorites();
 const { theme, toggleTheme } = useTheme();

 useEffect(() => {
 async function loadProducts() {
 const products = await fetchProducts();
 setAllProducts(products);
 }
 loadProducts();
 }, []);

 useEffect(() => {
 function handleClickOutside(event: MouseEvent) {
 const target = event.target as Element;
 if (
 searchContainerRef.current && 
 !searchContainerRef.current.contains(target) &&
 !target.closest('#mobile-search-btn')
 ) {
 setIsSearchActive(false);
 }
 }
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 useEffect(() => {
 if (searchQuery.trim() === '') {
 setResults([]);
 setActiveIndex(-1);
 return;
 }

 setLoading(true);
 const filtered = allProducts.filter(p => 
 p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 p.category.toLowerCase().includes(searchQuery.toLowerCase())
 ).slice(0, 6);
 
 setResults(filtered);
 setActiveIndex(filtered.length > 0 ? 0 : -1);
 setLoading(false);
 }, [searchQuery, allProducts]);

 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 e.preventDefault();
 inputRef.current?.focus();
 setIsSearchActive(true);
 setIsMobileMenuOpen(false);
 }
 if (e.key === 'Escape') {
 setIsSearchActive(false);
 inputRef.current?.blur();
 }
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, []);

 const handleKeyDown = (e: React.KeyboardEvent) => {
 if (e.key === 'ArrowDown') {
 e.preventDefault();
 setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
 } else if (e.key === 'ArrowUp') {
 e.preventDefault();
 setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
 } else if (e.key === 'Enter') {
 if (activeIndex >= 0 && results[activeIndex]) {
 navigate(`/product/${results[activeIndex].id}`);
 setIsSearchActive(false);
 setSearchQuery('');
 } else if (searchQuery.trim()) {
 navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
 setIsSearchActive(false);
 setSearchQuery('');
 }
 }
 };

 const navLinks = [
 { name: 'Home', path: '/' },
 { name: 'Shop', path: '/shop' },
 { name: 'About', path: '/about' },
 { name: 'Contact', path: '/contact' },
 ];

 return (
 <>
 <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant h-24 flex items-center transition-colors duration-300 relative">
 <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center w-full">
 <div className="flex items-center gap-16">
 <Link to="/" className="text-4xl font-bold text-on-surface">Shopix</Link>
 <nav className="hidden md:flex gap-10 items-center">
 {navLinks.map((link) => (
 <Link
 key={link.name}
 to={link.path}
 className={cn("text-[10px] uppercase font-bold transition-all hover:text-on-surface",
 location.pathname === link.path ?"text-on-surface border-b border-on-surface pb-1" :"text-on-surface-variant"
 )}
 >
 {link.name}
 </Link>
 ))}
 </nav>
 </div>

 <div className="flex items-center gap-8">
 <div 
 className={cn("lg:block lg:relative",
 isSearchActive ?"absolute top-full left-0 w-full bg-surface px-4 py-4 border-b border-outline-variant shadow-lg z-50 lg:top-auto lg:left-auto lg:w-auto lg:bg-transparent lg:p-0 lg:border-none lg:shadow-none lg:z-auto" :"hidden"
 )} 
 ref={searchContainerRef}
 >
 <div className={cn("flex items-center border-b py-2 lg:py-1 transition-all group",
 isSearchActive ?"border-on-surface w-full lg:w-64" :"border-outline-variant w-full lg:w-40 hover:border-on-surface"
 )}>
 <SearchIcon className={cn("w-4 h-4 transition-colors",
 isSearchActive ?"text-on-surface" :"text-on-surface-variant group-hover:text-on-surface"
 )} />
 <input
 ref={inputRef}
 type="text"
 value={searchQuery}
 onChange={(e) => {
 setSearchQuery(e.target.value);
 setIsSearchActive(true);
 }}
 onFocus={() => setIsSearchActive(true)}
 onKeyDown={handleKeyDown}
 placeholder="Search Product"
 className="bg-transparent border-none outline-none focus:ring-0 text-[10px] uppercase ml-3 placeholder:text-on-surface-variant/30 text-on-surface w-full p-0 h-auto font-bold"
 />
 {!isSearchActive && (
 <span className="hidden lg:inline text-[9px] text-on-surface-variant/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity">⌘K</span>
 )}
 {isSearchActive && searchQuery && (
 <button onClick={() => setSearchQuery('')} className="text-on-surface-variant hover:text-on-surface transition-colors">
 <X className="w-3 h-3" />
 </button>
 )}
 </div>

 <AnimatePresence>
 {isSearchActive && (searchQuery || results.length > 0) && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 10 }}
 className="absolute top-full left-4 right-4 lg:left-0 lg:right-auto mt-2 lg:mt-4 bg-surface-container border border-outline/10 rounded-2xl shadow-2xl overflow-hidden z-[100] lg:w-80"
 >
 <div className="p-2 space-y-1">
 {loading ? (
 <div className="p-4 space-y-3">
 {[1, 2, 3].map(i => (
 <div key={i} className="flex gap-4 items-center animate-pulse">
 <div className="w-10 h-10 bg-surface-container-high rounded-lg"></div>
 <div className="flex-grow space-y-2">
 <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
 <div className="h-2 bg-surface-container-high rounded w-1/4"></div>
 </div>
 </div>
 ))}
 </div>
 ) : results.length > 0 ? (
 <>
 <div className="px-3 py-2">
 <span className="text-[8px] uppercase font-bold text-on-surface-variant/60">Search Results</span>
 </div>
 {results.map((product, index) => (
 <Link
 key={product.id}
 to={`/product/${product.id}`}
 onClick={() => {
 setIsSearchActive(false);
 setSearchQuery('');
 }}
 onMouseEnter={() => setActiveIndex(index)}
 className={cn("flex items-center gap-3 p-2 rounded-xl transition-all group",
 activeIndex === index ?"bg-[#00619E] text-white" :"hover:bg-surface-container-high text-on-surface"
 )}
 >
 <div className="w-10 h-10 bg-white/5 p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center">
 <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
 </div>
 <div className="flex-grow min-w-0">
 <h4 className="text-xs font-medium truncate">{product.name}</h4>
 <p className={cn("text-[9px] uppercase",
 activeIndex === index ?"text-white/60" :"text-on-surface-variant"
 )}>{product.category}</p>
 </div>
 <ArrowRight className={cn("w-3 h-3 transition-all",
 activeIndex === index ?"translate-x-0 opacity-100" :"-translate-x-2 opacity-0"
 )} />
 </Link>
 ))}
 <Link 
 to={`/shop?search=${encodeURIComponent(searchQuery)}`}
 onClick={() => setIsSearchActive(false)}
 className="block w-full text-center py-3 text-[9px] uppercase font-bold text-[#00619E] hover:bg-surface-container-high border-t border-outline/5 mt-1"
 >
 View All Search Results
 </Link>
 </>
 ) : searchQuery && (
 <div className="p-8 text-center">
 <p className="text-xs text-on-surface-variant">No pieces found</p>
 </div>
 )}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 <div className="flex items-center gap-6 text-on-surface-variant">
 <button 
 id="mobile-search-btn"
 onClick={() => {
 setIsSearchActive(!isSearchActive);
 if (!isSearchActive) setIsMobileMenuOpen(false);
 setTimeout(() => inputRef.current?.focus(), 100);
 }}
 className="lg:hidden hover:text-on-surface transition-colors"
 >
 {isSearchActive ? <X className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
 </button>
 <button 
 onClick={toggleTheme}
 className="hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container"
 >
 {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
 </button>
 <Link to="/favorites" className="relative hover:text-on-surface transition-colors group hidden sm:block">
 <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
 {totalFavorites > 0 && (
 <span className="absolute -top-2 -right-2 bg-on-surface text-surface text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
 {totalFavorites}
 </span>
 )}
 </Link>
 <Link to="/cart" className="relative text-on-surface group">
 <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
 {totalItems > 0 && (
 <span className="absolute -top-2 -right-2 bg-on-surface text-surface text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
 {totalItems}
 </span>
 )}
 </Link>
 <button 
 onClick={() => {
 setIsMobileMenuOpen(!isMobileMenuOpen);
 if (!isMobileMenuOpen) setIsSearchActive(false);
 }}
 className="md:hidden text-on-surface transition-colors"
 >
 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>
 </div>
 </div>

 <AnimatePresence>
 {isMobileMenuOpen && (
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="absolute top-full left-0 right-0 md:hidden bg-surface border-b border-outline-variant shadow-lg z-40 flex flex-col px-6 py-6 gap-6"
 >
 {navLinks.map((link) => (
 <Link
 key={link.name}
 to={link.path}
 onClick={() => setIsMobileMenuOpen(false)}
 className={cn("text-sm uppercase font-bold transition-all",
 location.pathname === link.path ?"text-on-surface" :"text-on-surface-variant hover:text-on-surface"
 )}
 >
 {link.name}
 </Link>
 ))}
 <Link
 to="/favorites"
 onClick={() => setIsMobileMenuOpen(false)}
 className="text-sm uppercase font-bold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-2"
 >
 Favorites {totalFavorites > 0 && `(${totalFavorites})`}
 </Link>
 </motion.div>
 )}
 </AnimatePresence>
 </header>
 </>
 );
}
