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

export function DebugLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as 'patient' | 'chw' | 'physiotherapist' | ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugLog, setDebugLog] = useState<string[]>([])
  
  const router = useRouter()
  const { login, user } = useLocalAuth()

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugLog(prev => [...prev, `${timestamp}: ${message}`])
    console.log(`[DEBUG] ${timestamp}: ${message}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setDebugLog([])

    addLog(`Starting login process...`)
    addLog(`Email: ${formData.email}`)
    addLog(`Role: ${formData.role}`)

    try {
      addLog(`Calling login function...`)
      const success = await login(formData.email, formData.password, formData.role)
      
      addLog(`Login result: ${success}`)
      
      if (success) {
        addLog(`Login successful! Determining redirect path...`)
        
        // Wait a bit to see the user state
        setTimeout(() => {
          addLog(`Current user state: ${JSON.stringify(user)}`)
          
          const redirectPath = formData.role === 'patient' ? '/patient' : 
                             formData.role === 'chw' ? '/chw' : 
                             formData.role === 'physiotherapist' ? '/physiotherapist' : '/'
          
          addLog(`Calculated redirect path: ${redirectPath}`)
          addLog(`Executing router.push(${redirectPath})...`)
          
          router.push(redirectPath)
        }, 100)
      } else {
        addLog(`Login failed - invalid credentials`)
        setError('Invalid email, password, or role. Please check your credentials.')
      }
    } catch (err) {
      addLog(`Login error: ${err}`)
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = (email: string, password: string, role: 'patient' | 'chw' | 'physiotherapist') => {
    addLog(`Quick login clicked: ${role} (${email})`)
    setFormData({ email, password, role })
  }

  const clearLogs = () => {
    setDebugLog([])
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="w-full bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/25">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
            🔍 Debug Login
          </CardTitle>
          <p className="text-slate-600">Debug version with detailed logging</p>
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
                <SelectContent>
                  <SelectItem value="patient">Patient/Caregiver</SelectItem>
                  <SelectItem value="chw">Community Health Worker</SelectItem>
                  <SelectItem value="physiotherapist">Physiotherapist</SelectItem>
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Debug Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Debug Log Panel */}
      <Card className="w-full bg-slate-900 text-green-400 border-0 shadow-2xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-green-400">🔍 Debug Log</CardTitle>
            <Button onClick={clearLogs} variant="ghost" size="sm" className="text-green-400 hover:bg-slate-800">
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="font-mono text-sm max-h-96 overflow-y-auto space-y-1">
            {debugLog.length === 0 ? (
              <p className="text-slate-500">No debug logs yet. Try logging in to see what happens.</p>
            ) : (
              debugLog.map((log, index) => (
                <div key={index} className="text-green-400">
                  {log}
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 p-3 bg-slate-800 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Current User State:</p>
            <pre className="text-xs text-green-400">
              {user ? JSON.stringify(user, null, 2) : 'No user logged in'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}