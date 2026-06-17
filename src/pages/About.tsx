import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Box, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const About = () => {
  useSEO({
    title: 'About Shopix – Our Story & Philosophy',
    description: 'Learn about Shopix – a curated marketplace that bridges era and utility. We partner with artisans who prioritize longevity and substance over surface trends.',
    keywords: 'about shopix, our story, brand philosophy, artisan quality, curated lifestyle brand',
    canonicalPath: '/about',
  });

 const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.2,
 delayChildren: 0.3,
 },
 },
 };

 const itemVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
 },
 };

 return (
 <div className="bg-surface transition-colors duration-500">
 <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
 <motion.div 
 initial={{ scale: 1.1, opacity: 0 }}
 animate={{ scale: 1, opacity: 0.5 }}
 transition={{ duration: 2, ease:"easeOut" }}
 className="absolute inset-0 z-0"
 >
 <img 
 src="/images/img_21.jpg" 
 alt="Workspace" 
 className="w-full h-full object-cover grayscale"
 referrerPolicy="no-referrer"
 />
 </motion.div>
 
 <div className="relative z-10 max-w-5xl text-center">
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="text-[10px] uppercase font-bold text-on-surface-variant mb-6"
 >
 ESTABLISHED IN 2024
 </motion.p>
 <motion.h1 
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="text-6xl md:text-8xl lg:text-9xl font-medium text-on-surface mb-8"
 >
 Elevating <br />
 <span className="">Modern Living</span>
 </motion.h1>
 <motion.div 
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 1.5, delay: 0.5, ease:"circInOut" }}
 className="h-[1px] w-32 bg-on-surface mx-auto mb-12"
 />
 </div>
 </section>

 <section className="py-32 px-6">
 <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
 <motion.div 
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 >
 <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-medium text-on-surface mb-12">
 We curate objects <br /> 
 that bridge the gap <br /> 
 between era & utility.
 </motion.h2>
 <motion.div variants={itemVariants} className="space-y-8 text-on-surface-variant text-lg font-light max-w-xl">
 <p>
 Shopix started with a singular observation: the modern world moves too fast to appreciate the details. We set out to find, curate, and preserve pieces that stand outside the relentless cycle of trends.
 </p>
 <p>
 Our collection isn't just about products; it's about the stories behind them. We partner with artisans and creators who prioritize longevity over ubiquity, and substance over surface.
 </p>
 </motion.div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, x: 50 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 1, delay: 0.5 }}
 viewport={{ once: true }}
 className="relative aspect-[3/4] overflow-hidden rounded-3xl"
 >
 <img 
 src="/images/img_22.jpg" 
 alt="Detail" 
 className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-[2s]"
 referrerPolicy="no-referrer"
 />
 </motion.div>
 </div>
 </section>

 <section className="py-32 bg-surface-container-low transition-colors duration-500">
 <div className="max-w-7xl mx-auto px-6">
 <div className="text-center mb-24">
 <h3 className="text-[10px] uppercase font-bold text-on-surface-variant mb-4">Our Principles</h3>
 <h2 className="text-4xl font-medium text-on-surface">Built for Longevity</h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
 {[
 { icon: ShieldCheck, title:"Authentic Sourcing", desc:"Every piece in our collection is vetted for heritage and manufacturing transparency." },
 { icon: Globe, title:"Global Perspective", desc:"Searching the furthest corners of design to bring unparalleled quality to your doorstep." },
 { icon: Zap, title:"Modern Utility", desc:"We believe that beauty without function is merely decoration. Our curation serves a purpose." },
 { icon: Box, title:"Conscious Delivery", desc:"Our logistics are designed to minimize footprint while ensuring your pieces arrive pristine." }
 ].map((value, i) => (
 <motion.div 
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 viewport={{ once: true }}
 className="group p-8 rounded-3xl border border-outline/5 bg-surface hover:bg-surface-container transition-all hover:-translate-y-2 duration-500"
 >
 <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
 <value.icon className="w-5 h-5 text-on-surface" />
 </div>
 <h4 className="text-lg font-medium text-on-surface mb-3">{value.title}</h4>
 <p className="text-sm text-on-surface-variant">
 {value.desc}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <motion.section 
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 transition={{ duration: 1 }}
 viewport={{ once: true }}
 className="py-48 px-6 text-center"
 >
 <div className="max-w-3xl mx-auto">
 <h2 className="text-5xl md:text-7xl font-medium text-on-surface mb-12"> Join the collection.</h2>
 <div className="flex flex-col md:flex-row items-center justify-center gap-8">
 <Link to="/shop" className="px-10 py-5 bg-on-surface text-surface rounded-full font-bold uppercase text-[10px] hover:scale-105 transition-transform flex items-center justify-center">
 Browse Collection
 </Link>
 <Link to="/contact" className="flex items-center gap-3 text-on-surface group">
 <span className="font-bold uppercase text-[10px]">Contact Us</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
 </Link>
 </div>
 </div>
 </motion.section>
 </div>
 );
};

export default About;
