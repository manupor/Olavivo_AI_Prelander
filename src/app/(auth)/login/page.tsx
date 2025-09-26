'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ConfigurationNotice } from '@/components/ConfigurationNotice'
import { DiagnosticInfo } from '@/components/DiagnosticInfo'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Check if Supabase is properly configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' || 
        !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError('Authentication service is not configured. Please contact support.')
      setLoading(false)
      return
    }

    try {
      console.log('Attempting login with Supabase...')
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Supabase auth error:', error)
        setError(error.message)
      } else {
        console.log('Login successful, redirecting...')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      console.error('Network/connection error:', err)
      setError('Network error: Unable to connect to authentication service. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 dark:block light:hidden">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-5">
              <img 
                src="/images/olavivo mobile logo.png" 
                alt="Olavivo Logo" 
                className="w-40 h-40 object-contain"
              />
              <h1 className="text-4xl font-bold text-orange-500">
                Prelander AI
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[calc(100vh-88px)]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-400">Secure Login Portal</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-slate-100">
                Welcome Back
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">
              Sign in to continue creating amazing landing pages
            </p>
            
            <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <ConfigurationNotice />
            <DiagnosticInfo />
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-400 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-blue-400 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </span>
                  ) : (
                    '🚀 Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
