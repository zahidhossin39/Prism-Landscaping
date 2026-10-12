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
 * 3. The route automatically detects the environment variable and routes
 *    queries to your configured LLM with full multi-turn conversation support.
 * 4. This route already gracefully falls back to the built-in Greenly
 *    Landscaping Knowledge Engine if no external key is configured.
 */

// Contextual suggestion generator
function getDynamicSuggestions(query: string, reply: string): string[] {
  const q = (query + " " + reply).toLowerCase();
  
  if (q.includes("emergency") || q.includes("storm") || q.includes("hazard")) {
    return ["Call Emergency Hotline", "Request Priority Inspection", "Contact Us"];
  }
  if (q.includes("quote") || q.includes("estimate") || q.includes("pricing") || q.includes("cost")) {
    return ["Get A Free Quote", "Explore Services", "Business Hours", "Contact Us"];
  }
  if (q.includes("lawn") || q.includes("mow") || q.includes("aerat")) {
    return ["Lawn Aeration", "Routine Mowing", "Get A Free Quote", "Pricing & Estimates"];
  }
  if (q.includes("tree") || q.includes("shrub") || q.includes("trim") || q.includes("prun")) {
    return ["Shrub Trimming", "Seasonal Cleanup", "Get A Free Quote"];
  }
  if (q.includes("hour") || q.includes("location") || q.includes("contact") || q.includes("phone")) {
    return ["Get A Free Quote", "Explore Services", "Emergency Lawn Care"];
  }

  return ["Explore Services", "Get a Quote", "Pricing & Estimates", "Emergency Lawn Care"];
}

// Greenly domain response generator for fallback / instant response
function generateGreenlyResponse(userMessage: string): { reply: string; suggestions?: string[] } {
  const query = userMessage.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings|yo)\b/i.test(query)) {
    return {
      reply: "Hello! Welcome to Greenly. 🌿 I'm your virtual landscaping assistant. How can I help you elevate your outdoor space today?",
      suggestions: ["Explore Services", "Get a Quote", "Pricing & Estimates", "Emergency Lawn Care"],
    };
  }

  // Emergency lawn care / urgent requests (Priority check)
  if (/emergency|urgent|storm|fallen|tree down|asap|rescue|hazard|danger|damage/i.test(query)) {
    return {
      reply: "🚨 **Emergency Landscaping & Storm Response**\n\nFor urgent hazards such as fallen branches, storm debris, or property hazards, our priority crew is on standby.\n\nPlease call our direct hotline immediately at **+1 (000) 123-4567** for same-day dispatch and hazard mitigation.",
      suggestions: ["Call Hotline: +1 (000) 123-4567", "Contact Information", "Get a Quote"],
    };
  }

  // Quote or estimate request
  if (/quote|estimate|cost|pricing|price|rate|how much|fee/i.test(query)) {
    return {
      reply: "We offer tailored landscaping solutions with competitive, transparent pricing!\n\n• Routine Lawn Mowing & Edging: Starting from $45 - $65/visit\n• Garden Maintenance & Pruning: From $95/visit\n• Seasonal Cleanup (Spring/Fall): From $180\n• Custom Landscape Design & Hardscaping: Free on-site consultation & tailored quote\n\nWould you like to schedule an inspection or request an official quote?",
      suggestions: ["Get a Quote", "Contact Information", "Explore Services"],
    };
  }

  // Specific service: Lawn Aeration & Overseeding
  if (/aerat|overseed|thatch/i.test(query)) {
    return {
      reply: "🌱 **Lawn Aeration & Overseeding**\n\nCore aeration relieves compacted soil, improves oxygen flow to root systems, and promotes dense grass growth. Paired with premium grass seed blending, your turf stays lush and weed-resistant all season.\n\n• Recommended: Early spring or autumn\n• Includes: Core perforation, organic fertilizer, premium overseeding",
      suggestions: ["Get a Quote", "Pricing & Estimates", "Explore Services"],
    };
  }

  // Specific service: Shrub & Tree Trimming
  if (/shrub|tree|hedge|bush|trim|prun/i.test(query)) {
    return {
      reply: "✂️ **Shrub & Tree Trimming**\n\nOur certified arborists and landscape specialists provide precision pruning to foster healthy plant structure, prevent disease, and maintain clean aesthetics for all hedges and ornamental trees.\n\n• Services: Hedge shaping, deadwooding, canopy thinning, seasonal pruning",
      suggestions: ["Get a Quote", "Pricing & Estimates", "Explore Services"],
    };
  }

  // Specific service: Irrigation
  if (/irrigat|sprinkler|water system/i.test(query)) {
    return {
      reply: "💧 **Smart Irrigation Installation & Maintenance**\n\nWe install water-efficient drip lines, smart Wi-Fi controllers, and rotary sprinkler systems designed to save up to 40% on water bills while keeping your landscape thriving.\n\n• Services: New system installation, leak diagnostics, seasonal winterization/blowout",
      suggestions: ["Get a Quote", "Pricing & Estimates", "Contact Information"],
    };
  }

  // Specific service: Mulching & Soil Testing
  if (/mulch|soil|fertiliz|compost/i.test(query)) {
    return {
      reply: "🍂 **Mulching & Soil Conditioning**\n\nQuality organic bark mulch retains moisture, suppresses weed germination, and insulates root systems from temperature spikes. We also perform comprehensive pH and nutrient soil testing.\n\n• Organic hardwood, cedar, and hemlock mulch options available",
      suggestions: ["Get a Quote", "Pricing & Estimates", "Explore Services"],
    };
  }

  // General Services list & inquiries
  if (/service|services|what do you do|what do you offer|lawn|mow|mowing|clean|design|hardscape|sod|turf|weed/i.test(query)) {
    return {
      reply: "Greenly provides comprehensive residential and commercial landscaping services:\n\n🌱 **Lawn Care & Mowing**: Weekly/bi-weekly mowing, edging, fertilization, and weed control.\n✂️ **Tree & Shrub Trimming**: Precision pruning, crown shaping, and seasonal thinning.\n🍂 **Seasonal Cleanups**: Debris removal, bed edging, mulching, and winter preparation.\n🏡 **Landscape Architecture & Hardscaping**: Patios, retaining walls, sod installation, and planting.\n💧 **Smart Irrigation**: System design, repairs, and seasonal winterization.\n\nWhich service can we assist you with?",
      suggestions: ["Routine Lawn Mowing", "Tree & Shrub Trimming", "Seasonal Cleanups", "Get a Quote"],
    };
  }

  // Business hours & availability
  if (/hour|hours|open|time|schedule|when|weekend|sunday|saturday/i.test(query)) {
    return {
      reply: "⏰ **Business Hours**:\n• Monday – Friday: 8:00 AM – 6:00 PM\n• Saturday: 9:00 AM – 4:00 PM\n• Sunday: Closed (Emergency storm dispatch available by phone)\n\nYou can submit an online quote request 24/7!",
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
  if (/thank|thanks|appreciate|great|awesome|good job|cool/i.test(query)) {
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
    const rawMessages: unknown[] = Array.isArray(body?.messages) ? body.messages : [];

    // Filter valid chat messages
    const messages: ChatMessage[] = rawMessages
      .filter((m: unknown): m is ChatMessage => {
        if (!m || typeof m !== "object") return false;
        const candidate = m as { role?: unknown; content?: unknown };
        return (
          typeof candidate.content === "string" &&
          (candidate.role === "user" || candidate.role === "assistant")
        );
      })
      .map((m) => ({
        role: m.role,
        content: m.content.trim(),
      }));

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided in request payload." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // -------------------------------------------------------------------------
    // OPTIONAL EXTERNAL AI INTEGRATION HOOK
    // When you are ready to use an external LLM (e.g. Google Gemini or OpenAI):
    // -------------------------------------------------------------------------
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // 1. Google Gemini integration with multi-turn support
    if (geminiKey) {
      try {
        // Build Gemini contents array:
        // Gemini requires the first turn to have role: "user", and roles alternate between "user" and "model".
        const geminiContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
        
        let hasFoundFirstUser = false;
        for (const msg of messages) {
          if (!hasFoundFirstUser) {
            if (msg.role === "user") {
              hasFoundFirstUser = true;
              geminiContents.push({
                role: "user",
                parts: [{ text: msg.content }],
              });
            }
            continue;
          }

          const role = msg.role === "assistant" ? "model" : "user";
          // If consecutive turns have the same role, combine them to satisfy Gemini schema
          const lastTurn = geminiContents[geminiContents.length - 1];
          if (lastTurn && lastTurn.role === role) {
            lastTurn.parts[0].text += `\n${msg.content}`;
          } else {
            geminiContents.push({
              role,
              parts: [{ text: msg.content }],
            });
          }
        }

        // If no user message was found in history, use lastUserMessage
        if (geminiContents.length === 0 && lastUserMessage) {
          geminiContents.push({
            role: "user",
            parts: [{ text: lastUserMessage }],
          });
        }

        const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiKey,
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [
                  {
                    text: "You are Greenly AI, the courteous and knowledgeable customer support assistant for Greenly Landscaping. Provide polite, professional landscaping guidance. Mention our key services (Lawn Mowing & Aeration, Shrub & Tree Trimming, Seasonal Cleanup, Hardscaping & Design, Smart Irrigation), phone (+1 (000) 123-4567), and email (info@gardencare.com). Keep responses concise and formatted with clear bullet points where appropriate.",
                  },
                ],
              },
              contents: geminiContents,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              suggestions: getDynamicSuggestions(lastUserMessage, generatedText),
            });
          }
        } else {
          console.warn("Gemini API non-200 response:", response.status, await response.text());
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to built-in knowledge response:", err);
      }
    }

    // 2. OpenAI integration
    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are Greenly AI, an expert customer service assistant for Greenly Landscaping. Offer clear, courteous guidance on lawn care, maintenance, landscaping design, estimates, and consultations. Direct urgent calls to +1 (000) 123-4567 and email info@gardencare.com.",
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
              suggestions: getDynamicSuggestions(lastUserMessage, replyText),
            });
          }
        } else {
          console.warn("OpenAI API non-200 response:", response.status, await response.text());
        }
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to built-in knowledge response:", err);
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
