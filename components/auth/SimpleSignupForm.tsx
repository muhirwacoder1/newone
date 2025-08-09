'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, UserPlus, Loader2, AlertCircle, CheckCircle, Heart } from 'lucide-react'
import { useLocalAuth } from '@/lib/auth/LocalAuthContext'
import Link from 'next/link'

export function SimpleSignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '' as 'patient' | 'chw' | 'physiotherapist' | ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const router = useRouter()
  const { signup } = useLocalAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const success = await signup(formData.email, formData.password, formData.fullName, formData.role)
      
      if (success) {
        setSuccess('Account created successfully! Redirecting to your dashboard...')
        
        // Redirect to appropriate dashboard after 2 seconds
        setTimeout(() => {
          const redirectPath = formData.role === 'patient' ? '/patient' : 
                             formData.role === 'chw' ? '/chw' : 
                             formData.role === 'physiotherapist' ? '/physiotherapist' : '/'
          router.push(redirectPath)
        }, 2000)
      } else {
        setError('Failed to create account. Email might already exist.')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Signup failed. Please try again.')
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
          Join Rise Beyond
        </CardTitle>
        <p className="text-slate-600">Create your account to get started</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-700">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">{success}</span>
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
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="rounded-xl border-slate-200"
              required
            />
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
                placeholder="Create a password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="rounded-xl border-slate-200 pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !formData.email || !formData.password || !formData.fullName || !formData.role}
            className={`w-full bg-gradient-to-r ${getRoleColor(formData.role)} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-12`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}