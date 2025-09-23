import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface SitePageParams {
  slug: string
}

export default async function SitePage({ params }: { params: Promise<SitePageParams> }) {
  const supabase = await createClient()
  const { slug } = await params

  // Get site by slug
  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !site) {
    notFound()
  }

  // Record visit (analytics)
  await supabase
    .from('visits')
    .insert({
      site_id: site.id,
      source: 'direct',
      user_agent: 'server-side-render'
    })

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: site.generated_css || '' }} />
      <div dangerouslySetInnerHTML={{ __html: site.generated_html || '' }} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<SitePageParams> }) {
  const supabase = await createClient()
  const { slug } = await params

  const { data: site } = await supabase
    .from('sites')
    .select('brand_name, headline, description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!site) {
    return {
      title: 'Site Not Found'
    }
  }

  return {
    title: `${site.brand_name} - ${site.headline}`,
    description: site.description,
  }
}
