'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Site } from '@/lib/types'
import { LogoUploader } from '@/components/LogoUploader'
import { extractColorsFromImage } from '@/lib/colors'
import Link from 'next/link'

interface SiteDetailPageProps {
  params: {
    id: string
  }
}

export default function SiteDetailPage() {
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  // Editable fields
  const [primary, setPrimary] = useState('#3B82F6')
  const [secondary, setSecondary] = useState('#6B7280')
  const [accent, setAccent] = useState('#10B981')
  const [headline, setHeadline] = useState('')
  const [subheadline, setSubheadline] = useState('')
  const [cta, setCta] = useState('')
  const [ctaUrl, setCtaUrl] = useState('')
  const [brandName, setBrandName] = useState('')
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState<string>('')
  const router = useRouter()
  const routeParams = useParams<{ id: string }>()
  const id = routeParams?.id as string | undefined

  useEffect(() => {
    if (id) fetchSite(id)
  }, [id])

  const fetchSite = async (siteId: string) => {
    try {
      const response = await fetch(`/api/sites/${siteId}`)
      if (response.ok) {
        const result = await response.json()
        setSite(result.data)
        // Initialize edit fields
        const s = result.data as Site
        setPrimary(s.primary_color || '#3B82F6')
        setSecondary(s.secondary_color || '#6B7280')
        setAccent(s.accent_color || '#10B981')
        setHeadline(s.headline || '')
        setSubheadline(s.subheadline || '')
        setCta(s.cta || 'Get Started')
        setBrandName(s.brand_name || '')
        setDescription(s.description || '')
        setLogoUrl(s.logo_url || '')
        setCtaUrl('') // CTA URL not persisted yet
      }
    } catch {
      console.error('Error fetching site:')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!site) return

    setPublishing(true)
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ siteId: site.id }),
      })

      if (response.ok) {
        setSite({ ...site, status: 'published' })
      } else {
        alert('Failed to publish site')
      }
    } catch (error) {
      alert('Failed to publish site')
    } finally {
      setPublishing(false)
    }
  }

  const handleDownload = async () => {
    if (!site) return

    try {
      const response = await fetch(`/api/export?siteId=${site.id}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${site.brand_name}-landing-page.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download package')
      }
    } catch (error) {
      alert('Failed to download package')
    }
  }

  const handleRegenerate = async () => {
    if (!site) return

    setRegenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: site.template_id,
          logoUrl: site.logo_url,
          brandName: site.brand_name,
          industry: site.industry,
          description: site.description,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/dashboard/site/${result.data.site.id}`)
      } else {
        alert('Failed to regenerate site')
      }
    } catch (error) {
      alert('Failed to regenerate site')
    } finally {
      setRegenerating(false)
    }
  }

  const handleSave = async () => {
    if (!site) return
    setSaving(true)
    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: brandName,
          description,
          logo_url: logoUrl || undefined,
          colors: { primary, secondary, accent },
          headline,
          subheadline,
          cta,
          ctaUrl: ctaUrl || undefined,
        }),
      })
      if (response.ok) {
        const result = await response.json()
        setSite(result.data)
        setPrimary(result.data.primary_color)
        setSecondary(result.data.secondary_color)
        setAccent(result.data.accent_color)
        setHeadline(result.data.headline || '')
        setSubheadline(result.data.subheadline || '')
        setCta(result.data.cta || '')
        setBrandName(result.data.brand_name || '')
        setDescription(result.data.description || '')
        setLogoUrl(result.data.logo_url || '')
        // setCtaUrl not synced from server (not persisted yet)
      } else {
        const err = await response.json().catch(() => ({}))
        console.error('Save error:', err)
        alert(`Failed to save changes: ${err.error || 'Unknown error'}`)
      }
    } catch {
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleResetColors = async () => {
    if (!logoUrl) {
      alert('Please upload a logo first to extract colors.')
      return
    }
    try {
      const extracted = await extractColorsFromImage(logoUrl)
      setPrimary(extracted.primary)
      setSecondary(extracted.secondary)
      setAccent(extracted.accent)
      // Persist immediately so preview updates
      await handleSave()
    } catch (e) {
      alert('Failed to extract colors from logo. You can still adjust colors manually.')
    }
  }

  const handleReapplyTemplate = async () => {
    // Force a re-render using current editable state without changing DB business fields beyond what we send
    await handleSave()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-black dark:bg-black light:bg-gray-50 text-white dark:text-white light:text-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">Site not found</h2>
            <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-gray-50 text-white dark:text-white light:text-gray-900 transition-colors duration-300">
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
      <header className="relative z-10 bg-black/50 dark:bg-black/50 light:bg-white backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-5">
                <img 
                  src="/images/olavivo mobile logo.png" 
                  alt="Olavivo Logo" 
                  className="w-40 h-40 object-contain"
                />
                <div>
                  <h1 className="text-4xl font-bold text-orange-500">
                    {site.brand_name}
                  </h1>
                  <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">/{site.slug}</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push('/dashboard')} className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
                ← Dashboard
              </Button>
              {site.status === 'published' && (
                <Button variant="outline" onClick={() => window.open(`/sites/${site.slug}`, '_blank')} className="border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm font-semibold shadow-lg">
                  🌐 View Live
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column: Brand Info, Colors, Copy, Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brand Info */}
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Brand Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Brand Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Description</label>
                  <textarea className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Logo</label>
                  <LogoUploader onUpload={setLogoUrl} currentUrl={logoUrl} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700">Industry:</span>
                  <span className="ml-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">{site.industry}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700">Template:</span>
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">Template {site.template_id.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700">Status:</span>
                  <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    site.status === 'published'
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30'
                      : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {site.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Brand Colors</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Primary</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Secondary</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Accent</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl" value={accent} onChange={(e) => setAccent(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={accent} onChange={(e) => setAccent(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Generated Copy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Headline</label>
                  <input type="text" className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Subheadline</label>
                  <textarea className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" rows={3} value={subheadline} onChange={(e) => setSubheadline(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">Call to Action (Button Text)</label>
                  <input type="text" className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" value={cta} onChange={(e) => setCta(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">CTA URL (optional)</label>
                  <input type="url" className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" placeholder="https://example.com/signup" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} />
                  <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-500 mt-1">Used in rendered HTML buttons (not saved to database yet).</p>
                </div>
                <div className="pt-2">
                  <Button onClick={handleSave} disabled={saving} className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25 py-3 rounded-2xl font-semibold">
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" onClick={handleResetColors} className="w-full border-purple-400/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  🎨 Reset to Logo Colors
                </Button>
                <Button variant="outline" onClick={handleReapplyTemplate} disabled={saving} className="w-full border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  {saving ? 'Re-applying...' : '🔄 Re-apply Template'}
                </Button>
                {site.status === 'draft' && (
                  <Button onClick={handlePublish} disabled={publishing} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25 py-3 rounded-2xl font-semibold">
                    {publishing ? 'Publishing...' : '🚀 Publish Site'}
                  </Button>
                )}
                <Button variant="outline" onClick={handleRegenerate} disabled={regenerating} className="w-full border-pink-400/40 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  {regenerating ? 'Regenerating...' : '🤖 Regenerate with AI'}
                </Button>
                <Button variant="outline" onClick={handleDownload} className="w-full border-blue-400/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  📦 Download Package
                </Button>
              </div>
            </div>
          </div>

          {/* Right column: Live Preview */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-purple-500/10 dark:to-cyan-500/10 light:from-gray-50 light:to-gray-100 px-6 py-4 border-b border-purple-500/20 dark:border-purple-500/20 light:border-gray-200">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Live Preview</h3>
              </div>
              <div className="h-96 lg:h-[600px]">
                {site.status === 'published' ? (
                  <iframe src={`/sites/${site.slug}`} className="w-full h-full border-0" title="Site preview" />
                ) : (
                  <iframe
                    className="w-full h-full border-0"
                    title="Draft preview"
                    srcDoc={`<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><style>${site.generated_css || ''}</style></head><body>${site.generated_html || ''}</body></html>`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
