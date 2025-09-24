import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, siteId, templateId, currentColors, currentContent } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        message: "I'm currently unavailable. Please try the manual editing options above.",
        changes: null 
      })
    }

    const systemPrompt = `You are an AI assistant helping users customize their landing page templates. 

Current template: ${templateId}
Current colors: Primary: ${currentColors.primary}, Secondary: ${currentColors.secondary}, Accent: ${currentColors.accent}
Current content: 
- Brand: ${currentContent.brandName}
- Headline: ${currentContent.headline}
- Subheadline: ${currentContent.subheadline}
- CTA: ${currentContent.cta}

When users ask for changes, provide helpful suggestions and if applicable, return specific changes in this format:
- For color changes, suggest hex color codes
- For content changes, suggest improved text
- Always explain what you're changing and why

Be concise, helpful, and focus on improving conversion and visual appeal.`

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

    // Parse AI response for actionable changes
    let changes = null
    
    // Simple pattern matching for common requests
    if (message.toLowerCase().includes('color') || message.toLowerCase().includes('blue') || message.toLowerCase().includes('red') || message.toLowerCase().includes('green')) {
      // Extract color suggestions from AI response
      const colorMatches = aiResponse.match(/#[0-9A-Fa-f]{6}/g)
      if (colorMatches && colorMatches.length > 0) {
        changes = {
          colors: {
            primary: colorMatches[0],
            secondary: colorMatches[1] || currentColors.secondary,
            accent: colorMatches[2] || currentColors.accent
          }
        }
      }
    }

    if (message.toLowerCase().includes('headline') || message.toLowerCase().includes('title')) {
      // Look for quoted text in AI response as new headline
      const headlineMatch = aiResponse.match(/"([^"]+)"/g)
      if (headlineMatch && headlineMatch.length > 0) {
        changes = {
          ...changes,
          content: {
            headline: headlineMatch[0].replace(/"/g, '')
          }
        }
      }
    }

    if (message.toLowerCase().includes('button') || message.toLowerCase().includes('cta')) {
      // Look for button text suggestions
      const ctaMatch = aiResponse.match(/"([^"]+)"/g)
      if (ctaMatch && ctaMatch.length > 0) {
        changes = {
          ...changes,
          content: {
            ...changes?.content,
            cta: ctaMatch[ctaMatch.length - 1].replace(/"/g, '')
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
