import { useEffect, useRef, useState } from "react";
import useInView from "../hooks/useInView";
import { CATEGORIES, galleryItems } from "../data/gallery";

// ---- Edit these ----
const ABOUT_TEXT =
  "House of Styles is an interior design studio creating homes and workspaces that feel personal, look timeless and work beautifully every day. From the first sketch to the final handover, we take care of every detail.";

const STATS = [
  { value: 150, suffix: "+", label: "Projects completed" },
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 100, suffix: "%", label: "Turn key delivery" },
];

const SERVICES = ["Residential", "Commercial", "Turn Key"];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/* ---------- Animated number ---------- */
function Counter({ value, suffix }) {
  const [ref, inView] = useInView(0.6);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / 1400);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- Statement that lights up word by word on scroll ---------- */
function ScrollText({ text }) {
  const pRef = useRef(null);
  const wordRefs = useRef([]);
  const words = text.split(" ");

  useEffect(() => {
    let frame;
    const update = () => {
      const el = pRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const p = clamp((vh * 0.85 - rect.top) / (vh * 0.2 + rect.height * 0.8));
      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        const v = clamp(p * words.length * 1.15 - i);
        w.style.opacity = String(0.15 + 0.85 * v);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p
      ref={pRef}
      aria-label={text}
      className="mx-auto max-w-[24ch] text-center text-[clamp(1.7rem,4.2vw,3.6rem)] font-medium leading-[1.15] tracking-[-0.035em] text-[#0b0b12] sm:max-w-[30ch]"
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => (wordRefs.current[i] = el)}
          className="inline-block"
          style={{ opacity: 0.15, marginRight: "0.26em" }}
        >
          {w}
        </span>
      ))}
    </p>
  );
}

/* ---------- Gallery tile ---------- */
function Tile({ item, index, onOpen }) {
  const [ref, inView] = useInView(0.08);
  return (
    <figure
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      className={`group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8e4dc] transition-all duration-700 motion-reduce:transition-none sm:mb-4 ${EASE} ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <button
        onClick={() => onOpen(item.id)}
        aria-label={`Open ${item.title}`}
        className="block w-full cursor-zoom-in text-left"
      >
        <div className={`overflow-hidden ${item.ratio}`}>
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            draggable="false"
            className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
          />
        </div>

        {/* Overlay: always visible on touch screens, on hover for desktop */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/65 via-black/5 to-transparent p-3 opacity-100 transition-opacity duration-500 sm:p-4 md:opacity-0 md:group-hover:opacity-100">
          <div className="min-w-0 translate-y-0 transition-transform duration-500 md:translate-y-3 md:group-hover:translate-y-0">
            <span className="mb-1.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10.5px] font-medium text-white backdrop-blur-md sm:text-[11px]">
              {item.category}
            </span>
            <h3 className="truncate text-[14px] font-medium tracking-[-0.01em] text-white sm:text-[16px]">
              {item.title}
            </h3>
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-500 md:scale-0 md:group-hover:scale-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </div>
      </button>
    </figure>
  );
}

/* ---------- Full-screen viewer ---------- */
function Lightbox({ items, index, onClose, onNav }) {
  const touchX = useRef(null);
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  const arrow = (dir) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onNav(dir);
      }}
      aria-label={dir > 0 ? "Next photo" : "Previous photo"}
      className={`absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 md:grid ${
        dir > 0 ? "right-6" : "left-6"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir > 0 ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
      </svg>
    </button>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0b0b12]/90 p-4 backdrop-blur-xl"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 md:right-6 md:top-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {arrow(-1)}
      {arrow(1)}

      <img
        key={item.id}
        src={item.src}
        alt={item.title}
        onClick={(e) => e.stopPropagation()}
        draggable="false"
        className="max-h-[72vh] max-w-full animate-[lbIn_0.45s_cubic-bezier(0.22,1,0.36,1)] rounded-2xl object-contain shadow-2xl md:max-h-[78vh] md:max-w-[min(1000px,80vw)]"
      />

      <div className="mt-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <p className="text-[12px] uppercase tracking-[0.18em] text-white/50">{item.category}</p>
        <h3 className="mt-1 text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
        <p className="mt-2 text-[13px] text-white/50">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function GalleryAbout() {
  const [cat, setCat] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [aboutRef, aboutIn] = useInView(0.2);
  const [headRef, headIn] = useInView(0.3);

  const items =
    cat === "All" ? galleryItems : galleryItems.filter((g) => g.category === cat);
  const openIndex = items.findIndex((g) => g.id === openId);

  const nav = (dir) => {
    if (openIndex < 0) return;
    const next = (openIndex + dir + items.length) % items.length;
    setOpenId(items[next].id);
  };

  return (
    <section id="gallery" className="relative overflow-x-clip bg-[#f4f2ee] pb-24 pt-28 md:pb-32 md:pt-40">
      <style>{`@keyframes lbIn{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:none}}`}</style>

      {/* ============ ABOUT ============ */}
      <div id="about" ref={aboutRef} className="px-5">
        <div
          className={`mb-8 flex justify-center transition-all duration-700 ${EASE} ${
            aboutIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-[12.5px] font-medium tracking-[0.02em] text-[#0b0b12]/70">
            About HOS
          </span>
        </div>

        <ScrollText text={ABOUT_TEXT} />

        {/* Services chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {SERVICES.map((s, i) => (
            <span
              key={s}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`rounded-full bg-[#0b0b12] px-5 py-2 text-[14px] font-medium text-white transition-all duration-700 ${EASE} ${
                aboutIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-8">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 text-center sm:px-6">
              <div className="text-[clamp(1.9rem,5.5vw,4rem)] font-medium leading-none tracking-[-0.05em] text-[#0b0b12]">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-[12px] text-[#0b0b12]/55 sm:text-[14px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ GALLERY ============ */}
      <div className="mx-auto mt-28 max-w-[1400px] px-3 sm:px-6 md:mt-40">
        <div ref={headRef} className="mb-10 flex flex-col items-center px-2 text-center md:mb-14">
          <h2
            className={`text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#0b0b12] transition-all duration-1000 ${EASE} ${
              headIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Our <span className="bg-gradient-to-r from-[#ff5c8a] via-[#7c5cff] to-[#2de2e6] bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p
            className={`mt-3 max-w-[40ch] text-[15px] text-[#0b0b12]/55 transition-all delay-150 duration-1000 ${EASE} ${
              headIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            A look at spaces we've designed and delivered.
          </p>

          {/* Filters */}
          <div
            role="tablist"
            aria-label="Filter gallery"
            className="mt-8 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-300 ${
                  cat === c
                    ? "bg-[#0b0b12] text-white shadow-lg"
                    : "bg-white text-[#0b0b12]/70 hover:bg-white hover:text-[#0b0b12] hover:shadow-md"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry */}
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {items.map((item, i) => (
            <Tile key={item.id} item={item} index={i} onOpen={setOpenId} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-20 text-center text-[#0b0b12]/50">No projects in this category yet.</p>
        )}
      </div>

      {openIndex >= 0 && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenId(null)}
          onNav={nav}
        />
      )}
    </section>
  );
}