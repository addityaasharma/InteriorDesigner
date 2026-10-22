import { useEffect, useRef, useState } from "react";
import { categories, avatars } from "../data/categories";
import useInView from "../hooks/useInView";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/* ---------- Single product card ---------- */
function ProductCard({ cat, index, inView, innerRef }) {
  const tiltRef = useRef(null);

  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    // spotlight position
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);

    // 3D tilt toward the cursor
    if (tiltRef.current) {
      tiltRef.current.style.transform = `perspective(700px) rotateX(${
        (0.5 - y) * 14
      }deg) rotateY(${(x - 0.5) * 14}deg) scale(1.06)`;
    }
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <article
      ref={innerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transitionDelay: `${300 + index * 110}ms` }}
      className={`group relative flex h-[420px] w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-sm bg-[#f5f5f5] p-5 transition-all duration-1000 sm:w-[350px] md:h-[500px] motion-reduce:transition-none ${EASE} ${
        inView ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
      }`}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(10,140,255,0.14), transparent 70%)",
        }}
      />

      <h3 className="relative text-[1.6rem] font-normal tracking-[-0.03em] text-[#0b0b12]">
        {cat.name}
      </h3>

      {/* Tilt wrapper */}
      <div className="relative grid flex-1 place-items-center">
        <div
          ref={tiltRef}
          className="w-[75%] transition-transform duration-200 ease-out will-change-transform"
        >
          {/* Floating image */}
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            draggable="false"
            style={{ animationDelay: `${index * -0.7}s` }}
            className="max-h-[260px] w-full animate-float rounded-lg object-cover drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)] motion-reduce:animate-none"
          />
        </div>
      </div>

      <button
        aria-label={`Explore ${cat.name}`}
        className="relative ml-auto grid size-10 place-items-center rounded-full bg-black transition-transform duration-300 hover:scale-110 group-hover:rotate-90"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v16M4 12h16"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </article>
  );
}

/* ---------- Section ---------- */
export default function Showcase() {
  const [sectionRef, inView] = useInView(0.2);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  const words = "Everything your space needs, in one place".split(" ");

  // Keep the pagination pill in sync with the scroll position
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const left = scroller.scrollLeft;
        let closest = 0;
        let min = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const diff = Math.abs(card.offsetLeft - 20 - left);
          if (diff < min) {
            min = diff;
            closest = i;
          }
        });
        const atEnd =
          scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4;
        setActive(atEnd ? categories.length - 1 : closest);
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (i) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[i];
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-x-clip bg-white pb-6 pt-28"
    >
      {/* Heading */}
      <div className="flex flex-col items-center px-6 text-center">
        {/* Pill */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full bg-[#f2f2f2] py-1 pl-1 pr-3.5 transition-all duration-700 motion-reduce:transition-none ${EASE} ${
            inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0"
          }`}
        >
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                style={{ transitionDelay: `${250 + i * 120}ms` }}
                className={`size-6 rounded-full border-2 border-[#f2f2f2] object-cover transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            ))}
          </div>
          <span className="text-[12.5px] font-medium tracking-[-0.01em] text-[#0b0b12]">
            Trusted by 150+ happy homeowners
          </span>
        </div>

        {/* Word-by-word reveal */}
        <h2
          aria-label="Everything your space needs, in one place"
          className="max-w-[18ch] text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[#0b0b12]"
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <span
                style={{ transitionDelay: `${150 + i * 90}ms` }}
                className={`inline-block transition-transform duration-[900ms] motion-reduce:transition-none ${EASE} ${
                  inView ? "translate-y-0" : "translate-y-[110%]"
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {/* Carousel */}
      <div
        ref={scrollerRef}
        className="mt-12 flex snap-x snap-mandatory gap-[15px] overflow-x-auto scroll-smooth px-5 py-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat, i) => (
          <ProductCard
            key={cat.id}
            cat={cat}
            index={i}
            inView={inView}
            innerRef={(el) => (cardRefs.current[i] = el)}
          />
        ))}
        <div className="w-1 shrink-0" />
      </div>

      {/* Bottom bar: pagination + scroll cue */}
      <div className="relative mt-4 flex flex-col items-center gap-5 px-5 md:min-h-[56px] md:flex-row md:items-start md:justify-between">
        <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${cat.name}`}
              aria-current={active === i}
              style={{ transitionDelay: inView ? "0ms" : `${i * 60}ms` }}
              className={`grid h-[30px] min-w-[30px] place-items-center rounded-full px-2.5 text-[12.5px] font-medium transition-all duration-300 ${
                active === i
                  ? "min-w-[43px] bg-[#0a8cff] text-white"
                  : "bg-[#e3f2ff] text-[#0a8cff] hover:bg-[#cfe8ff]"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <a
          href="#about"
          className="flex flex-col items-center text-[16px] tracking-[-0.01em] text-[#0a8cff] md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2"
        >
          Scroll to Explore
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-0.5 animate-bounce"
          >
            <path
              d="M5 9l7 7 7-7"
              stroke="#0a8cff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}