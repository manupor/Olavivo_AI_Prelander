'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateSiteSchema, CreateSiteFormData, INDUSTRIES, TemplateId } from '@/lib/types'
import { TemplateCard } from '@/components/TemplateCard'
import { TemplatePreviewModal } from '@/components/TemplatePreviewModal'
import { LogoUploader } from '@/components/LogoUploader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const templateList = [
  {
    id: 't1' as const,
    name: 'Minimal SaaS',
    description: 'Clean, professional design perfect for SaaS and tech companies',
    preview: '/templates/t1-preview.svg'
  },
  {
    id: 't2' as const,
    name: 'Bold Marketing',
    description: 'Eye-catching design with strong visual impact for marketing campaigns',
    preview: '/templates/t2-preview.svg'
  },
  {
    id: 't3' as const,
    name: 'Lead Generation',
    description: 'Conversion-focused design with prominent forms and CTAs',
    preview: '/templates/t3-preview.svg'
  },
  {
    id: 't4' as const,
    name: 'Casino Gaming',
    description: 'High-energy casino design with vibrant colors and gaming elements',
    preview: '/templates/t4-preview.svg'
  },
  {
    id: 't5' as const,
    name: 'iGaming Casino',
    description: 'Interactive casino slot machine with animated elements and gaming features',
    preview: '/templates/t5-preview.svg'
  },
  {
    id: 't6' as const,
    name: 'Olavivo Casino Slots',
    description: 'Interactive 3-line slot machine with animated symbols and casino atmosphere',
    preview: '/templates/t6-preview.svg'
  },
  {
    id: 't7' as const,
    name: 'Bonanza Billion',
    description: 'Premium slot machine template with interactive reels, jackpot animations, and billion-dollar theme',
    preview: '/templates/t7-preview.svg'
  }
]

export default function NewSitePage() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('t1')
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<TemplateId | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CreateSiteFormData>({
    resolver: zodResolver(CreateSiteSchema),
    defaultValues: {
      templateId: 't1'
    }
  })

  const handleTemplateSelect = (templateId: TemplateId) => {
    setSelectedTemplate(templateId)
    setValue('templateId', templateId)
  }

  const handlePreview = (templateId: TemplateId) => {
    setPreviewTemplate(templateId)
    setIsPreviewOpen(true)
  }

  const handlePreviewSelect = (templateId: TemplateId) => {
    handleTemplateSelect(templateId)
  }

  const onSubmit = async (data: CreateSiteFormData) => {
    console.log('Form submission started with data:', data)
    console.log('Selected template:', selectedTemplate)
    console.log('Form errors:', errors)
    setGenerating(true)

    try {
      const payload = {
        ...data,
        templateId: selectedTemplate,
        logoUrl: logoUrl || undefined
      }
      console.log('Sending payload:', payload)

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response result:', result)

      if (result.success) {
        router.push(`/dashboard/site/${result.data.site.id}`)
      } else {
        console.error('Generation failed:', result.error)
        alert(result.error || 'Generation failed')
      }
    } catch (error) {
      console.error('Request failed:', error)
      alert('Generation failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setGenerating(false)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-5">
                <img 
                  src="/images/olavivo mobile logo.png" 
                  alt="Olavivo Logo" 
                  className="w-40 h-40 object-contain"
                />
                <h1 className="text-4xl font-bold text-orange-500">Create New Site</h1>
              </Link>
            </div>
            <Button variant="outline" onClick={() => router.push('/dashboard')} className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
              Cancel
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {i > 1 && (
                    <div
                      className={`flex-1 h-2 rounded-full ${
                        i <= step ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20 dark:bg-white/20 light:bg-gray-200'
                      }`}
                    />
                  )}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      i <= step
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/20 text-gray-400 dark:bg-white/20 dark:text-gray-400 light:bg-gray-200 light:text-gray-600'
                    } ${i > 1 ? 'mx-3' : ''}`}
                  >
                    {i}
                  </div>
                  {i < 4 && (
                    <div
                      className={`flex-1 h-2 rounded-full ${
                        i < step ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20 dark:bg-white/20 light:bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <span className="mt-3 text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-600 text-center">
                  {i === 1 && '🎨 Choose Template'}
                  {i === 2 && '📷 Upload Logo'}
                  {i === 3 && '🏢 Brand Details'}
                  {i === 4 && '🚀 Generate'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Choose Template */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Choose Your Template</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {templateList.map((template) => (
                    <TemplateCard
                      key={template.id}
                      {...template}
                      selected={selectedTemplate === template.id}
                      onSelect={handleTemplateSelect}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={nextStep} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25 px-8 py-3 rounded-2xl font-semibold">
                  Next →
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Upload Logo */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Upload Your Logo</h2>
                <LogoUploader onUpload={setLogoUrl} currentUrl={logoUrl} />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg px-6 py-3 rounded-2xl dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
                  ← Back
                </Button>
                <Button onClick={nextStep} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25 px-8 py-3 rounded-2xl font-semibold">
                  {logoUrl ? 'Next →' : 'Skip for now →'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Brand Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Tell Us About Your Brand</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                      Brand Name *
                    </label>
                    <input
                      {...register('brandName')}
                      className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Your company or brand name"
                    />
                    {errors.brandName && (
                      <p className="text-red-300 dark:text-red-300 light:text-red-600 text-sm mt-1">{errors.brandName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      {...register('industry')}
                      className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="" className="bg-black text-white dark:bg-black dark:text-white light:bg-white light:text-gray-900">Select your industry</option>
                      {INDUSTRIES.map((industry) => (
                        <option key={industry} value={industry} className="bg-black text-white dark:bg-black dark:text-white light:bg-white light:text-gray-900">
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-red-300 dark:text-red-300 light:text-red-600 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                        Business Description
                      </label>
                      <textarea
                        id="description"
                        {...register('description')}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="Describe your business, products, or services..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-300 dark:text-red-300 light:text-red-600">{errors.description.message}</p>
                      )}
                    </div>

                    {/* Preferred Brand Colors */}
                    <div>
                      <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-3">
                        Preferred Colors (optional)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                            Primary
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl"
                              {...register('preferredColors.primary')}
                              defaultValue="#3B82F6"
                            />
                            <input
                              type="text"
                              placeholder="#3B82F6"
                              className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              {...register('preferredColors.primary')}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                            Secondary
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl"
                              {...register('preferredColors.secondary')}
                              defaultValue="#6B7280"
                            />
                            <input
                              type="text"
                              placeholder="#6B7280"
                              className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              {...register('preferredColors.secondary')}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                            Accent
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              className="h-12 w-16 p-1 border border-purple-500/30 rounded-xl"
                              {...register('preferredColors.accent')}
                              defaultValue="#10B981"
                            />
                            <input
                              type="text"
                              placeholder="#10B981"
                              className="flex-1 px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              {...register('preferredColors.accent')}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">If provided, these will override the colors extracted from your logo.</p>
                    </div>

                    <div>
                      <label htmlFor="ctaUrl" className="block text-sm font-semibold text-purple-300 dark:text-purple-300 light:text-gray-700 mb-2">
                        Call-to-Action URL (Optional)
                      </label>
                      <input
                        type="url"
                        id="ctaUrl"
                        {...register('ctaUrl')}
                        className="w-full px-4 py-3 bg-black/20 dark:bg-black/20 light:bg-white border border-purple-500/30 dark:border-purple-500/30 light:border-gray-300 rounded-2xl placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="https://example.com/signup"
                      />
                      {errors.ctaUrl && (
                        <p className="mt-1 text-sm text-red-300 dark:text-red-300 light:text-red-600">{errors.ctaUrl.message}</p>
                      )}
                      <p className="mt-3 text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
                        Where should the main button link to? Leave empty for demo mode.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg px-6 py-3 rounded-2xl dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
                  ← Back
                </Button>
                <Button onClick={nextStep} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-purple-500/25 px-8 py-3 rounded-2xl font-semibold">Next →</Button>
              </div>
            </div>
          )}

          {/* Step 4: Generate */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 dark:from-purple-900/30 dark:to-cyan-900/30 light:from-white light:to-gray-50 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-gray-200 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Ready to Generate</h2>
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 dark:from-green-900/30 dark:to-emerald-900/30 light:from-green-50 light:to-emerald-50 backdrop-blur-xl border border-green-500/30 dark:border-green-500/30 light:border-green-200 rounded-2xl p-6 shadow-xl">
                  <h3 className="font-bold mb-4 text-green-300 dark:text-green-300 light:text-green-700">Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 font-semibold">Template:</span>
                      <span className="text-white dark:text-white light:text-gray-900 font-medium">{templateList.find(t => t.id === selectedTemplate)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 font-semibold">Brand Name:</span>
                      <span className="text-white dark:text-white light:text-gray-900 font-medium">{watch('brandName')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 font-semibold">Industry:</span>
                      <span className="text-white dark:text-white light:text-gray-900 font-medium">{watch('industry')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 font-semibold">Logo:</span>
                      <span className={`font-medium ${
                        logoUrl 
                          ? 'text-green-300 dark:text-green-300 light:text-green-600' 
                          : 'text-gray-400 dark:text-gray-400 light:text-gray-500'
                      }`}>{logoUrl ? '✓ Uploaded' : 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg px-6 py-3 rounded-2xl dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100">
                  ← Back
                </Button>
                <Button 
                  type="button" 
                  disabled={generating}
                  onClick={(e) => {
                    console.log('Generate button clicked')
                    console.log('Current form values:', watch())
                    console.log('Selected template:', selectedTemplate)
                    handleSubmit(onSubmit)(e)
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  {generating ? (
                    <span className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Generating...
                    </span>
                  ) : (
                    '🤖 Generate with AI'
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Template Preview Modal */}
        <TemplatePreviewModal
          templateId={previewTemplate}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onSelect={handlePreviewSelect}
        />
      </main>
    </div>
  )
}
