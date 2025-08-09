'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, User, Users, Stethoscope, Loader2 } from 'lucide-react'
import { useLocalAuth } from '@/lib/auth/LocalAuthContext'

export function DemoLogin() {
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const router = useRouter()
  const { login } = useLocalAuth()

  const handleRoleLogin = async (role: 'patient' | 'chw' | 'physiotherapist') => {
    setLoading(true)
    setSelectedRole(role)
    
    // Demo credentials for each role
    const credentials = {
      patient: { email: 'patient@demo.com', password: 'demo123' },
      chw: { email: 'chw@demo.com', password: 'demo123' },
      physiotherapist: { email: 'physio@demo.com', password: 'demo123' }
    }

    try {
      const { email, password } = credentials[role]
      const success = await login(email, password, role)
      
      if (success) {
        // Redirect to appropriate dashboard
        const redirectPath = role === 'patient' ? '/patient' : 
                           role === 'chw' ? '/chw' : 
                           '/physiotherapist'
        
        setTimeout(() => {
          router.push(redirectPath)
        }, 500)
      }
    } catch (error) {
      console.error('Demo login error:', error)
    } finally {
      setLoading(false)
      setSelectedRole('')
    }
  }

  const roles = [
    {
      id: 'patient',
      title: 'Patient/Caregiver',
      description: 'Access your care dashboard, book appointments, and ask questions',
      icon: User,
      gradient: 'from-pink-500 to-purple-600',
      bgGradient: 'from-pink-50 to-purple-50',
      hoverBg: 'hover:bg-pink-50'
    },
    {
      id: 'chw',
      title: 'Community Health Worker',
      description: 'Manage patient visits, submit reports, and coordinate care',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      hoverBg: 'hover:bg-emerald-50'
    },
    {
      id: 'physiotherapist',
      title: 'Physiotherapist',
      description: 'Review patients, approve appointments, and manage assessments',
      icon: Stethoscope,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      hoverBg: 'hover:bg-blue-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/25">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-2">
            Rise Beyond APP
          </CardTitle>
          <p className="text-slate-600 text-lg">Choose your role to access the demo</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {roles.map((role) => {
            const Icon = role.icon
            const isLoading = loading && selectedRole === role.id
            
            return (
              <Button
                key={role.id}
                onClick={() => handleRoleLogin(role.id as any)}
                disabled={loading}
                className={`w-full h-auto p-6 bg-gradient-to-r ${role.bgGradient} ${role.hoverBg} border border-white/20 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                variant="ghost"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${role.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  <div className={`w-3 h-3 bg-gradient-to-r ${role.gradient} rounded-full flex-shrink-0`}></div>
                </div>
              </Button>
            )
          })}
          
          <div className="mt-8 p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 text-center">
              <strong>Demo Mode:</strong> Click any role above to instantly access the dashboard. 
              No registration required!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}