import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS_DATA } from '../data/storeData';
import { CollectionItem } from '../types';

interface CollectionsGridProps {
  onSelectCollection: (category: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  onSelectCollection,
}) => {
  // Display four collection cards only: Hoodies, T-Shirts, Pants, Accessories
  const fourCollections = COLLECTIONS_DATA.filter((item: CollectionItem) =>
    ['hoodies', 't-shirts', 'pants', 'accessories'].includes(item.id)
  );

  return (
    <section id="collections-section" className="bg-[#090909] py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-white">
            COLLECTIONS
          </h2>
        </div>

        {/* 4 Collection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fourCollections.map((item: CollectionItem) => (
            <div
              key={item.id}
              onClick={() => onSelectCollection(item.category)}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] shadow-2xl bg-[#111111]"
            >
              {/* Large Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-colors" />

              {/* Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                <h3 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

