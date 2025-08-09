'use client'

import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import Link from "next/link"

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Rise Beyond APP
                </h1>
                <p className="text-slate-600 font-medium">Advanced Physiotherapy Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="rounded-xl border-white/20 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Transform CP Care
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                With Intelligence
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Revolutionary platform that seamlessly connects physiotherapists, community health workers, 
              and families to deliver exceptional cerebral palsy care through cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-lg font-semibold">
                  Try Demo
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-slate-700 border-white/20 rounded-2xl transition-all duration-300 text-lg font-semibold">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}