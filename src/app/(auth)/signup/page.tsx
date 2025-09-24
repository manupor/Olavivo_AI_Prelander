'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ConfigurationNotice } from '@/components/ConfigurationNotice'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  // const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
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

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Authentication service is temporarily unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 overflow-hidden transition-colors duration-300">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 dark:block light:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-black/50 dark:bg-black/50 light:bg-white backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-gray-200">
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

        <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[calc(100vh-88px)]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 dark:from-green-900/30 dark:to-emerald-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-green-500/30 dark:border-green-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6">
                  <svg className="h-8 w-8 text-green-400 dark:text-green-400 light:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-400 dark:to-emerald-400 light:from-green-600 light:to-emerald-600 bg-clip-text text-transparent">
                    Check Your Email
                  </span>
                </h2>
                <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2">
                  We've sent you a confirmation link at
                </p>
                <p className="text-purple-400 dark:text-purple-400 light:text-purple-600 font-semibold mb-8">{email}</p>
                <Link
                  href="/login"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 inline-block"
                >
                  🚀 Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
      <header className="relative z-10 bg-black/50 dark:bg-black/50 light:bg-white backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/images/olavivo mobile logo.png" 
                alt="Olavivo Logo" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-orange-500">
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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-purple-300 dark:text-purple-300 light:text-purple-600">Join the AI Revolution</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 dark:from-white dark:via-purple-200 dark:to-cyan-200 light:from-gray-900 light:via-purple-600 light:to-cyan-600 bg-clip-text text-transparent">
                Create Account
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">
              Start building amazing landing pages with AI
            </p>
            
            <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-purple-400 hover:text-purple-300 dark:text-purple-400 dark:hover:text-purple-300 light:text-purple-600 light:hover:text-purple-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
            <ConfigurationNotice />
            <form className="space-y-6" onSubmit={handleSignup}>
              {error && (
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 dark:text-red-300 light:text-red-600 px-4 py-3 rounded-2xl text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
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
                <label htmlFor="password" className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Create a password (min 6 characters)"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating account...
                    </span>
                  ) : (
                    '🚀 Create Account'
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
