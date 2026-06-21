import React from 'react'

/* mood: 'wave' | 'excited' | 'think' | 'celebrate' | 'scan' */
export default function Seal({ mood = 'wave', size = 120, className = '' }) {
  const expressions = {
    wave:      { eyes: '^^', mouth: 'D', flipper: true,  bubble: null },
    excited:   { eyes: '★★', mouth: 'D', flipper: true,  bubble: '!!!' },
    think:     { eyes: '..', mouth: 'o', flipper: false, bubble: '🤔' },
    celebrate: { eyes: '^^', mouth: 'D', flipper: true,  bubble: '🎉' },
    scan:      { eyes: '>>',  mouth: '-', flipper: false, bubble: null },
  }
  const ex = expressions[mood] || expressions.wave

  return (
    <div className={`seal-wrapper ${className}`} style={{ width: size, position: 'relative', display: 'inline-block' }}>
      {ex.bubble && (
        <div style={{
          position: 'absolute', top: -10, right: -10,
          background: 'var(--gold-light)',
          border: '2px solid var(--gold)',
          borderRadius: '50%',
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700,
          animation: 'bubblePop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          zIndex: 10,
        }}>
          {ex.bubble}
        </div>
      )}
      <svg
        viewBox="0 0 120 140"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        aria-label="Foca mascote CJR"
      >
        <style>{`
          @keyframes sealBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          @keyframes flipperWave { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-20deg)} }
          @keyframes bubblePop { from{transform:scale(0)} to{transform:scale(1)} }
          .seal-body { animation: sealBob 2s ease-in-out infinite; transform-origin: 60px 80px; }
          .seal-flipper-r { transform-origin: 90px 90px; ${ex.flipper ? 'animation: flipperWave 0.8s ease-in-out infinite;' : ''} }
        `}</style>

        {/* Shadow */}
        <ellipse cx="60" cy="136" rx="28" ry="5" fill="rgba(11,31,75,0.1)" />

        <g className="seal-body">
          {/* Body */}
          <ellipse cx="60" cy="88" rx="34" ry="42" fill="#1A3A7A" />

          {/* Belly */}
          <ellipse cx="60" cy="96" rx="20" ry="28" fill="#60A5FA" opacity="0.35" />

          {/* Left flipper */}
          <ellipse cx="30" cy="105" rx="10" ry="6" fill="#0B1F4B"
            transform="rotate(-30 30 105)" />

          {/* Right flipper (animated) */}
          <ellipse cx="90" cy="105" rx="10" ry="6" fill="#0B1F4B"
            transform="rotate(30 90 105)"
            className="seal-flipper-r" />

          {/* Tail */}
          <path d="M44 128 Q54 138 60 130 Q66 138 76 128" stroke="#0B1F4B" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Head */}
          <circle cx="60" cy="52" r="28" fill="#1A3A7A" />

          {/* Muzzle */}
          <ellipse cx="60" cy="63" rx="13" ry="9" fill="#60A5FA" opacity="0.4" />

          {/* Nose */}
          <ellipse cx="60" cy="59" rx="5" ry="3" fill="#0B1F4B" />

          {/* Whiskers left */}
          <line x1="35" y1="62" x2="50" y2="63" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <line x1="35" y1="66" x2="50" y2="65" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Whiskers right */}
          <line x1="85" y1="62" x2="70" y2="63" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <line x1="85" y1="66" x2="70" y2="65" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Eyes */}
          {mood === 'wave' || mood === 'celebrate' ? (
            <>
              <path d="M48 46 Q51 43 54 46" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M66 46 Q69 43 72 46" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'excited' ? (
            <>
              <text x="46" y="50" fill="#F59E0B" fontSize="12" fontWeight="800" textAnchor="middle">★</text>
              <text x="74" y="50" fill="#F59E0B" fontSize="12" fontWeight="800" textAnchor="middle">★</text>
            </>
          ) : mood === 'think' ? (
            <>
              <circle cx="51" cy="47" r="5" fill="white" />
              <circle cx="69" cy="47" r="5" fill="white" />
              <circle cx="53" cy="47" r="2.5" fill="#0B1F4B" />
              <circle cx="71" cy="47" r="2.5" fill="#0B1F4B" />
            </>
          ) : (
            <>
              <circle cx="51" cy="47" r="5" fill="white" />
              <circle cx="69" cy="47" r="5" fill="white" />
              <circle cx="55" cy="47" r="2.5" fill="#0B1F4B" />
              <circle cx="73" cy="47" r="2.5" fill="#0B1F4B" />
            </>
          )}

          {/* Mouth */}
          {mood === 'think' || mood === 'scan' ? (
            <line x1="55" y1="70" x2="65" y2="70" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          ) : (
            <path d="M52 68 Q60 76 68 68" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* CJR hat */}
          <rect x="38" y="24" width="44" height="6" rx="2" fill="#F59E0B" />
          <rect x="44" y="10" width="32" height="16" rx="3" fill="#0B1F4B" />
          <text x="60" y="22" fill="#60A5FA" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">CJR</text>
        </g>
      </svg>
    </div>
  )
}
