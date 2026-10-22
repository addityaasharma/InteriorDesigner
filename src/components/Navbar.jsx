import { useEffect, useState } from "react";

// ---- Edit these ----
const WHATSAPP_NUMBER = "+919319925777"; // country code + number, no "+" or spaces
const PHONE_NUMBER = "+919319925777"; // used for the tel: link
const WHATSAPP_MESSAGE = "Hi HOS, I'd like to book a consultation.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const NAV_LINKS = ["Home", "About", "Process", "Services", "Projects", "Gallery"];
const SCROLL_THRESHOLD = 40;

/* ---------- Icons ---------- */
function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.4-2.2-1-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-1-2.2L9 8.5Z" fill="#fff" stroke="none" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ---------- Book a Consultation -> WhatsApp ---------- */
function CTA({ className = "", onClick }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#0c0c14] transition hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,255,255,0.22)] ${className}`}
    >
      <span>Book a Consultation</span>
      <span className="grid size-6 place-items-center rounded-full bg-[#25d366] transition-transform group-hover:rotate-12 group-hover:scale-110">
        <WhatsAppIcon size={13} />
      </span>
    </a>
  );
}

/* ---------- Call Now ---------- */
function CallButton({ className = "", onClick }) {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 py-2 px-4 text-[13.5px] font-semibold tracking-[-0.01em] text-white transition hover:bg-white/20 ${className}`}
    >
      <PhoneIcon size={15} />
      <span>Call Now</span>
    </a>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Gallery");
  const [open, setOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolled) setOpen(false);
    else setFabOpen(false);
  }, [scrolled]);

  useEffect(() => {
    if (!fabOpen) return;
    const onKey = (e) => e.key === "Escape" && setFabOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fabOpen]);

  const handleClick = (link) => {
    setActive(link);
    setOpen(false);
    setFabOpen(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-[980px] -translate-x-1/2 items-center justify-between gap-4
                 rounded-[28px] border border-white/10 bg-[#0e0e16]/50 py-1.5 pl-5 pr-1.5
                 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                 backdrop-blur-xl backdrop-saturate-[170%]
                 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                 lg:rounded-full lg:pl-6 ${
                   scrolled
                     ? "max-lg:pointer-events-none max-lg:-translate-y-[160%] max-lg:opacity-0"
                     : ""
                 }`}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="HOS home"
          className="group flex select-none items-center font-display text-[1.6rem] leading-none tracking-wide"
        >
          <span
            className="inline-block -rotate-[5deg] text-[#ff5c8a] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     [text-shadow:1px_1px_0_#a3134a,2px_2px_0_#a3134a,3px_3px_0_rgba(0,0,0,0.25)]
                     group-hover:-translate-y-0.5 group-hover:-rotate-[10deg] group-hover:scale-110"
          >
            HO
          </span>
          <span
            className="ml-0.5 inline-block -translate-y-px rotate-[5deg] text-[#2de2e6] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     [text-shadow:1px_1px_0_#0b6e79,2px_2px_0_#0b6e79,3px_3px_0_rgba(0,0,0,0.25)]
                     group-hover:-translate-y-1 group-hover:rotate-[10deg] group-hover:scale-110"
          >
            S
          </span>
        </a>

        {/* Center links (desktop) */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-0.5 rounded-full border border-white/[0.05] bg-white/[0.06] p-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => handleClick(link)}
              className={`rounded-full px-4 py-1.5 text-[14px] font-medium tracking-[-0.01em] text-white/85 transition-colors hover:bg-white/10 hover:text-white ${
                active === link ? "!bg-white/[0.16] !text-white" : ""
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Divider (desktop) */}
        <span className="hidden h-4 w-px bg-white/15 lg:block" />

        {/* Call (desktop: compact round icon) */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call now"
          title="Call now"
          className="hidden size-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20 lg:grid"
        >
          <PhoneIcon size={15} />
        </a>

        {/* CTA (desktop) */}
        <CTA className="hidden lg:inline-flex" />

        {/* Burger (mobile, top of page) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex size-9 cursor-pointer flex-col justify-center gap-[5px] rounded-full bg-white/10 px-2.5 lg:hidden"
        >
          <span
            className={`h-[1.5px] rounded bg-white transition-transform duration-300 ${
              open ? "translate-y-[3.25px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] rounded bg-white transition-transform duration-300 ${
              open ? "-translate-y-[3.25px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Mobile dropdown (top of page) */}
        <div
          className={`absolute inset-x-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-[24px] border border-white/10 bg-[#0e0e16]/70 p-3
                    backdrop-blur-xl backdrop-saturate-[170%] transition duration-300 lg:hidden ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => handleClick(link)}
              className={`rounded-full px-5 py-2.5 text-[15px] font-medium text-white ${
                active === link ? "bg-white/15" : ""
              }`}
            >
              {link}
            </a>
          ))}
          <CTA className="mt-1.5 justify-between" onClick={() => setOpen(false)} />
          <CallButton className="mt-1" onClick={() => setOpen(false)} />
        </div>
      </header>

      {/* ================= FLOATING MENU (mobile only) ================= */}
      <div className="lg:hidden">
        <div
          onClick={() => setFabOpen(false)}
          className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
            fabOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <nav
          aria-label="Quick navigation"
          className={`fixed bottom-[88px] right-4 z-50 flex w-[min(260px,calc(100vw-2rem))] origin-bottom-right flex-col gap-1 rounded-[26px] border border-white/10 bg-[#0e0e16]/80 p-3
                      shadow-[0_16px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-[170%]
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
                        fabOpen
                          ? "pointer-events-auto scale-100 opacity-100"
                          : "pointer-events-none scale-75 opacity-0"
                      }`}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => handleClick(link)}
              style={{ transitionDelay: fabOpen ? `${i * 35}ms` : "0ms" }}
              className={`rounded-full px-5 py-2.5 text-[15px] font-medium text-white transition-all duration-300 ${
                active === link ? "bg-white/15" : "active:bg-white/10"
              } ${fabOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              {link}
            </a>
          ))}
          <CTA className="mt-1.5 justify-between" onClick={() => setFabOpen(false)} />
          <CallButton className="mt-1" onClick={() => setFabOpen(false)} />
        </nav>

        <button
          onClick={() => setFabOpen(!fabOpen)}
          aria-label={fabOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={fabOpen}
          className={`fixed bottom-5 right-4 z-50 grid size-[56px] place-items-center rounded-full border border-white/15 bg-[#0e0e16]/70
                      shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-[170%]
                      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 ${
                        scrolled
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-0 opacity-0"
                      }`}
        >
          <span className="relative block size-[18px]">
            <span
              className={`absolute left-0 top-[5px] h-[1.8px] w-full rounded bg-white transition-transform duration-300 ${
                fabOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[1.8px] w-full rounded bg-white transition-transform duration-300 ${
                fabOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </>
  );
}