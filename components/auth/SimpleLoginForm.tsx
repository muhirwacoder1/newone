'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, LogIn, Loader2, AlertCircle, Heart } from 'lucide-react'
import { useLocalAuth } from '@/lib/auth/LocalAuthContext'
import Link from 'next/link'

export function SimpleLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as 'patient' | 'chw' | 'physiotherapist' | ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { login } = useLocalAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🚀 Login form submit:', { email: formData.email, role: formData.role })

    try {
      const success = await login(formData.email, formData.password, formData.role)
      
      console.log('🚀 Login success:', success)
      
      if (success) {
        // Redirect based on role - using the SELECTED role, not user state
        const redirectPath = formData.role === 'patient' ? '/patient' : 
                           formData.role === 'chw' ? '/chw' : 
                           formData.role === 'physiotherapist' ? '/physiotherapist' : '/'
        
        console.log('🚀 Redirecting to:', redirectPath)
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push(redirectPath)
        }, 100)
      } else {
        setError('Invalid email, password, or role. Please check your credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = async (email: string, password: string, role: 'patient' | 'chw' | 'physiotherapist') => {
    setLoading(true)
    setError('')
    
    console.log('🚀 Quick login:', { email, role })

    try {
      const success = await login(email, password, role)
      
      if (success) {
        // Redirect based on role
        const redirectPath = role === 'patient' ? '/patient' : 
                           role === 'chw' ? '/chw' : 
                           role === 'physiotherapist' ? '/physiotherapist' : '/'
        
        console.log('🚀 Quick login redirecting to:', redirectPath)
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push(redirectPath)
        }, 100)
      } else {
        setError('Quick login failed. Please try again.')
      }
    } catch (err) {
      console.error('Quick login error:', err)
      setError('Quick login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'from-pink-600 to-purple-600'
      case 'chw': return 'from-emerald-600 to-teal-600'
      case 'physiotherapist': return 'from-blue-600 to-indigo-600'
      default: return 'from-pink-600 to-purple-600'
    }
  }

  return (
    <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/25">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
          Rise Beyond APP
        </CardTitle>
        <p className="text-slate-600">Sign in to your dashboard</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Login Buttons */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Quick Login (Demo):</Label>
          <div className="grid gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('patient@demo.com', 'demo123', 'patient')}
              className="justify-start text-left h-auto p-3 hover:bg-pink-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Patient/Caregiver</div>
                  <div className="text-xs text-slate-500">patient@demo.com</div>
                </div>
              </div>
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('chw@demo.com', 'demo123', 'chw')}
              className="justify-start text-left h-auto p-3 hover:bg-emerald-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Community Health Worker</div>
                  <div className="text-xs text-slate-500">chw@demo.com</div>
                </div>
              </div>
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('physio@demo.com', 'demo123', 'physiotherapist')}
              className="justify-start text-left h-auto p-3 hover:bg-blue-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Physiotherapist</div>
                  <div className="text-xs text-slate-500">physio@demo.com</div>
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm text-slate-500">or login manually</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select value={formData.role} onValueChange={(value: any) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-xl">
                <SelectItem value="patient">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                    <span>Patient/Caregiver</span>
                  </div>
                </SelectItem>
                <SelectItem value="chw">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                    <span>Community Health Worker</span>
                  </div>
                </SelectItem>
                <SelectItem value="physiotherapist">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                    <span>Physiotherapist</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="rounded-xl border-slate-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="rounded-xl border-slate-200 pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !formData.email || !formData.password || !formData.role}
            className={`w-full bg-gradient-to-r ${getRoleColor(formData.role)} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-12`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}