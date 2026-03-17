'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import useStore from '../../../lib/store'

export default function ResultPage() {
  const result = useStore((s) => s.exerciseResult)

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center p-6">
        <div className="text-center text-white">
          <p className="text-lg mb-4">Aucun résultat disponible</p>
          <Link href="/home" className="underline text-white/80">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  const { exercise, finalScore, scores } = result
  const totalCorrect = exercise.results.filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <span className="text-7xl">🏅</span>
          <h1 className="text-2xl font-extrabold text-white mt-3">{exercise.title}</h1>
          <p className="text-white/70 text-sm mt-1">Résultats de la session</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="text-center">
            <p className="text-5xl font-extrabold text-primary">{finalScore}</p>
            <p className="text-gray-400 text-sm">points sur 100</p>
          </div>

          <div className="flex justify-around pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{totalCorrect}</p>
              <p className="text-xs text-gray-400">Réussis</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{exercise.words.length - totalCorrect}</p>
              <p className="text-xs text-gray-400">À retravailler</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{exercise.words.length}</p>
              <p className="text-xs text-gray-400">Mots total</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {exercise.words.map((word, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="font-medium text-gray-700 text-sm">{word}</span>
                <span className="text-lg">{exercise.results[i] ? '✅' : '❌'}</span>
              </div>
            ))}
          </div>

          <Link href="/home">
            <button className="w-full mt-2 py-4 bg-primary text-white rounded-2xl font-extrabold text-base hover:bg-primary/90 active:scale-95 transition-all">
              🏠 Retour à l'accueil
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
