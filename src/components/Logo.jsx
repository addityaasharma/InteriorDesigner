const GOLD = "#b39d55";

/* showText = false -> icon only (best for the slim navbar) */
export function Logo({ showText = false, className = "" }) {
    return (
        <svg
            viewBox={showText ? "-4 -4 163 175" : "-4 -4 163 141"}
            role="img"
            aria-label="House of Style"
            className={className}
            fill="none"
            stroke={GOLD}
            strokeWidth="5"
            strokeLinejoin="miter"
            strokeLinecap="butt"
        >
            {/* Left and right bars of the H */}
            <rect x="2.5" y="2.5" width="50" height="130" />
            <rect x="102.5" y="2.5" width="50" height="130" />

            {/* Roof between the bars */}
            <path d="M52.5 84 L77.5 58 L102.5 84" />

            {showText && (
                <text
                    x="77.5"
                    y="162"
                    textAnchor="middle"
                    fill={GOLD}
                    stroke="none"
                    fontSize="17"
                    letterSpacing="1.5"
                    fontWeight="600"
                    style={{ fontFamily: "'Cinzel', Georgia, 'Times New Roman', serif" }}
                >
                    HOUSE OF STYLE
                </text>
            )}
        </svg>
    );
}

export default Logo;