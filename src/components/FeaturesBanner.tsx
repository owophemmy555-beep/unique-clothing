import React from 'react';
import { Award, Globe, ShieldCheck, RotateCcw } from 'lucide-react';

export const FeaturesBanner: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
    },
    {
      icon: Globe,
      title: 'Worldwide Shipping',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
    },
  ];

  return (
    <section className="bg-[#090909] border-y border-white/10 py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center space-x-3 pt-4 lg:pt-0"
              >
                <Icon className="w-5 h-5 text-[#D4AF37] stroke-[1.75] shrink-0" />
                <span className="text-sm font-medium tracking-wide text-white uppercase font-sans">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

