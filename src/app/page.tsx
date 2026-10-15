"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductComparisonModal from "@/components/ProductComparisonModal";
import { CanonicalProduct } from "@/lib/types";
import { fetchTopDeals, searchProducts, SEED_DEALS } from "@/lib/api";
import { ArrowUpDown, Sparkles, Filter, Store, RefreshCw, CheckCircle, Percent, ArrowRight } from "lucide-react";

const STORES = [
  { name: "About You", active: true },
  { name: "About You Outlet", active: true },
  { name: "Fashion Days", active: true },
  { name: "Modivo", active: true },
  { name: "Answear", active: true },
  { name: "Best Secret", active: true },
  { name: "Remix Shop", active: true },
];

const POPULAR_BRANDS = [
  "Всички",
  "The North Face",
  "Nike",
  "Adidas",
  "New Balance",
  "Levi's",
  "Calvin Klein",
  "Lacoste",
  "Tommy Hilfiger",
  "UGG",
  "Hugo Boss",
  "Napapijri",
  "Guess",
  "Puma",
  "Emporio Armani",
];

export default function HomePage() {
  const [products, setProducts] = useState<CanonicalProduct[]>(SEED_DEALS);
  const [filteredProducts, setFilteredProducts] = useState<CanonicalProduct[]>(SEED_DEALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Всички");
  const [multiStoreOnly, setMultiStoreOnly] = useState(true);
  const [sortBy, setSortBy] = useState<"savings" | "price_asc" | "percent">("savings");
  const [selectedProductForModal, setSelectedProductForModal] = useState<CanonicalProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial deals
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchTopDeals(1);
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let list = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          (p.ean && p.ean.includes(q)) ||
          (p.mpn && p.mpn.toLowerCase().includes(q))
      );
    }

    // Brand filter
    if (selectedBrand !== "Всички") {
      list = list.filter((p) => p.brand.toLowerCase().includes(selectedBrand.toLowerCase()));
    }

    // Multi store only filter
    if (multiStoreOnly) {
      list = list.filter((p) => p.offers.length > 1);
    }

    // Sorting
    if (sortBy === "savings") {
      list.sort((a, b) => b.max_savings_bgn - a.max_savings_bgn);
    } else if (sortBy === "price_asc") {
      list.sort((a, b) => a.best_price_bgn - b.best_price_bgn);
    } else if (sortBy === "percent") {
      list.sort((a, b) => b.max_savings_percent - a.max_savings_percent);
    }

    setFilteredProducts(list);
  }, [products, searchQuery, selectedBrand, multiStoreOnly, sortBy]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Единственият сайт в България за сравнение на напълно идентични дрехи</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Никога не плащай повече за една и съща дреха.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
              Сравняваме цените на абсолютно еднакви модели по баркод (EAN) и фабричен код (MPN) в{" "}
              <strong className="text-slate-900">About You, Fashion Days, Modivo, Answear и Best Secret</strong>.
            </p>
          </div>

          {/* Supported Retailers Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
              Сравнявани магазини:
            </span>
            {STORES.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter & Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 max-w-full">
            {POPULAR_BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedBrand === brand
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Controls: Multi-Store Toggle + Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 text-xs font-semibold text-slate-700 hover:bg-slate-100">
              <input
                type="checkbox"
                checked={multiStoreOnly}
                onChange={(e) => setMultiStoreOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Само в 2+ магазина</span>
            </label>

            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-700 font-semibold outline-none cursor-pointer"
              >
                <option value="savings">Най-голямо спестяване (лв)</option>
                <option value="percent">Най-голям % намаление</option>
                <option value="price_asc">Най-ниска цена</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {selectedBrand === "Всички" ? "Сравнени оферти по магазини" : `Сравнения за ${selectedBrand}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Показване на {filteredProducts.length} артикула с гарантирано идентично съвпадение
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenModal={(prod) => setSelectedProductForModal(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Няма намерени резултати</h3>
            <p className="text-xs text-slate-500 mt-1">
              Опитайте да изберете &quot;Всички&quot; или да въведете друга марка в търсачката.
            </p>
          </div>
        )}
      </main>

      {/* Comparison Detail Modal */}
      <ProductComparisonModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  );
}
