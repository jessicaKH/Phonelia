'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { patients } from '../../../../data/mock'

const TABS = ['Progression', 'Sessions', 'Insights IA']

function ScoreBadge({ score }) {
  const color = score >= 75 ? 'bg-success/10 text-success' : score >= 50 ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-yellow-700'
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>{score}%</span>
}

export default function PatientPage() {
  const { id } = useParams()
  const patient = patients.find((p) => p.id === Number(id))
  const [tab, setTab] = useState(0)

  if (!patient) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Patient introuvable</p>
          <Link href="/patients" className="text-primary hover:underline text-sm mt-2 block">← Retour aux patients</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/patients" className="hover:text-primary transition-colors">Patients</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{patient.name}</span>
      </div>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-card p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl">
              {patient.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
              <p className="text-gray-400 text-sm">{patient.age} ans · {patient.difficulty}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  Phonème : {patient.phoneme}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  ● Actif
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/exercise/create">
              <button className="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-md">
                ➕ Prescrire
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-50">
          {[
            { label: 'Progression globale', value: `${patient.progress}%`, icon: '📈' },
            { label: 'Sessions totales', value: patient.sessions, icon: '🎧' },
            { label: 'Dernière activité', value: patient.lastActivity, icon: '📅' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xl mb-1">{stat.icon}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-6 w-fit">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === i ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tab === 0 && (
          <motion.div
            key="progression"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Line chart */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Évolution de la progression</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={patient.progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4F6BED"
                    strokeWidth={3}
                    dot={{ fill: '#4F6BED', r: 5, strokeWidth: 0 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart by phoneme */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Score par phonème</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={patient.phonemeScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="phoneme" tick={{ fontSize: 13, fontWeight: 600, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                  <Bar dataKey="score" fill="#8A6FF1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Activités réalisées</h3>
              <div className="space-y-2">
                {patient.activities.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                        {activity.type}
                      </span>
                      <span className="text-sm text-gray-700 font-medium">{activity.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{activity.date}</span>
                      <ScoreBadge score={activity.score} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 1 && (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {patient.sessionsList.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="bg-gradient-to-br from-primary to-secondary h-32 flex items-center justify-center">
                  <span className="text-6xl">{session.emoji}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{session.title}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">⏱ {session.duration}</span>
                      <span className="text-xs text-gray-400">📅 {session.date}</span>
                    </div>
                    <ScoreBadge score={session.score} />
                  </div>
                  <Link href={`/session/${session.id}`}>
                    <button className="mt-3 w-full py-2 text-sm text-primary font-medium border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95">
                      Voir détails
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === 2 && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🧠</span>
              <h3 className="font-semibold text-gray-800">Analyse IA</h3>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium ml-1">simulée</span>
            </div>
            <div className="space-y-3">
              {patient.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    insight.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                    insight.type === 'success' ? 'bg-green-50 border-green-100' :
                    'bg-blue-50 border-blue-100'
                  }`}
                >
                  <span className="text-xl mt-0.5">{insight.icon}</span>
                  <p className={`text-sm font-medium ${
                    insight.type === 'warning' ? 'text-yellow-800' :
                    insight.type === 'success' ? 'text-green-800' :
                    'text-blue-800'
                  }`}>
                    {insight.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                ⚠️ Ces insights sont générés par simulation — prototype démonstration uniquement
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
