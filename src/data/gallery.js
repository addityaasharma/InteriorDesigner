const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const CATEGORIES = ["All", "Living Room", "Bedroom", "Kitchen", "Commercial", "Turn Key"];

export const galleryItems = [
  { id: 1, title: "Modern Living Space", category: "Living Room", ratio: "aspect-[4/5]", src: img("g1", 800, 1000) },
  { id: 2, title: "Calm Master Suite", category: "Bedroom", ratio: "aspect-square", src: img("g2", 900, 900) },
  { id: 3, title: "Handleless Kitchen", category: "Kitchen", ratio: "aspect-[3/4]", src: img("g3", 800, 1066) },
  { id: 4, title: "Boutique Office", category: "Commercial", ratio: "aspect-[5/4]", src: img("g4", 1000, 800) },
  { id: 5, title: "Full Home, Raipur", category: "Turn Key", ratio: "aspect-[3/4]", src: img("g5", 800, 1066) },
  { id: 6, title: "Warm Lounge", category: "Living Room", ratio: "aspect-[4/5]", src: img("g6", 800, 1000) },
  { id: 7, title: "Kids' Bedroom", category: "Bedroom", ratio: "aspect-[5/4]", src: img("g7", 1000, 800) },
  { id: 8, title: "Island Kitchen", category: "Kitchen", ratio: "aspect-square", src: img("g8", 900, 900) },
  { id: 9, title: "Retail Showroom", category: "Commercial", ratio: "aspect-[4/5]", src: img("g9", 800, 1000) },
  { id: 10, title: "Villa Interiors", category: "Turn Key", ratio: "aspect-[5/4]", src: img("g10", 1000, 800) },
  { id: 11, title: "Reading Corner", category: "Living Room", ratio: "aspect-[3/4]", src: img("g11", 800, 1066) },
  { id: 12, title: "Guest Bedroom", category: "Bedroom", ratio: "aspect-square", src: img("g12", 900, 900) },
];