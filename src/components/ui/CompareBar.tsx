import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useComparison } from '../../context/ComparisonContext';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare, isReady } = useComparison();

  const compareUrl = compareList.length > 0
    ? `/compare?ids=${compareList.map(p => p.id).join(',')}`
    : '/compare';

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant bg-surface/95 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant hidden sm:block shrink-0">
                Compare ({compareList.length}/2)
              </span>
              <div className="flex items-center gap-3">
                {compareList.map(product => (
                  <div key={product.id} className="flex items-center gap-2 min-w-0">
                    <div className="relative w-10 h-10 bg-surface-container-low border border-outline-variant shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain p-1"
                      />
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-on-surface text-surface flex items-center justify-center"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <span className="text-xs font-medium text-on-surface truncate max-w-[100px] sm:max-w-[140px] hidden md:block">
                      {product.name}
                    </span>
                  </div>
                ))}
                {compareList.length < 2 && (
                  <span className="text-[10px] text-on-surface-variant uppercase">
                    Select one more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={clearCompare}
                className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-colors hidden sm:block"
              >
                Clear
              </button>
              <Link
                to={compareUrl}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase transition-all ${
                  isReady
                    ? 'bg-on-surface text-surface hover:opacity-90'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant pointer-events-none opacity-60'
                }`}
              >
                Compare Now
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
