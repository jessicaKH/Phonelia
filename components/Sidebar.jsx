'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: '📊' },
  { href: '/patients', label: 'Patients', icon: '👥' },
  { href: '/exercise/create', label: 'Prescrire', icon: '➕' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-card min-h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-50">
        <Image src="/logo.png" alt="Phonelia" width={140} height={46} priority />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 3 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-6 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
            👩‍⚕️
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">Dr. Dupont</p>
            <p className="text-xs text-gray-400">Orthophoniste</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/login')}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-danger hover:bg-red-50 rounded-2xl transition-colors"
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
