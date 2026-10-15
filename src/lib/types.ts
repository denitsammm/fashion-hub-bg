export interface StoreOffer {
  retailer: string;
  external_id: string;
  title: string;
  brand: string;
  product_url: string;
  image_url?: string | null;
  price_bgn: number;
  original_price_bgn?: number | null;
  discount_percent: number;
  raw_price: number;
  raw_currency: string;
  ean?: string | null;
  mpn?: string | null;
  color?: string | null;
  sizes: string[];
  in_stock: boolean;
  last_updated?: string;
}

export interface CanonicalProduct {
  id: string;
  brand: string;
  title: string;
  ean?: string | null;
  mpn?: string | null;
  image_url?: string | null;
  best_price_bgn: number;
  highest_price_bgn: number;
  best_store: string;
  best_offer_url: string;
  max_savings_bgn: number;
  max_savings_percent: number;
  offers: StoreOffer[];
}
