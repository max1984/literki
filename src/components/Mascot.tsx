import { motion } from 'framer-motion'

export type MascotMood = 'idle' | 'happy' | 'excited'

const BOUNCE = {
  idle: { y: [0, -6, 0] },
  happy: { y: [0, -14, 0], rotate: [0, -6, 6, 0] },
  excited: { y: [0, -22, 0], rotate: [0, -10, 10, 0] },
}

/** Sówka-przewodnik — rysowana prostymi kształtami SVG, żeby nie zależeć
 * od żadnych zewnętrznych grafik/licencji. */
export function Mascot({ mood = 'idle', size = 120 }: { mood?: MascotMood; size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      animate={BOUNCE[mood]}
      transition={{ duration: mood === 'idle' ? 2.4 : 0.6, repeat: mood === 'idle' ? Infinity : 0 }}
      role="img"
      aria-label="Sówka — przewodnik"
    >
      {/* ciało */}
      <ellipse cx="60" cy="68" rx="42" ry="40" fill="var(--color-owl)" />
      {/* brzuch */}
      <ellipse cx="60" cy="76" rx="26" ry="26" fill="#f3e6d2" />
      {/* uszy */}
      <path d="M26 30 L38 48 L18 48 Z" fill="var(--color-owl)" />
      <path d="M94 30 L82 48 L102 48 Z" fill="var(--color-owl)" />
      {/* oczy */}
      <circle cx="42" cy="56" r="16" fill="white" />
      <circle cx="78" cy="56" r="16" fill="white" />
      <motion.circle
        cx="42"
        cy="56"
        r="7"
        fill="#2b2b2b"
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
      />
      <motion.circle
        cx="78"
        cy="56"
        r="7"
        fill="#2b2b2b"
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
      />
      {/* dziób */}
      <path d="M60 64 L52 78 L68 78 Z" fill="var(--color-sun)" />
      {/* skrzydła */}
      <ellipse cx="22" cy="78" rx="10" ry="18" fill="var(--color-owl)" />
      <ellipse cx="98" cy="78" rx="10" ry="18" fill="var(--color-owl)" />
    </motion.svg>
  )
}
