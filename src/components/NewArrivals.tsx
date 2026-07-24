import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Eye } from 'lucide-react';
import { NEW_ARRIVALS_DATA } from '../data/storeData';
import { Product } from '../types';

interface NewArrivalsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  onQuickView,
  onAddToCart,
  onViewAllProducts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#090909] py-16 sm:py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-white">
              NEW ARRIVALS
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onViewAllProducts}
              className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#D4AF37] transition-colors group mr-2 cursor-pointer"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Slider Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                aria-label="Next Products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {NEW_ARRIVALS_DATA.map((product: Product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[280px] max-w-[280px] group flex flex-col shrink-0"
            >
              {/* Product Card Image Frame */}
              <div 
                onClick={() => onQuickView(product)}
                className="relative aspect-square rounded-2xl bg-[#111111] border border-white/10 overflow-hidden cursor-pointer group-hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl"
              >
                {/* NEW Badge */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-[#D4AF37] text-black">
                    NEW
                  </span>
                )}

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="p-3 rounded-full bg-black/80 text-white border border-white/20 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-3 rounded-full bg-[#D4AF37] text-black hover:bg-[#c49f27] transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg cursor-pointer"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex flex-col">
                <h3 
                  onClick={() => onQuickView(product)}
                  className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors cursor-pointer truncate"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-sm font-bold text-[#D4AF37]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
