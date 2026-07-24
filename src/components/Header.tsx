import React from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
}) => {
  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About' },
    { id: 'lookbook', label: 'Lookbook' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090909]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo on the left */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer flex items-baseline gap-0.5 group select-none"
        >
          <span className="font-brand text-3xl sm:text-4xl text-[#D4AF37] tracking-tight group-hover:brightness-110 transition-all">
            horbar.
          </span>
        </div>

        {/* Top Navigation Centered */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Icons on the right: Search, Account, Cart */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-300 hover:text-[#D4AF37] rounded-full hover:bg-white/5 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-neutral-300 hover:text-[#D4AF37] rounded-full hover:bg-white/5 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-300 hover:text-[#D4AF37] rounded-full hover:bg-white/5 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-1 right-1 bg-[#D4AF37] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

