'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Site } from '@/lib/types'
import { LogoUploader } from '@/components/LogoUploader'
import { extractColorsFromImage } from '@/lib/colors'
import { FloatingAIChat } from '@/components/FloatingAIChat'
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
          logoUrl: logoUrl || site.logo_url,
          brandName: brandName || site.brand_name,
          industry: site.industry,
          description: description || site.description,
          colors: { primary, secondary, accent },
          headline,
          subheadline,
          cta,
          ctaUrl,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // Refresh current page instead of navigating
        if (result.data?.site?.id) {
          await fetchSite(result.data.site.id)
        } else {
          await fetchSite(site.id)
        }
      } else {
        alert('Failed to regenerate site')
      }
    } catch (error) {
      console.error('Regeneration error:', error)
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
        setPrimary(result.data.primary_color || primary)
        setSecondary(result.data.secondary_color || secondary)
        setAccent(result.data.accent_color || accent)
        setHeadline(result.data.headline || headline)
        setSubheadline(result.data.subheadline || subheadline)
        setCta(result.data.cta || cta)
        setBrandName(result.data.brand_name || brandName)
        setDescription(result.data.description || description)
        setLogoUrl(result.data.logo_url || logoUrl)
        
        // Show success message
        const successMsg = document.createElement('div')
        successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
        successMsg.textContent = 'Changes saved successfully!'
        document.body.appendChild(successMsg)
        setTimeout(() => document.body.removeChild(successMsg), 3000)
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

  const handleApplyAIChanges = (changes: any) => {
    if (changes.colors) {
      if (changes.colors.primary) setPrimary(changes.colors.primary)
      if (changes.colors.secondary) setSecondary(changes.colors.secondary)
      if (changes.colors.accent) setAccent(changes.colors.accent)
    }
    if (changes.content) {
      if (changes.content.headline) setHeadline(changes.content.headline)
      if (changes.content.subheadline) setSubheadline(changes.content.subheadline)
      if (changes.content.cta) setCta(changes.content.cta)
      if (changes.content.brandName) setBrandName(changes.content.brandName)
      if (changes.content.description) setDescription(changes.content.description)
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
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Brand Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-orange-400 mb-2">Brand Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 backdrop-blur-sm transition-all duration-300" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-400 mb-2">Description</label>
                  <textarea className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-300" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-orange-400 mb-2">Logo</label>
                  <LogoUploader onUpload={setLogoUrl} currentUrl={logoUrl} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-400">Industry:</span>
                  <span className="ml-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">{site.industry}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-400">Template:</span>
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">Template {site.template_id.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-400">Status:</span>
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
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Brand Colors</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-orange-400 mb-2">Primary</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-slate-600 rounded-xl bg-slate-900" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 backdrop-blur-sm transition-all duration-300" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-400 mb-2">Secondary</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-slate-600 rounded-xl bg-slate-900" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-300" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-400 mb-2">Accent</label>
                  <div className="flex items-center space-x-3">
                    <input type="color" className="h-12 w-16 p-1 border border-slate-600 rounded-xl bg-slate-900" value={accent} onChange={(e) => setAccent(e.target.value)} />
                    <input type="text" className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm transition-all duration-300" value={accent} onChange={(e) => setAccent(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Generated Copy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-orange-400 mb-2">Headline</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 backdrop-blur-sm transition-all duration-300" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-400 mb-2">Subheadline</label>
                  <textarea className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-300" rows={3} value={subheadline} onChange={(e) => setSubheadline(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-400 mb-2">Call to Action</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm transition-all duration-300" value={cta} onChange={(e) => setCta(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-400 mb-2">CTA URL (Optional)</label>
                  <input type="url" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm transition-all duration-300" placeholder="https://example.com" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} />
                </div>
                <div className="pt-2">
                  <Button onClick={handleSave} disabled={saving} className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/25 py-3 rounded-2xl font-semibold">
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" onClick={handleResetColors} className="w-full border-orange-400/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 hover:border-orange-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  🎨 Reset to Logo Colors
                </Button>
                <Button variant="outline" onClick={handleRegenerate} disabled={regenerating} className="w-full border-blue-400/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  {regenerating ? 'Regenerating...' : '🔄 Regenerate with AI'}
                </Button>
                {site.status === 'draft' && (
                  <Button onClick={handlePublish} disabled={publishing} className="w-full bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg shadow-green-500/25 py-3 rounded-2xl font-semibold">
                    {publishing ? 'Publishing...' : '🚀 Publish Site'}
                  </Button>
                )}
                <Button variant="outline" onClick={handleDownload} className="w-full border-green-400/40 bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:border-green-400 backdrop-blur-sm font-semibold shadow-lg py-3 rounded-2xl">
                  📦 Download Package
                </Button>
              </div>
            </div>
          </div>

          {/* Right column: Live Preview */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600">
                <h3 className="text-lg font-semibold text-green-400">Live Preview</h3>
              </div>
              <div className="h-96 lg:h-[600px] relative">
                {site.generated_html && site.generated_css ? (
                  <iframe
                    key={`preview-${site.id}-${primary}-${secondary}-${accent}-${headline}-${subheadline}`}
                    className="w-full h-full border-0 rounded-b-3xl"
                    title="Live preview"
                    srcDoc={`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    ${site.generated_css.replace(/--brand-primary:\s*[^;]+;/g, `--brand-primary: ${primary};`)
                       .replace(/--brand-secondary:\s*[^;]+;/g, `--brand-secondary: ${secondary};`)
                       .replace(/--brand-accent:\s*[^;]+;/g, `--brand-accent: ${accent};`)}
    :root {
      --brand-primary: ${primary} !important;
      --brand-secondary: ${secondary} !important;
      --brand-accent: ${accent} !important;
    }
  </style>
</head>
<body>
  ${site.generated_html.replace(/\$\{brand\.brandName\}/g, brandName || site.brand_name || 'Brand')
                      .replace(/\$\{brandName\.toUpperCase\(\)\}/g, (brandName || site.brand_name || 'Brand').toUpperCase())
                      .replace(/\$\{brand\.copy\.headline\}/g, headline || site.headline || 'Your Headline')
                      .replace(/\$\{brand\.copy\.subheadline\}/g, subheadline || site.subheadline || 'Your subheadline')
                      .replace(/\$\{brand\.copy\.cta\}/g, cta || site.cta || 'Get Started')
                      .replace(/\$\{brand\.logoUrl\}/g, logoUrl || site.logo_url || '')
                      .replace(/\$\{brand\.ctaUrl\}/g, ctaUrl || '#')
                      .replace(/\$\{headline \|\| 'WIN BIG WITH BONANZA BILLION SLOTS!'\}/g, headline || site.headline || 'WIN BIG WITH BONANZA BILLION SLOTS!')
                      .replace(/\$\{cta \|\| 'SPIN TO WIN'\}/g, cta || site.cta || 'SPIN TO WIN')}
</body>
</html>`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-b-3xl">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading preview...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating AI Chat */}
      <FloatingAIChat
        siteId={site?.id}
        templateId={site?.template_id}
        currentColors={{ primary, secondary, accent }}
        currentContent={{ headline, subheadline, cta, brandName, description }}
        onApplyChanges={handleApplyAIChanges}
      />
    </div>
  )
}
