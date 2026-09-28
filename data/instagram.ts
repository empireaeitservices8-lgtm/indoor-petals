export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
  tag: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    caption: 'Fresh morning light pouring over our fenestrated Monstera collection! 🌿✨ #IndoorPetals #PlantLover #MonsteraMonday',
    likes: 482,
    comments: 29,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    caption: 'Compact tabletop greens ready to refresh your desk aesthetics. Which one is your study buddy? 🌱 #DeskSetup #TabletopPlants',
    likes: 351,
    comments: 18,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
    caption: 'Handcrafted ceramic pots just unboxed! Glazed in natural emerald and earthy matte stone finishes. 🏺🪴',
    likes: 529,
    comments: 44,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
    caption: 'Succulent Sunday perfection! Geometrically aligned rosettes soaking up that golden afternoon warmth. 🌵✨',
    likes: 612,
    comments: 35,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    caption: 'Another corporate office transformed with our turnkey Plant Rental & Maintenance service. Breathe cleaner air at work! 🏢🌿',
    likes: 418,
    comments: 21,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    caption: 'Living green gifts packed with personalized handwritten cards and sustainable luxury boxes. Gift life, gift greenery! 🎁💚',
    likes: 690,
    comments: 52,
    url: 'https://instagram.com/indoorpetals',
    tag: '@indoorpetals',
  },
];
