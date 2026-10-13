import { NextResponse } from "next/server";

export async function GET() {
  const agentId =
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
    process.env.ELEVENLABS_AGENT_ID ||
    "agent_8401m4vbfz7tfmtsjv6ssmdesw6w";

  return NextResponse.json({
    agentId,
    name: "Greenly Landscaping Voice Assistant",
    status: "active",
    voice: "Eric - Smooth, Trustworthy (ID: cjVigY5qzO86Huf0OWal)",
    llm: "gemini-2.5-flash-lite",
    ttsModel: "eleven_turbo_v2",
    firstMessage:
      "Hello! Thanks for calling Greenly Landscaping. How can I help you with your lawn or garden today?",
    websocketUrl: `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`,
    documentation:
      "ElevenLabs Conversational AI Voice Agent for Greenly Landscaping (Prism Landscaping).",
  });
}
