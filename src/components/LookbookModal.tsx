import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { COLLECTIONS_DATA } from '../data/storeData';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121318] border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-[#d2e032] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>HORBAR EDITORIAL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
              LOOKBOOK DROP 2026
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {COLLECTIONS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectCategory(item.category);
                onClose();
              }}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#d2e032]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#d2e032] uppercase tracking-widest">
                  LOOKBOOK ENTRY
                </span>
                <h3 className="font-display text-xl uppercase text-white">{item.title}</h3>
                <div className="flex items-center gap-1 text-xs text-[#d2e032] font-semibold mt-1">
                  <span>Explore Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
