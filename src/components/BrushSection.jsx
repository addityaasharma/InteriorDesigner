import { useEffect, useRef } from "react";

// ---- Edit these ----
const TITLE = ["House", "of", "Styles"];
const SLOGAN = [
    "Residential,",
    "Commercial",
    "and",
    "Turn Key",
    "Interior Projects",
];
const ADDRESS = [
    "HOS Studio, Your Street Name",
    "Raipur, Chhattisgarh 491001, India",
];

const LINKS = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const STROKES = [
    { color: "#ff5c8a", w: 92, d: "M-80 120 C300 40 500 200 800 120 S1250 60 1520 140" },
    { color: "#ffb703", w: 92, d: "M1520 260 C1200 340 1000 180 700 270 S250 330 -80 250" },
    { color: "#2de2e6", w: 92, d: "M-80 400 C250 480 550 320 850 410 S1250 470 1520 380" },
    { color: "#7c5cff", w: 92, d: "M1520 540 C1150 460 950 620 650 540 S250 480 -80 560" },
    { color: "#34d399", w: 92, d: "M-80 680 C300 600 600 760 900 680 S1250 620 1520 700" },
    { color: "#ff7a45", w: 92, d: "M1520 820 C1200 880 900 740 600 830 S200 880 -80 800" },
];

// ---- Timing (0 to 1 of the animation progress) ----
const START_VISIBLE = 0.2; // animation starts when 20% of the section is visible
const DRAW_START_STEP = 0.055; // delay between each brush
const DRAW_DURATION = 0.3;
const TEXT_START = 0.6;

function Brush({ color }) {
    return (
        <g>
            <rect x="-9" y="-160" width="18" height="104" rx="9" fill="#c8915b" />
            <rect x="-9" y="-160" width="7" height="104" rx="3.5" fill="#e0ad7a" opacity=".6" />
            <rect x="-15" y="-60" width="30" height="22" rx="3" fill="#b9bcc4" />
            <rect x="-15" y="-52" width="30" height="3" fill="#8e929b" />
            <path d="M-14 -40 L14 -40 L11 -8 Q0 8 -11 -8 Z" fill={color} />
            <path d="M-14 -40 L-6 -40 L-5 -4 Q-9 -6 -11 -8 Z" fill="#fff" opacity=".25" />
        </g>
    );
}

// Fade + slide up, driven by --t
const fade = (delay) => {
    const p = `clamp(0, calc((var(--t) - ${delay}) * 3), 1)`;
    return {
        opacity: p,
        transform: `translateY(calc((1 - ${p}) * 24px))`,
    };
};

// Rise from behind a mask, driven by --t
const rise = (delay) => ({
    transform: `translateY(calc((1 - clamp(0, calc((var(--t) - ${delay}) * 3), 1)) * 115%))`,
});

export default function BrushSection() {
    const sectionRef = useRef(null);
    const pathRefs = useRef([]);
    const brushRefs = useRef([]);
    const strokesRef = useRef(null);
    const clickRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const lengths = pathRefs.current.map((p) => p.getTotalLength());

        let frame;
        const update = () => {
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = rect.height - vh;

            // Progress is 0 when 20% of the section is visible
            // (its top is at 80% of the viewport) and 1 when the pinned scroll ends.
            const startTop = vh * (1 - START_VISIBLE);
            const raw = clamp((startTop - rect.top) / (startTop + total));

            STROKES.forEach((_, i) => {
                const path = pathRefs.current[i];
                const brush = brushRefs.current[i];
                const t = clamp((raw - i * DRAW_START_STEP) / DRAW_DURATION);
                const p = easeInOut(t);

                path.style.strokeDashoffset = String(1 - p);
                path.style.opacity = p > 0.001 ? "1" : "0";

                const pt = path.getPointAtLength(p * lengths[i]);
                brush.setAttribute(
                    "transform",
                    `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(28) scale(1.9)`
                );
                const leave = 1 - clamp((raw - 0.55) / 0.08);
                brush.style.opacity = t > 0 ? String(leave) : "0";
            });

            // Strokes soften so the text stays readable on white
            const soften = clamp((raw - 0.57) / 0.2);
            strokesRef.current.style.opacity = String(1 - soften * 0.85);

            const t = clamp((raw - TEXT_START) / 0.36);
            section.style.setProperty("--t", t.toFixed(4));

            // Links and button are only clickable once visible
            if (clickRef.current) {
                clickRef.current.style.pointerEvents = t > 0.8 ? "auto" : "none";
            }
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
        <section
            id="about"
            ref={sectionRef}
            style={{ "--t": 0 }}
            className="relative h-[400vh] bg-white"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Strokes + brushes */}
                <svg
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 size-full"
                    aria-hidden="true"
                >
                    <g ref={strokesRef}>
                        {STROKES.map((s, i) => (
                            <path
                                key={i}
                                ref={(el) => (pathRefs.current[i] = el)}
                                d={s.d}
                                pathLength="1"
                                fill="none"
                                stroke={s.color}
                                strokeWidth={s.w}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 }}
                            />
                        ))}
                    </g>

                    {STROKES.map((s, i) => (
                        <g
                            key={i}
                            ref={(el) => (brushRefs.current[i] = el)}
                            style={{ opacity: 0 }}
                            className="drop-shadow-[0_10px_12px_rgba(0,0,0,0.25)]"
                        >
                            <Brush color={s.color} />
                        </g>
                    ))}
                </svg>

                {/* Content */}
                <div
                    ref={clickRef}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-24 text-center"
                    style={{ pointerEvents: "none" }}
                >
                    <h2
                        aria-label={TITLE.join(" ")}
                        className="text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#0b0b12]"
                    >
                        {TITLE.map((word, i) => (
                            <span
                                key={word}
                                aria-hidden="true"
                                className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
                            >
                                <span
                                    className="inline-block will-change-transform"
                                    style={rise(i * 0.1)}
                                >
                                    {word === "Styles" ? (
                                        <span className="bg-gradient-to-r from-[#ff5c8a] via-[#7c5cff] to-[#2de2e6] bg-clip-text text-transparent">
                                            {word}
                                        </span>
                                    ) : (
                                        word
                                    )}
                                </span>
                            </span>
                        ))}
                    </h2>

                    <p
                        aria-label={SLOGAN.join(" ")}
                        className="mt-5 max-w-[26ch] text-[clamp(1.05rem,2vw,1.7rem)] font-medium leading-snug tracking-[-0.02em] text-[#0b0b12]/80 sm:max-w-none"
                    >
                        {SLOGAN.map((word, i) => (
                            <span
                                key={word}
                                aria-hidden="true"
                                className="mr-[0.3em] inline-block overflow-hidden pb-[0.15em] align-bottom last:mr-0"
                            >
                                <span
                                    className="inline-block will-change-transform"
                                    style={rise(0.4 + i * 0.06)}
                                >
                                    {word}
                                </span>
                            </span>
                        ))}
                    </p>

                    {/* Address */}
                    <address
                        style={fade(0.62)}
                        className="mt-6 text-[15px] not-italic leading-relaxed text-[#0b0b12]/60"
                    >
                        {ADDRESS.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </address>

                    {/* Contact button */}
                    <a
                        href="#contact"
                        style={fade(0.72)}
                        className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#0b0b12] py-3 pl-7 pr-3 text-[15px] font-semibold text-white transition-shadow hover:shadow-[0_10px_28px_rgba(11,11,18,0.3)]"
                    >
                        Contact Us
                        <span className="grid size-7 place-items-center rounded-full bg-[#1a8cff] transition-transform group-hover:translate-x-0.5">
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
                </div>

                {/* Page links (bottom) */}
                <nav
                    aria-label="Footer"
                    style={fade(0.85)}
                    className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 border-t border-black/10 px-6 py-5"
                >
                    <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
                        {LINKS.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="text-[14px] text-[#0b0b12]/60 transition-colors hover:text-[#0b0b12]"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="text-[12px] text-black">
                        © 2026 House of Styles. All rights reserved.
                    </p>
                </nav>
            </div>
        </section>
    );
}