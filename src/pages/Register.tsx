import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import { useSEO } from '../hooks/useSEO';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useSEO({
    title: 'Create Account',
    description: 'Create your Shopix account.',
    noIndex: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = register({ firstName, lastName, email, password });
    if (result.success) {
      navigate('/account', { replace: true });
    } else {
      setError(result.error ?? 'Could not create account');
    }
  };

  const fieldClass =
    'w-full bg-transparent border-none outline-none text-base text-on-surface p-0';

  return (
    <AuthLayout
      title="Create account"
      subtitle="Create an account to save items and manage orders."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-on-surface hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 border-b border-outline-variant pb-2">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 border-b border-outline-variant pb-2">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                autoComplete="family-name"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-2 border-b border-outline-variant pb-2">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2 border-b border-outline-variant pb-2">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2 border-b border-outline-variant pb-2">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className={fieldClass}
            />
          </div>
        </div>

        {error && <p className="text-[11px] text-error">{error}</p>}

        <button type="submit" className="luxury-button w-full !py-4">
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}
