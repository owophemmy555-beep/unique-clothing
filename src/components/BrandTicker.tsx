import React from 'react';
import { Globe, Smile, Flame, Shield, Sparkles } from 'lucide-react';

export const BrandTicker: React.FC = () => {
  return (
    <div className="bg-[#090909] border-t border-white/10 py-8 overflow-hidden select-none">
      <div className="flex items-center space-x-12 opacity-80 hover:opacity-100 transition-opacity justify-around max-w-7xl mx-auto px-4">
        
        {/* Brand Symbol 1: Horbar Labs */}
        <div className="flex items-center space-x-2 text-neutral-400 font-medium text-xs uppercase tracking-widest">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>HORBAR LABS</span>
        </div>

        {/* Brand Symbol 2: XX Stencil */}
        <div className="font-display text-2xl font-black tracking-widest text-[#D4AF37]">
          XX
        </div>

        {/* Brand Symbol 3: horbar Script */}
        <div className="font-brand text-2xl text-neutral-300">
          horbar.
        </div>

        {/* Brand Symbol 4: Flame Emblem */}
        <div className="p-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
          <Flame className="w-5 h-5" />
        </div>

        {/* Brand Symbol 5: Globe */}
        <div className="text-neutral-400">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
        </div>

        {/* Brand Symbol 6: Double XX */}
        <div className="font-display text-2xl font-black tracking-widest text-neutral-300">
          XX
        </div>

        {/* Brand Symbol 7: Shield */}
        <div className="text-neutral-400">
          <Shield className="w-5 h-5" />
        </div>

        {/* Brand Symbol 8: Smiley */}
        <div className="text-neutral-400">
          <Smile className="w-5 h-5 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
};

