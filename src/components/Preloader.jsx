import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      aria-label="Loading"
      role="progressbar"
    >
      <div className="font-display text-7xl font-extrabold tracking-tight sm:text-8xl" aria-hidden="true">
        {['K', 'K'].map((c, i) => (
          <motion.span
            key={i}
            className="text-gradient inline-block"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <div className="mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-line/10">
        <motion.div
          className="h-full rounded-full bg-a1"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.15, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
