import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, siteId, templateId, currentColors, currentContent, conversationHistory } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        message: "🤖 I'm currently unavailable, but I can still help! Try these manual options:\n\n• Use the color pickers to adjust your brand colors\n• Edit the text fields to update your content\n• Click 'Reset to Logo Colors' to extract colors from your logo\n• Use 'Regenerate with AI' to create new variations",
        changes: null 
      })
    }

    const templateInfo = {
      't1': 'Minimal SaaS - Clean, professional design',
      't2': 'Bold Marketing - Eye-catching with strong visual impact', 
      't3': 'Lead Generation - Conversion-focused with prominent CTAs',
      't4': 'Casino Gaming - High-energy casino design',
      't5': 'iGaming Casino - Interactive casino slot machine',
      't6': 'Olavivo Casino Slots - 3-line slot machine',
      't7': 'Bonanza Billion - Premium 3x3 slot machine with jackpot features'
    }

    const systemPrompt = `You are an expert web developer and UX/UI designer helping users customize their landing page templates. You have deep knowledge of color theory, conversion optimization, and modern web design.

CURRENT CONTEXT:
Template: ${templateInfo[templateId as keyof typeof templateInfo] || templateId}
Colors: Primary: ${currentColors.primary}, Secondary: ${currentColors.secondary}, Accent: ${currentColors.accent}
Content: 
- Brand: "${currentContent.brandName}"
- Headline: "${currentContent.headline}"
- Subheadline: "${currentContent.subheadline}"
- CTA Button: "${currentContent.cta}"
- Description: "${currentContent.description}"

INSTRUCTIONS:
1. Provide specific, actionable advice for web design improvements
2. When suggesting colors, always provide valid hex codes
3. When suggesting content, focus on conversion optimization
4. Be concise but thorough in explanations
5. Always explain the reasoning behind your suggestions
6. Consider the template type when making recommendations

RESPONSE FORMAT:
- Give a helpful explanation of what you're changing and why
- Be encouraging and professional
- Use emojis sparingly but effectively
- Focus on practical improvements that enhance user experience

Remember: You're helping create high-converting, visually appealing websites that represent the user's brand effectively.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || "I couldn't process that request."

    // Enhanced change detection and parsing
    let changes = null
    const lowerMessage = message.toLowerCase()
    const lowerResponse = aiResponse.toLowerCase()
    
    // Color change detection
    const colorKeywords = ['color', 'blue', 'red', 'green', 'orange', 'purple', 'yellow', 'pink', 'cyan', 'magenta', 'vibrant', 'darker', 'lighter', 'warmer', 'cooler']
    if (colorKeywords.some(keyword => lowerMessage.includes(keyword))) {
      const colorMatches = aiResponse.match(/#[0-9A-Fa-f]{6}/g)
      if (colorMatches && colorMatches.length > 0) {
        changes = {
          colors: {
            primary: colorMatches[0],
            secondary: colorMatches[1] || currentColors.secondary,
            accent: colorMatches[2] || currentColors.accent
          }
        }
      } else {
        // Predefined color suggestions based on keywords
        const colorSuggestions = {
          'blue': { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
          'red': { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
          'green': { primary: '#10B981', secondary: '#059669', accent: '#34D399' },
          'orange': { primary: '#F97316', secondary: '#EA580C', accent: '#FB923C' },
          'purple': { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
          'pink': { primary: '#EC4899', secondary: '#DB2777', accent: '#F472B6' },
          'vibrant': { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F' },
          'warmer': { primary: '#F97316', secondary: '#EA580C', accent: '#FED7AA' },
          'cooler': { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' }
        }
        
        for (const [keyword, colors] of Object.entries(colorSuggestions)) {
          if (lowerMessage.includes(keyword)) {
            changes = { colors }
            break
          }
        }
      }
    }

    // Content change detection
    const contentKeywords = ['headline', 'title', 'heading', 'subheadline', 'subtitle', 'button', 'cta', 'call to action']
    if (contentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      // Look for quoted text in AI response
      const quotedMatches = aiResponse.match(/"([^"]+)"/g)
      if (quotedMatches && quotedMatches.length > 0) {
        const cleanQuotes = quotedMatches.map(q => q.replace(/"/g, ''))
        
        const contentChanges: any = {}
        
        if (lowerMessage.includes('headline') || lowerMessage.includes('title')) {
          contentChanges.headline = cleanQuotes[0]
        }
        if (lowerMessage.includes('subheadline') || lowerMessage.includes('subtitle')) {
          contentChanges.subheadline = cleanQuotes[lowerMessage.includes('headline') ? 1 : 0] || cleanQuotes[0]
        }
        if (lowerMessage.includes('button') || lowerMessage.includes('cta')) {
          contentChanges.cta = cleanQuotes[cleanQuotes.length - 1]
        }
        
        changes = {
          ...changes,
          content: contentChanges
        }
      }
    }

    // Brand name changes
    if (lowerMessage.includes('brand') || lowerMessage.includes('company') || lowerMessage.includes('name')) {
      const quotedMatches = aiResponse.match(/"([^"]+)"/g)
      if (quotedMatches && quotedMatches.length > 0) {
        changes = {
          ...changes,
          content: {
            ...changes?.content,
            brandName: quotedMatches[0].replace(/"/g, '')
          }
        }
      }
    }

    return NextResponse.json({
      message: aiResponse,
      changes
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({
      message: "I'm having trouble right now. Please try the manual editing options above.",
      changes: null
    })
  }
}
