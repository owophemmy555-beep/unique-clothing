import React, { useState } from 'react';
import { X, User, Package, Heart, LogOut, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('vip@horbar.com');
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#121318] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 text-white space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#d2e032] text-black">
              <User className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold">Horbar VIP Membership</h3>
              <p className="text-xs text-neutral-400">Manage account &amp; order history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-neutral-400 font-semibold block mb-1">VIP Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d2e032]"
            />
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-300">
                <Package className="w-4 h-4 text-[#d2e032]" />
                Recent Orders
              </span>
              <span className="font-bold text-[#d2e032]">2 Active Shipments</span>
            </div>
            <p className="text-[11px] text-neutral-400">Order #HB-849102 — Out for delivery</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-2 text-neutral-300">
              <Heart className="w-4 h-4 text-[#d2e032]" />
              Saved Wishlist
            </span>
            <span className="font-bold">5 Items</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 1200);
            }}
            className="w-full py-2.5 bg-[#d2e032] text-black font-bold text-xs uppercase rounded-xl hover:bg-[#b8c628] flex items-center justify-center gap-2"
          >
            {saved ? <Check className="w-4 h-4 stroke-[3]" /> : null}
            <span>{saved ? 'Saved!' : 'Save Account Settings'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/5 text-neutral-400 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
