// Shared tokens, wordmark, breathing bonsai, pixel grid

const Z = {
  offwhite: '#FAFAF7',
  white: '#FFFFFF',
  forest: '#0F1F1A',
  forestDeep: '#081310',
  lime: '#C8FF6B',
  slate: '#5A6F66',
  ember: '#F5A65B',
  sky: '#7BA7FF',
  violet: '#B8A4FF',
  coral: '#FF8FA3',
  sunshine: '#FFD66B',
  hairline: '#E8E4D8',
};

// Section-accent palettes — Tweaks-from switchable.
Z.palettes = {
  // brand book canonical — soft pastels
  book: {
    ember: '#F5A65B', sky: '#7BA7FF', violet: '#B8A4FF', coral: '#FF8FA3', sunshine: '#FFD66B',
  },
  // dialed up ~30% — same hues, more chroma, still harmonious
  punchier: {
    ember: '#F08947', sky: '#5B92FF', violet: '#A289FF', coral: '#FF6F8C', sunshine: '#FFC83A',
  },
  // electric — maxed-out, neon-adjacent, big contrast with lime
  electric: {
    ember: '#FF7A1A', sky: '#3D7AFF', violet: '#8A66FF', coral: '#FF4570', sunshine: '#FFB400',
  },
};

// Section-colors context — palette overrides for downstream components.
const ColorsCtx = React.createContext(null);

// Pixel grid background — subtle, brand-coherent
function PixelGrid({ color = 'rgba(15,31,26,0.045)', size = 16, style = {} }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

// Bonsai with breathing lime energy.
// Stacks: forest (or white) base logo + lime overlay masked by a moving gradient that travels up the branches.
// After each sweep, a brief "shatter+reform" glitch: CRT tear slices, lime pixel debris, contrast flash.
function BreathingBonsai({ size = 320, base = 'forest', glowLime = true, sweepSeconds = 4.5, glitch = true, glitchCycle = 9 }) {
  const baseSrc =
    base === 'forest' ? 'assets/logo-forest.png' :
    base === 'white' ? 'assets/logo-white.png' :
    base === 'black' ? 'assets/logo-black.png' :
    'assets/logo-lime.png';

  // unique id so multiple instances don't share animation phase
  const id = React.useMemo(() => 'bb-' + Math.random().toString(36).slice(2, 7), []);

  // ~12 random pixel debris positions (deterministic per instance)
  const debris = React.useMemo(() => {
    const rng = (() => { let s = id.charCodeAt(2) * 9301 + 49297; return () => (s = (s * 9301 + 49297) % 233280) / 233280; })();
    return Array.from({ length: 14 }, (_, i) => ({
      x: 12 + rng() * 76,            // % position
      y: 14 + rng() * 70,
      w: 3 + rng() * 6,              // size in px-equivalent (scaled by size below)
      delay: rng() * 80,             // ms within the glitch
    }));
  }, [id]);

  const glitchCycleSec = glitchCycle;  // seconds — glitch fires once per cycle

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }} aria-label="Zentopia bonsai">
      <style>{`
        @keyframes ${id}-sweep {
          0%   { -webkit-mask-position: 0 140%;        mask-position: 0 140%; opacity: 0.0; }
          15%  { opacity: 0.95; }
          85%  { opacity: 0.95; }
          100% { -webkit-mask-position: 0 -40%;        mask-position: 0 -40%; opacity: 0.0; }
        }
        @keyframes ${id}-breath {
          0%,100% { filter: drop-shadow(0 0 0px rgba(200,255,107,0.0)); }
          50%     { filter: drop-shadow(0 0 18px rgba(200,255,107,0.55)); }
        }
        /* whole-image shudder applied to wrapper */
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(3px, -2px) scale(1.025); }
          91%           { transform: translate(-4px, 1px) scale(0.975); }
          91.5%         { transform: translate(2px, 1px) scale(1.015); }
          92%           { transform: translate(-1px, 0) scale(0.99); }
          92.5%         { transform: translate(0, 0) scale(1); }
        }
        /* contrast/pixelation flash on the base image */
        @keyframes ${id}-pixelate {
          0%, 90%, 100% { filter: none; }
          90.6%         { filter: contrast(2.4) brightness(1.4) blur(0.5px); }
          91%           { filter: contrast(3.2) brightness(1.1) blur(1.2px); }
          91.6%         { filter: contrast(1.8) blur(0.6px); }
          92%           { filter: contrast(1.3); }
        }
        /* CRT tear slice — top third shifted left */
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.4%              { opacity: 0.85; transform: translate(8px, 0); }
          90.9%              { opacity: 0.7;  transform: translate(-6px, 0); }
          91.4%              { opacity: 0.6;  transform: translate(3px, 0); }
        }
        /* middle band */
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(-9px, 0); }
          91.0%              { opacity: 0.6; transform: translate(5px, 0); }
          91.5%              { opacity: 0.4; transform: translate(-2px, 0); }
        }
        /* bottom band */
        @keyframes ${id}-tear3 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.75; transform: translate(6px, 0); }
          91.1%              { opacity: 0.55; transform: translate(-3px, 0); }
        }
        /* lime pixel debris flash */
        @keyframes ${id}-debris {
          0%, 90%, 92%, 100% { opacity: 0; transform: scale(0.6); }
          90.5%              { opacity: 1;    transform: scale(1.0); }
          91.2%              { opacity: 0.55; transform: scale(1.15); }
          91.8%              { opacity: 0;    transform: scale(0.7); }
        }
        .${id}-breath { animation: ${id}-breath ${sweepSeconds * 1.2}s ease-in-out infinite; }
        .${id}-pixelate { animation: ${id}-pixelate ${glitchCycleSec}s steps(1,end) infinite; }
        .${id}-overlay {
          -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 85%);
                  mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 85%);
          -webkit-mask-size: 100% 220%;
                  mask-size: 100% 220%;
          -webkit-mask-repeat: no-repeat;
                  mask-repeat: no-repeat;
          animation: ${id}-sweep ${sweepSeconds}s ease-in-out infinite;
        }
        ${glitch ? `
          .${id}-shake   { animation: ${id}-shake   ${glitchCycleSec}s steps(1,end) infinite; transform-origin: 50% 50%; }
          .${id}-tear1   { animation: ${id}-tear1   ${glitchCycleSec}s steps(1,end) infinite; clip-path: polygon(0 18%, 100% 18%, 100% 38%, 0 38%); }
          .${id}-tear2   { animation: ${id}-tear2   ${glitchCycleSec}s steps(1,end) infinite; clip-path: polygon(0 46%, 100% 46%, 100% 60%, 0 60%); }
          .${id}-tear3   { animation: ${id}-tear3   ${glitchCycleSec}s steps(1,end) infinite; clip-path: polygon(0 72%, 100% 72%, 100% 88%, 0 88%); }
          .${id}-debris  { animation: ${id}-debris  ${glitchCycleSec}s steps(1,end) infinite; }
        ` : ''}
        @media (prefers-reduced-motion: reduce) {
          .${id}-overlay, .${id}-breath, .${id}-shake, .${id}-pixelate,
          .${id}-tear1, .${id}-tear2, .${id}-tear3, .${id}-debris { animation: none !important; }
        }
      `}</style>

      <div className={glitch ? `${id}-shake` : ''} style={{ position: 'absolute', inset: 0 }}>
        <img
          src={baseSrc}
          className={`${id}-breath ${glitch ? `${id}-pixelate` : ''}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          alt=""
        />
        {glowLime && (
          <img
            src="assets/logo-lime.png"
            className={`${id}-overlay`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            alt=""
          />
        )}
      </div>

      {glitch && (
        <React.Fragment>
          {/* CRT tear slices — lime-tinted via mix-blend-mode */}
          <img src="assets/logo-lime.png" className={`${id}-tear1`}
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
          <img src={baseSrc} className={`${id}-tear2`}
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} alt="" />
          <img src="assets/logo-lime.png" className={`${id}-tear3`}
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />

          {/* Lime pixel debris */}
          <div className={`${id}-debris`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
            {debris.map((d, i) => (
              <span key={i} style={{
                position: 'absolute',
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: `${(d.w / 100) * size}px`,
                height: `${(d.w / 100) * size}px`,
                background: Z.lime,
                boxShadow: `0 0 4px ${Z.lime}`,
              }} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// Wordmark config context — Tweaks panel pushes overrides here.
const WordmarkCtx = React.createContext(null);

// Compact wordmark for nav (icon + "zentopia").
// Defaults are baseline; live tweaks pull in via WordmarkCtx and override.
function Wordmark({
  size = 24,
  color = Z.forest,
  iconVariant,
  fontSize,
  gap,
  weight,
  tracking,
  iconScale, // visual scale multiplier on the icon (1 = nominal box)
  lockup = 'horizontal', // 'horizontal' | 'stacked'
}) {
  const ctx = React.useContext(WordmarkCtx) || {};
  const wmGap     = gap        ?? ctx.gap        ?? 5;
  const wmWeight  = weight     ?? ctx.weight     ?? 500;
  const wmTrack   = tracking   ?? ctx.tracking   ?? -0.035;
  const wmFontMul = ctx.fontMul ?? 0.9;
  const wmIconMul = iconScale ?? ctx.iconScale ?? 1;
  const wmLockup  = ctx.lockup ?? lockup;

  const iconSrc = iconVariant === 'lime' ? 'assets/logo-lime.png'
    : iconVariant === 'white' ? 'assets/logo-white.png'
    : iconVariant === 'black' ? 'assets/logo-black.png'
    : 'assets/logo-forest.png';

  // resolved metrics
  const resolvedFont = fontSize || Math.round(size * wmFontMul * 100) / 100;
  const iconBox = Math.round(size * wmIconMul * 100) / 100;

  const textEl = (
    <span style={{
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: wmWeight,
      fontSize: resolvedFont,
      letterSpacing: `${wmTrack}em`,
      color,
      lineHeight: 1,
    }}>zentopia</span>
  );
  const iconEl = (
    <img
      src={iconSrc}
      style={{ width: iconBox, height: iconBox, objectFit: 'contain', display: 'block' }}
      alt="zentopia logo"
    />
  );

  if (wmLockup === 'stacked') {
    return (
      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.max(2, wmGap * 0.5), color }}>
        {iconEl}{textEl}
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: wmGap, color }}>
      {iconEl}{textEl}
    </span>
  );
}

// Rotating subline w/ pixel-fade transition
function RotatingSubline({ messages, intervalMs = 3500, style = {}, color = Z.slate }) {
  const [i, setI] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setI(x => (x + 1) % messages.length);
        setFading(false);
      }, 280);
    }, intervalMs);
    return () => clearInterval(t);
  }, [messages.length, intervalMs]);
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      color,
      transition: 'filter 280ms ease, opacity 280ms ease',
      filter: fading ? 'blur(6px) contrast(0.4)' : 'blur(0) contrast(1)',
      opacity: fading ? 0.3 : 1,
      ...style,
    }}>
      {messages[i]}
    </span>
  );
}

// "TE" with lime pixel-block highlight + occasional glitch.
function GlitchTE({ fontSize, color = Z.forest, blockColor = Z.lime }) {
  return (
    <span style={{
      display: 'inline-block',
      position: 'relative',
      padding: '0 0.12em',
      background: blockColor,
      color: Z.forest,
      transform: 'skewX(-2deg)',
      boxShadow: `4px 4px 0 ${Z.forest}`,
    }}>
      <span style={{ display: 'inline-block', transform: 'skewX(2deg)' }}>TE</span>
    </span>
  );
}

// Section/eyebrow pixel label
function PixelLabel({ children, color = Z.ember, size = 11 }) {
  return (
    <span style={{
      fontFamily: '"Press Start 2P", system-ui, monospace',
      fontSize: size,
      color,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// CTA buttons
function CTAPrimary({ children, dark = false, size = 'md' }) {
  const padY = size === 'lg' ? '18px' : size === 'sm' ? '12px' : '15px';
  const padX = size === 'lg' ? '28px' : size === 'sm' ? '18px' : '22px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  return (
    <button style={{
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 700,
      fontSize: fs,
      letterSpacing: '-0.01em',
      background: Z.lime,
      color: Z.forest,
      border: 'none',
      padding: `${padY} ${padX}`,
      borderRadius: 8,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: dark ? `0 0 0 1px ${Z.lime}, 0 8px 32px -8px rgba(200,255,107,0.45)` : 'none',
      transition: 'transform 180ms ease, filter 180ms ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px) scale(1.015)'; e.currentTarget.style.filter = 'brightness(1.04)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.filter = ''; }}
    >
      {children}
    </button>
  );
}
function CTASecondary({ children, dark = false, size = 'md' }) {
  const padY = size === 'lg' ? '16px' : size === 'sm' ? '10px' : '13px';
  const padX = size === 'lg' ? '26px' : size === 'sm' ? '16px' : '20px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const fg = dark ? Z.offwhite : Z.forest;
  return (
    <button style={{
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 700,
      fontSize: fs,
      letterSpacing: '-0.01em',
      background: 'transparent',
      color: fg,
      border: `2px solid ${fg}`,
      padding: `${padY} ${padX}`,
      borderRadius: 8,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background 180ms ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(250,250,247,0.08)' : 'rgba(15,31,26,0.06)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}

// Tech-stack strip
function TechStackStrip({ dark = false, compact = false }) {
  const tools = ['OpenAI', 'Anthropic', 'n8n', 'OpenClaw', 'Hermes Agent', 'Midjourney', 'Kling', 'Gemini Nano Banana'];
  const fg = dark ? 'rgba(250,250,247,0.62)' : Z.slate;
  const border = dark ? 'rgba(250,250,247,0.10)' : Z.hairline;
  return (
    <div style={{
      borderTop: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
      padding: compact ? '12px 0' : '18px 0',
      display: 'flex',
      alignItems: 'center',
      gap: compact ? 18 : 32,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11,
        color: fg,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
        opacity: 0.85,
      }}>
        // eszközök
      </span>
      <div style={{ display: 'flex', gap: compact ? 18 : 28, alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {tools.map((t, idx) => (
          <span key={t} style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: compact ? 14 : 16,
            color: dark ? Z.offwhite : Z.forest,
            letterSpacing: '-0.01em',
            opacity: 0.88,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// Glitch text wrapper — shatter+reform effect, reusable.
// Wraps children (any element/text), adds shudder + 2 CRT-tear copies on a cycle.
function GlitchText({ children, cycle = 9, delay = 0 }) {
  const id = React.useMemo(() => 'gt-' + Math.random().toString(36).slice(2, 7), []);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(2px, -1px) scale(1.02); }
          91%           { transform: translate(-2px, 1px) scale(0.98); }
          91.5%         { transform: translate(1px, 0) scale(1.01); }
          92%           { transform: translate(0,0) scale(1); }
        }
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(5px, 0); }
          91%                { opacity: 0.55; transform: translate(-4px, 0); }
        }
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.85; transform: translate(-5px, 0); }
          91.1%              { opacity: 0.5;  transform: translate(3px, 0); }
        }
        .${id}-shake { animation: ${id}-shake ${cycle}s steps(1,end) ${delay}s infinite; display: inline-block; }
        .${id}-tear1 { animation: ${id}-tear1 ${cycle}s steps(1,end) ${delay}s infinite; clip-path: polygon(0 22%, 100% 22%, 100% 42%, 0 42%); position: absolute; inset: 0; pointer-events: none; }
        .${id}-tear2 { animation: ${id}-tear2 ${cycle}s steps(1,end) ${delay}s infinite; clip-path: polygon(0 58%, 100% 58%, 100% 80%, 0 80%); position: absolute; inset: 0; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake, .${id}-tear1, .${id}-tear2 { animation: none !important; }
        }
      `}</style>
      <span className={`${id}-shake`}>{children}</span>
      <span className={`${id}-tear1`} aria-hidden="true">{children}</span>
      <span className={`${id}-tear2`} aria-hidden="true">{children}</span>
    </span>
  );
}

// Tiny language toggle (HU · EN) for the nav. Cosmetic for now; wire to i18n later.
function LangSwitch({ value = 'HU', onChange, color, muted, dark = false }) {
  const fg = color || (dark ? Z.offwhite : Z.forest);
  const mu = muted || (dark ? 'rgba(250,250,247,0.45)' : 'rgba(15,31,26,0.45)');
  const Item = ({ code }) => (
    <button
      onClick={() => onChange && onChange(code)}
      aria-pressed={value === code}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '2px 3px',
        color: value === code ? fg : mu,
        fontWeight: value === code ? 700 : 500,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'color 180ms ease',
      }}
    >{code}</button>
  );
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      <Item code="HU" />
      <span style={{ color: mu, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.7 }}>·</span>
      <Item code="EN" />
    </div>
  );
}

Object.assign(window, { Z, PixelGrid, BreathingBonsai, Wordmark, WordmarkCtx, ColorsCtx, RotatingSubline, GlitchTE, GlitchText, PixelLabel, CTAPrimary, CTASecondary, TechStackStrip, LangSwitch });
