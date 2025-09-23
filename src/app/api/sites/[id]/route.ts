import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { renderT1, renderT2, renderT3, renderT4, renderT5, renderT6 } from '@/templates'
import { renderTemplate as renderT7 } from '@/templates/t7/server'
import { BrandConfig, TemplateId } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get site with ownership verification
    const { data: site, error } = await supabase
      .from('sites')
      .select(`
        *,
        organizations!inner(owner_user_id)
      `)
      .eq('id', id)
      .eq('organizations.owner_user_id', user.id)
      .single()

    if (error || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: site })

  } catch (error) {
    console.error('Site fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params

    // Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch existing site with ownership verification
    const { data: existing, error: fetchError } = await supabase
      .from('sites')
      .select(`
        *,
        organizations!inner(owner_user_id)
      `)
      .eq('id', id)
      .eq('organizations.owner_user_id', user.id)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    const body = await request.json()

    // Extract updatable fields
    const update: any = {}
    if (typeof body.brand_name === 'string') update.brand_name = body.brand_name
    if (typeof body.description === 'string') update.description = body.description
    if (typeof body.headline === 'string') update.headline = body.headline
    if (typeof body.subheadline === 'string') update.subheadline = body.subheadline
    if (typeof body.cta === 'string') update.cta = body.cta
    // Note: ctaUrl passed to renderer but not persisted (no cta_url column yet)
    if (typeof body.logo_url === 'string') update.logo_url = body.logo_url

    if (body.colors) {
      if (typeof body.colors.primary === 'string') update.primary_color = body.colors.primary
      if (typeof body.colors.secondary === 'string') update.secondary_color = body.colors.secondary
      if (typeof body.colors.accent === 'string') update.accent_color = body.colors.accent
    }

    // Validate hex colors; if invalid, discard updates and use existing
    const hexRe = /^#[0-9A-F]{6}$/i
    if (update.primary_color && !hexRe.test(update.primary_color)) delete update.primary_color
    if (update.secondary_color && !hexRe.test(update.secondary_color)) delete update.secondary_color
    if (update.accent_color && !hexRe.test(update.accent_color)) delete update.accent_color

    // Build brand config for re-render
    const colors = {
      primary: update.primary_color ?? existing.primary_color ?? '#3B82F6',
      secondary: update.secondary_color ?? existing.secondary_color ?? '#6B7280',
      accent: update.accent_color ?? existing.accent_color ?? '#10B981',
    }

    const brand: BrandConfig = {
      brandName: update.brand_name ?? existing.brand_name ?? 'Brand',
      logoUrl: update.logo_url ?? existing.logo_url ?? undefined,
      colors,
      copy: {
        headline: update.headline ?? existing.headline ?? 'Transform Your Business',
        subheadline: update.subheadline ?? existing.subheadline ?? 'Get started with our amazing service today',
        cta: update.cta ?? existing.cta ?? 'Get Started',
      },
      industry: existing.industry ?? undefined,
      description: update.description ?? existing.description ?? undefined,
      ctaUrl: (typeof body.ctaUrl === 'string' ? body.ctaUrl : undefined) ?? undefined,
    }
    
    console.log('Built brand config for rendering:', JSON.stringify(brand, null, 2))

    // Choose renderer based on template_id
    const templateId = (existing.template_id as TemplateId)
    const rendererMap: Record<TemplateId, typeof renderT1> = {
      t1: renderT1,
      t2: renderT2,
      t3: renderT3,
      t4: renderT4,
      t5: renderT5,
      t6: renderT6,
      t7: renderT7,
    }

    const renderer = rendererMap[templateId] ?? renderT1
    let html: string
    let css: string
    try {
      const rendered = renderer(brand)
      html = rendered.html
      css = rendered.css
    } catch (e) {
      console.error(`Template render (PUT) failed for template ${templateId}:`, e)
      console.error('Brand config that caused error:', JSON.stringify(brand, null, 2))
      
      // Use the original template renderer as fallback instead of generic HTML
      try {
        console.log(`Attempting fallback with renderT1 for template ${templateId}`)
        const fallback = renderT1(brand)
        html = fallback.html
        css = fallback.css
      } catch (fallbackError) {
        console.error('Even fallback failed:', fallbackError)
        // Last resort: generic HTML
        css = `:root{--brand-primary:${colors.primary};--brand-secondary:${colors.secondary};--brand-accent:${colors.accent};}body{font-family:ui-sans-serif,system-ui;line-height:1.6;color:#111827;margin:0;padding:2rem}.btn{background:var(--brand-primary);color:#fff;padding:.75rem 1.25rem;border-radius:.5rem;border:0;font-weight:600}`
        html = `<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><title>${brand.brandName}</title><style>${css}</style></head><body><header style=\"display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem\"><div style=\"display:flex;align-items:center;gap:.5rem\">${brand.logoUrl ? `<img src=\"${brand.logoUrl}\" alt=\"${brand.brandName}\" style=\"height:32px\"/>` : ''}<strong>${brand.brandName}</strong></div><button class=\"btn\" onclick=\"window.open('${brand.ctaUrl || '#'}','_blank')\">${brand.copy.cta}</button></header><main style=\"max-width:720px;margin:0 auto;text-align:center\"><h1 style=\"font-size:2rem;font-weight:800;margin-bottom:.75rem\">${brand.copy.headline}</h1><p style=\"color:#6b7280;margin-bottom:1.5rem\">${brand.copy.subheadline}</p><button class=\"btn\">${brand.copy.cta}</button></main></body></html>`
      }
    }

    // Persist updates
    const { data: updated, error: updateError } = await supabase
      .from('sites')
      .update({
        ...update,
        generated_html: html,
        generated_css: css,
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Site update error:', updateError)
      return NextResponse.json({ error: 'Failed to update site' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: updated })

  } catch (error) {
    console.error('Site update failure:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
