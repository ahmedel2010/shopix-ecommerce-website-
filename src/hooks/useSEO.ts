import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  canonicalPath?: string;
  noIndex?: boolean;
  structuredData?: object | object[];
}

const SITE_NAME = 'Shopix';
const BASE_URL = 'https://shopix-store.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/img_28.jpg`;
const DEFAULT_DESCRIPTION =
  'Shopix – Discover curated collections of premium fashion, electronics, and home décor. Shop artisanal quality and modern sophistication.';

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setStructuredData(data: object | object[]) {
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  const items = Array.isArray(data) ? data : [data];
  items.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  canonicalPath,
  noIndex = false,
  structuredData,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – Curated Taste`;
    document.title = fullTitle;

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:site_name', SITE_NAME, true);
    if (canonicalPath) {
      setMeta('og:url', `${BASE_URL}${canonicalPath}`, true);
      setLink('canonical', `${BASE_URL}${canonicalPath}`);
    }

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    if (structuredData) {
      setStructuredData(structuredData);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalPath, noIndex, structuredData]);
}

export function buildProductStructuredData(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  stock?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'USD',
      availability:
        product.stock && product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };
}

export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/images/img_28.jpg`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+20-2-2512-3456',
    contactType: 'customer service',
    availableLanguage: ['English', 'Arabic'],
  },
};

export const WEBSITE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
