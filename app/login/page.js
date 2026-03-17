'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('dr.dupont@phonelia.fr')
  const [password, setPassword] = useState('••••••••')
  const [mode, setMode] = useState(null) // null | 'ortho' | 'child'
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleOrthoLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 800)
  }

  const handleChildLogin = () => {
    setLoading(true)
    setTimeout(() => router.push('/home'), 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#6B7FEF] to-secondary flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Phonelia" width={160} height={54} priority />
        </div>

        <AnimatePresence mode="wait">
          {!mode && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
                Bienvenue sur Phonelia
              </h1>
              <button
                onClick={() => setMode('ortho')}
                className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-primary/90 active:scale-95 transition-all shadow-md"
              >
                <span className="text-2xl">👩‍⚕️</span>
                Je suis orthophoniste
              </button>
              <button
                onClick={handleChildLogin}
                className="w-full py-4 bg-secondary text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-secondary/90 active:scale-95 transition-all shadow-md"
              >
                <span className="text-2xl">🧒</span>
                Je suis l'enfant
              </button>
              <p className="text-center text-xs text-gray-400 pt-2">
                Mode démo — cliquez pour accéder directement
              </p>
            </motion.div>
          )}

          {mode === 'ortho' && (
            <motion.div
              key="ortho"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <button
                onClick={() => setMode(null)}
                className="text-primary text-sm mb-5 flex items-center gap-1 hover:underline"
              >
                ← Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Connexion</h1>
              <form onSubmit={handleOrthoLogin} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1.5 block font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1.5 block font-medium">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 active:scale-95 transition-all mt-2 shadow-md disabled:opacity-60"
                >
                  {loading ? 'Connexion…' : 'Se connecter'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
