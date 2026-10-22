import { heroImages } from "../data/heroImages";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[300vh] overflow-x-clip bg-[#f4f2ee]"
    >
      {/* Photos: scroll normally with the page */}
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

      {/* Text: pinned in the center until the section ends */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-[12ch] text-[clamp(2.4rem,5.2vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[#0b0b12] sm:max-w-[16ch]">
            Design spaces you'll love living in.
          </h1>

          <div className="pointer-events-auto mt-8 flex items-center gap-4">
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
        </div>
      </div>
    </section>
  );
}