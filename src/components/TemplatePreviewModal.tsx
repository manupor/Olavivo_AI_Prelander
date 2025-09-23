import React, { useEffect, useState, useRef } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplateId } from '@/lib/types'
import { Template1 } from '@/templates/t1'
import { Template2 } from '@/templates/t2'
import { Template3 } from '@/templates/t3'
import { Template4 } from '@/templates/t4'
import { Template5 } from '@/templates/t5'
import { Template6 } from '@/templates/t6'
import { Template7 } from '@/templates/t7'

interface TemplatePreviewModalProps {
  templateId: TemplateId | null
  isOpen: boolean
  onClose: () => void
  onSelect?: (templateId: TemplateId) => void
}

const sampleBrandConfig = {
  brandName: 'Sample Brand',
  logoUrl: 'https://via.placeholder.com/150x60/4F46E5/FFFFFF?text=LOGO',
  colors: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    accent: '#F59E0B'
  },
  copy: {
    headline: 'Welcome to Our Amazing Platform',
    subheadline: 'Experience the future of digital innovation with our cutting-edge solutions',
    cta: 'Get Started Now'
  },
  industry: 'Technology',
  description: 'A sample brand for preview purposes',
  ctaUrl: 'https://example.com'
}

const templateComponents = {
  t1: Template1,
  t2: Template2,
  t3: Template3,
  t4: Template4,
  t5: Template5,
  t6: Template6,
  t7: Template7,
}

export function TemplatePreviewModal({ templateId, isOpen, onClose, onSelect }: TemplatePreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && templateId) {
      setIsLoading(true)
      // Reduce loading time to minimize blinking
      const timer = setTimeout(() => setIsLoading(false), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, templateId])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Check if content is scrollable and show scroll buttons
  useEffect(() => {
    const checkScrollable = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        setShowScrollButtons(scrollHeight > clientHeight)
      }
    }

    if (!isLoading && isOpen) {
      // Check after a short delay to ensure content is rendered
      const timer = setTimeout(checkScrollable, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading, isOpen])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' })
    }
  }

  if (!isOpen || !templateId) return null

  const TemplateComponent = templateComponents[templateId]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] mx-4 flex flex-col overflow-hidden">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full transition-all duration-200 shadow-lg backdrop-blur-sm"
          title="Close Preview"
        >
          <X size={18} />
        </button>
        
        {/* Minimal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-medium text-gray-700">Template Preview</h2>
          </div>
          {onSelect && (
            <Button
              onClick={() => {
                onSelect(templateId)
                onClose()
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Use This Template
            </Button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-gray-50">
          <style jsx>{`
            .preview-scrollbar {
              scrollbar-width: auto !important;
              scrollbar-color: #3b82f6 #e5e7eb !important;
              overflow-y: scroll !important;
            }
            .preview-scrollbar::-webkit-scrollbar {
              width: 12px !important;
              display: block !important;
            }
            .preview-scrollbar::-webkit-scrollbar-track {
              background: #e5e7eb !important;
              border-radius: 6px !important;
            }
            .preview-scrollbar::-webkit-scrollbar-thumb {
              background: #3b82f6 !important;
              border-radius: 6px !important;
              border: 2px solid #e5e7eb !important;
              min-height: 30px !important;
            }
            .preview-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #2563eb !important;
            }
            .template-container {
              transform-origin: top center;
              transform: scale(0.8);
              width: 125%;
              margin-left: -12.5%;
              transition: none;
            }
          `}</style>
          
          <div 
            ref={contentRef} 
            className="w-full h-full preview-scrollbar"
            style={{ 
              scrollBehavior: 'smooth',
              overflowY: 'scroll'
            }}
          >
            <div className="template-container">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <TemplateComponent brand={sampleBrandConfig} />
              )}
            </div>
          </div>
          
          {/* Elegant Scroll Indicator */}
          {showScrollButtons && !isLoading && (
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <button
                onClick={scrollToTop}
                className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
                title="Scroll to Top"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={scrollToBottom}
                className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
                title="Scroll to Bottom"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          )}
          
          {/* Subtle Scroll Hint */}
          {showScrollButtons && !isLoading && (
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-lg text-xs border border-gray-200 shadow-sm">
              Scroll to explore
            </div>
          )}
        </div>

        {/* Clean Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <p className="text-xs text-gray-500 text-center">
            Preview with sample content • Your brand details will be applied when generating
          </p>
        </div>
      </div>
    </div>
  )
}
