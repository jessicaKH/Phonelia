'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { sessionDetails } from '../../../../data/mock'

function StatusIcon({ status }) {
  if (status === 'correct') return <span className="text-green-500 font-bold">✅</span>
  if (status === 'warning') return <span className="text-yellow-500 font-bold">⚠️</span>
  return <span className="text-red-500 font-bold">❌</span>
}

function StepStatus({ status }) {
  const styles = {
    correct: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
  }
  const labels = { correct: '✅ Correct', warning: '⚠️ Partiel', error: '❌ Incorrect' }
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function SessionDetailPage() {
  const { id } = useParams()
  const session = sessionDetails[Number(id)]
  const [selectedWord, setSelectedWord] = useState(session?.words[0] ?? null)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  if (!session) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Session introuvable</p>
          <Link href="/patients" className="text-primary hover:underline text-sm mt-2 block">← Retour aux patients</Link>
        </div>
      </div>
    )
  }

  const wordScoreData = session.words.map(w => ({ name: w.word, score: w.score }))

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/patients" className="hover:text-primary transition-colors">Patients</Link>
        <span>/</span>
        <Link href={`/patient/${session.patientId}`} className="hover:text-primary transition-colors">{session.patient}</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{session.title}</span>
      </div>

      {/* 1. HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-card p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl">
            {session.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{session.exercise}</h1>
            <p className="text-gray-400 text-sm">{session.patient} · {session.date} · ⏱ {session.duration}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Score global', value: `${session.score}%`, icon: '🎯', color: session.score >= 75 ? 'text-green-600' : session.score >= 50 ? 'text-yellow-600' : 'text-red-600' },
            { label: 'Mots corrects', value: `${session.correctWords} / ${session.totalWords}`, icon: '🗣️', color: 'text-gray-800' },
            { label: 'Phonème travaillé', value: session.phoneme, icon: '🔤', color: 'text-primary' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xl mb-1">{stat.icon}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. LECTEUR SESSION */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-card p-6"
      >
        <h2 className="font-semibold text-gray-800 mb-4">🎥 Lecteur de session</h2>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl h-40 flex items-center justify-center mb-4 relative overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <span className="text-white text-2xl">{isPlaying ? '⏸' : '▶️'}</span>
          </motion.button>
          <span className="absolute bottom-3 right-4 text-white/40 text-xs">Simulation · {session.duration}</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="h-1.5 bg-gray-100 rounded-full relative">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '60%' }} />
          </div>
          <div className="flex justify-between mt-3">
            {session.words.map((w, i) => (
              <button
                key={i}
                onClick={() => setSelectedWord(w)}
                className="flex flex-col items-center gap-1 group"
                style={{ width: `${100 / session.words.length}%` }}
              >
                <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                  selectedWord?.word === w.word ? 'border-primary bg-primary scale-125' :
                  w.status === 'correct' ? 'border-green-400 bg-green-100' :
                  w.status === 'warning' ? 'border-yellow-400 bg-yellow-100' :
                  'border-red-400 bg-red-100'
                }`} />
                <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">
                  {w.word}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. MOTS + ANALYSE ARTICULATOIRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-card p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">🗣️ Mots analysés</h2>
          <div className="space-y-1">
            <div className="grid grid-cols-3 text-xs text-gray-400 font-medium pb-2 border-b border-gray-50">
              <span>Mot</span>
              <span className="text-center">Score</span>
              <span className="text-right">Statut</span>
            </div>
            {session.words.map((w, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedWord(w)}
                whileHover={{ x: 2 }}
                className={`w-full grid grid-cols-3 items-center py-2.5 px-2 rounded-xl text-sm transition-all ${
                  selectedWord?.word === w.word ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`font-semibold text-left ${selectedWord?.word === w.word ? 'text-primary' : 'text-gray-700'}`}>
                  {w.word}
                </span>
                <span className={`text-center font-bold ${
                  w.score >= 75 ? 'text-green-600' : w.score >= 55 ? 'text-yellow-600' : 'text-red-600'
                }`}>{w.score}%</span>
                <span className="text-right"><StatusIcon status={w.status} /></span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-card p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-1">👄 Analyse articulatoire</h2>
          {selectedWord && (
            <p className="text-xs text-gray-400 mb-4">
              Mot sélectionné : <strong className="text-primary">{selectedWord.word}</strong>
            </p>
          )}

          {/* Bouche mock */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 border border-orange-100 rounded-xl p-4 mb-4 flex flex-col items-center">
            <div className="relative w-28 h-20 mb-2">
              <div className="absolute inset-0 bg-amber-100 rounded-full border-2 border-amber-200" />
              <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-gray-700 rounded-full" />
              <div className="absolute top-4 right-6 w-2.5 h-2.5 bg-gray-700 rounded-full" />
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 border-2 rounded-full transition-all duration-300 ${
                selectedWord?.status === 'correct' ? 'w-10 h-5 border-green-400 bg-green-50' :
                selectedWord?.status === 'warning' ? 'w-8 h-4 border-yellow-400 bg-yellow-50' :
                'w-6 h-3 border-red-400 bg-red-50'
              }`} />
              <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full transition-all duration-300 ${
                selectedWord?.status === 'correct' ? 'bg-green-300' : 'bg-red-300 translate-y-1'
              }`} />
            </div>
            <p className="text-[10px] text-gray-400">Simulation position bouche / langue</p>
          </div>

          <div className="space-y-2 mb-4">
            {session.articulatoryAnalysis.steps.map((step, i) => (
              <div key={i} className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Étape {i + 1} : {step.label}</p>
                  <p className="text-xs text-gray-400">{step.detail}</p>
                </div>
                <StepStatus status={step.status} />
              </div>
            ))}
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-50 text-xs font-semibold text-gray-500 px-3 py-2">
              <span>Attendu</span>
              <span>Observé</span>
            </div>
            {session.articulatoryAnalysis.comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-2 text-xs px-3 py-2 border-t border-gray-50">
                <span className="text-green-700 font-medium">{row.expected}</span>
                <span className="text-red-600">{row.observed}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4. GRAPHIQUES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📊 Score par mot</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={wordScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                formatter={(v) => [`${v}%`, 'Score']}
              />
              <Bar dataKey="score" fill="#4F6BED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📈 Évolution dans la session</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={session.sessionProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="moment" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                formatter={(v) => [`${v}%`, 'Score']}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8A6FF1"
                strokeWidth={3}
                dot={{ fill: '#8A6FF1', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 5. INSIGHTS & NOTES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧠</span>
            <h3 className="font-semibold text-gray-800">Analyse IA</h3>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">simulée</span>
          </div>
          <div className="space-y-3">
            {session.insights.map((insight, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                  insight.type === 'success' ? 'bg-green-50 border-green-100' :
                  'bg-blue-50 border-blue-100'
                }`}
              >
                <span className="text-lg">{insight.icon}</span>
                <p className={`text-sm font-medium ${
                  insight.type === 'warning' ? 'text-yellow-800' :
                  insight.type === 'success' ? 'text-green-800' :
                  'text-blue-800'
                }`}>{insight.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-3">💡 Recommandations</p>
            <div className="space-y-2">
              {session.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-xl">
                  <span>{rec.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{rec.label}</p>
                    <p className="text-xs text-gray-400">{rec.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧑‍⚕️</span>
            <h3 className="font-semibold text-gray-800">Notes orthophoniste</h3>
          </div>

          {notes.length > 0 && (
            <div className="space-y-2 mb-4">
              {notes.map((n, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-blue-400 text-sm">📝</span>
                  <p className="text-sm text-blue-800">{n}</p>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ajouter une observation sur cette session…"
            className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            rows={4}
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (note.trim()) {
                setNotes([...notes, note.trim()])
                setNote('')
              }
            }}
            className="mt-3 w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm"
          >
            Ajouter note
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
