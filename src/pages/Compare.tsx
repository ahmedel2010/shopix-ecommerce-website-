import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Star, ChevronRight, ShoppingBag, X, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../lib/api';
import { productKeys } from '../lib/queryKeys';
import { Product } from '../types';
import { useSEO } from '../hooks/useSEO';

function formatCategory(slug: string) {
  return slug.replace(/-/g, ' ');
}

function getSpecKeys(products: Product[]) {
  return [...new Set(products.flatMap(p => Object.keys(p.specifications ?? {})))];
}

function getNumericValue(val: string): number | null {
  const match = val.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { compareList, removeFromCompare, clearCompare, replaceCompareList } = useComparison();
  const { addToCart, cart } = useCart();

  useSEO({
    title: 'Compare Products',
    description: 'Side-by-side comparison of Shopix products. Compare specs, prices, and ratings.',
    noIndex: true,
  });

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (!idsParam) return;

    const ids = idsParam.split(',').filter(Boolean).slice(0, 2);
    const currentIds = compareList.map(p => p.id).join(',');
    if (ids.join(',') === currentIds) return;

    Promise.all(
      ids.map(id =>
        queryClient.fetchQuery({
          queryKey: productKeys.detail(id),
          queryFn: () => fetchProductById(id),
        })
      )
    ).then(results => {
      const products = results.filter((p): p is Product => p !== null);
      if (products.length > 0) replaceCompareList(products);
    });
  }, [searchParams.get('ids')]);

  useEffect(() => {
    const ids = compareList.map(p => p.id).join(',');
    if (compareList.length === 0) {
      if (searchParams.has('ids')) setSearchParams({}, { replace: true });
    } else if (searchParams.get('ids') !== ids) {
      setSearchParams({ ids }, { replace: true });
    }
  }, [compareList]);

  const specKeys = useMemo(() => getSpecKeys(compareList), [compareList]);

  const priceWinner = useMemo(() => {
    if (compareList.length < 2) return null;
    const [a, b] = compareList;
    if (a.price < b.price) return a.id;
    if (b.price < a.price) return b.id;
    return null;
  }, [compareList]);

  const ratingWinner = useMemo(() => {
    if (compareList.length < 2) return null;
    const [a, b] = compareList;
    if (a.rating > b.rating) return a.id;
    if (b.rating > a.rating) return b.id;
    return null;
  }, [compareList]);

  if (compareList.length === 0) {
    return (
      <div className="pt-32 pb-40 px-6 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-surface-container-low border border-outline/5"
          >
            <div className="w-20 h-20 bg-surface-container flex items-center justify-center">
              <span className="text-3xl font-light text-on-surface-variant/30">vs</span>
            </div>
            <div className="space-y-2 max-w-md">
              <h1 className="text-3xl font-bold text-on-surface">Nothing to compare yet</h1>
              <p className="text-sm text-on-surface-variant">
                Pick two products from the same category and we'll line up the specs for you.
              </p>
            </div>
            <Link to="/shop" className="luxury-button !px-10">
              Browse Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const category = compareList[0].category;

  return (
    <div className="bg-surface min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <nav className="flex items-center gap-2 text-on-surface-variant text-xs mb-8">
          <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <Link to="/shop" className="hover:text-on-surface transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-on-surface font-medium">Compare</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-primary">
              {formatCategory(category)}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface">Product Comparison</h1>
            <p className="text-xs text-on-surface-variant">
              {compareList.length === 1
                ? 'Add one more product from this category to see the full comparison.'
                : 'Side-by-side overview of key differences.'}
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="text-[10px] font-bold uppercase border-b border-on-surface pb-1 hover:text-on-surface-variant hover:border-on-surface-variant transition-all self-start md:self-auto"
          >
            Clear comparison
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="min-w-[640px]">
            {/* Product headers */}
            <div className="grid border border-outline-variant" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}>
              <div className="bg-surface-container-low border-r border-outline-variant p-4" />
              {compareList.map(product => (
                <div key={product.id} className="relative bg-surface-container-low border-r border-outline-variant last:border-r-0 p-6 text-center">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                    aria-label="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="aspect-square max-w-[160px] mx-auto mb-4 bg-surface overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <Link to={`/product/${product.id}`} className="block">
                    <h2 className="text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-2 mb-3">
                      {product.name}
                    </h2>
                  </Link>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3 h-3',
                          i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'
                        )}
                      />
                    ))}
                    <span className="text-[10px] text-on-surface-variant ml-1">{product.rating}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="text-2xl font-bold text-on-surface">${product.price.toFixed(2)}</span>
                      {priceWinner === product.id && compareList.length === 2 && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          Lower price
                        </span>
                      )}
                    </div>
                    {(() => {
                      const inCart = cart.some(c => c.id === product.id);
                      return (
                        <button
                          onClick={() => !inCart && addToCart(product)}
                          disabled={inCart}
                          className={cn(
                            'w-full py-2.5 text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition-all',
                            inCart
                              ? 'bg-surface-container text-on-surface-variant border border-outline-variant cursor-not-allowed'
                              : 'bg-on-surface text-surface hover:opacity-90'
                          )}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          {inCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              ))}
              {compareList.length < 2 && (
                <div className="bg-surface border-r border-outline-variant p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
                  <div className="w-16 h-16 border border-dashed border-outline-variant flex items-center justify-center mb-4">
                    <span className="text-2xl text-on-surface-variant/40">+</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4">Select another {formatCategory(category)} product</p>
                  <Link
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    className="text-[10px] font-bold uppercase text-primary hover:underline"
                  >
                    Browse category
                  </Link>
                </div>
              )}
            </div>

            {/* Overview rows */}
            {compareList.length === 2 && (
              <div className="border border-t-0 border-outline-variant divide-y divide-outline-variant">
                {[
                  {
                    label: 'Brand',
                    values: compareList.map(p => p.brand ?? '—'),
                    diff: compareList[0].brand !== compareList[1].brand,
                  },
                  {
                    label: 'Rating',
                    values: compareList.map(p => `${p.rating} (${p.reviews} reviews)`),
                    diff: compareList[0].rating !== compareList[1].rating,
                    winner: ratingWinner,
                  },
                  {
                    label: 'Availability',
                    values: compareList.map(p =>
                      p.stock && p.stock > 0 ? `In stock (${p.stock})` : 'In stock'
                    ),
                    diff: compareList[0].stock !== compareList[1].stock,
                  },
                  {
                    label: 'Discount',
                    values: compareList.map(p =>
                      p.discountPercentage ? `${p.discountPercentage}% off` : '—'
                    ),
                    diff: compareList[0].discountPercentage !== compareList[1].discountPercentage,
                  },
                ].map(row => (
                  <div
                    key={row.label}
                    className="grid"
                    style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
                  >
                    <div className="px-4 py-3.5 bg-surface-container-low border-r border-outline-variant text-xs text-on-surface-variant font-medium">
                      {row.label}
                    </div>
                    {compareList.map((product, i) => (
                      <div
                        key={product.id}
                        className={cn(
                          'px-4 py-3.5 border-r border-outline-variant last:border-r-0 text-xs font-bold text-on-surface text-center',
                          row.diff && 'bg-primary/[0.03]'
                        )}
                      >
                        <span className="inline-flex items-center gap-1">
                          {row.values[i]}
                          {'winner' in row && row.winner === product.id && (
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Specifications */}
            {specKeys.length > 0 && compareList.length === 2 && (
              <div className="mt-10">
                <h3 className="text-xs font-bold uppercase text-on-surface mb-4 border-b border-outline-variant pb-3">
                  Technical Specifications
                </h3>
                <div className="border border-outline-variant divide-y divide-outline-variant">
                  {specKeys.map(key => {
                    const values = compareList.map(p => p.specifications?.[key] ?? '—');
                    const differs = values[0] !== values[1];
                    const nums = values.map(getNumericValue);
                    const higherIsBetter = nums[0] !== null && nums[1] !== null && nums[0] !== nums[1]
                      ? (nums[0] > nums[1] ? 0 : 1)
                      : null;

                    return (
                      <div
                        key={key}
                        className="grid"
                        style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
                      >
                        <div className="px-4 py-3.5 bg-surface-container-low border-r border-outline-variant text-xs text-on-surface-variant">
                          {key}
                        </div>
                        {compareList.map((product, i) => (
                          <div
                            key={product.id}
                            className={cn(
                              'px-4 py-3.5 border-r border-outline-variant last:border-r-0 text-xs font-bold text-on-surface text-center',
                              differs && 'bg-primary/[0.03]',
                              higherIsBetter === i && differs && 'text-primary'
                            )}
                          >
                            {values[i]}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Features */}
            {compareList.length === 2 && compareList.some(p => p.features?.length) && (
              <div className="mt-10">
                <h3 className="text-xs font-bold uppercase text-on-surface mb-4 border-b border-outline-variant pb-3">
                  Key Features
                </h3>
                <div className="border border-outline-variant divide-y divide-outline-variant">
                  {Array.from({
                    length: Math.max(...compareList.map(p => p.features?.length ?? 0)),
                  }).map((_, rowIdx) => {
                    const rowFeatures = compareList.map(p => p.features?.[rowIdx]);
                    const titles = rowFeatures.map(f => f?.title ?? '—');
                    const differs = titles[0] !== titles[1];

                    return (
                      <div
                        key={rowIdx}
                        className="grid"
                        style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
                      >
                        <div className="px-4 py-4 bg-surface-container-low border-r border-outline-variant flex items-start">
                          <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                            Feature {rowIdx + 1}
                          </span>
                        </div>
                        {compareList.map((product, colIdx) => {
                          const feature = rowFeatures[colIdx];
                          return (
                            <div
                              key={product.id}
                              className={cn(
                                'px-4 py-4 border-r border-outline-variant last:border-r-0',
                                differs && 'bg-primary/[0.03]'
                              )}
                            >
                              {feature ? (
                                <div className="space-y-1.5">
                                  <p className="text-xs font-bold text-on-surface">{feature.title}</p>
                                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                    {feature.description}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-xs text-on-surface-variant">—</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
