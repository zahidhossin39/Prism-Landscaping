"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Send,
  ChevronDown,
  Minimize2,
  RotateCcw,
  Sparkles,
  User,
  Check,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface LanguageOption {
  code: string;
  label: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const DEFAULT_SUGGESTIONS = [
  "Get A Free Quote",
  "Explore Services",
  "Pricing & Estimates",
  "Emergency Hotline",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello. Welcome to **Greenly Landscaping**.\n\nI can answer questions about lawn mowing, shrub trimming, seasonal cleanups, irrigation, soil testing, pricing, blog guides, gallery projects, or setting up a free quote.",
    timestamp: "Just now",
    suggestions: DEFAULT_SUGGESTIONS,
  },
];

let messageIdSeq = 0;
function createMessageId(prefix: string) {
  messageIdSeq += 1;
  return `${prefix}-${Date.now()}-${messageIdSeq}`;
}

function getCurrentTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Universal SVG Flag Icon matching Screenshot 2.
 * Renders circular clipped national flags cleanly across all operating systems.
 */
function FlagIcon({ code }: { code: string }) {
  if (code === "en") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-2xs"
        aria-hidden="true"
      >
        <rect width="24" height="24" fill="#B22234" />
        <path
          d="M0 1.846h24v1.846H0zm0 3.692h24v1.846H0zm0 3.692h24v1.846H0zm0 3.692h24v1.846H0zm0 3.692h24v1.846H0zm0 3.692h24v1.846H0z"
          fill="#FFFFFF"
        />
        <rect width="10.5" height="12.92" fill="#3C3B6E" />
        <g fill="#FFFFFF">
          <circle cx="2" cy="2" r="0.75" />
          <circle cx="5" cy="2" r="0.75" />
          <circle cx="8" cy="2" r="0.75" />
          <circle cx="3.5" cy="4.2" r="0.75" />
          <circle cx="6.5" cy="4.2" r="0.75" />
          <circle cx="2" cy="6.4" r="0.75" />
          <circle cx="5" cy="6.4" r="0.75" />
          <circle cx="8" cy="6.4" r="0.75" />
          <circle cx="3.5" cy="8.6" r="0.75" />
          <circle cx="6.5" cy="8.6" r="0.75" />
          <circle cx="2" cy="10.8" r="0.75" />
          <circle cx="5" cy="10.8" r="0.75" />
          <circle cx="8" cy="10.8" r="0.75" />
        </g>
      </svg>
    );
  }
  if (code === "es") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-2xs"
        aria-hidden="true"
      >
        <rect width="24" height="6" fill="#AA151B" />
        <rect y="6" width="24" height="12" fill="#F1BF00" />
        <rect y="18" width="24" height="6" fill="#AA151B" />
      </svg>
    );
  }
  if (code === "fr") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-2xs"
        aria-hidden="true"
      >
        <rect width="8" height="24" fill="#002654" />
        <rect x="8" width="8" height="24" fill="#FFFFFF" />
        <rect x="16" width="8" height="24" fill="#ED2939" />
      </svg>
    );
  }
  if (code === "de") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-2xs"
        aria-hidden="true"
      >
        <rect width="24" height="8" fill="#000000" />
        <rect y="8" width="24" height="8" fill="#DD0000" />
        <rect y="16" width="24" height="8" fill="#FFCE00" />
      </svg>
    );
  }
  return <span className="text-xs">🌐</span>;
}

/**
 * Solid telephone receiver handset silhouette matching center of Screenshot 2
 */
function PhoneHandsetIcon({ className = "w-5 h-5 fill-neutral-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

/**
 * Solid paper airplane silhouette matching send button in Screenshot 2
 */
function SolidPaperPlaneIcon({ className = "w-4 h-4 fill-neutral-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon points="21.5 2.5 14.5 21.5 10.5 13.5 2.5 9.5 21.5 2.5" />
    </svg>
  );
}

/**
 * Web Speech Recognition Event typing interfaces (strictly typed, 0 eslint errors)
 */
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionResultItem;
    [index: number]: SpeechRecognitionResultItem;
  };
  [index: number]: {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionResultItem;
    [index: number]: SpeechRecognitionResultItem;
  };
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognitionInstance;

/**
 * Reusable Voice Orb matching ElevenLabs conversational agent visual identity
 */
function VoiceOrb({
  size = "lg",
  isActive = false,
  isSpeaking = false,
  className = "",
  children,
}: {
  size?: "sm" | "lg";
  isActive?: boolean;
  isSpeaking?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const isSm = size === "sm";

  return (
    <div
      className={`relative rounded-full select-none flex items-center justify-center shrink-0 ${
        isSm
          ? "w-9 h-9 shadow-inner"
          : "w-44 h-44 sm:w-46 sm:h-46 shadow-[0_14px_45px_rgba(2,132,199,0.25)]"
      } ${className}`}
    >
      {/* Dynamic sound ripple waves when active call */}
      {isActive && !isSm && (
        <>
          <div className="absolute -inset-4 rounded-full border-2 border-sky-400/40 animate-voice-ripple pointer-events-none" />
          <div className="absolute -inset-2 rounded-full border border-teal-300/50 animate-pulse pointer-events-none" />
        </>
      )}

      {/* Main spherical gradient */}
      <div
        className={`absolute inset-0 rounded-full overflow-hidden transition-transform duration-500 ${
          isSpeaking ? "scale-105" : isActive ? "scale-102" : "scale-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at 30% 28%, #d8eb42 0%, #a4cd39 22%, #30b18f 44%, #0ea5e9 70%, #0284c7 92%, #0369a1 100%)",
          filter: "contrast(1.06) saturate(1.15)",
        }}
      >
        {/* Organic swirl textures */}
        <div
          className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 75%, rgba(2, 132, 199, 0.95), transparent 60%), radial-gradient(circle at 20% 20%, rgba(240, 255, 130, 0.85), transparent 50%)",
          }}
        />

        {/* Tactile grain noise overlay filter */}
        <svg
          className="absolute inset-0 w-full h-full rounded-full opacity-25 mix-blend-overlay pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id={`orb-noise-${isSm ? "sm" : "lg"}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#orb-noise-${isSm ? "sm" : "lg"})`} />
        </svg>

        {/* Top-left specular highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/35 pointer-events-none" />
      </div>

      {/* Interactive center content (e.g. Call Button) */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"voice" | "chat">("voice");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Voice Agent State
  const [voiceState, setVoiceState] = useState<"idle" | "connecting" | "connected">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Language selector state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognitionInstance | null>(null);

  // Scroll messages helper
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Handle Call Timer
  useEffect(() => {
    if (voiceState === "connected") {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [voiceState]);

  // Clean up speech synthesis & speech recognition on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Auto focus input when chat opens or mode changes
  useEffect(() => {
    if (isOpen && viewMode === "chat") {
      inputRef.current?.focus();
      scrollToBottom(false);
    }
  }, [isOpen, viewMode, scrollToBottom]);

  useEffect(() => {
    if (isOpen && viewMode === "chat") {
      scrollToBottom(true);
    }
  }, [messages, isLoading, isOpen, viewMode, scrollToBottom]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    if (isLangDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  // Stop recognition helper
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore abort errors
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // Forward declaration for handleSendMessage
  const handleSendMessageRef = useRef<(textToSend?: string) => Promise<void>>(async () => {});

  // Start Speech Recognition listener
  const startListening = useCallback(() => {
    if (typeof window === "undefined" || voiceState !== "connected" || isMuted) return;

    const SpeechRec =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

    if (!SpeechRec) {
      setVoiceTranscript("Voice active. (Speak simulation or type below)");
      return;
    }

    try {
      stopListening();
      const rec = new SpeechRec();
      recognitionRef.current = rec;
      rec.continuous = false;
      rec.interimResults = true;

      if (selectedLanguage.code === "es") rec.lang = "es-ES";
      else if (selectedLanguage.code === "fr") rec.lang = "fr-FR";
      else if (selectedLanguage.code === "de") rec.lang = "de-DE";
      else rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: SpeechRecognitionEvent) => {
        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalText += res[0].transcript;
          } else {
            interimText += res[0].transcript;
          }
        }

        const currentSpeech = finalText || interimText;
        if (currentSpeech) {
          setVoiceTranscript(`You: ${currentSpeech}`);
        }

        if (finalText.trim()) {
          stopListening();
          handleSendMessageRef.current(finalText.trim());
        }
      };

      rec.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setVoiceTranscript("Microphone permission denied. Speak simulated or type below.");
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.start();
    } catch (err) {
      console.warn("Speech recognition start failed:", err);
      setIsListening(false);
    }
  }, [voiceState, isMuted, selectedLanguage.code, stopListening]);

  // Speak text helper using SpeechSynthesis
  const speakText = useCallback(
    (textToSpeak: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        startListening();
        return;
      }

      try {
        stopListening();
        window.speechSynthesis.cancel();

        // Clean out markdown symbols for natural speech output
        const cleanSpeech = textToSpeak
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/[*_#•]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        if (selectedLanguage.code === "es") utterance.lang = "es-ES";
        else if (selectedLanguage.code === "fr") utterance.lang = "fr-FR";
        else if (selectedLanguage.code === "de") utterance.lang = "de-DE";
        else utterance.lang = "en-US";

        utterance.onstart = () => {
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          // When bot finishes speaking, automatically listen for user's response
          if (!isMuted && voiceState === "connected") {
            startListening();
          }
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
          if (!isMuted && voiceState === "connected") {
            startListening();
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
        setIsSpeaking(false);
        if (!isMuted && voiceState === "connected") {
          startListening();
        }
      }
    },
    [selectedLanguage.code, isMuted, voiceState, startListening, stopListening]
  );

  // Send message to /api/chat
  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const text = (textToSend || inputValue).trim();
      if (!text || isLoading) return;

      const timeStr = getCurrentTime();
      const userMessage: Message = {
        id: createMessageId("user"),
        role: "user",
        content: text,
        timestamp: timeStr,
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInputValue("");
      setIsLoading(true);

      // If in voice view, switch to chat if user typed directly
      if (viewMode === "voice" && voiceState === "idle") {
        setViewMode("chat");
      }

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const botMessage: Message = {
          id: createMessageId("bot"),
          role: "assistant",
          content:
            data.reply ||
            "For direct assistance or pricing estimates, call +1 (000) 123-4567 or email info@gardencare.com.",
          timestamp: getCurrentTime(),
          suggestions: data.suggestions && data.suggestions.length > 0 ? data.suggestions : undefined,
        };

        setMessages((prev) => [...prev, botMessage]);

        // If in voice call, speak response and update transcript
        if (voiceState === "connected") {
          setVoiceTranscript(botMessage.content);
          speakText(botMessage.content);
        }
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage: Message = {
          id: createMessageId("bot-err"),
          role: "assistant",
          content:
            "I am having trouble connecting to the service. You can call our office directly at **+1 (000) 123-4567** or email **info@gardencare.com**.",
          timestamp: getCurrentTime(),
          suggestions: ["Contact Information", "Explore Services"],
        };
        setMessages((prev) => [...prev, errorMessage]);

        if (voiceState === "connected") {
          setVoiceTranscript(errorMessage.content);
          speakText(errorMessage.content);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages, viewMode, voiceState, speakText]
  );

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);

  // Start voice agent session
  const handleStartVoice = () => {
    setCallDuration(0);
    setVoiceState("connecting");
    const welcomeSpeech =
      "Hello. Welcome to Greenly Landscaping. I can answer questions about lawn mowing, tree trimming, irrigation, and free estimates. How can I help you today?";
    setVoiceTranscript(welcomeSpeech);

    setTimeout(() => {
      setVoiceState("connected");
      speakText(welcomeSpeech);
    }, 500);
  };

  // End voice agent session
  const handleEndVoice = () => {
    stopListening();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState("idle");
    setCallDuration(0);
    setIsSpeaking(false);
    setIsListening(false);
    setVoiceTranscript("");
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (!isSpeaking) {
        startListening();
      }
    } else {
      setIsMuted(true);
      stopListening();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setVoiceTranscript("(Microphone muted)");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: createMessageId("welcome"),
        role: "assistant",
        content:
          "Hello. Welcome to **Greenly Landscaping**.\n\nI can answer questions about lawn mowing, shrub trimming, seasonal cleanups, irrigation, soil testing, pricing, blog guides, gallery projects, or setting up a free quote.",
        timestamp: getCurrentTime(),
        suggestions: DEFAULT_SUGGESTIONS,
      },
    ]);
  };

  // Helper to format markdown bold, links, emails, phone numbers, and internal paths safely
  const renderInlineFormatted = (rawText: string) => {
    const regex =
      /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\/(?:gallery|blog|service|about|contact-us|testimonials|privacy)(?:\/[a-z0-9-]+)?|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+1\s*\(\d{3}\)\s*\d{3}-\d{4})/g;
    const parts = rawText.split(regex);

    return parts.map((part, idx) => {
      if (!part) return null;

      // Markdown links: [label](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            className="text-[#274839] font-medium underline hover:text-[#1b372a]"
            target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
            rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }

      // Bold: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-[#1b372a]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Internal site routes (/gallery, /blog, etc.)
      if (/^\/(?:gallery|blog|service|about|contact-us|testimonials|privacy)(?:\/[a-z0-9-]+)?$/.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            className="text-[#274839] font-semibold underline decoration-[#bedd25] hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      // Email address
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={idx}
            href={`mailto:${part}`}
            className="text-[#274839] font-medium underline hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      // Phone number: +1 (000) 123-4567
      if (/^\+1\s*\(\d{3}\)\s*\d{3}-\d{4}$/.test(part)) {
        const telNumber = part.replace(/[^\d+]/g, "");
        return (
          <a
            key={idx}
            href={`tel:${telNumber}`}
            className="font-semibold text-[#274839] underline decoration-[#bedd25] hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  const formatMessageText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      const isBullet = /^[•\-\*]\s*/.test(line.trim());
      const cleanLine = isBullet ? line.trim().replace(/^[•\-\*]\s*/, "") : line;

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 text-xs sm:text-sm">
            <span className="text-[#274839] font-bold select-none">•</span>
            <div className="flex-1">{renderInlineFormatted(cleanLine)}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 text-xs sm:text-sm leading-relaxed">
          {renderInlineFormatted(cleanLine)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end print:hidden">
      {/* Expanded Widget Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Greenly Conversational Agent"
          data-lenis-prevent
          className="mb-4 w-[calc(100vw-2.5rem)] max-w-[370px] sm:w-[370px] h-[520px] max-h-[85vh] bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-neutral-200/80 flex flex-col overflow-hidden animate-chat-window transition-all"
        >
          {viewMode === "voice" ? (
            /* ================= VIEW 1: VOICE AGENT CARD (Matches Screenshot 2) ================= */
            <div className="flex-1 flex flex-col justify-between p-6 overflow-hidden relative">
              {/* Top Header */}
              <div className="relative flex items-center justify-between w-full z-20">
                {/* Left: Chat history toggle */}
                <button
                  type="button"
                  onClick={() => setViewMode("chat")}
                  title="Open chat messages"
                  aria-label="Open chat messages"
                  className="w-9 h-9 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs relative"
                >
                  <MessageSquare className="w-4 h-4" />
                  {messages.length > 1 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#274839]" />
                  )}
                </button>

                {/* Center: Language Selector Pill (Horizontally Centered in Card) */}
                <div className="absolute left-1/2 -translate-x-1/2" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="rounded-full border border-neutral-200/90 bg-white px-3.5 py-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer select-none"
                    aria-label="Select language"
                    aria-expanded={isLangDropdownOpen}
                  >
                    <FlagIcon code={selectedLanguage.code} />
                    <span>{selectedLanguage.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                        isLangDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Language Dropdown Menu */}
                  {isLangDropdownOpen && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 w-36 bg-white rounded-2xl shadow-xl border border-neutral-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-neutral-50 transition-colors cursor-pointer ${
                            selectedLanguage.code === lang.code
                              ? "font-semibold text-neutral-900 bg-neutral-50/80"
                              : "text-neutral-600"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <FlagIcon code={lang.code} />
                            <span>{lang.label}</span>
                          </span>
                          {selectedLanguage.code === lang.code && (
                            <Check className="w-3.5 h-3.5 text-neutral-800" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Minimize Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (voiceState === "connected") {
                      handleEndVoice();
                    }
                    setIsOpen(false);
                  }}
                  title="Minimize chat"
                  aria-label="Minimize"
                  className="w-9 h-9 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Center Body (Orb + Phone Button + Subtitle) */}
              <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
                <VoiceOrb
                  size="lg"
                  isActive={voiceState === "connected"}
                  isSpeaking={isSpeaking}
                >
                  {voiceState === "connected" ? (
                    /* Active Call: Red End Call Button */
                    <button
                      type="button"
                      onClick={handleEndVoice}
                      title="End voice chat"
                      aria-label="End voice chat"
                      className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 shadow-[0_4px_16px_rgba(244,63,94,0.35)] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
                    >
                      <PhoneOff className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                    </button>
                  ) : (
                    /* Idle State: Circular White Phone Button (Matches Screenshot 2) */
                    <button
                      type="button"
                      onClick={handleStartVoice}
                      title="Start voice chat"
                      aria-label="Start voice chat"
                      className="w-14 h-14 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
                    >
                      <PhoneHandsetIcon className="w-5 h-5 fill-neutral-900 group-hover:rotate-12 transition-transform" />
                    </button>
                  )}
                </VoiceOrb>

                {/* Subtitle / Active Status */}
                {voiceState === "connected" ? (
                  <div className="mt-5 flex flex-col items-center text-center max-w-[280px]">
                    {/* Status Pill & Wave Bars */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700 shadow-2xs">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isListening ? "bg-amber-500" : "bg-emerald-500"
                        } animate-pulse`}
                      />
                      <span>
                        {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Connected"} •{" "}
                        {formatDuration(callDuration)}
                      </span>
                      <div className="flex items-center gap-0.5 ml-1">
                        <span className="w-0.5 bg-neutral-600 rounded-full animate-sound-wave-1" />
                        <span className="w-0.5 bg-neutral-600 rounded-full animate-sound-wave-2" />
                        <span className="w-0.5 bg-neutral-600 rounded-full animate-sound-wave-3" />
                        <span className="w-0.5 bg-neutral-600 rounded-full animate-sound-wave-4" />
                      </div>
                    </div>

                    {/* Spoken Transcript Preview */}
                    <p className="mt-2 text-xs text-neutral-600 line-clamp-2 px-2 italic min-h-[32px]">
                      &quot;{voiceTranscript || (isListening ? "Listening... Speak now" : "Speak or tap below")}&quot;
                    </p>

                    {/* Quick Call Action Chips & Mic Toggle */}
                    <div className="flex flex-wrap justify-center items-center gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => handleSendMessage("What are your lawn mowing rates?")}
                        className="text-[11px] font-medium px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-full shadow-2xs transition-colors cursor-pointer"
                      >
                        Mowing Rates
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendMessage("How do I get a free quote?")}
                        className="text-[11px] font-medium px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-full shadow-2xs transition-colors cursor-pointer"
                      >
                        Free Quote
                      </button>
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className={`p-1 rounded-full border text-xs transition-colors cursor-pointer ${
                          isMuted
                            ? "bg-rose-50 border-rose-200 text-rose-600"
                            : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                        }`}
                        title={isMuted ? "Unmute microphone" : "Mute microphone"}
                      >
                        {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ) : voiceState === "connecting" ? (
                  <p className="mt-6 text-center text-[13px] text-neutral-500 font-normal leading-relaxed max-w-[270px] mx-auto select-none animate-pulse">
                    Connecting with Greenly Voice Agent...
                  </p>
                ) : (
                  /* Idle Subtitle (Exact 2-line text from Screenshot 2) */
                  <p className="mt-6 text-center text-[13px] text-neutral-500 font-normal leading-relaxed max-w-[270px] mx-auto select-none">
                    Discover the capabilities of Conversational<br />Agents powered by ElevenLabs
                  </p>
                )}
              </div>

              {/* Bottom Bar: Pill Input Container (Exact Match to Screenshot 2) */}
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="w-full rounded-full border border-neutral-200/90 bg-white px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs hover:border-neutral-300 focus-within:border-neutral-400 focus-within:shadow-xs transition-all"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Or send a message..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none pr-2"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    title="Send message"
                    aria-label="Send message"
                    className="p-1.5 text-neutral-400 hover:text-neutral-800 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                  >
                    <SolidPaperPlaneIcon className="w-4 h-4 fill-current" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* ================= VIEW 2: TEXT CHAT THREAD VIEW ================= */
            <div className="flex-1 flex flex-col h-full bg-[#fbfaf4]">
              {/* Header */}
              <div className="bg-white border-b border-neutral-200/80 px-4 py-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  {/* Switch to Voice View Pill */}
                  <button
                    type="button"
                    onClick={() => setViewMode("voice")}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors shadow-2xs cursor-pointer"
                    title="Switch to Voice Agent"
                  >
                    <VoiceOrb size="sm" className="!w-4 !h-4" />
                    <span>Voice Agent</span>
                  </button>

                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-xs font-semibold text-neutral-800">
                      Greenly AI
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Reset conversation"
                    aria-label="Reset conversation"
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (voiceState === "connected") {
                        handleEndVoice();
                      }
                      setIsOpen(false);
                    }}
                    title="Minimize chat"
                    aria-label="Close chat"
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#fbfaf4]"
              >
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#274839] text-[#bedd25] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`max-w-[84%] sm:max-w-[80%] flex flex-col ${
                          isUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isUser
                              ? "bg-[#274839] text-white rounded-tr-xs"
                              : "bg-white text-[#1f1f1f] border border-neutral-200/70 rounded-tl-xs shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                          }`}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          ) : (
                            <div>{formatMessageText(message.content)}</div>
                          )}
                        </div>

                        <span className="text-[10px] text-neutral-400 mt-1 px-1">
                          {message.timestamp}
                        </span>

                        {/* Suggestion Chips */}
                        {!isUser && message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2 pt-0.5">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSendMessage(suggestion)}
                                disabled={isLoading}
                                className="text-[11px] font-medium px-2.5 py-1 bg-white hover:bg-[#bedd25]/20 text-[#274839] border border-[#274839]/20 hover:border-[#bedd25] rounded-full transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98 disabled:opacity-50"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#1b372a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start items-center">
                    <div className="w-7 h-7 rounded-full bg-[#274839] text-[#bedd25] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-neutral-200/70 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <div className="p-3 bg-white border-t border-neutral-200/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("voice");
                      if (voiceState === "idle") {
                        handleStartVoice();
                      }
                    }}
                    title="Switch to Voice Mode"
                    className="p-2 text-neutral-500 hover:text-[#274839] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer shrink-0"
                    aria-label="Start voice mode"
                  >
                    <Phone className="w-4 h-4" />
                  </button>

                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about lawn care, quotes, pricing..."
                    disabled={isLoading}
                    className="flex-1 bg-[#fbfaf4] text-[#1f1f1f] text-xs sm:text-sm px-3.5 py-2.5 rounded-full border border-neutral-200 focus:outline-none focus:border-[#274839] focus:ring-1 focus:ring-[#274839] placeholder:text-neutral-400 disabled:opacity-60 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    title="Send message"
                    className="bg-[#274839] hover:bg-[#1b372a] text-[#bedd25] p-2.5 rounded-full transition-all flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-neutral-400">
                  <span>Greenly Smart Customer Service</span>
                  <span className="flex items-center gap-1 text-[9px] text-[#274839]/80 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Launcher Button (Exact Match to Screenshot 1) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setViewMode("voice");
          }}
          aria-label="Open voice chat"
          className="group relative flex items-center gap-3 pl-2.5 pr-5 py-2 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Circular Glowing Gradient Avatar Orb */}
          <VoiceOrb size="sm" />

          {/* Typography "Voice chat" */}
          <span className="text-[15px] font-medium text-neutral-900 tracking-[-0.01em]">
            Voice chat
          </span>
        </button>
      )}
    </div>
  );
}
