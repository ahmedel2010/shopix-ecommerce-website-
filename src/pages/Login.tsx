import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import { useSEO } from '../hooks/useSEO';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useSEO({
    title: 'Sign In',
    description: 'Sign in to your Shopix account.',
    noIndex: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="View orders and saved items."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-on-surface hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 border-b border-outline-variant pb-2">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-none outline-none text-base text-on-surface p-0"
            />
          </div>

          <div className="space-y-2 border-b border-outline-variant pb-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="text-[10px] uppercase font-bold text-on-surface-variant hover:text-on-surface"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-none outline-none text-base text-on-surface p-0"
            />
          </div>
        </div>

        <button type="submit" className="luxury-button w-full !py-4">
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}
