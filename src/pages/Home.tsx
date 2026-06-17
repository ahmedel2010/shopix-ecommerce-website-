import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Heart, ChevronLeft, ChevronRight, ArrowUp, GitCompareArrows } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../hooks/useProductQueries';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import { cn } from '../lib/utils';
import { useSEO, ORGANIZATION_STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA } from '../hooks/useSEO';
import AnnouncementBar from '../components/ui/AnnouncementBar';

export default function Home() {
    const { data: allProducts = [], isLoading: loading } = useProducts();
    const bestSellers = useMemo(() => allProducts.slice(4, 12), [allProducts]);
    const categories = useMemo(() => [
        { name: 'Classic Wear', label: 'Classic Wear', slug: 'classic-wear', image: '/images/img_23.jpg' },
        { name: 'Electronics', label: 'Electronics Gallery', slug: 'mobile-accessories', image: '/images/img_24.jpg' },
        { name: "Men's Clothing", label: "Men's Wear", slug: 'mens-shirts', image: '/images/img_25.jpg' },
        { name: 'Home Decoration', label: 'Curated Living', slug: 'home-decoration', image: '/images/img_27.jpg' },
    ], []);
    const { addToCart, cart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { toggleCompare, isInCompare } = useComparison();
    const navigate = useNavigate();

    useSEO({
        description: 'Shop Shopix for premium fashion, electronics, and home décor. Curated collections of artisanal quality and modern sophistication. Free shipping on orders over $150.',
        keywords: 'premium fashion, curated collection, luxury lifestyle, best sellers, home decoration, electronics, shopix',
        canonicalPath: '/',
        ogType: 'website',
        structuredData: [ORGANIZATION_STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA],
    });

    const [sliderIndex, setSliderIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const itemsPerPage = { mobile: 1, tablet: 2, desktop: 4 };

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getItemsVisible = () => {
        if (windowWidth < 640) return itemsPerPage.mobile;
        if (windowWidth < 1024) return itemsPerPage.tablet;
        return itemsPerPage.desktop;
    };

    const nextSlide = () => {
        if (bestSellers.length === 0) return;
        setIsTransitioning(true);
        setSliderIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (bestSellers.length === 0) return;
        setIsTransitioning(true);
        setSliderIndex(prev => prev - 1);
    };


    useEffect(() => {
        if (bestSellers.length === 0) return;

        if (sliderIndex >= bestSellers.length) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setSliderIndex(0);
            }, 700);
            return () => clearTimeout(timer);
        }

        if (sliderIndex < 0) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setSliderIndex(bestSellers.length - 1);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [sliderIndex, bestSellers.length]);

    useEffect(() => {
        if (bestSellers.length === 0) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(timer);
    }, [sliderIndex, bestSellers.length]);

    return (
        <div className="flex flex-col w-full bg-surface transition-colors duration-300">
            <AnnouncementBar />
            <section className="relative h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden bg-surface text-center">
                <div className="absolute inset-0 z-0 bg-neutral-900">
                    <img
                        src="/images/img_28.jpg"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80"
                        alt="Classic Premium Fashion Identity"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <span className="text-[10px] md:text-xs uppercase text-white/80 font-bold block">
                            ESTABLISHED EXCELLENCE
                        </span>
                        <h1 className="text-7xl md:text-9xl text-white font-bold">
                            Curated <br />
                            <span className="not-font-bold text-[#00619E]">Taste.</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-xs md:text-sm uppercase text-white/60 max-w-lg mx-auto border-t border-white/20 pt-8"
                        >
                            Discover our curated collections of exceptional essentials, where artisanal quality, exquisite design, and modern sophistication meet.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="pt-8"
                        >
                            <Link
                                to="/shop"
                                className="inline-block px-8 py-4 rounded-none font-bold uppercase text-xs bg-[#000000] text-white border-none hover:bg-[#000000] hover:text-white transition-all duration-500 ease-out hover:scale-110 origin-center"
                            >
                                Shop The Collection
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 w-full flex flex-col items-center gap-4">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                    <span className="text-[10px] uppercase font-bold text-white/50">Scroll</span>
                </div>
            </section>

            <AnnouncementBar />

            <section className="py-40 bg-surface transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-6xl text-on-surface font-bold text-center">Categories</h2>
                        <p className="text-xs uppercase text-on-surface-variant">Explore our curated collections by category.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant border border-outline-variant">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.name}
                                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.slug)}`)}
                                className="group relative h-[600px] overflow-hidden bg-surface cursor-pointer"
                            >
                                <img
                                    src={cat.image}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 dark:opacity-80"
                                    alt={cat.name}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex flex-col justify-center items-center text-center p-12">
                                    <span className="text-[10px] text-white uppercase mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Discover</span>
                                    <h3 className="text-white text-5xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">{cat.label}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 bg-surface transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-5xl text-on-surface font-semibold">Our Best Sellers</h2>
                            <p className="text-lg text-on-surface-variant max-w-xl mx-auto md:mx-0">
                                Best selling products
                            </p>
                        </div>
                        <Link to="/shop" className="group flex items-center gap-2 text-xs font-bold uppercase text-[#00619E] hover:text-[#004a7a] transition-all">
                            View All Products
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <div className="relative group/slider">
                        {!loading && bestSellers.length > 0 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-100"
                                    aria-label="Previous products"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-100"
                                    aria-label="Next products"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        <div className="overflow-hidden px-1">
                            <motion.div
                                className="flex gap-10"
                                animate={{ x: `calc(-${sliderIndex * (100 / getItemsVisible())}% - ${sliderIndex * (40 / getItemsVisible())}px)` }}
                                transition={isTransitioning ? { type: "spring", stiffness: 300, damping: 30 } : { duration: 0 }}
                            >
                                {loading ? (
                                    [...Array(4)].map((_, i) => (
                                        <div key={i} className="min-w-[calc(100%/1-0px)] sm:min-w-[calc(50%-20px)] lg:min-w-[calc(25%-30px)] animate-pulse space-y-4">
                                            <div className="aspect-[3/4] bg-surface-container-high rounded-2xl"></div>
                                            <div className="h-6 bg-surface-container-high w-2/3"></div>
                                        </div>
                                    ))
                                ) : (
                                    [...bestSellers, ...bestSellers.slice(0, getItemsVisible())].map((product, idx) => {
                                        const isInCart = cart.some(item => item.id === product.id);
                                        return (
                                            <motion.div
                                                key={`${product.id}-${idx}`}
                                                className="min-w-[calc(100%/1-0px)] sm:min-w-[calc(50%-20px)] lg:min-w-[calc(25%-30px)] group flex flex-col"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                whileHover={{ y: -6 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                            >
                                                <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-low mb-6 group/item transition-all duration-500 border border-outline/5 hover:border-[#00619E]/20 hover:shadow-2xl hover:shadow-[#00619E]/10">
                                                    {isInCart && (
                                                        <motion.div
                                                            initial={{ y: -30, opacity: 0, x: "-50%" }}
                                                            animate={{ y: 0, opacity: 1, x: "-50%" }}
                                                            transition={{ type: "spring", stiffness: 120, damping: 14 }}
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
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594932224010-75f4d8624415?auto=format&fit=crop&w=800&q=80';
                                                        }}
                                                    />

                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => toggleFavorite(product)}
                                                        className={cn("absolute top-5 right-5 p-3 backdrop-blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover/item:translate-y-0 shadow-xl z-20",
                                                            isFavorite(product.id) ? "bg-[#00619E] text-white opacity-100 translate-y-0" : "bg-surface/90 text-on-surface hover:bg-[#00619E] hover:text-white"
                                                        )}
                                                    >
                                                        <Heart className={cn("w-5 h-5", isFavorite(product.id) && "fill-current")} />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => toggleCompare(product)}
                                                        className={cn("absolute top-5 left-5 p-3 backdrop-blur-sm rounded-full transition-all duration-500 shadow-xl z-20",
                                                            isInCompare(product.id) ? "bg-primary text-white opacity-100" : "bg-surface/90 text-on-surface opacity-0 group-hover/item:opacity-100 hover:bg-primary hover:text-white"
                                                        )}
                                                    >
                                                        <GitCompareArrows className="w-5 h-5" />
                                                    </motion.button>

                                                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover/item:opacity-100 transition-all duration-700 ease-out z-10 bg-gradient-to-t from-black/20 to-transparent">
                                                        <motion.button
                                                            whileHover={isInCart ? {} : { scale: 1.04, y: -2 }}
                                                            whileTap={isInCart ? {} : { scale: 0.96 }}
                                                            onClick={() => !isInCart && addToCart(product)}
                                                            disabled={isInCart}
                                                            className={cn("w-full py-4 rounded-xl text-sm font-bold transition-all transform translate-y-4 group-hover/item:translate-y-0 duration-700 ease-out shadow-2xl flex items-center justify-center gap-2",
                                                                isInCart
                                                                    ? "bg-neutral-400 text-white cursor-not-allowed opacity-90"
                                                                    : "bg-[#00619E] text-white hover:bg-[#004a7a]"
                                                            )}
                                                        >
                                                            {isInCart ? 'In Your Cart' : 'Add to Cart'}
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 px-1">
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
                                                                <Star key={i} className={cn("w-3.5 h-3.5", i <= Math.floor(product.rating) ? "fill-on-surface-variant text-on-surface-variant" : "text-neutral-300")} />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm font-medium text-neutral-400">({product.reviews})</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </motion.div>
                        </div>

                        <div className="flex justify-center mt-12 gap-2 md:hidden">
                            {bestSellers.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={cn("h-1 transition-all duration-300 rounded-full",
                                        sliderIndex === idx ? "w-8 bg-[#00619E]" : "w-2 bg-neutral-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-20 sm:py-28 lg:py-40 bg-surface transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-6 sm:px-10 md:border-l md:border-on-surface md:pl-12 lg:pl-20 space-y-8 sm:space-y-10 lg:space-y-12 text-center md:text-left">
                    <span className="text-[10px] uppercase text-on-surface-variant font-bold">The Philosophy</span>
                    <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-on-surface leading-[1.05]">
                        Design is the silent ambassador of your brand.
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-xl text-on-surface-variant max-w-2xl font-light mx-auto md:mx-0">
                        We believe that products should be as honest as they are beautiful. Our commitment to high-end craftsmanship ensures that every piece tells a story of precision, purpose, and lasting value.
                    </p>
                    <div className="pt-4 sm:pt-6 lg:pt-10">
                        <Link to="/about" className="text-xs font-bold uppercase border-b border-on-surface pb-2 text-on-surface">
                            Learn Our Story
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 px-10">
                <div className="max-w-7xl mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-neutral-950/5 rounded-[3rem] blur-3xl -z-10"></div>
                    <div className="relative bg-white rounded-[3rem] border border-outline/10 p-12 md:p-24 text-center space-y-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-medium text-neutral-900">Stay in the Loop</h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                enter email to receive updates on new arrivals, exclusive offers, and design inspiration directly in your inbox.


                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-8 py-5 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-black transition-all outline-none"
                            />
                            <button className="w-full sm:w-auto whitespace-nowrap bg-black text-white py-5 px-12 rounded-2xl text-base font-bold hover:bg-neutral-800 transition-all transform hover:scale-[1.02] shadow-xl">
                                Subscribe
                            </button>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}
