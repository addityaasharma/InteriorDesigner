const ph = (seed) => `https://picsum.photos/seed/${seed}/500/500`;

export const categories = [
  { id: 1, name: "Paint", image: ph("hos-paint") },
  { id: 2, name: "Flooring", image: ph("hos-flooring") },
  { id: 3, name: "Wallpaper", image: ph("hos-wallpaper") },
  { id: 4, name: "Doors", image: ph("hos-doors") },
  { id: 5, name: "Furniture", image: ph("hos-furniture") },
  { id: 6, name: "Lighting", image: ph("hos-lighting") },
  { id: 7, name: "Curtains", image: ph("hos-curtains") },
];

export const avatars = [
  "https://picsum.photos/seed/av1/80/80",
  "https://picsum.photos/seed/av2/80/80",
  "https://picsum.photos/seed/av3/80/80",
];