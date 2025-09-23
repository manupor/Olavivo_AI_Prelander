import { Template1, renderTemplate as renderT1 } from './t1'
import { Template2, renderTemplate as renderT2 } from './t2'
import { Template3, renderTemplate as renderT3 } from './t3'
import { Template4, renderTemplate as renderT4 } from './t4'
import { Template5, renderTemplate as renderT5 } from './t5'
import { Template6, renderTemplate as renderT6 } from './t6'
import { Template7, renderTemplate as renderT7 } from './t7'
import { TemplateDefinition } from '@/lib/types'

export const templates: Record<'t1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7', TemplateDefinition> = {
  t1: {
    id: 't1',
    name: 'Minimal SaaS',
    description: 'Clean, professional design perfect for SaaS and tech companies',
    preview: '/templates/t1-preview.svg',
    component: Template1,
    renderTemplate: renderT1,
  },
  t2: {
    id: 't2',
    name: 'Bold Marketing',
    description: 'Eye-catching design with strong visual impact for marketing campaigns',
    preview: '/templates/t2-preview.svg',
    component: Template2,
    renderTemplate: renderT2,
  },
  t3: {
    id: 't3',
    name: 'Lead Generation',
    description: 'Conversion-focused design with prominent forms and CTAs',
    preview: '/templates/t3-preview.svg',
    component: Template3,
    renderTemplate: renderT3,
  },
  t4: {
    id: 't4',
    name: 'Casino Gaming',
    description: 'High-energy casino design with vibrant colors and gaming elements',
    preview: '/templates/t4-preview.svg',
    component: Template4,
    renderTemplate: renderT4,
  },
  t5: {
    id: 't5',
    name: 'iGaming Casino',
    description: 'Interactive casino slot machine with animated elements and gaming features',
    preview: '/templates/t5-preview.svg',
    component: Template5,
    renderTemplate: renderT5,
  },
  t6: {
    id: 't6',
    name: 'Olavivo Casino Slots',
    description: 'Interactive 3-line slot machine with animated symbols and casino atmosphere',
    preview: '/templates/t6-preview.svg',
    component: Template6,
    renderTemplate: renderT6,
  },
  t7: {
    id: 't7',
    name: 'Bonanza Billion',
    description: 'Premium 3x3 slot machine with jackpot features and animated bonanza theme',
    preview: '/templates/t7-preview.svg',
    component: Template7,
    renderTemplate: renderT7,
  },
}

export { 
  Template1, 
  Template2, 
  Template3, 
  Template4, 
  Template5, 
  Template6, 
  Template7, 
  renderT1, 
  renderT2, 
  renderT3, 
  renderT4, 
  renderT5, 
  renderT6, 
  renderT7 
}
