import { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCoupon } from '../../context/CouponContext';

interface PromoCodeInputProps {
  className?: string;
}

export default function PromoCodeInput({ className }: PromoCodeInputProps) {
  const { appliedCoupon, applyCoupon, removeCoupon, couponError, clearCouponError } = useCoupon();
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (applyCoupon(code)) {
      setCode('');
    }
  };

  if (appliedCoupon) {
    return (
      <div className={cn('space-y-2', className)}>
        <label className="block text-[10px] uppercase font-bold text-on-surface-variant">
          Promo Code
        </label>
        <div className="flex items-center justify-between gap-3 border border-primary/30 bg-primary/5 px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <Tag className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-bold text-on-surface">{appliedCoupon.code}</span>
              <p className="text-[10px] text-on-surface-variant truncate">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="p-1 text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
            aria-label="Remove promo code"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-[10px] uppercase font-bold text-on-surface-variant">
        Promo Code
      </label>
      <div className="flex">
        <input
          type="text"
          value={code}
          onChange={e => {
            setCode(e.target.value.toUpperCase());
            if (couponError) clearCouponError();
          }}
          onKeyDown={e => e.key === 'Enter' && handleApply()}
          placeholder="Enter code"
          className={cn(
            'flex-grow border-b bg-transparent py-2.5 focus:border-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 text-on-surface text-xs font-medium uppercase tracking-wide',
            couponError ? 'border-error' : 'border-outline-variant'
          )}
        />
        <button
          onClick={handleApply}
          disabled={!code.trim()}
          className="text-on-surface hover:text-on-surface-variant disabled:text-on-surface-variant/40 px-4 border-b border-outline-variant text-[10px] font-bold uppercase transition-colors"
        >
          Apply
        </button>
      </div>
      {couponError && (
        <p className="text-[10px] text-error">{couponError}</p>
      )}
    </div>
  );
}
