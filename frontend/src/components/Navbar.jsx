import React from 'react'
import { Link } from 'react-router'
import { MessageSquare } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b-0 border-white/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight flex items-center gap-2 drop-shadow-md hover:scale-105 transition-transform">
                  <MessageSquare className="w-7 h-7 text-indigo-400" />
                  ChatterBox
                </Link>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-500/20 rounded-full border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                    Live
                  </span>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar