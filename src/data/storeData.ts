import { Product, CollectionItem, VideoPreset } from '../types';

import hoodieCollImg from '../assets/images/hoodie_collection_1784890690895.jpg';
import tshirtCollImg from '../assets/images/tshirt_collection_1784890704680.jpg';
import pantsCollImg from '../assets/images/pants_collection_1784890718453.jpg';
import jacketCollImg from '../assets/images/jacket_collection_1784890731423.jpg';
import accessoriesCollImg from '../assets/images/accessories_collection_1784890745780.jpg';

import prodHoodieImg from '../assets/images/prod_hoodie_1784890764038.jpg';
import prodTeeImg from '../assets/images/prod_tee_1784890776948.jpg';
import prodCargoImg from '../assets/images/prod_cargo_1784890790113.jpg';
import prodCapImg from '../assets/images/prod_cap_1784890803411.jpg';
import prodNecklaceImg from '../assets/images/prod_necklace_1784890815962.jpg';

import heroPosterImg from '../assets/images/kaws_streetwear_hero_1784894457021.jpg';

export { heroPosterImg };

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'hoodies',
    title: 'HOODIES',
    category: 'Hoodies',
    image: hoodieCollImg,
    itemCount: 24,
  },
  {
    id: 't-shirts',
    title: 'T-SHIRTS',
    category: 'T-Shirts',
    image: tshirtCollImg,
    itemCount: 38,
  },
  {
    id: 'pants',
    title: 'PANTS',
    category: 'Pants',
    image: pantsCollImg,
    itemCount: 19,
  },
  {
    id: 'jackets',
    title: 'JACKETS',
    category: 'Jackets',
    image: jacketCollImg,
    itemCount: 15,
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    category: 'Accessories',
    image: accessoriesCollImg,
    itemCount: 42,
  },
];

export const NEW_ARRIVALS_DATA: Product[] = [
  {
    id: 'horbar-graphic-hoodie',
    name: 'Horbar® Graphic Hoodie',
    price: 89.00,
    originalPrice: 110.00,
    category: 'Hoodies',
    image: prodHoodieImg,
    isNew: true,
    colors: ['Dark Olive', 'Washed Black', 'Military Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Heavyweight 480GSM organic cotton hoodie featuring signature Horbar graphic print, distressed hem detailing, and double-layered hood.',
    rating: 4.9,
    reviewsCount: 128,
  },
  {
    id: 'horbar-signature-tee',
    name: 'Horbar® Signature Tee',
    price: 49.00,
    originalPrice: 65.00,
    category: 'T-Shirts',
    image: prodTeeImg,
    isNew: true,
    colors: ['Olive Moss', 'Charcoal', 'Bone White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Boxy streetwear fit 260GSM combed cotton tee with puffed Horbar typography across the chest and subtle sleeve patch.',
    rating: 4.8,
    reviewsCount: 94,
  },
  {
    id: 'horbar-cargo-pants',
    name: 'Horbar® Cargo Pants',
    price: 99.00,
    originalPrice: 130.00,
    category: 'Pants',
    image: prodCargoImg,
    isNew: true,
    colors: ['Tactical Black', 'Olive Canvas'],
    sizes: ['30', '32', '34', '36'],
    description: 'Multi-pocket tactical canvas cargo pants featuring signature XX stencil embroidery, adjustable ankle pull-tabs, and reinforced knees.',
    rating: 5.0,
    reviewsCount: 210,
  },
  {
    id: 'horbar-snapback-cap',
    name: 'Horbar® Snapback Cap',
    price: 39.00,
    originalPrice: 50.00,
    category: 'Accessories',
    image: prodCapImg,
    isNew: true,
    colors: ['Deep Olive', 'Midnight Black'],
    sizes: ['One Size'],
    description: 'Structured 6-panel snapback cap in washed cotton twill with high-density yellow Horbar script embroidery.',
    rating: 4.7,
    reviewsCount: 65,
  },
  {
    id: 'horbar-icon-necklace',
    name: 'Horbar® Icon Necklace',
    price: 29.00,
    originalPrice: 45.00,
    category: 'Accessories',
    image: prodNecklaceImg,
    isNew: true,
    colors: ['Matte Gold & Olive'],
    sizes: ['55cm Chain'],
    description: 'Heavy stainless steel curb chain with matte olive green square pendant bearing the embossed Horbar X insignia.',
    rating: 4.9,
    reviewsCount: 182,
  },
];

export const DEFAULT_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'preset-3d-character',
    title: '3D Character Drop 01',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: heroPosterImg,
    tag: '01',
  },
  {
    id: 'preset-runway-motion',
    title: 'Runway Look 02',
    url: 'https://www.w3schools.com/html/movie.mp4',
    poster: hoodieCollImg,
    tag: '02',
  },
  {
    id: 'preset-studio-spotlight',
    title: 'Studio Showcase 03',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: jacketCollImg,
    tag: '03',
  },
];

export const USER_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
];
