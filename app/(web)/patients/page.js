'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { patients } from '../../../data/mock'

function ProgressCircle({ value, size = 64 }) {
  const r = (size - 8) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={6} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={value >= 75 ? '#34C759' : value >= 50 ? '#4F6BED' : '#FFC857'}
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

function PhonemeBadge({ phoneme }) {
  const colors = {
    R: 'bg-blue-100 text-blue-700',
    CH: 'bg-purple-100 text-purple-700',
    S: 'bg-green-100 text-green-700',
    L: 'bg-yellow-100 text-yellow-700',
  }
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[phoneme] || 'bg-gray-100 text-gray-600'}`}>
      {phoneme}
    </span>
  )
}

export default function PatientsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes patients</h1>
          <p className="text-gray-400 text-sm mt-1">{patients.length} patients suivis</p>
        </div>
        <button className="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-md">
          <span>＋</span> Nouveau patient
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {patients.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
            className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                  {patient.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{patient.name}</h3>
                  <p className="text-xs text-gray-400">{patient.age} ans</p>
                </div>
              </div>
              <PhonemeBadge phoneme={patient.phoneme} />
            </div>

            {/* Difficulty */}
            <p className="text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
              🎯 {patient.difficulty}
            </p>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-gray-500">Progression</span>
                <span className="text-xs font-bold text-gray-700">{patient.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${patient.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                  className={`h-2 rounded-full ${
                    patient.progress >= 75 ? 'bg-success' : patient.progress >= 50 ? 'bg-primary' : 'bg-accent'
                  }`}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>🎧 {patient.sessions} sessions</span>
              <span>📅 {patient.lastActivity}</span>
            </div>

            {/* CTA */}
            <Link href={`/patient/${patient.id}`}>
              <button className="w-full py-2.5 bg-primary/10 text-primary font-semibold rounded-xl text-sm hover:bg-primary hover:text-white transition-all active:scale-95">
                Voir le profil →
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
