import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Package, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';

export default function Account() {
  const { user, logout, updateProfile } = useAuth();
  const { totalFavorites } = useFavorites();
  const { totalItems } = useCart();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');

  useSEO({
    title: 'My Account',
    description: 'Manage your Shopix account.',
    noIndex: true,
  });

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName });
  };

  return (
    <div className="pt-28 pb-32 px-6 sm:px-10 min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold text-on-surface-variant">Account</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-on-surface">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-on-surface-variant">{user.email} · Member since {memberSince}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface border-b border-outline-variant pb-1 self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Cart items', value: totalItems, icon: ShoppingBag, to: '/cart' },
            { label: 'Saved', value: totalFavorites, icon: Heart, to: '/favorites' },
            { label: 'Orders', value: 0, icon: Package, to: null },
          ].map(({ label, value, icon: Icon, to }) => (
            <div key={label} className="border border-outline-variant p-5 space-y-3">
              <Icon className="w-4 h-4 text-on-surface-variant" />
              <p className="text-2xl font-bold text-on-surface">{value}</p>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant">{label}</p>
              {to && (
                <Link to={to} className="text-[10px] font-bold uppercase text-on-surface hover:underline">
                  View
                </Link>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSave} className="border border-outline-variant p-6 sm:p-8 space-y-8">
          <h2 className="text-xs font-bold uppercase text-on-surface border-b border-outline-variant pb-4">
            Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2 border-b border-outline-variant pb-2">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-base text-on-surface p-0"
              />
            </div>
            <div className="space-y-2 border-b border-outline-variant pb-2">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-base text-on-surface p-0"
              />
            </div>
            <div className="sm:col-span-2 space-y-2 border-b border-outline-variant pb-2">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-transparent border-none outline-none text-base text-on-surface-variant p-0 cursor-not-allowed"
              />
            </div>
          </div>

          <button type="submit" className="luxury-button !px-8">
            Save changes
          </button>
        </form>

        <div className="border border-outline-variant p-8 text-center space-y-3">
          <Package className="w-6 h-6 text-on-surface-variant mx-auto opacity-40" />
          <p className="text-sm font-medium text-on-surface">No orders yet</p>
          <p className="text-xs text-on-surface-variant">Your purchase history will appear here.</p>
          <Link to="/shop" className="inline-block text-[10px] font-bold uppercase border-b border-on-surface pb-1 mt-2">
            Start shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
