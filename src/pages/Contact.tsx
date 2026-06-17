import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [message, setMessage] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);
 const [formError, setFormError] = useState('');

 useSEO({
  title: 'Contact Us – Get in Touch with Shopix',
  description: 'Have a question about Shopix? Contact our team in Cairo for support with products, shipping, or custom orders. We respond within 24 hours.',
  keywords: 'contact shopix, customer support, shopix email, shop inquiry',
  canonicalPath: '/contact',
 });

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!name || !email || !message) {
 setFormError('Please fill out all required fields.');
 return;
 }

 setFormError('');
 setIsSubmitting(true);

 await new Promise((resolve) => setTimeout(resolve, 1200));

 setIsSubmitting(false);
 setIsSubmitted(true);
 };

 return (
 <div className="bg-surface min-h-screen text-on-surface selection:bg-[#00619E] selection:text-white pb-32 pt-28 sm:pt-36">
 <div className="max-w-7xl mx-auto px-6 lg:px-8">
 
 
 <div className="mb-20 lg:mb-28">
 <div className="max-w-2xl">
 <h1 className="text-5xl sm:text-7xl font-light text-on-surface">
 Let’s start a <br/>
 <span className="font-semibold text-on-surface">conversation.</span>
 </h1>
 <p className="mt-8 text-base sm:text-lg text-on-surface-variant max-w-lg font-normal">
 Whether you have questions about our product Shopix, standard shipping timeframes, or custom orders, our team is here to assist.
 </p>
 </div>
 </div>

 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
 
 
 <div className="lg:col-span-5 space-y-12">
 
 
 <div className="border-t border-outline-variant pt-8">
 <h2 className="text-[11px] font-bold uppercase text-on-surface-variant opacity-85 mb-6">
 Direct Contact
 </h2>
 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="mt-1 text-on-surface-variant opacity-75">
 <Mail className="w-5 h-5 stroke-[1.5]" />
 </div>
 <div>
 <p className="text-xs text-on-surface-variant font-medium">Customer Support</p>
 <a 
 href="mailto:support@Shopix.com" 
 className="text-base font-medium text-on-surface hover:text-[#00619E] dark:hover:text-[#38bdf8] transition-colors mt-0.5 block"
 >
 support@Shopix-shop.com
 </a>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="mt-1 text-on-surface-variant opacity-75">
 <Phone className="w-5 h-5 stroke-[1.5]" />
 </div>
 <div>
 <p className="text-xs text-on-surface-variant font-medium">Telephone Inquiries</p>
 <a 
 href="tel:+20225123456" 
 className="text-base font-medium text-on-surface hover:text-[#00619E] dark:hover:text-[#38bdf8] transition-colors mt-0.5 block"
 >
 +20 (2) 2512 3456
 </a>
 </div>
 </div>
 </div>
 </div>

 
 <div className="border-t border-outline-variant pt-8">
 <h2 className="text-[11px] font-bold uppercase text-on-surface-variant opacity-85 mb-6">
 Studio Location
 </h2>
 <div className="flex items-start gap-4">
 <div className="mt-1 text-on-surface-variant opacity-75">
 <MapPin className="w-5 h-5 stroke-[1.5]" />
 </div>
 <div>
 <p className="text-on-surface font-semibold text-base">Cairo</p>
 <p className="text-sm text-on-surface-variant mt-1 font-normal">
 Egypt
 </p>
 </div>
 </div>
 </div>

 
 <div className="border-t border-outline-variant pt-8">
 <h2 className="text-[11px] font-bold uppercase text-on-surface-variant opacity-85 mb-6">
 Studio Hours
 </h2>
 <div className="flex items-start gap-4">
 <div className="mt-1 text-on-surface-variant opacity-75">
 <Clock className="w-5 h-5 stroke-[1.5]" />
 </div>
 <div className="text-sm text-on-surface-variant space-y-2 w-full max-w-xs">
 <div className="flex justify-between">
 <span className="font-semibold text-on-surface">Sunday — Thursday</span>
 <span>09:00 - 18:00</span>
 </div>
 <div className="flex justify-between">
 <span className="font-semibold text-on-surface">Saturday</span>
 <span>10:00 - 16:00</span>
 </div>
 <div className="flex justify-between text-on-surface-variant opacity-60">
 <span className="font-medium">Friday</span>
 <span>Closed</span>
 </div>
 </div>
 </div>
 </div>

 </div>

 
 <div className="lg:col-span-7 bg-surface-container rounded-none border-t-2 border-primary p-8 sm:p-12 shadow-sm">
 
 <AnimatePresence mode="wait">
 {!isSubmitted ? (
 <motion.div
 key="form-view"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 >
 <h3 className="text-xl font-semibold text-on-surface mb-2">Send us a message</h3>
 <p className="text-sm text-on-surface-variant mb-10">
 We will review your inquiry and get back to you personally within 24 hours.
 </p>

 <form onSubmit={handleSubmit} className="space-y-8">
 
 
 <div className="space-y-1 group">
 <label htmlFor="form-name" className="text-[10px] font-bold uppercase text-on-surface-variant/70 group-focus-within:text-primary transition-colors block">
 Full Name
 </label>
 <input 
 type="text" 
 id="form-name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Ahmed Elsayed"
 required
 className="w-full bg-transparent border-b border-outline-variant rounded-none py-3 text-sm focus:border-outline outline-none transition-colors text-on-surface font-medium placeholder-on-surface-variant/40"
 />
 </div>

 
 <div className="space-y-1 group">
 <label htmlFor="form-email" className="text-[10px] font-bold uppercase text-[#a3a3a3] group-focus-within:text-primary transition-colors block">
 Email Address
 </label>
 <input 
 type="email" 
 id="form-email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="liam@example.com"
 required
 className="w-full bg-transparent border-b border-outline-variant rounded-none py-3 text-sm focus:border-outline outline-none transition-colors text-on-surface font-medium placeholder-on-surface-variant/40"
 />
 </div>

 
 <div className="space-y-1 group">
 <label htmlFor="form-message" className="text-[10px] font-bold uppercase text-on-surface-variant/70 group-focus-within:text-primary transition-colors block">
 Message
 </label>
 <textarea 
 id="form-message"
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 placeholder="Tell us what you're looking for or any questions you have..."
 required
 rows={4}
 className="w-full bg-transparent border-b border-outline-variant rounded-none py-3 text-sm focus:border-outline outline-none transition-colors text-on-surface font-medium resize-none placeholder-on-surface-variant/40"
 />
 </div>

 {formError && (
 <div className="text-xs font-semibold text-error bg-error-container border-l-2 border-red-600 rounded-none p-3">
 {formError}
 </div>
 )}

 <button 
 type="submit"
 disabled={isSubmitting}
 className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#00619E] text-on-primary py-4 px-6 rounded-none text-xs font-bold uppercase transition-colors duration-300 disabled:opacity-50"
 >
 {isSubmitting ? (
 <>
 <div className="animate-spin rounded-full h-3 w-3 border-2 border-on-primary border-t-transparent" />
 <span>Sending...</span>
 </>
 ) : (
 <>
 <span>Submit Message</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </>
 )}
 </button>

 </form>
 </motion.div>
 ) : (
 <motion.div
 key="success-view"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.3 }}
 className="py-12 text-center"
 >
 <div className="w-12 h-12 bg-surface-container-high rounded-none border border-outline-variant flex items-center justify-center text-[#22C55E] mx-auto mb-6">
 <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
 </div>
 <h3 className="text-xl font-bold text-on-surface">Message sent successfully</h3>
 <p className="mt-3 text-sm text-on-surface-variant max-w-sm mx-auto">
 Thank you for reaching out, <span className="font-semibold text-on-surface">{name}</span>. We've received your request and will reply shortly to <span className="font-medium text-on-surface">{email}</span>.
 </p>
 <button 
 onClick={() => {
 setIsSubmitted(false);
 setName('');
 setEmail('');
 setMessage('');
 }}
 className="mt-8 text-xs font-bold uppercase text-primary hover:opacity-80 transition-opacity"
 >
 Send another message
 </button>
 </motion.div>
 )}
 </AnimatePresence>

 </div>

 </div>

 </div>
 </div>
 );
}
