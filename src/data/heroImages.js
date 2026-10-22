const BIG = "w-[23vw]";
const SMALL = "w-[11.7vw]";

const L = "left-[1%]";
const C = "left-[35.6%]";
const R = "left-[70%]";

const img = (seed) => `https://picsum.photos/seed/${seed}/700/875`;

export const heroImages = [
  // Row 1
  { src: img("hos-1"), alt: "Living room design", cls: `${BIG} ${L} top-[8vh]` },
  { src: img("hos-2"), alt: "Showroom", cls: `${SMALL} ${C} top-[4vh]` },
  { src: img("hos-3"), alt: "Bedroom design", cls: `${BIG} ${R} top-[6vh]` },

  // Row 2
  { src: img("hos-4"), alt: "Home office", cls: `${SMALL} ${L} top-[82vh]` },
  { src: img("hos-5"), alt: "Dining area", cls: `${BIG} ${C} top-[78vh]` },
  { src: img("hos-6"), alt: "Kitchen design", cls: `${SMALL} ${R} top-[86vh]` },

  // Row 3
  { src: img("hos-7"), alt: "Lounge", cls: `${BIG} ${L} top-[150vh]` },
  { src: img("hos-8"), alt: "Minimal interior", cls: `${SMALL} ${C} top-[158vh]` },
  { src: img("hos-9"), alt: "Master suite", cls: `${BIG} ${R} top-[148vh]` },

  // Row 4
  { src: img("hos-10"), alt: "Balcony", cls: `${SMALL} ${L} top-[228vh]` },
  { src: img("hos-11"), alt: "Open plan living", cls: `${BIG} ${C} top-[224vh]` },
  { src: img("hos-12"), alt: "Study nook", cls: `${SMALL} ${R} top-[232vh]` },
];