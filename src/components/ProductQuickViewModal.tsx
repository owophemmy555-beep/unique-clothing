import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const colors = product.colors || ['Dark Olive', 'Washed Black'];
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const currentColor = selectedColor || colors[0];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentColor);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121318] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-neutral-400 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square md:aspect-auto bg-[#0a0a0c] p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#d2e032] text-black text-[10px] font-extrabold uppercase tracking-widest rounded">
              NEW DROP
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d2e032]">
              {product.category}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-[#d2e032]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-neutral-400">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mt-3">
              <span className="text-2xl font-extrabold text-[#d2e032]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed mt-3">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-neutral-400 block mb-2">
                Color: <span className="text-white font-bold">{currentColor}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      currentColor === color
                        ? 'border-[#d2e032] bg-[#d2e032]/10 text-[#d2e032] font-bold'
                        : 'border-white/10 text-neutral-300 hover:border-white/30'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-neutral-400 block mb-2">
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-[#d2e032] bg-[#d2e032] text-black'
                        : 'border-white/10 text-neutral-300 hover:border-white/30 bg-black/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Bag Action */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 bg-[#d2e032] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b8c628] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>ADDED TO BAG!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>ADD TO BAG — ${(product.price).toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d2e032]" />
                <span>Express Worldwide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#d2e032]" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
