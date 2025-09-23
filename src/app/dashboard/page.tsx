import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  // Get user's organization
  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('owner_user_id', user.id)
    .single()

  // Get user's sites
  const { data: sites } = await supabase
    .from('sites')
    .select(`
      *,
      visits(count)
    `)
    .eq('org_id', org?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-gray-50 text-white dark:text-white light:text-gray-900 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 dark:block light:hidden">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/50 dark:bg-black/50 light:bg-white backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-5">
                <img 
                  src="/images/olavivo mobile logo.png" 
                  alt="Olavivo Logo" 
                  className="w-40 h-40 object-contain"
                />
                <div>
                  <h1 className="text-4xl font-bold text-orange-500">
                    Prelander AI
                  </h1>
                  <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Welcome back, {user.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/new">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/25">
                  Create New Site
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="outline" type="submit" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!sites || sites.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-gray-50 light:to-gray-100 backdrop-blur-sm border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-12">
              <svg
                className="mx-auto h-16 w-16 text-purple-400 dark:text-purple-400 light:text-gray-400 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">No sites yet</h3>
              <p className="text-lg text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8">
                Get started by creating your first AI-powered landing page.
              </p>
              <Link href="/dashboard/new">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25 text-lg px-8 py-4 rounded-2xl">
                  🚀 Create Your First Site
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Sites Table
          <div>
            <div className="sm:flex sm:items-center mb-8">
              <div className="sm:flex-auto">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Your Sites</h2>
                <p className="mt-2 text-lg text-gray-400 dark:text-gray-400 light:text-gray-600">
                  Manage your AI-generated landing pages
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href="/dashboard/new">
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25">
                    Create New Site
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 flow-root">
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-sm border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-purple-500/20 dark:divide-purple-500/20 light:divide-gray-200">
                    <thead className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-purple-500/10 dark:to-cyan-500/10 light:from-gray-50 light:to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 dark:text-purple-300 light:text-gray-500 uppercase tracking-wide">
                          Site
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 dark:text-purple-300 light:text-gray-500 uppercase tracking-wide">
                          Template
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 dark:text-purple-300 light:text-gray-500 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 dark:text-purple-300 light:text-gray-500 uppercase tracking-wide">
                          Visits
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 dark:text-purple-300 light:text-gray-500 uppercase tracking-wide">
                          Created
                        </th>
                        <th className="relative px-6 py-4">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/20 dark:divide-purple-500/20 light:divide-gray-200">
                      {sites.map((site) => (
                        <tr key={site.id} className="hover:bg-purple-500/5 dark:hover:bg-purple-500/5 light:hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {site.logo_url && (
                                <img
                                  className="h-10 w-10 rounded-full mr-4 border-2 border-purple-500/30"
                                  src={site.logo_url}
                                  alt=""
                                />
                              )}
                              <div>
                                <div className="text-sm font-semibold text-white dark:text-white light:text-gray-900">
                                  {site.brand_name}
                                </div>
                                <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
                                  /{site.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Template {site.template_id.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                                site.status === 'published'
                                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30'
                                  : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30'
                              }`}
                            >
                              {site.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white dark:text-white light:text-gray-900">
                            {site.visits?.[0]?.count || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
                            {formatDate(site.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-3">
                              <Link
                                href={`/sites/${site.slug}`}
                                className="text-cyan-400 hover:text-cyan-300 dark:text-cyan-400 dark:hover:text-cyan-300 light:text-blue-600 light:hover:text-blue-500 font-medium"
                                target="_blank"
                              >
                                Preview
                              </Link>
                              <Link
                                href={`/dashboard/site/${site.id}`}
                                className="text-purple-400 hover:text-purple-300 dark:text-purple-400 dark:hover:text-purple-300 light:text-gray-600 light:hover:text-gray-500 font-medium"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
