"use client"

import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, BarChart3, MessageSquare, Play, FileText, Activity, Heart, Stethoscope } from 'lucide-react'
import Link from "next/link"

interface BottomNavigationProps {
  role: "physiotherapist" | "chw" | "patient"
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function BottomNavigation({ role, activeTab = "home", onTabChange }: BottomNavigationProps) {
  const getNavigationItems = () => {
    switch (role) {
      case "physiotherapist":
        return [
          { icon: Home, label: "Overview", value: "overview" },
          { icon: Users, label: "Patients", value: "patients" },
          { icon: Calendar, label: "Appointments", value: "appointments" },
          { icon: FileText, label: "Reports", value: "reports" }
        ]
      case "chw":
        return [
          { icon: Users, label: "Overview", value: "overview" },
          { icon: FileText, label: "Reports", value: "reports" },
          { icon: MessageSquare, label: "Questions", value: "questions" }
        ]
      case "patient":
        return [
          { icon: Home, label: "Home", value: "home" },
          { icon: FileText, label: "Guide", value: "guide" },
          { icon: Calendar, label: "Schedule", value: "appointments" },
          { icon: Users, label: "Community", value: "community" },
          { icon: MessageSquare, label: "Q&A", value: "questions" }
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-6">
      <div className="mx-auto max-w-md">
        {/* Match the top navigation style exactly */}
        <div className="grid w-full grid-cols-5 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onTabChange?.(item.value)}
              className={`w-full flex flex-col items-center space-y-1 py-3 px-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === item.value
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
