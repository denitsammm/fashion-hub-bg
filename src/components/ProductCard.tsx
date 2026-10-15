"use client";

import React, { useState } from "react";
import { CanonicalProduct } from "@/lib/types";
import { ExternalLink, Tag, ChevronDown, ChevronUp, CheckCircle2, TrendingDown, Store, SlidersHorizontal } from "lucide-react";

interface ProductCardProps {
  product: CanonicalProduct;
  onOpenModal?: (product: CanonicalProduct) => void;
}

const RETAILER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "About You": { bg: "bg-black", text: "text-white", border: "border-black" },
  "About You Outlet": { bg: "bg-slate-900", text: "text-amber-400", border: "border-slate-800" },
  "Fashion Days": { bg: "bg-rose-600", text: "text-white", border: "border-rose-600" },
  "Modivo": { bg: "bg-blue-600", text: "text-white", border: "border-blue-600" },
  "Answear": { bg: "bg-stone-900", text: "text-amber-300", border: "border-stone-900" },
  "Best Secret": { bg: "bg-zinc-950", text: "text-amber-500", border: "border-zinc-800" },
  "Remix Shop": { bg: "bg-emerald-700", text: "text-white", border: "border-emerald-700" }
};

export default function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const [showAllOffers, setShowAllOffers] = useState(false);
  const bestOffer = product.offers[0];
  const hasMultipleOffers = product.offers.length > 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Card Header & Image */}
        <div 
          onClick={() => onOpenModal && onOpenModal(product)}
          className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 cursor-pointer"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-300">
              <Store className="w-12 h-12 stroke-[1.5]" />
              <span className="text-xs mt-1">Няма снимка</span>
            </div>
          )}

          {/* Savings Badge */}
          {product.max_savings_bgn > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Спестяваш {product.max_savings_bgn.toFixed(2)} лв (-{product.max_savings_percent}%)</span>
            </div>
          )}

          {/* Store count badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">
            {product.offers.length} {product.offers.length === 1 ? "магазин" : "магазина"}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              {product.brand}
            </span>
            {product.ean && (
              <span className="text-[10px] text-slate-400 font-mono">
                EAN: {product.ean}
              </span>
            )}
            {product.mpn && !product.ean && (
              <span className="text-[10px] text-slate-400 font-mono">
                Код: {product.mpn}
              </span>
            )}
          </div>

          <h3 
            onClick={() => onOpenModal && onOpenModal(product)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 min-h-[2.75rem] cursor-pointer hover:text-emerald-700 transition-colors" 
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Best Deal Highlight Banner */}
          <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Най-добра оферта в {product.best_store}
              </div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {product.best_price_bgn.toFixed(2)} <span className="text-sm font-semibold text-slate-500">лв</span>
              </div>
              {hasMultipleOffers && product.highest_price_bgn > product.best_price_bgn && (
                <div className="text-xs text-slate-400 line-through">
                  до {product.highest_price_bgn.toFixed(2)} лв в други сайтове
                </div>
              )}
            </div>

            <a
              href={product.best_offer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>Към {product.best_store}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Detailed comparison action button */}
          <button
            onClick={() => onOpenModal && onOpenModal(product)}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Детайлно сравнение на магазините</span>
          </button>
        </div>
      </div>

      {/* Quick Comparison Drawer (All stores) */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        {hasMultipleOffers ? (
          <div>
            <button
              onClick={() => setShowAllOffers(!showAllOffers)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
            >
              <span>Бърз преглед ({product.offers.length} магазина)</span>
              {showAllOffers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAllOffers && (
              <div className="mt-3 space-y-2 pt-2 border-t border-slate-200">
                {product.offers.map((offer, idx) => {
                  const isWinner = offer.price_bgn === product.best_price_bgn;
                  const diff = offer.price_bgn - product.best_price_bgn;
                  const badgeStyle = RETAILER_COLORS[offer.retailer] || { bg: "bg-slate-800", text: "text-white" };

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                        isWinner ? "bg-white border-emerald-300 shadow-sm" : "bg-white/60 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeStyle.bg} ${badgeStyle.text}`}>
                          {offer.retailer}
                        </span>
                        {offer.sizes && offer.sizes.length > 0 && (
                          <span className="text-[10px] text-slate-400 hidden sm:inline">
                            Размери: {offer.sizes.slice(0, 3).join(", ")}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className={`font-bold ${isWinner ? "text-emerald-700" : "text-slate-700"}`}>
                            {offer.price_bgn.toFixed(2)} лв
                          </span>
                          {!isWinner && diff > 0 && (
                            <span className="text-[10px] text-rose-500 block">
                              +{diff.toFixed(2)} лв
                            </span>
                          )}
                        </div>

                        <a
                          href={offer.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100"
                          title={`Отвори в ${offer.retailer}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 text-center py-0.5">
            Наличен в {bestOffer.retailer} • Проверява се за нови оферти
          </div>
        )}
      </div>
    </div>
  );
}
