"use client";

import React from "react";
import { CanonicalProduct, StoreOffer } from "@/lib/types";
import { X, ExternalLink, ShieldCheck, Truck, RotateCcw, CheckCircle2, TrendingDown, Store, AlertCircle } from "lucide-react";

interface ProductComparisonModalProps {
  product: CanonicalProduct | null;
  onClose: () => void;
}

const STORE_PERKS: Record<string, { delivery: string; returns: string; badge: string; color: string }> = {
  "Fashion Days": {
    delivery: "1-3 дни • Безплатно с Genius или над 50 лв",
    returns: "30 дни право на връщане",
    badge: "bg-rose-600 text-white",
    color: "text-rose-600"
  },
  "About You": {
    delivery: "2-4 дни • Безплатна доставка над 29.90 лв",
    returns: "100 дни безплатно връщане",
    badge: "bg-black text-white",
    color: "text-slate-900"
  },
  "About You Outlet": {
    delivery: "2-5 дни • Доставка от 5.90 лв",
    returns: "14 дни право на връщане",
    badge: "bg-slate-900 text-amber-400",
    color: "text-slate-900"
  },
  "Modivo": {
    delivery: "2-3 дни • Безплатно над 99 лв",
    returns: "100 дни безплатно връщане",
    badge: "bg-blue-600 text-white",
    color: "text-blue-600"
  },
  "Answear": {
    delivery: "2-4 дни • Безплатно над 100 лв",
    returns: "30 дни право на връщане",
    badge: "bg-stone-900 text-amber-300",
    color: "text-stone-900"
  },
  "Best Secret": {
    delivery: "3-5 дни • Доставка 10 лв",
    returns: "14 дни право на връщане",
    badge: "bg-zinc-950 text-amber-500",
    color: "text-zinc-900"
  },
  "Remix Shop": {
    delivery: "1-2 дни • Доставка от 4.90 лв",
    returns: "14 дни право на връщане",
    badge: "bg-emerald-700 text-white",
    color: "text-emerald-700"
  }
};

export default function ProductComparisonModal({ product, onClose }: ProductComparisonModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-2xl border border-slate-200 p-2 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="object-contain w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80";
                }}
              />
            ) : (
              <Store className="w-12 h-12 text-slate-300" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                {product.brand}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Идентичен модел
              </span>
              {product.ean && (
                <span className="text-[11px] font-mono text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  EAN: {product.ean}
                </span>
              )}
              {product.mpn && (
                <span className="text-[11px] font-mono text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  MPN: {product.mpn}
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h2>

            {/* Savings highlight bar */}
            {product.max_savings_bgn > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
                <TrendingDown className="w-4 h-4" />
                <span>
                  Спестяваш {product.max_savings_bgn.toFixed(2)} лв (-{product.max_savings_percent}%) ако поръчаш от {product.best_store}!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body: Side-by-side Table */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Сравнение по магазини в България</span>
              <span className="text-xs text-slate-500 font-normal">
                ({product.offers.length} проверени оферти)
              </span>
            </h3>
            <span className="text-xs text-slate-400">Подредени по цена (възходящо)</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
            {product.offers.map((offer, idx) => {
              const isWinner = offer.price_bgn === product.best_price_bgn;
              const diff = offer.price_bgn - product.best_price_bgn;
              const perks = STORE_PERKS[offer.retailer] || {
                delivery: "2-4 работни дни до България",
                returns: "30 дни право на връщане",
                badge: "bg-slate-900 text-white",
                color: "text-slate-900"
              };

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isWinner ? "bg-emerald-50/40" : "bg-white hover:bg-slate-50/60"
                  }`}
                >
                  {/* Retailer Info */}
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md shadow-xs ${perks.badge}`}>
                          {offer.retailer}
                        </span>
                        {isWinner && (
                          <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            Най-добра цена
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-400" />
                          {perks.delivery}
                        </span>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                          {perks.returns}
                        </span>
                      </div>

                      {offer.sizes && offer.sizes.length > 0 && (
                        <div className="text-[11px] text-slate-600 mt-1">
                          <span className="font-semibold text-slate-700">Налични размери: </span>
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                            {offer.sizes.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="text-xl sm:text-2xl font-black text-slate-900">
                        {offer.price_bgn.toFixed(2)}{" "}
                        <span className="text-xs font-bold text-slate-500">лв</span>
                      </div>

                      {isWinner ? (
                        <span className="text-xs font-semibold text-emerald-700 block">
                          Най-ниска оферта
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-rose-500 block">
                          +{diff.toFixed(2)} лв по-скъпо
                        </span>
                      )}
                    </div>

                    <a
                      href={offer.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all whitespace-nowrap ${
                        isWinner
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <span>Към магазина</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee info footer */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              Всички сравнени продукти са с гарантирано еднакъв продуктов номер или баркод. Цените се проверяват редовно и включват ДДС. Доставката се извършва директно от съответния магазин до България.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
