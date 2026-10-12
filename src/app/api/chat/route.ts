import { NextResponse } from "next/server";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * AI Chatbot API Route for Greenly Landscaping
 * 
 * ============================================================================
 * HOW TO CONNECT YOUR REAL AI API KEY LATER:
 * ============================================================================
 * 1. Create or open `.env.local` in the project root.
 * 2. Add your provider key:
 *    - For Google Gemini:
 *      GEMINI_API_KEY="your-gemini-api-key-here"
 *    - Or for OpenAI:
 *      OPENAI_API_KEY="sk-your-openai-api-key-here"
 * 3. Uncomment or adapt the AI provider client call below.
 * 4. This route already gracefully falls back to the built-in Greenly
 *    Landscaping Knowledge Engine if no external key is present.
 */

// Greenly domain response generator for fallback / instant response
function generateGreenlyResponse(userMessage: string): { reply: string; suggestions?: string[] } {
  const query = userMessage.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings)\b/i.test(query)) {
    return {
      reply: "Hello! Welcome to Greenly. 🌿 I'm your virtual landscaping assistant. How can I help you elevate your outdoor space today?",
      suggestions: ["Explore Services", "Get a Quote", "Pricing & Estimates", "Emergency Lawn Care"],
    };
  }

  // Quote or estimate request
  if (/quote|estimate|cost|pricing|price|rate|how much/i.test(query)) {
    return {
      reply: "We offer tailored landscaping solutions with competitive, transparent pricing!\n\n• Routine Lawn Mowing & Edging: Starting from $45 - $65/visit\n• Garden Maintenance & Pruning: From $95/visit\n• Seasonal Cleanup (Spring/Fall): From $180\n• Custom Landscape Design & Hardscaping: Free on-site consultation & tailored quote\n\nWould you like to schedule an inspection or request an official quote?",
      suggestions: ["Get a Quote", "Contact Information", "Explore Services"],
    };
  }

  // Services list & inquiries
  if (/service|services|what do you do|what do you offer|lawn|mow|mowing|shrub|tree|trim|clean|mulch|design|hardscape|irrigation|sod/i.test(query)) {
    return {
      reply: "Greenly provides comprehensive residential and commercial landscaping services:\n\n🌱 **Lawn Care & Mowing**: Weekly/bi-weekly mowing, edging, fertilization, and weed control.\n✂️ **Tree & Shrub Trimming**: Precision pruning, crown shaping, and seasonal thinning.\n🍂 **Seasonal Cleanups**: Debris removal, bed edging, mulching, and winter preparation.\n🏡 **Landscape Architecture & Hardscaping**: Patios, retaining walls, sod installation, and planting.\n💧 **Smart Irrigation**: System design, repairs, and seasonal winterization.\n\nWhich service can we assist you with?",
      suggestions: ["Lawn Mowing", "Tree & Shrub Trimming", "Seasonal Cleanups", "Get a Quote"],
    };
  }

  // Emergency lawn care / urgent requests
  if (/emergency|urgent|storm|fallen|tree down|asap|rescue/i.test(query)) {
    return {
      reply: "🚨 **Emergency Landscaping & Storm Response**\n\nFor urgent hazards such as fallen branches, storm damage, or urgent property hazards, our priority crew is on standby.\n\nPlease call our direct hotline immediately at **+1 (000) 123-4567** for same-day dispatch and hazard mitigation.",
      suggestions: ["Call Hotline: +1 (000) 123-4567", "Contact Information", "Get a Quote"],
    };
  }

  // Business hours & availability
  if (/hour|hours|open|time|schedule|when|weekend|sunday|saturday/i.test(query)) {
    return {
      reply: "⏰ **Business Hours**:\n• Monday – Friday: 8:00 AM – 6:00 PM\n• Saturday: 9:00 AM – 4:00 PM\n• Sunday: Closed (Emergency dispatch available by phone)\n\nYou can submit an online quote request 24/7!",
      suggestions: ["Get a Quote", "Contact Information", "Explore Services"],
    };
  }

  // Contact info & location
  if (/contact|phone|email|address|location|where|office|call/i.test(query)) {
    return {
      reply: "📍 **Greenly Landscaping Headquarters**\n• Address: 123 Greenway Street, City Center\n• Phone: +1 (000) 123-4567\n• Email: info@gardencare.com\n\nFeel free to call us or drop by during office hours!",
      suggestions: ["Get a Quote", "Explore Services", "Pricing & Estimates"],
    };
  }

  // About the company
  if (/about|who are you|experience|greenly/i.test(query)) {
    return {
      reply: "Greenly is a premier gardening and landscape maintenance provider. We combine horticultural science with eco-friendly design to cultivate healthy, picturesque outdoor living spaces. With over 10+ years of local experience, our certified landscaping crews guarantee top-tier service.",
      suggestions: ["Explore Services", "Pricing & Estimates", "Get a Quote"],
    };
  }

  // Thanks / appreciation
  if (/thank|thanks|appreciate|great|awesome|good job/i.test(query)) {
    return {
      reply: "You're very welcome! If you need anything else, feel free to ask or click 'Get a Quote' anytime to get your project started. Have a wonderful day! 🌸",
      suggestions: ["Explore Services", "Get a Quote"],
    };
  }

  // Default helpful fallback
  return {
    reply: "Thank you for reaching out! I can help you with services overview, project pricing estimates, scheduling a free consultation, or emergency yard care.\n\nWhat can we help you with today?",
    suggestions: ["Explore Services", "Pricing & Estimates", "Get a Quote", "Emergency Lawn Care"],
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided in request payload." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // -------------------------------------------------------------------------
    // OPTIONAL EXTERNAL AI INTEGRATION HOOK
    // When you are ready to use an external LLM (e.g. OpenAI or Gemini):
    // -------------------------------------------------------------------------
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are the friendly AI customer service assistant for Greenly Landscaping. Provide polite, professional landscaping guidance, mention services (Lawn mowing, Tree trimming, Seasonal cleanup, Hardscaping), phone (+1 (000) 123-4567), and email (info@gardencare.com).\n\nUser query: ${lastUserMessage}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              suggestions: ["Explore Services", "Get a Quote", "Pricing & Estimates"],
            });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, using built-in fallback response:", err);
      }
    }

    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are Greenly AI, an expert customer service assistant for Greenly Landscaping. Offer clear, courteous guidance on lawn care, maintenance, landscaping design, estimates, and consultations. Direct urgent calls to +1 (000) 123-4567.",
              },
              ...messages,
            ],
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.choices?.[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              suggestions: ["Explore Services", "Get a Quote", "Pricing & Estimates"],
            });
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed, using built-in fallback response:", err);
      }
    }

    // Default intelligent fallback built-in knowledge response
    const fallbackResponse = generateGreenlyResponse(lastUserMessage);
    return NextResponse.json(fallbackResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I'm experiencing a momentary connection issue. Please feel free to give our team a call at +1 (000) 123-4567 or email info@gardencare.com!",
        suggestions: ["Contact Information", "Explore Services"],
      },
      { status: 500 }
    );
  }
}
