import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-surface flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/img_28.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <Link to="/" className="text-3xl font-bold">
            Shopix
          </Link>
          <div className="space-y-4 max-w-md">
            <p className="text-[10px] uppercase font-bold text-white/70">Your account</p>
            <p className="text-2xl font-light leading-relaxed">
              Favorites, orders, and checkout details in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-3">
            <Link to="/" className="lg:hidden text-2xl font-bold text-on-surface">
              Shopix
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-on-surface">{title}</h1>
            <p className="text-sm text-on-surface-variant">{subtitle}</p>
          </div>

          {children}

          <div className="pt-4 border-t border-outline-variant text-sm text-on-surface-variant">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
