import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 hidden dark:block">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
      <header className="relative z-10 bg-white/95 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
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
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-slate-500 backdrop-blur-sm font-semibold shadow-lg transition-all duration-200">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/25 font-semibold transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-500/15 border border-orange-300 dark:border-orange-500/40 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">AI-Powered Landing Pages</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-gray-900 dark:text-slate-100">
              Create Stunning
            </span>
            <br />
            <span className="text-orange-500 animate-pulse">
              Landing Pages
            </span>
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              in Seconds
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your ideas into <span className="text-orange-500 font-semibold">high-converting landing pages</span> with our 
            AI-powered platform. No coding required, unlimited creativity unleashed.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-500 dark:text-slate-400">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span>10,000+ Pages Created</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <span>99% Uptime</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              <span>AI-Generated Copy</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-16">
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 text-lg">
                🚀 Start Creating Now
              </Button>
            </Link>
          </div>
          
          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-orange-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-orange-400 dark:text-orange-400 light:text-orange-600">Beautiful Templates</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Choose from 7 stunning, conversion-optimized templates</p>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-blue-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-400 dark:text-blue-400 light:text-blue-600">AI-Powered Copy</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Let AI write compelling headlines and persuasive content</p>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-green-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-400 dark:text-green-400 light:text-green-600">Lightning Fast</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Download ready-to-use HTML/CSS files in seconds</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-orange-500">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to create professional landing pages that convert visitors into customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition-colors">AI-Powered Generation</h3>
              <p className="text-slate-400 leading-relaxed">
                Our advanced AI analyzes your brand, industry, and goals to create compelling copy and design that converts visitors into customers.
              </p>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4a2 2 0 01-2-2V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">Professional Templates</h3>
              <p className="text-slate-400 leading-relaxed">
                Choose from our collection of professionally designed templates, each optimized for different industries and conversion goals.
              </p>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400 group-hover:text-green-300 transition-colors">Export Ready</h3>
              <p className="text-slate-400 leading-relaxed">
                Download your complete landing page as clean HTML, CSS, and assets ready to deploy anywhere you want.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-blue-400">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From idea to live landing page in just 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-slate-600 opacity-30"></div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-orange-500/25 transform hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">Choose Template</h3>
              <p className="text-gray-400 leading-relaxed">Select from 7 stunning, conversion-optimized templates designed for different industries</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-blue-500/25 transform hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Upload Logo</h3>
              <p className="text-gray-400 leading-relaxed">Upload your logo and watch AI extract your brand colors automatically</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-blue-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-blue-400/25 transform hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Describe Business</h3>
              <p className="text-gray-400 leading-relaxed">Tell us about your business and let AI craft compelling, conversion-focused copy</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-green-500/25 transform hover:scale-110 transition-all duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-400">Generate & Export</h3>
              <p className="text-gray-400 leading-relaxed">AI creates your professional landing page, ready to publish anywhere</p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-32 relative">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full mb-8 backdrop-blur-sm">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-blue-400 font-semibold">Premium AI Platform • Live Now</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-slate-100">
                  Ready to Launch?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join <span className="text-blue-400 font-bold">10,000+</span> businesses already creating 
                high-converting landing pages with Prelander AI
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/signup">
                  <Button size="lg" className="text-xl px-16 py-8 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 rounded-2xl font-black">
                    🚀 Start Creating Now
                  </Button>
                </Link>
                <div className="text-center">
                  <p className="text-sm text-gray-400">✓ Professional AI-powered platform</p>
                  <p className="text-sm text-gray-400">✓ 7 premium templates included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 py-16 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-5 mb-6">
              <img 
                src="/images/olavivo mobile logo.png" 
                alt="Olavivo Logo" 
                className="w-24 h-24 object-contain"
              />
              <h1 className="text-3xl font-bold text-orange-500">
                Prelander AI
              </h1>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              The future of landing page creation is here. Generate stunning, conversion-optimized pages 
              with the power of artificial intelligence.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>© 2025 Prelander AI</span>
              <span>•</span>
              <span>Built with ❤️ for creators</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
