'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  fullName: string
  role: 'patient' | 'chw' | 'physiotherapist'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: 'patient' | 'chw' | 'physiotherapist') => Promise<boolean>
  signup: (email: string, password: string, fullName: string, role: 'patient' | 'chw' | 'physiotherapist') => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function LocalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize demo users if they don't exist
    const existingUsers = JSON.parse(localStorage.getItem('ribapp_users') || '[]')
    if (existingUsers.length === 0) {
      const demoUsers = [
        {
          id: '1',
          email: 'patient@demo.com',
          password: 'demo123',
          fullName: 'Emma Johnson (Patient)',
          role: 'patient'
        },
        {
          id: '2',
          email: 'chw@demo.com',
          password: 'demo123',
          fullName: 'Marie Claire Uwimana (CHW)',
          role: 'chw'
        },
        {
          id: '3',
          email: 'physio@demo.com',
          password: 'demo123',
          fullName: 'Dr. Sarah Mitchell',
          role: 'physiotherapist'
        }
      ]
      localStorage.setItem('ribapp_users', JSON.stringify(demoUsers))
    }

    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('ribapp_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('ribapp_user')
      }
    }
    setLoading(false)
  }, [])

  const signup = async (email: string, password: string, fullName: string, role: 'patient' | 'chw' | 'physiotherapist'): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('ribapp_users') || '[]')
      
      // Check if user already exists
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('User already exists')
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        fullName,
        role
      }

      // Save user credentials (in real app, you'd hash the password)
      const userWithPassword = { ...newUser, password }
      existingUsers.push(userWithPassword)
      localStorage.setItem('ribapp_users', JSON.stringify(existingUsers))

      // Auto-login the user
      setUser(newUser)
      localStorage.setItem('ribapp_user', JSON.stringify(newUser))

      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  const login = async (email: string, password: string, role: 'patient' | 'chw' | 'physiotherapist'): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('ribapp_users') || '[]')
      
      console.log('🔍 Login attempt:', { email, role })
      console.log('🔍 Available users:', existingUsers.map((u: any) => ({ email: u.email, role: u.role })))
      
      // Find user with matching email, password, and role
      const foundUser = existingUsers.find((u: any) => 
        u.email === email && u.password === password && u.role === role
      )

      console.log('🔍 Found user:', foundUser ? { email: foundUser.email, role: foundUser.role } : 'None')

      if (!foundUser) {
        throw new Error('Invalid credentials or role mismatch')
      }

      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = foundUser
      
      console.log('🔍 Setting user state:', userWithoutPassword)
      setUser(userWithoutPassword)
      localStorage.setItem('ribapp_user', JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ribapp_user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useLocalAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider')
  }
  return context
}