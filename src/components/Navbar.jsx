import { useState } from "react";

const NAV_LINKS = ["Home", "About", "Process", "Services", "Projects", "Gallery"];

function CTA({ className = "" }) {
    return (
        <a
            href="#contact"
            className={`group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#0c0c14] transition hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,255,255,0.22)] ${className}`}
        >
            <span>Book a Consultation</span>
            <span className="grid size-6 place-items-center rounded-full bg-[#1a8cff] transition-transform group-hover:translate-x-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </a>
    );
}

export default function Navbar() {
    const [active, setActive] = useState("Gallery");
    const [open, setOpen] = useState(false);

    const handleClick = (link) => {
        setActive(link);
        setOpen(false);
    };

    return (
        <header
            className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-[940px] -translate-x-1/2 items-center justify-between gap-4
                 rounded-[28px] border border-white/10 bg-[#0e0e16]/50 py-1.5 pl-5 pr-1.5
                 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                 backdrop-blur-xl backdrop-saturate-[170%]
                 lg:rounded-full lg:pl-6"
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
                        className={`rounded-full px-4 py-1.5 text-[14px] font-medium tracking-[-0.01em] text-white/85 transition-colors hover:bg-white/10 hover:text-white ${active === link ? "!bg-white/[0.16] !text-white" : ""
                            }`}
                    >
                        {link}
                    </a>
                ))}
            </nav>

            {/* Divider (desktop) */}
            <span className="hidden h-4 w-px bg-white/15 lg:block" />

            {/* CTA (desktop) */}
            <CTA className="hidden lg:inline-flex" />

            {/* Burger (mobile) */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="flex size-9 cursor-pointer flex-col justify-center gap-[5px] rounded-full bg-white/10 px-2.5 lg:hidden"
            >
                <span
                    className={`h-[1.5px] rounded bg-white transition-transform duration-300 ${open ? "translate-y-[3.25px] rotate-45" : ""
                        }`}
                />
                <span
                    className={`h-[1.5px] rounded bg-white transition-transform duration-300 ${open ? "-translate-y-[3.25px] -rotate-45" : ""
                        }`}
                />
            </button>

            {/* Mobile menu */}
            <div
                className={`absolute inset-x-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-[24px] border border-white/10 bg-[#0e0e16]/70 p-3
                    backdrop-blur-xl backdrop-saturate-[170%] transition duration-300 lg:hidden ${open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
            >
                {NAV_LINKS.map((link) => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onClick={() => handleClick(link)}
                        className={`rounded-full px-5 py-2.5 text-[15px] font-medium text-white ${active === link ? "bg-white/15" : ""
                            }`}
                    >
                        {link}
                    </a>
                ))}
                <CTA className="mt-1.5 justify-between" />
            </div>
        </header>
    );
}