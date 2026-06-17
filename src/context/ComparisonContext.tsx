import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Product } from '../types';
import { useToast } from './ToastContext';
import { enrichProduct, fetchProductById } from '../lib/api';
import { productKeys } from '../lib/queryKeys';

const MAX_COMPARE = 2;
const STORAGE_KEY = 'shopix-compare';

interface ComparisonContextType {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  replaceCompareList: (products: Product[]) => void;
  canAddProduct: (product: Product) => boolean;
  compareCategory: string | null;
  isReady: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const saved =
        localStorage.getItem(STORAGE_KEY) ??
        localStorage.getItem('compare-v2') ??
        localStorage.getItem('compare');
      if (!saved) {
        setHydrated(true);
        return;
      }

      const parsed = JSON.parse(saved);
      const ids: string[] = Array.isArray(parsed)
        ? parsed.map((entry: Product | string) => (typeof entry === 'string' ? entry : entry.id))
        : [];

      if (ids.length === 0) {
        setHydrated(true);
        return;
      }

      const products = await Promise.all(
        ids.map(id =>
          queryClient.fetchQuery({
            queryKey: productKeys.detail(id),
            queryFn: () => fetchProductById(id),
          })
        )
      );
      setCompareList(products.filter((p): p is Product => p !== null).slice(0, MAX_COMPARE));
      setHydrated(true);
    }

    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList.map(p => p.id)));
    localStorage.removeItem('compare');
  }, [compareList, hydrated]);

  const compareCategory = compareList.length > 0 ? compareList[0].category : null;
  const isReady = compareList.length === MAX_COMPARE;

  const canAddProduct = (product: Product) => {
    if (compareList.some(p => p.id === product.id)) return true;
    if (compareList.length >= MAX_COMPARE) return false;
    if (compareCategory && product.category !== compareCategory) return false;
    return true;
  };

  const addToCompare = (product: Product): boolean => {
    if (compareList.some(p => p.id === product.id)) return true;

    if (compareList.length >= MAX_COMPARE) {
      toast.warning('You can compare up to 2 products. Remove one first.', undefined, product.image);
      return false;
    }

    if (compareCategory && product.category !== compareCategory) {
      const label = compareCategory.replace('-', ' ');
      toast.warning(`Only ${label} products can be compared together.`, undefined, product.image);
      return false;
    }

    toast.success(`Added to comparison`, undefined, product.image);
    setCompareList(prev => [...prev, enrichProduct(product)]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    const product = compareList.find(p => p.id === productId);
    if (product) {
      toast.info(`Removed from comparison`, undefined, product.image);
    }
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const toggleCompare = (product: Product) => {
    if (compareList.some(p => p.id === product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  const clearCompare = () => setCompareList([]);

  const replaceCompareList = (products: Product[]) => {
    setCompareList(products.slice(0, MAX_COMPARE).map(enrichProduct));
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        replaceCompareList,
        canAddProduct,
        compareCategory,
        isReady,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
