import { useEffect, useRef } from "react";

// ---- Edit these ----
const EMAIL = "hello@hos-interiors.com";
const LOCATION = "Based in Raipur, Chhattisgarh, India";
const WHATSAPP = "https://wa.me/910000000000"; // country code + number, no "+"
const HEADING = "Design with HOS®";

// Better: download the image into src/assets and import it instead:
// import composition from "../assets/composition.png";
const COMPOSITION =
    "https://framerusercontent.com/images/Bre0q4jTfiM6isVYTOcC1CJjiEw.png";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* Staggered reveal driven by the --t variable */
const reveal = (delay) => {
    const p = `clamp(0, calc((var(--t) - ${delay}) * 3.2), 1)`;
    return {
        opacity: p,
        transform: `translateY(calc((1 - ${p}) * 36px))`,
    };
};

export default function Footer() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let frame;
        const update = () => {
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const raw = clamp(-rect.top / total);

            // 0 -> 0.12: hold. 0.12 -> 0.65: slide. 0.35 -> 0.9: text reveal.
            const slide = easeOut(clamp((raw - 0.12) / 0.53));
            const text = clamp((raw - 0.35) / 0.55);

            el.style.setProperty("--p", slide.toFixed(4));
            el.style.setProperty("--t", text.toFixed(4));
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
    }, []);

    return (
        <footer
            id="contact"
            ref={sectionRef}
            style={{ "--p": 0, "--t": 0 }}
            className="relative h-[280vh] bg-[#f7f7f7]"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Product composition (single image) */}
                <div className="absolute inset-0 grid place-items-center">
                    <div
                        className="w-[min(86vw,900px)] will-change-transform
                       max-md:[transform:translateY(calc(var(--p)*-16vh))_scale(calc(1-var(--p)*0.25))]
                       md:w-[min(62vw,900px)]
                       md:[transform:translateX(calc(var(--p)*24vw))_scale(calc(1-var(--p)*0.1))]"
                    >
                        <img
                            src={COMPOSITION}
                            alt="Wallpaper, lamp, door, paint, flooring and chair"
                            draggable="false"
                            className="h-auto max-h-[80vh] w-full animate-float object-contain motion-reduce:animate-none"
                        />
                    </div>
                </div>

                {/* Left content */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col px-6 pb-8 md:inset-y-0 md:justify-end md:px-10 md:pb-10">
                    <div className="pointer-events-auto md:mb-auto md:mt-[34vh]">
                        <a
                            href={`mailto:${EMAIL}`}
                            style={reveal(0)}
                            className="block text-[clamp(1.1rem,2vw,1.9rem)] tracking-[-0.03em] text-[#0b0b12]"
                        >
                            {EMAIL}
                        </a>
                        <p
                            style={reveal(0.08)}
                            className="text-[clamp(1.1rem,2vw,1.9rem)] tracking-[-0.03em] text-[#0b0b12]/40"
                        >
                            {LOCATION}
                        </p>

                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noreferrer"
                            style={reveal(0.18)}
                            className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25d366] py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-white transition-shadow hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)]"
                        >
                            Chat on WhatsApp
                            <span className="grid size-8 place-items-center rounded-full bg-white/25 transition-transform group-hover:rotate-12 group-hover:scale-110">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" />
                                    <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.4-2.2-1-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-1-2.2L9 8.5Z" fill="#fff" stroke="none" />
                                </svg>
                            </span>
                        </a>
                    </div>

                    <h2
                        style={reveal(0.3)}
                        className="mt-10 text-[clamp(2.6rem,8vw,7.5rem)] font-medium leading-none tracking-[-0.05em] text-[#0b0b12] md:mt-0"
                    >
                        {HEADING}
                    </h2>
                </div>

                <p
                    style={reveal(0.5)}
                    className="absolute bottom-5 right-6 z-20 hidden text-sm text-[#0b0b12]/40 md:block"
                >
                    © 2026 HOS. All rights reserved.
                </p>
            </div>
        </footer>
    );
}