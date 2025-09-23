import React from 'react'
import { BrandConfig, TemplateRenderResult } from '@/lib/types'
import { generateCSSVariables } from '@/lib/colors'

interface Template2Props {
  brand: BrandConfig
}

export function Template2({ brand }: Template2Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Split Layout */}
      <section className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                {brand.logoUrl && (
                  <img
                    src={brand.logoUrl}
                    alt={brand.brandName}
                    className="h-10 w-auto mr-4 filter brightness-0 invert"
                  />
                )}
                <span className="text-2xl font-bold">{brand.brandName}</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">{brand.copy.headline}</h1>
              <p className="text-xl mb-8 opacity-90">{brand.copy.subheadline}</p>
              <button className="bg-white text-[var(--brand-primary)] px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
                {brand.copy.cta}
              </button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-video bg-white/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Block Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--brand-secondary)] text-white p-12 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">Premium Quality</h3>
              <p className="text-lg opacity-90">Experience the difference with our industry-leading solutions.</p>
            </div>
            <div className="bg-[var(--brand-accent)] text-white p-12 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">Fast Results</h3>
              <p className="text-lg opacity-90">See immediate impact with our proven methodology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Get started with {brand.brandName} today</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold text-[var(--brand-primary)] mb-6">$99<span className="text-lg text-gray-500">/mo</span></div>
              <button className="cta-button" onClick={() => brand.ctaUrl && window.open(brand.ctaUrl, '_blank')}>{brand.copy.cta}</button>
            </div>
            <div className="bg-[var(--brand-primary)] text-white p-8 rounded-2xl shadow-lg transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-6">$199<span className="text-lg opacity-75">/mo</span></div>
              <button className="w-full bg-white text-[var(--brand-primary)] py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                {brand.copy.cta}
              </button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-[var(--brand-primary)] mb-6">$399<span className="text-lg text-gray-500">/mo</span></div>
              <button className="cta-button" onClick={() => brand.ctaUrl && window.open(brand.ctaUrl, '_blank')}>{brand.copy.cta}</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold mb-4">How does {brand.brandName} work?</h3>
              <p className="text-gray-600">Our platform provides comprehensive solutions tailored to your specific needs in the {brand.industry?.toLowerCase()} industry.</p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold mb-4">What makes you different?</h3>
              <p className="text-gray-600">We combine cutting-edge technology with personalized service to deliver exceptional results for our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            {brand.logoUrl && (
              <img
                src={brand.logoUrl}
                alt={brand.brandName}
                className="h-10 w-auto mr-4 filter brightness-0 invert"
              />
            )}
            <span className="text-2xl font-bold">{brand.brandName}</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{brand.description}</p>
          <div className="cta-section text-center">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => brand.ctaUrl && window.open(brand.ctaUrl, '_blank')}
            >
              {brand.copy.cta}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function renderTemplate(brand: BrandConfig): TemplateRenderResult {
  const css = `
    ${generateCSSVariables(brand.colors)}
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #111827;
    }
  `

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${brand.brandName} - ${brand.copy.headline}</title>
      <style>${css}</style>
    </head>
    <body>
      <!-- Hero with gradient background -->
      <section style="background: linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent}); color: white; padding: 5rem 1rem;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
              ${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="${brand.brandName}" style="height: 2.5rem; margin-right: 1rem; filter: brightness(0) invert(1);">` : ''}
              <span style="font-size: 1.5rem; font-weight: bold;">${brand.brandName}</span>
            </div>
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1.5rem;">${brand.copy.headline}</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">${brand.copy.subheadline}</p>
            <button style="background: white; color: ${brand.colors.primary}; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.125rem; font-weight: bold; cursor: pointer;">${brand.copy.cta}</button>
          </div>
          <div style="background: rgba(255,255,255,0.1); border-radius: 1rem; padding: 2rem; backdrop-filter: blur(10px);">
            <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.2); border-radius: 0.5rem;"></div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section style="padding: 5rem 1rem;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div style="background: ${brand.colors.secondary}; color: white; padding: 3rem; border-radius: 1rem;">
            <h3 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">Premium Quality</h3>
            <p style="font-size: 1.125rem; opacity: 0.9;">Experience the difference with our industry-leading solutions.</p>
          </div>
          <div style="background: ${brand.colors.accent}; color: white; padding: 3rem; border-radius: 1rem;">
            <h3 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">Fast Results</h3>
            <p style="font-size: 1.125rem; opacity: 0.9;">See immediate impact with our proven methodology.</p>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section style="padding: 5rem 1rem; background: #f9fafb;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Choose Your Plan</h2>
          <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 4rem;">Get started with ${brand.brandName} today</p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
              <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Starter</h3>
              <div style="font-size: 2.5rem; font-weight: bold; color: ${brand.colors.primary}; margin-bottom: 1.5rem;">$99<span style="font-size: 1rem; color: #6b7280;">/mo</span></div>
              <button style="width: 100%; background: #f3f4f6; color: #111827; padding: 0.75rem; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;">Get Started</button>
            </div>
            <div style="background: ${brand.colors.primary}; color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); transform: scale(1.05);">
              <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Professional</h3>
              <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">$199<span style="font-size: 1rem; opacity: 0.75;">/mo</span></div>
              <button style="width: 100%; background: white; color: ${brand.colors.primary}; padding: 0.75rem; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;" onclick="window.open('${brand.ctaUrl || 'https://example.com'}', '_blank')">${brand.copy.cta}</button>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
              <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Enterprise</h3>
              <div style="font-size: 2.5rem; font-weight: bold; color: ${brand.colors.primary}; margin-bottom: 1.5rem;">$399<span style="font-size: 1rem; color: #6b7280;">/mo</span></div>
              <button style="width: 100%; background: #f3f4f6; color: #111827; padding: 0.75rem; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer style="background: #111827; color: white; padding: 4rem 1rem; text-align: center;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
            ${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="${brand.brandName}" style="height: 2.5rem; margin-right: 1rem; filter: brightness(0) invert(1);">` : ''}
            <span style="font-size: 1.5rem; font-weight: bold;">${brand.brandName}</span>
          </div>
          <p style="color: #9ca3af; margin-bottom: 2rem; max-width: 32rem; margin-left: auto; margin-right: auto;">${brand.description}</p>
          <button style="background: ${brand.colors.primary}; color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.125rem; font-weight: bold; cursor: pointer;" onclick="window.open('${brand.ctaUrl || 'https://example.com'}', '_blank')">${brand.copy.cta}</button>
        </div>
      </footer>
    </body>
    </html>
  `

  return { html, css }
}
