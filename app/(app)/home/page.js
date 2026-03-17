'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { exercises } from '../../../data/mock'

function StarBar({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xl ${i < count ? 'opacity-100' : 'opacity-20'}`}>⭐</span>
      ))}
    </div>
  )
}

export default function ChildHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4F6BED] via-[#6B7FEF] to-[#8A6FF1] flex flex-col items-center px-6 py-10 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-8 text-4xl opacity-20 float">☁️</div>
        <div className="absolute top-16 right-12 text-3xl opacity-15 float" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-32 left-1/4 text-2xl opacity-10 float" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute bottom-32 right-8 text-3xl opacity-10 float" style={{ animationDelay: '1.5s' }}>🌟</div>
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex justify-between items-center mb-8"
      >
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
          <span className="text-xl">⭐</span>
          <span className="text-white font-bold">120 pts</span>
        </div>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
          <span className="text-xl">🔥</span>
          <span className="text-white font-bold">3 jours</span>
        </div>
        <Link href="/login">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-2 text-white text-xs hover:bg-white/30 transition-all">
            ↩ Retour
          </div>
        </Link>
      </motion.div>

      {/* Avatar + Welcome */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-8xl mb-4"
        >
          🧒
        </motion.div>
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Bonjour Lucas ! 👋
        </h1>
        <p className="text-white/80 text-lg font-medium">
          Prêt pour aujourd'hui ?
        </p>
        <div className="flex justify-center mt-3">
          <StarBar count={3} />
        </div>
      </motion.div>

      {/* Exercise cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-4"
      >
        <p className="text-white/70 text-sm font-medium text-center mb-2">
          Tes exercices du jour
        </p>

        {exercises.map((exercise, i) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className={`bg-gradient-to-r ${exercise.color} p-5 flex items-center gap-4`}>
              <motion.span
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                className="text-5xl"
              >
                {exercise.emoji}
              </motion.span>
              <div className="text-white">
                <h3 className="text-xl font-extrabold">{exercise.title}</h3>
                <p className="text-white/80 text-sm">{exercise.level} · {exercise.type}</p>
              </div>
              <div className="ml-auto">
                <span className="bg-white/30 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  {exercise.phoneme}
                </span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {exercise.words.length} mots · ~5 min
                </span>
              </div>
              <Link href={`/exercise/${exercise.id}`}>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  Start ▶
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-white/50 text-xs text-center"
      >
        <Link href="/dashboard" className="hover:text-white/70 transition-colors">
          Mode orthophoniste →
        </Link>
      </motion.div>
    </div>
  )
}
