'use client'

import { useLocalAuth } from '@/lib/auth/LocalAuthContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DebugAuthPage() {
  const { user, login, logout, isAuthenticated, loading } = useLocalAuth()
  const router = useRouter()

  const handleTestLogin = async (role: 'patient' | 'chw' | 'physiotherapist') => {
    const credentials = {
      patient: { email: 'patient@demo.com', password: 'demo123' },
      chw: { email: 'chw@demo.com', password: 'demo123' },
      physiotherapist: { email: 'physio@demo.com', password: 'demo123' }
    }

    const { email, password } = credentials[role]
    console.log('🚀 Testing login for:', { email, role })
    
    const success = await login(email, password, role)
    console.log('🚀 Login result:', success)
    
    if (success) {
      console.log('🚀 User after login:', user)
      const redirectPath = role === 'patient' ? '/patient' : 
                         role === 'chw' ? '/chw' : 
                         '/physiotherapist'
      console.log('🚀 Redirecting to:', redirectPath)
      router.push(redirectPath)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <div className="space-y-2">
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Login</h2>
          <div className="space-y-4">
            <Button 
              onClick={() => handleTestLogin('patient')}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              Login as Patient
            </Button>
            <Button 
              onClick={() => handleTestLogin('chw')}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Login as CHW
            </Button>
            <Button 
              onClick={() => handleTestLogin('physiotherapist')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login as Physiotherapist
            </Button>
          </div>
        </div>

        {user && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="space-y-4">
              <Button 
                onClick={() => router.push('/patient')}
                className="w-full"
                variant="outline"
              >
                Go to Patient Dashboard
              </Button>
              <Button 
                onClick={() => router.push('/chw')}
                className="w-full"
                variant="outline"
              >
                Go to CHW Dashboard
              </Button>
              <Button 
                onClick={() => router.push('/physiotherapist')}
                className="w-full"
                variant="outline"
              >
                Go to Physiotherapist Dashboard
              </Button>
              <Button 
                onClick={logout}
                className="w-full"
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Local Storage Debug</h2>
          <Button 
            onClick={() => {
              console.log('Users:', localStorage.getItem('ribapp_users'))
              console.log('Current User:', localStorage.getItem('ribapp_user'))
            }}
            variant="outline"
          >
            Log LocalStorage to Console
          </Button>
        </div>
      </div>
    </div>
  )
}