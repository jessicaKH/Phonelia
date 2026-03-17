'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { exercises } from '../../../../data/mock'
import useStore from '../../../../lib/store'

// ── Mouth animation SVG ─────────────────────────────────────────────
function MouthHint({ isCorrect }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-2 mt-4"
    >
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Position de bouche</p>
      <div className="relative">
        <svg width="80" height="50" viewBox="0 0 80 50" className="drop-shadow-md">
          {/* Lips */}
          <ellipse cx="40" cy="25" rx="36" ry="18" fill="#FFB6C1" />
          <ellipse cx="40" cy="22" rx="34" ry="12" fill="#FF8FAB" />
          {/* Teeth */}
          <rect x="16" y="20" width="48" height="10" rx="3" fill="white" />
          {/* Tongue */}
          {!isCorrect && (
            <motion.ellipse
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              cx="40" cy="32" rx="18" ry="8" fill="#FF6B9D"
            />
          )}
        </svg>
        {!isCorrect && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="absolute -top-1 -right-1 text-lg"
          >
            👆
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ── Fake Camera Preview ───────────────────────────────────────────────
function FakeCamera() {
  const [dots, setDots] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d % 3) + 1), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-[200px] mx-auto mt-4"
    >
      <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-lg relative flex flex-col items-center justify-center">
        {/* Simulated camera noise */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #888 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        {/* Silhouette */}
        <div className="text-5xl opacity-60 relative z-10">👤</div>
        {/* Rec indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <span className="text-red-400 text-[10px] font-bold">CAM</span>
        </div>
        {/* Mouth outline box */}
        <motion.div
          animate={{ borderColor: ['#4F6BED', '#34C759', '#4F6BED'] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-7 border-2 rounded-lg"
          style={{ borderColor: '#4F6BED' }}
        />
      </div>
      <p className="text-center text-xs text-gray-400 mt-1.5">
        Compare ta bouche{'.'.repeat(dots)}
      </p>
    </motion.div>
  )
}

// ── Confetti ──────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#4F6BED', '#8A6FF1', '#34C759', '#FFC857', '#FF3B30'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: `${p.x}vw`, y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: 720, opacity: [1, 1, 0] }}
          transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'linear' }}
          style={{ position: 'absolute', width: p.size, height: p.size, background: p.color, borderRadius: 2 }}
        />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────
export default function ExercisePage() {
  const { id } = useParams()
  const router = useRouter()
  const exercise = exercises.find((e) => e.id === id)
  const setExerciseResult = useStore((s) => s.setExerciseResult)

  const [step, setStep] = useState('intro') // intro | exercise | recording | feedback | score | end
  const [wordIndex, setWordIndex] = useState(0)
  const [scores, setScores] = useState([])
  const [showCamera, setShowCamera] = useState(false)

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Exercice introuvable</p>
          <button onClick={() => router.push('/home')} className="text-primary hover:underline">← Retour</button>
        </div>
      </div>
    )
  }

  const currentWord = exercise.words[wordIndex]
  const currentEmoji = exercise.wordEmojis[wordIndex]
  const isCorrect = exercise.results[wordIndex]
  const isLastWord = wordIndex === exercise.words.length - 1

  const totalCorrect = scores.filter(Boolean).length
  const finalScore = Math.round((totalCorrect / exercise.words.length) * 100)

  const handleRecord = () => {
    setStep('recording')
    setTimeout(() => setStep('feedback'), 1500)
  }

  const handleNext = () => {
    const newScores = [...scores, isCorrect]
    setScores(newScores)
    setShowCamera(false)
    if (isLastWord) {
      setStep('score')
    } else {
      setWordIndex((i) => i + 1)
      setStep('exercise')
    }
  }

  const handleFinish = () => {
    setExerciseResult({ exercise, scores, finalScore, totalCorrect })
    setStep('end')
  }

  const bgClass = exercise.id === 'pirate-r'
    ? 'from-blue-900 via-blue-800 to-blue-700'
    : 'from-green-900 via-green-800 to-emerald-700'

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgClass} flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden`}>

      {/* BG deco */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-8 text-5xl opacity-10 float">{exercise.emoji}</div>
        <div className="absolute bottom-16 right-8 text-4xl opacity-10 float" style={{ animationDelay: '1s' }}>{exercise.emoji}</div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────── */}
        {step === 'intro' && (
          <motion.div key="intro"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-sm text-center"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-9xl mb-6"
            >
              {exercise.emoji}
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white mb-3">{exercise.title}</h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 mb-6">
              <p className="text-white text-base leading-relaxed">{exercise.story}</p>
            </div>
            <div className="flex gap-2 justify-center mb-6">
              <span className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-xl font-medium">
                📊 {exercise.level}
              </span>
              <span className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-xl font-medium">
                🔤 {exercise.phoneme}
              </span>
              <span className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-xl font-medium">
                📝 {exercise.words.length} mots
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('exercise')}
              className="w-full py-5 bg-accent text-gray-900 rounded-2xl font-extrabold text-xl shadow-xl hover:bg-accent/90 transition-all"
            >
              🚀 Commencer !
            </motion.button>
            <button onClick={() => router.push('/home')} className="text-white/50 text-sm mt-4 hover:text-white/80 transition-colors">
              ← Retour à l'accueil
            </button>
          </motion.div>
        )}

        {/* ── EXERCISE ──────────────────────────────────────── */}
        {step === 'exercise' && (
          <motion.div key={`exercise-${wordIndex}`}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-sm text-center"
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {exercise.words.map((_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full transition-all ${
                  i < wordIndex ? 'bg-accent' : i === wordIndex ? 'bg-white' : 'bg-white/25'
                }`} />
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-8xl mb-4"
            >
              {currentEmoji}
            </motion.div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
              <p className="text-white/70 text-sm mb-1">Dis ce mot :</p>
              <p className="text-5xl font-extrabold text-white tracking-widest">{currentWord}</p>
            </div>

            <p className="text-white/60 text-sm mb-6">{wordIndex + 1} / {exercise.words.length}</p>

            {/* Mic button */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleRecord}
              className="relative w-28 h-28 mx-auto bg-white rounded-full flex items-center justify-center text-5xl shadow-2xl hover:shadow-accent/30 active:bg-gray-50 transition-all"
            >
              🎤
            </motion.button>
            <p className="text-white/60 text-sm mt-4">Appuie et parle !</p>
          </motion.div>
        )}

        {/* ── RECORDING ─────────────────────────────────────── */}
        {step === 'recording' && (
          <motion.div key="recording"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-36 h-36 mx-auto bg-danger/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                className="w-24 h-24 bg-danger/40 rounded-full flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-danger rounded-full flex items-center justify-center text-3xl shadow-lg">
                  🎤
                </div>
              </motion.div>
            </motion.div>
            <p className="text-white text-xl font-bold">Enregistrement…</p>
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.12 }}
                  className="w-2 bg-white/70 rounded-full"
                  style={{ height: 28 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── FEEDBACK ──────────────────────────────────────── */}
        {step === 'feedback' && (
          <motion.div key="feedback"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-sm text-center"
          >
            <motion.div
              animate={{ rotate: isCorrect ? [0, -15, 15, -8, 0] : [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="text-7xl mb-4"
            >
              {isCorrect ? '🌟' : '😅'}
            </motion.div>

            {isCorrect ? (
              <>
                <h2 className="text-3xl font-extrabold text-accent mb-2">Bravo ! ⭐</h2>
                <p className="text-white/80 text-base mb-1">
                  Super, tu as bien dit <strong className="text-white">{currentWord}</strong> !
                </p>
                <p className="text-white/60 text-sm">Tu fais vibrer ta langue comme un champion ! 🏆</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold text-white mb-2">Presque !</h2>
                <p className="text-white/80 text-base mb-1">Essaie encore une fois 💪</p>
                <div className="bg-white/15 rounded-2xl p-4 text-left mb-3">
                  <p className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">💡 Conseil</p>
                  <p className="text-white text-sm">{exercise.hints[wordIndex]}</p>
                </div>
              </>
            )}

            {/* Mouth hint */}
            <MouthHint isCorrect={isCorrect} />

            {/* Camera toggle */}
            <button
              onClick={() => setShowCamera(!showCamera)}
              className="mt-4 text-white/60 text-xs border border-white/20 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all"
            >
              {showCamera ? '🙈 Masquer caméra' : '📷 Compare ta bouche'}
            </button>

            {showCamera && <FakeCamera />}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-6 w-full py-4 bg-white text-gray-800 rounded-2xl font-extrabold text-lg shadow-xl hover:bg-gray-50 transition-all"
            >
              {isLastWord ? '🎯 Voir mon score' : 'Suivant →'}
            </motion.button>
          </motion.div>
        )}

        {/* ── SCORE ─────────────────────────────────────────── */}
        {step === 'score' && (
          <motion.div key="score"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="w-full max-w-sm text-center"
          >
            <h2 className="text-2xl font-extrabold text-white mb-6">Résultats 📊</h2>

            {/* Circular score */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <motion.circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke={finalScore >= 75 ? '#34C759' : finalScore >= 50 ? '#FFC857' : '#FF3B30'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - finalScore / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white">{finalScore}</span>
                <span className="text-white/70 text-sm">/100</span>
              </div>
            </div>

            {/* Words summary */}
            <div className="bg-white/15 rounded-2xl p-4 mb-4 space-y-2">
              {exercise.words.map((word, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{word}</span>
                  <span className="text-lg">{exercise.results[i] ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>

            <p className="text-white/80 text-base mb-6">
              Mots réussis : <strong className="text-white">{exercise.results.filter(Boolean).length} / {exercise.words.length}</strong>
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleFinish}
              className="w-full py-4 bg-accent text-gray-900 rounded-2xl font-extrabold text-xl shadow-xl hover:bg-accent/90 transition-all"
            >
              🎉 Terminer l'exercice !
            </motion.button>
          </motion.div>
        )}

        {/* ── END ───────────────────────────────────────────── */}
        {step === 'end' && (
          <motion.div key="end"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-sm text-center"
          >
            <Confetti />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-9xl mb-4"
            >
              🏆
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Exercice terminé !</h1>
            <p className="text-white/70 text-base mb-1">
              Score final : <strong className="text-accent text-2xl">{finalScore} pts</strong>
            </p>
            <p className="text-white/60 text-sm mb-6">
              Tu as débloqué le niveau suivant 🔓
            </p>

            <div className="flex gap-2 justify-center mb-6">
              {Array.from({ length: Math.round(finalScore / 20) }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                  className="text-3xl"
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            <div className="bg-white/15 rounded-2xl p-4 mb-6">
              <p className="text-white/70 text-xs mb-1">Points gagnés</p>
              <p className="text-4xl font-extrabold text-accent">+{Math.round(finalScore / 2)} ⚡</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/home')}
              className="w-full py-4 bg-white text-gray-800 rounded-2xl font-extrabold text-lg shadow-xl hover:bg-gray-50 transition-all"
            >
              🏠 Retour à l'accueil
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
