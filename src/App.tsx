import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroStage } from './components/HeroStage';
import { FeaturesBanner } from './components/FeaturesBanner';
import { CollectionsGrid } from './components/CollectionsGrid';
import { NewArrivals } from './components/NewArrivals';
import { BrandTicker } from './components/BrandTicker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { LookbookModal } from './components/LookbookModal';
import { VideoUploadModal } from './components/VideoUploadModal';

import { DEFAULT_VIDEO_PRESETS, NEW_ARRIVALS_DATA } from './data/storeData';
import { NavTab, CartItem, Product } from './types';
import { ArrowLeft, Filter } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(DEFAULT_VIDEO_PRESETS[0].url);
  
  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState<boolean>(false);
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState<boolean>(false);

  // Quick View Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Shop Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Handle Add To Cart
  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Dark Olive') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCollectionCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts =
    selectedCategory === 'All'
      ? NEW_ARRIVALS_DATA
      : NEW_ARRIVALS_DATA.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-between font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'lookbook') setIsLookbookOpen(true);
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* HERO STAGE */}
            <HeroStage
              currentVideoUrl={heroVideoUrl}
              onVideoChange={(newUrl) => setHeroVideoUrl(newUrl)}
              onVideoUploadClick={() => setIsVideoUploadOpen(true)}
              onShopClick={() => {
                const collElem = document.getElementById('collections-section');
                if (collElem) {
                  collElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('collections');
                }
              }}
              onExploreClick={() => {
                const footerElem = document.getElementById('footer-section');
                if (footerElem) {
                  footerElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('about');
                }
              }}
            />

            {/* FEATURE BAR */}
            <FeaturesBanner />

            {/* COLLECTIONS SECTION */}
            <CollectionsGrid
              onSelectCollection={handleSelectCollectionCategory}
            />

            {/* NEW ARRIVALS CAROUSEL */}
            <NewArrivals
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onViewAllProducts={() => {
                setActiveTab('shop');
                setSelectedCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* BRAND TICKER */}
            <BrandTicker />
          </>
        )}

        {/* SHOP TAB VIEW */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Breadcrumb & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[#D4AF37] mb-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wider">
                  {selectedCategory === 'All' ? 'ALL HORBAR DROPS' : `${selectedCategory} COLLECTION`}
                </h1>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="w-4 h-4 text-[#D4AF37] shrink-0 mr-1" />
                {['All', 'Hoodies', 'T-Shirts', 'Pants', 'Accessories'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#111111] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div 
                    onClick={() => setQuickViewProduct(product)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-black/40 mb-4"
                  >
                    {product.isNew && (
                      <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#D4AF37] text-black">
                        NEW
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-widest block">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-base font-extrabold text-[#D4AF37]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-4 py-2.5 bg-white/10 text-white group-hover:bg-[#D4AF37] group-hover:text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    ADD TO BAG
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLLECTIONS FULL PAGE */}
        {activeTab === 'collections' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={() => setActiveTab('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[#D4AF37] mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <CollectionsGrid
              onSelectCollection={handleSelectCollectionCategory}
            />
          </div>
        )}

        {/* ABOUT PAGE */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              OUR MANIFESTO
            </span>
            <h1 className="font-display text-5xl sm:text-7xl uppercase text-white tracking-wider">
              HORBAR INDIVIDUALITY
            </h1>
            <p className="text-neutral-300 text-base leading-relaxed max-w-2xl mx-auto font-light">
              Founded in 2025, Horbar was built for visionaries who refuse to blend in. We combine heavy 480GSM organic textiles, tactical utility cuts, and modern streetwear aesthetic into state-of-the-art luxury streetwear.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('All');
                }}
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c49f27] transition-all cursor-pointer"
              >
                EXPLORE LATEST DROPS
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer setActiveTab={setActiveTab} />

      {/* ALL INTERACTIVE MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, size, color) => handleAddToCart(product, size, color)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onSelectCategory={handleSelectCollectionCategory}
      />

      <VideoUploadModal
        isOpen={isVideoUploadOpen}
        onClose={() => setIsVideoUploadOpen(false)}
        onVideoSelected={(videoUrl) => setHeroVideoUrl(videoUrl)}
        currentVideoUrl={heroVideoUrl}
      />
    </div>
  );
}
