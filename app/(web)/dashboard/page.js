'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { patients, recentActivity } from '../../../data/mock'

const avgProgress = Math.round(patients.reduce((a, p) => a + p.progress, 0) / patients.length)
const totalSessions = patients.reduce((a, p) => a + p.sessions, 0)

const stats = [
  { label: 'Patients actifs', value: patients.length, icon: '👥', color: 'bg-primary/10 text-primary', trend: '+1 ce mois' },
  { label: 'Sessions ce mois', value: totalSessions, icon: '🎧', color: 'bg-secondary/10 text-secondary', trend: '+8 vs mois dernier' },
  { label: 'Progression moyenne', value: `${avgProgress}%`, icon: '📈', color: 'bg-success/10 text-success', trend: '+12% en 4 semaines' },
]

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-400 text-sm mt-1">Bonjour Dr. Dupont 👋 — Voici l'activité de vos patients</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.trend}</p>
              </div>
              <span className={`text-2xl w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-3 bg-white rounded-2xl shadow-card p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Activité récente</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xl w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  {item.avatar}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    <span className="text-primary">{item.patient}</span> — {item.action}
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                {item.score !== null && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.score >= 75 ? 'bg-success/10 text-success' : 'bg-accent/20 text-yellow-700'
                  }`}>
                    {item.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Patient Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-2 bg-white rounded-2xl shadow-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Patients</h2>
            <Link href="/patients" className="text-xs text-primary hover:underline">Voir tous</Link>
          </div>
          <div className="space-y-3">
            {patients.map((p) => (
              <Link key={p.id} href={`/patient/${p.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="text-xl">{p.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700">{p.name}</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{p.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white flex items-center justify-between"
      >
        <div>
          <p className="font-semibold text-lg">Prescrire un nouvel exercice</p>
          <p className="text-white/70 text-sm mt-0.5">Créez un exercice personnalisé pour un patient</p>
        </div>
        <Link href="/exercise/create">
          <button className="bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-md text-sm">
            Créer →
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
