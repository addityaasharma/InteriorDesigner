import { heroImages } from "../data/heroImages";

const TALL = "aspect-[3/4]";
const SQUARE = "aspect-square";

function Headline({ className = "" }) {
  return (
    <h1 className={`font-medium tracking-[-0.04em] text-[#0b0b12] ${className}`}>
      Design spaces you'll love living in.
    </h1>
  );
}

function Buttons({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="#projects"
        className="text-[15px] font-medium text-[#0b0b12]/80 transition hover:text-[#0b0b12]"
      >
        View our work
      </a>
      <a
        href="#contact"
        className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#1a8cff] py-3 pl-6 pr-4 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(26,140,255,0.4)]"
      >
        Book a consultation
        <span className="grid size-5 place-items-center rounded-full bg-white/25 transition-transform group-hover/btn:translate-x-0.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}

/* Mobile photo */
function Photo({ index, ratio }) {
  const { src, alt } = heroImages[index];
  return (
    <div
      className={`overflow-hidden rounded-[22px] bg-[#e8e4dc] shadow-[0_10px_28px_rgba(0,0,0,0.12)] ${ratio}`}
    >
      <img
        src={src}
        alt={alt}
        loading={index < 4 ? "eager" : "lazy"}
        draggable="false"
        className="size-full object-cover"
      />
    </div>
  );
}

// [imageIndex, aspectRatio] per column
const LEFT = [
  [0, TALL], [3, SQUARE], [6, TALL], [9, SQUARE], [4, TALL], [7, SQUARE],
];
const RIGHT = [
  [1, SQUARE], [2, TALL], [5, SQUARE], [8, TALL], [10, SQUARE], [11, TALL],
];

export default function Hero() {
  return (
    <div id="home">
      {/* ================= MOBILE ================= */}
      <section className="relative overflow-x-clip bg-[#f4f2ee] md:hidden">
        {/* Photos: normal flow, two columns, scroll with the page */}
        <div className="grid grid-cols-2 gap-3 px-3 pb-24 pt-24">
          <div className="flex flex-col gap-3">
            {LEFT.map(([i, r]) => (
              <Photo key={i} index={i} ratio={r} />
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-28">
            {RIGHT.map(([i, r]) => (
              <Photo key={i} index={i} ratio={r} />
            ))}
          </div>
        </div>

        {/* Overlay covers the whole section; the inner box is pinned */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="sticky top-0 flex h-screen items-center justify-center px-6">
            <div className="flex w-full max-w-[320px] flex-col items-center rounded-[28px] border border-white/70 bg-white/85 px-6 py-7 text-center shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <Headline className="text-balance text-[2rem] leading-[1.08]" />
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#0b0b12]/60">
                Residential and commercial interiors, designed around the way
                you live.
              </p>

              <div className="pointer-events-auto mt-5 flex w-full flex-col items-stretch gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between rounded-full bg-[#1a8cff] py-3 pl-6 pr-3 text-[15px] font-semibold text-white"
                >
                  Book a consultation
                  <span className="grid size-6 place-items-center rounded-full bg-white/25">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <a
                  href="#projects"
                  className="text-[14px] font-medium text-[#0b0b12]/70"
                >
                  View our work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESKTOP (unchanged) ================= */}
      <section className="relative hidden h-[300vh] overflow-x-clip bg-[#f4f2ee] md:block">
        {heroImages.map(({ src, alt, cls }) => (
          <div
            key={src}
            className={`group absolute aspect-[4/5] overflow-hidden rounded-xl ${cls}`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              draggable="false"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}

        <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center px-6">
          <div className="flex flex-col items-center text-center">
            <Headline className="max-w-[16ch] text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[1.05]" />
            <Buttons className="pointer-events-auto mt-8" />
          </div>
        </div>
      </section>
    </div>
  );
}