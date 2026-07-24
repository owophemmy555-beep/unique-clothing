import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HORBAR10' || promoCode.trim().toUpperCase() === 'VIP20') {
      const discVal = promoCode.toUpperCase() === 'VIP20' ? 20 : 10;
      setDiscount(discVal);
      setPromoMessage(`Code applied: ${discVal}% OFF!`);
    } else {
      setPromoMessage('Invalid promo code. Try "HORBAR10" or "VIP20".');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0f13] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#d2e032] text-black">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Your Cart</h2>
                <p className="text-xs text-neutral-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in bag
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {subtotal > 0 && (
            <div className="bg-[#14151c] px-6 py-3 border-b border-white/5">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-neutral-300">
                  {subtotal >= 150 ? '🎉 You unlocked Free Express Shipping!' : `Add $${(150 - subtotal).toFixed(2)} for Free Shipping`}
                </span>
                <span className="text-[#d2e032] font-bold">{Math.min(100, Math.round((subtotal / 150) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#d2e032] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#d2e032]/20 border border-[#d2e032] text-[#d2e032] flex items-center justify-center">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold">Order Confirmed!</h3>
                <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Thank you for shopping with Horbar. Your order has been dispatched with express tracking.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#d2e032] text-black font-bold text-xs rounded-xl hover:bg-[#b8c628]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-neutral-600" />
                <p className="text-sm font-semibold text-neutral-400">Your shopping bag is empty</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 bg-white/10 text-white font-semibold text-xs rounded-lg hover:bg-white/20 transition-all"
                >
                  Explore Horbar Drops
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 rounded-2xl bg-[#14151b] border border-white/5 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Size: <span className="text-neutral-200">{item.selectedSize}</span> | Color: <span className="text-neutral-200">{item.selectedColor}</span>
                    </p>
                    <p className="text-sm font-extrabold text-[#d2e032] mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="p-1 rounded bg-black/40 text-neutral-400 hover:text-white border border-white/10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="p-1 rounded bg-black/40 text-neutral-400 hover:text-white border border-white/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cartItems.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-white/10 bg-[#0b0c0f] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (HORBAR10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#d2e032]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all shrink-0"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] text-[#d2e032] font-semibold">{promoMessage}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#d2e032]">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? <span className="text-[#d2e032] font-bold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#d2e032]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-[#d2e032] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-[#b8c628] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted &amp; Safe Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
