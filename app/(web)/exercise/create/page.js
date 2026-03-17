'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { patients } from '../../../../data/mock'
import useStore from '../../../../lib/store'

const PHONEMES = ['R', 'S', 'CH', 'L', 'V', 'Z', 'F', 'GN']
const TYPES = [
  { id: 'repetition', label: 'Répétition', icon: '🔁', desc: 'Répéter des mots' },
  { id: 'lecture', label: 'Lecture', icon: '📖', desc: 'Lire des phrases' },
  { id: 'jeu', label: 'Jeu sonore', icon: '🎮', desc: 'Jeu interactif' },
  { id: 'imitation', label: 'Imitation bouche', icon: '👄', desc: 'Copier les mouvements' },
]
const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé']
const THEMES = [
  { id: 'pirate', label: 'Pirate', icon: '🏴‍☠️', color: 'bg-blue-50 border-blue-200' },
  { id: 'animaux', label: 'Animaux', icon: '🦁', color: 'bg-green-50 border-green-200' },
  { id: 'espace', label: 'Espace', icon: '🚀', color: 'bg-purple-50 border-purple-200' },
  { id: 'ocean', label: 'Océan', icon: '🐠', color: 'bg-cyan-50 border-cyan-200' },
]

export default function ExerciseCreatePage() {
  const [selectedPhonemes, setSelectedPhonemes] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const addPrescribedExercise = useStore((s) => s.addPrescribedExercise)

  const togglePhoneme = (p) => {
    setSelectedPhonemes((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  const isFormValid = selectedPhonemes.length > 0 && selectedType && selectedLevel && selectedTheme

  const handleGenerate = () => {
    const patient = patients.find((p) => p.id === selectedPatient)
    addPrescribedExercise({
      phonemes: selectedPhonemes,
      type: selectedType,
      level: selectedLevel,
      theme: selectedTheme,
      patient: patient?.name,
      createdAt: new Date().toLocaleDateString('fr-FR'),
    })
    setShowSuccess(true)
  }

  const handleReset = () => {
    setSelectedPhonemes([])
    setSelectedType(null)
    setSelectedLevel(null)
    setSelectedTheme(null)
    setShowSuccess(false)
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Prescrire un exercice</h1>
        <p className="text-gray-400 text-sm mt-1">Créez un exercice personnalisé et assignez-le à un patient</p>
      </motion.div>

      <div className="space-y-6">
        {/* Patient selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-800 mb-4">👤 Patient</h2>
          <div className="flex gap-3 flex-wrap">
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedPatient === p.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 text-gray-600 hover:border-primary/40'
                }`}
              >
                <span>{p.avatar}</span>
                {p.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Phoneme selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-800 mb-1">🔤 Phonèmes ciblés</h2>
          <p className="text-xs text-gray-400 mb-4">Sélection multiple possible</p>
          <div className="flex gap-2 flex-wrap">
            {PHONEMES.map((p) => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.92 }}
                onClick={() => togglePhoneme(p)}
                className={`w-14 h-14 rounded-2xl font-bold text-lg border-2 transition-all ${
                  selectedPhonemes.includes(p)
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-primary/40'
                }`}
              >
                {p}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Type */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-800 mb-4">🎯 Type d'activité</h2>
          <div className="grid grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  selectedType === t.id
                    ? 'border-secondary bg-secondary/5'
                    : 'border-gray-200 hover:border-secondary/40'
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${selectedType === t.id ? 'text-secondary' : 'text-gray-700'}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-gray-400">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Level */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-800 mb-4">📊 Niveau</h2>
          <div className="flex gap-3">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedLevel === l
                    ? 'border-success bg-success/10 text-success'
                    : 'border-gray-200 text-gray-600 hover:border-success/40'
                }`}
              >
                {l === 'Débutant' ? '🌱' : l === 'Intermédiaire' ? '🌿' : '🌳'} {l}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-800 mb-4">🎨 Thème</h2>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedTheme === t.id ? 'border-accent bg-accent/10' : `border-gray-200 hover:border-accent/50 ${t.color}`
                }`}
              >
                <span className="text-3xl">{t.icon}</span>
                <span className={`font-semibold text-sm ${selectedTheme === t.id ? 'text-yellow-700' : 'text-gray-700'}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Generate button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleGenerate}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            isFormValid
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          ✨ Générer l'exercice
        </motion.button>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Exercice créé !</h2>
              <p className="text-gray-500 text-sm mb-1">
                Phonèmes : <strong>{selectedPhonemes.join(', ')}</strong>
              </p>
              <p className="text-gray-500 text-sm mb-1">
                Thème : <strong className="capitalize">{selectedTheme}</strong> · {selectedLevel}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Assigné à <strong>{patients.find(p => p.id === selectedPatient)?.name}</strong> ✅
              </p>
              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-all text-sm">
                  Nouvel exercice
                </button>
                <a href="/patients" className="flex-1 py-3 bg-primary text-white rounded-xl font-medium text-center hover:bg-primary/90 transition-all text-sm">
                  Voir les patients
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
