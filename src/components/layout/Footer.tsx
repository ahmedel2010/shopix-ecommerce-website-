import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
 return (
 <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
 <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-6">
 <div className="space-y-6">
 <Link to="/" className="text-3xl font-bold text-on-surface">Shopix</Link>
 <p className="text-on-surface-variant text-base">
 Elevating your collection through curated design and premium technical craftsmanship.
 </p>
 <div className="flex gap-4">
 <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-110" aria-label="Facebook">
 <Facebook className="w-5 h-5" />
 </button>
 <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-110" aria-label="Instagram">
 <Instagram className="w-5 h-5" />
 </button>
 </div>
 </div>

 <div className="space-y-6">
 <h4 className="font-bold text-on-surface uppercase text-sm">Company</h4>
 <nav className="flex flex-col gap-3">
 <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link>
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Careers</Link>
 <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors">Contact</Link>
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
 </nav>
 </div>

 <div className="space-y-6">
 <h4 className="font-bold text-on-surface uppercase text-sm">Support</h4>
 <nav className="flex flex-col gap-3">
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Shipping Policy</Link>
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Returns</Link>
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
 <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">FAQ</Link>
 </nav>
 </div>

 <div className="space-y-6">
 <h4 className="font-bold text-on-surface uppercase text-sm">Newsletter</h4>
 <p className="text-on-surface-variant text-sm pr-4">Stay updated with our latest releases and exclusive offers.</p>
 <div className="flex gap-2">
 <input
 type="email"
 placeholder="Email address"
 className="flex-grow h-12 bg-surface-container-low border border-outline-variant/30 focus:border-primary text-on-surface placeholder:text-on-surface-variant/50 rounded-lg px-4 text-sm outline-none transition-colors"
 />
 <button className="h-12 px-6 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all">Join</button>
 </div>
 </div>
 </div>
 <div className="border-t border-outline-variant/10 py-8 text-center text-sm text-on-surface-variant uppercase text-[10px] font-bold">
 <p>© 2026 Shopix. All Rights Reserved.</p>
 </div>
 </footer>
 );
}
