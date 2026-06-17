import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchCategories } from '../lib/api';
import { productKeys, categoryKeys } from '../lib/queryKeys';

export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: () => fetchProducts(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
  });
}
