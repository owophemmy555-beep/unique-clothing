import React, { useState } from 'react';
import { X, Search, ArrowRight, Eye } from 'lucide-react';
import { NEW_ARRIVALS_DATA } from '../data/storeData';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredProducts = NEW_ARRIVALS_DATA.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121318] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 text-white">
        
        {/* Header Search Input */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-[#d2e032] shrink-0" />
          <input
            type="text"
            placeholder="Search Horbar drops, hoodies, cargo, caps..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No products found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 cursor-pointer transition-colors border border-transparent hover:border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-white/10"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{product.name}</h4>
                    <span className="text-[11px] text-[#d2e032] font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Eye className="w-4 h-4 text-neutral-400" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
