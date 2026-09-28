import { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-ind-1',
    author: 'Anjali Menon',
    rating: 5,
    date: '2026-08-14',
    comment: 'The Monstera arrived in pristine condition! The specialized packaging kept every leaf safe and completely unbroken. The ceramic pot has a gorgeous earthy glaze. Loving my new living room centerpiece!',
    verifiedBuyer: true,
    helpfulCount: 24,
  },
  {
    id: 'rev-2',
    productId: 'prod-ind-1',
    author: 'Rahul Varma',
    rating: 5,
    date: '2026-08-28',
    comment: 'Exceptional quality. Soil was damp and rich, and the plant had 2 brand new unfurling leaves. Indoor Petals is easily the most reliable plant shop I have ordered from online.',
    verifiedBuyer: true,
    helpfulCount: 17,
  },
  {
    id: 'rev-3',
    productId: 'prod-ind-2',
    author: 'Pooja Hegde',
    rating: 5,
    date: '2026-09-02',
    comment: 'Purchased two Snake Plants for our bedrooms. The white ceramic pots look super classy. Watered it only once in 3 weeks and it is thriving happily in our semi-lit bedroom.',
    verifiedBuyer: true,
    helpfulCount: 12,
  },
  {
    id: 'rev-4',
    productId: 'prod-tab-1',
    author: 'Gautam Nambiar',
    rating: 5,
    date: '2026-09-10',
    comment: 'The 3-layer Lucky Bamboo fits wonderfully beside my work monitor. The golden pebbles give it a very premium aesthetic. Highly recommend for gifting too!',
    verifiedBuyer: true,
    helpfulCount: 9,
  },
  {
    id: 'rev-5',
    productId: 'prod-gft-1',
    author: 'Dr. Meera Krishnan',
    rating: 5,
    date: '2026-09-18',
    comment: 'Sent this gift hamper to my colleague for her housewarming. She was thrilled with the brass tag and handwritten note. Truly thoughtful service by INDOOR PETALS.',
    verifiedBuyer: true,
    helpfulCount: 15,
  }
];

export const testimonialHighlights = [
  {
    quote: "INDOOR PETALS transformed our IT office with lush biophilic greenery. The plant rental and weekly maintenance service takes all the hassle away from our administration team.",
    author: "Kiran Jacob",
    role: "Facility Director, Innovatech Kochi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    quote: "The plant quality is miles ahead of local roadside nurseries. Packed with utmost care, healthy root systems, and designer pots that match modern home interiors seamlessly.",
    author: "Deepthi Thomas",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    quote: "Their landscaping team redesigned our villa courtyard into an absolute tropical haven. From automated micro-drip irrigation to lighting, everything was executed to perfection.",
    author: "Sanjay Mathew",
    role: "Villa Owner, Kakkanad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];
