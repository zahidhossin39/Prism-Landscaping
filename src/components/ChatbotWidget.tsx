"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  ChevronDown,
  ChevronLeft,
  Minimize2,
  Check,
  MessagesSquare,
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

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hi! How can I help you with Greenly today?",
    timestamp: "Just now",
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
function PhoneHandsetIcon({ className = "w-5 h-5 text-neutral-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </svg>
  );
}

/**
 * Solid paper airplane silhouette matching send button in Screenshots 2 and 3
 */
function SolidPaperPlaneIcon({ className = "w-4 h-4 text-neutral-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon
        fill="currentColor"
        points="21.5 2.5 14.5 21.5 10.5 13.5 2.5 9.5 21.5 2.5"
      />
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

const ELEVENLABS_AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_8401m4vbfz7tfmtsjv6ssmdesw6w";

function downsampleAndConvertToInt16(
  inputBuffer: Float32Array,
  inputSampleRate: number,
  outputSampleRate = 16000
): Int16Array {
  if (inputSampleRate === outputSampleRate) {
    const output = new Int16Array(inputBuffer.length);
    for (let i = 0; i < inputBuffer.length; i++) {
      const s = Math.max(-1, Math.min(1, inputBuffer[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
  }

  const sampleRatio = inputSampleRate / outputSampleRate;
  const newLength = Math.round(inputBuffer.length / sampleRatio);
  const result = new Int16Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < inputBuffer.length; i++) {
      accum += inputBuffer[i];
      count++;
    }
    const sample = count > 0 ? accum / count : 0;
    const s = Math.max(-1, Math.min(1, sample));
    result[offsetResult] = s < 0 ? s * 0x8000 : s * 0x7fff;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }

  return result;
}

function base64FromInt16Array(int16Array: Int16Array): string {
  const len = int16Array.length;
  let binary = "";
  for (let i = 0; i < len; i++) {
    const val = int16Array[i];
    const uval = val < 0 ? val + 0x10000 : val;
    binary += String.fromCharCode(uval & 0xff, (uval >> 8) & 0xff);
  }
  return btoa(binary);
}

function int16ArrayFromBase64(base64: string): Int16Array {
  const binary = atob(base64);
  const sampleCount = Math.floor(binary.length / 2);
  const samples = new Int16Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    const low = binary.charCodeAt(i * 2);
    const high = binary.charCodeAt(i * 2 + 1);
    let val = (high << 8) | low;
    if (val >= 0x8000) val -= 0x10000;
    samples[i] = val;
  }
  return samples;
}


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
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  isSpeaking?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const isSm = size === "sm";
  const isMd = size === "md";
  const isCompact = isSm || isMd;
  const rawId = useId();
  const filterId = "voice-orb-" + rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const sizeClasses = isSm
    ? "w-8 h-8 shadow-xs"
    : isMd
    ? "w-9 h-9 shadow-xs"
    : "w-44 h-44 sm:w-48 sm:h-48 shadow-[0_14px_45px_rgba(2,132,199,0.25)]";

  return (
    <div
      className={`relative rounded-full select-none flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
    >
      {/* Dynamic sound ripple waves when active call */}
      {isActive && !isCompact && (
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
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>

        {/* Top-left specular highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/35 pointer-events-none" />
      </div>

      {/* Interactive center content (e.g. Call Button or Back Chevron) */}
      {children && <div className="relative z-10 flex items-center justify-center">{children}</div>}
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
  const [isElevenLabsLive, setIsElevenLabsLive] = useState(false);

  // ElevenLabs Live WebSocket and Web Audio Refs
  const wsRef = useRef<WebSocket | null>(null);
  const micContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);


  const voiceStateRef = useRef<"idle" | "connecting" | "connected">("idle");
  const isMutedRef = useRef(false);

  useEffect(() => {
    voiceStateRef.current = voiceState;
  }, [voiceState]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Language selector state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Stop all active PCM audio playback
  const stopAllAudioPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch {
        // Ignore stopped sources
      }
    });
    activeSourcesRef.current = [];
    if (playbackContextRef.current) {
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
    setIsSpeaking(false);
  }, []);

  // Queue and play incoming 16kHz PCM audio chunk from ElevenLabs
  const playPcmChunk = useCallback((pcm16: Int16Array, sampleRate = 16000) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!playbackContextRef.current) {
        playbackContextRef.current = new AudioContextClass();
      }
      const ctx = playbackContextRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const buffer = ctx.createBuffer(1, pcm16.length, sampleRate);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < pcm16.length; i++) {
        channelData[i] = pcm16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + buffer.duration;

      activeSourcesRef.current.push(source);
      setIsSpeaking(true);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
        if (
          activeSourcesRef.current.length === 0 &&
          ctx.currentTime >= nextPlayTimeRef.current - 0.05
        ) {
          setIsSpeaking(false);
        }
      };
    } catch (err) {
      console.warn("PCM chunk playback error:", err);
    }
  }, []);

  // Stop recognition helper
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      recognitionRef.current = null;
      rec.onstart = null;
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.abort();
      } catch {
        // Ignore abort errors
      }
    }
    setIsListening(false);
  }, []);

  // Completely clean up ElevenLabs WebSocket, Web Audio, and Speech synthesis
  const cleanupVoiceSession = useCallback(() => {
    if (wsRef.current) {
      try {
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onerror = null;
        wsRef.current.onclose = null;
        wsRef.current.close();
      } catch {
        // Ignore close errors
      }
      wsRef.current = null;
    }

    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch {
        // Ignore disconnect
      }
      processorRef.current = null;
    }

    if (micSourceRef.current) {
      try {
        micSourceRef.current.disconnect();
      } catch {
        // Ignore disconnect
      }
      micSourceRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (micContextRef.current) {
      try {
        void micContextRef.current.close();
      } catch {
        // Ignore close
      }
      micContextRef.current = null;
    }

    stopAllAudioPlayback();

    if (playbackContextRef.current) {
      try {
        void playbackContextRef.current.close();
      } catch {
        // Ignore close
      }
      playbackContextRef.current = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopListening();
  }, [stopAllAudioPlayback, stopListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupVoiceSession();
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [cleanupVoiceSession]);

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


  // Forward declaration for handleSendMessage
  const handleSendMessageRef = useRef<(textToSend?: string) => Promise<void>>(async () => {});

  // Start Speech Recognition listener
  const startListening = useCallback(() => {
    if (typeof window === "undefined" || voiceStateRef.current !== "connected" || isMutedRef.current) return;

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
  }, [selectedLanguage.code, stopListening]);

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
          if (!isMutedRef.current && voiceStateRef.current === "connected") {
            startListening();
          }
        };

        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
          setIsSpeaking(false);
          // If utterance was canceled or interrupted (e.g. by hang up, mute, or new speech), do not restart listening
          if (event?.error === "canceled" || event?.error === "interrupted") {
            return;
          }
          if (!isMutedRef.current && voiceStateRef.current === "connected") {
            startListening();
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
        setIsSpeaking(false);
        if (!isMutedRef.current && voiceStateRef.current === "connected") {
          startListening();
        }
      }
    },
    [selectedLanguage.code, startListening, stopListening]
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

      // If in voice view and user typed manually, switch to chat to display conversation thread
      if (viewMode === "voice" && !textToSend) {
        setViewMode("chat");
      }

      // If ElevenLabs live voice WebSocket is active, send user message to ElevenLabs directly
      if (isElevenLabsLive && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        setIsLoading(false);
        setVoiceTranscript(`You: ${text}`);
        try {
          wsRef.current.send(JSON.stringify({ type: "user_message", text }));
        } catch (wsErr) {
          console.warn("Failed to send user message to ElevenLabs WebSocket:", wsErr);
        }
        return;
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
        if (voiceStateRef.current === "connected") {
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
        };
        setMessages((prev) => [...prev, errorMessage]);

        if (voiceStateRef.current === "connected") {
          setVoiceTranscript(errorMessage.content);
          speakText(errorMessage.content);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages, viewMode, speakText, isElevenLabsLive]
  );

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);

  // Fallback voice simulation using browser Web Speech API & /api/chat
  const startFallbackVoiceSimulation = useCallback(() => {
    setCallDuration(0);
    voiceStateRef.current = "connected";
    setVoiceState("connected");
    setIsElevenLabsLive(false);
    const welcomeSpeech =
      "Hello! Thanks for calling Greenly Landscaping. How can I help you with your lawn or garden today?";
    setVoiceTranscript(welcomeSpeech);
    speakText(welcomeSpeech);
  }, [speakText]);

  // Start voice agent session (connects to ElevenLabs Conversational AI WebSocket with fallback)
  const handleStartVoice = () => {
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
    }
    cleanupVoiceSession();
    setCallDuration(0);
    voiceStateRef.current = "connecting";
    setVoiceState("connecting");
    setVoiceTranscript("Connecting with ElevenLabs Voice Agent...");

    if (typeof window === "undefined" || !("WebSocket" in window)) {
      startFallbackVoiceSimulation();
      return;
    }

    // Initialize or resume AudioContext directly inside user click gesture to satisfy browser autoplay policy
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      if (!playbackContextRef.current) {
        playbackContextRef.current = new AudioContextClass();
      }
      if (playbackContextRef.current.state === "suspended") {
        void playbackContextRef.current.resume();
      }
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }

    let hasReceivedAudioOrEvent = false;

    try {
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${ELEVENLABS_AGENT_ID}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // Fail-safe connection timeout (8s for WebSocket handshake + initial event before fallback)
      connectTimeoutRef.current = setTimeout(() => {
        if (!hasReceivedAudioOrEvent && voiceStateRef.current === "connecting") {
          console.warn("ElevenLabs connection timed out, switching to voice simulation fallback");
          cleanupVoiceSession();
          startFallbackVoiceSimulation();
        }
      }, 8000);

      ws.onopen = async () => {
        setIsElevenLabsLive(true);
        setVoiceState("connected");
        voiceStateRef.current = "connected";
        setVoiceTranscript("Connected to Greenly Voice Agent. Listening...");

        try {
          ws.send(
            JSON.stringify({
              type: "conversation_initiation_client_data",
              conversation_config_override: {},
            })
          );
        } catch {
          // ignore
        }

        // Initialize microphone audio stream
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              sampleRate: 16000,
              channelCount: 1,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });
          mediaStreamRef.current = stream;

          const micCtx = new AudioContextClass();
          micContextRef.current = micCtx;

          const micSource = micCtx.createMediaStreamSource(stream);
          micSourceRef.current = micSource;

          const processor = micCtx.createScriptProcessor(4096, 1, 1);
          processorRef.current = processor;

          // Connect through a zero-gain node so user mic doesn't play back through local speakers (prevents feedback/echo)
          const muteNode = micCtx.createGain();
          muteNode.gain.value = 0;

          processor.onaudioprocess = (e) => {
            // Guarantee output buffer is silent to avoid acoustic feedback screech
            const outputData = e.outputBuffer.getChannelData(0);
            outputData.fill(0);

            if (
              isMutedRef.current ||
              !wsRef.current ||
              wsRef.current.readyState !== WebSocket.OPEN
            ) {
              return;
            }
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = downsampleAndConvertToInt16(inputData, micCtx.sampleRate, 16000);
            const base64Audio = base64FromInt16Array(pcm16);
            try {
              wsRef.current.send(JSON.stringify({ user_audio_chunk: base64Audio }));
            } catch {
              // ignore
            }
          };

          micSource.connect(processor);
          processor.connect(muteNode);
          muteNode.connect(micCtx.destination);
          setIsListening(true);
        } catch (micErr) {
          console.warn("Microphone access failed or denied:", micErr);
          setVoiceTranscript("Microphone permission denied. Speak simulated or type below.");
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          hasReceivedAudioOrEvent = true;

          if (data.type === "conversation_initiation_metadata") {
            const welcomeMsg =
              "Hello! Thanks for calling Greenly Landscaping. How can I help you with your lawn or garden today?";
            setVoiceTranscript(welcomeMsg);
          } else if (data.type === "audio" && data.audio_event?.audio_base_64) {
            const pcm16 = int16ArrayFromBase64(data.audio_event.audio_base_64);
            playPcmChunk(pcm16, 16000);
          } else if (data.type === "agent_response" && data.agent_response_event?.agent_response) {
            const agentReply = data.agent_response_event.agent_response;
            setVoiceTranscript(agentReply);
            const timeStr = getCurrentTime();
            setMessages((prev) => [
              ...prev,
              {
                id: createMessageId("eleven-agent"),
                role: "assistant",
                content: agentReply,
                timestamp: timeStr,
              },
            ]);
          } else if (
            data.type === "agent_response_correction" &&
            data.agent_response_correction_event?.agent_response
          ) {
            const correctedReply = data.agent_response_correction_event.agent_response;
            setVoiceTranscript(correctedReply);
          } else if (data.type === "user_transcript" && data.user_transcription_event?.user_transcript) {
            const userText = data.user_transcription_event.user_transcript;
            setVoiceTranscript(`You: ${userText}`);
            const timeStr = getCurrentTime();
            setMessages((prev) => [
              ...prev,
              {
                id: createMessageId("eleven-user"),
                role: "user",
                content: userText,
                timestamp: timeStr,
              },
            ]);
          } else if (data.type === "interruption") {
            stopAllAudioPlayback();
          } else if (data.type === "ping" && data.ping_event?.event_id) {
            try {
              ws.send(JSON.stringify({ type: "pong", event_id: data.ping_event.event_id }));
            } catch {
              // ignore
            }
          }
        } catch (err) {
          console.warn("ElevenLabs message parse error:", err);
        }
      };

      ws.onerror = (err) => {
        console.warn("ElevenLabs WebSocket error:", err);
        if (!hasReceivedAudioOrEvent && voiceStateRef.current === "connecting") {
          cleanupVoiceSession();
          startFallbackVoiceSimulation();
        }
      };

      ws.onclose = () => {
        if (voiceStateRef.current === "connected") {
          handleEndVoice();
        }
      };
    } catch (err) {
      console.warn("Failed to create ElevenLabs WebSocket:", err);
      startFallbackVoiceSimulation();
    }
  };

  // End voice agent session
  const handleEndVoice = () => {
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
    cleanupVoiceSession();
    voiceStateRef.current = "idle";
    setVoiceState("idle");
    setIsElevenLabsLive(false);
    setCallDuration(0);
    setIsSpeaking(false);
    setIsListening(false);
    setVoiceTranscript("");
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMutedRef.current) {
      isMutedRef.current = false;
      setIsMuted(false);
      setIsListening(true);
      if (!isElevenLabsLive && !isSpeaking) {
        startListening();
      }
      setVoiceTranscript("");
    } else {
      isMutedRef.current = true;
      setIsMuted(true);
      setIsListening(false);
      stopAllAudioPlayback();
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
            className="text-neutral-900 font-medium underline underline-offset-2 hover:text-black"
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
          <strong key={idx} className="font-semibold text-neutral-900">
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
            className="text-neutral-900 font-medium underline underline-offset-2 hover:text-black"
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
            className="text-neutral-900 font-medium underline underline-offset-2 hover:text-black"
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
            className="text-neutral-900 font-semibold underline underline-offset-2 hover:text-black"
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
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 first:mt-0 last:mb-0 text-sm">
            <span className="text-neutral-500 font-bold select-none">•</span>
            <div className="flex-1">{renderInlineFormatted(cleanLine)}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 first:mt-0 last:mb-0 text-sm leading-relaxed">
          {renderInlineFormatted(cleanLine)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end print:hidden">
      {/* Expanded Widget Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Greenly Conversational Agent"
          data-lenis-prevent
          className="mb-4 w-[calc(100vw-2rem)] sm:w-[370px] max-w-[370px] h-[520px] max-h-[85vh] bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-neutral-200/80 flex flex-col overflow-hidden animate-chat-window transition-all"
        >
          {viewMode === "voice" ? (
            /* ================= VIEW 1: VOICE AGENT CARD (Matches Screenshots 2 & 4) ================= */
            <div className="flex-1 min-h-0 flex flex-col justify-between p-6 overflow-hidden relative bg-white">
              {/* Top Header */}
              <div className="relative flex items-center justify-between w-full z-20 shrink-0">
                {/* Left: Chat history toggle */}
                <button
                  type="button"
                  onClick={() => setViewMode("chat")}
                  title="Open chat messages"
                  aria-label="Open chat messages"
                  className="w-9 h-9 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <MessagesSquare className="w-4 h-4" />
                </button>

                {/* Center: Language Selector Pill (Horizontally Centered in Card) */}
                <div className="absolute left-1/2 -translate-x-1/2" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="rounded-full border border-neutral-200/90 bg-white px-3.5 py-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 shadow-xs hover:bg-neutral-50 transition-colors cursor-pointer select-none"
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
                  className="w-9 h-9 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
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
                      <PhoneOff className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
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
                      <PhoneHandsetIcon className="w-5 h-5 text-neutral-900 group-hover:rotate-12 transition-transform" />
                    </button>
                  )}
                </VoiceOrb>

                {/* Subtitle / Active Status */}
                {voiceState === "connected" ? (
                  <div className="mt-5 flex flex-col items-center text-center max-w-[280px]">
                    {/* Status Pill & Wave Bars */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700 shadow-xs">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isListening ? "bg-amber-500" : "bg-emerald-500"
                        } animate-pulse`}
                      />
                      <span>
                        {isListening
                          ? "Listening..."
                          : isSpeaking
                          ? "Speaking..."
                          : isElevenLabsLive
                          ? "ElevenLabs Live"
                          : "Connected"} •{" "}
                        {formatDuration(callDuration)}
                      </span>
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className="ml-1 p-0.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                        title={isMuted ? "Unmute microphone" : "Mute microphone"}
                      >
                        {isMuted ? (
                          <MicOff className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Mic className="w-3.5 h-3.5 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Spoken Transcript Preview */}
                    {voiceTranscript && (
                      <p className="mt-2 text-xs text-neutral-600 line-clamp-2 px-2 italic min-h-[20px]">
                        &quot;{voiceTranscript}&quot;
                      </p>
                    )}
                  </div>
                ) : voiceState === "connecting" ? (
                  <p className="mt-6 text-center text-[13px] text-neutral-500 font-normal leading-relaxed max-w-[270px] mx-auto select-none animate-pulse">
                    Connecting with ElevenLabs Voice Agent...
                  </p>
                ) : (
                  /* Idle Subtitle (Exact text matching ElevenLabs conversational widget) */
                  <p className="mt-6 text-center text-[13px] text-neutral-500 font-normal leading-relaxed max-w-[270px] mx-auto select-none">
                    Discover the capabilities of Conversational<br />Agents powered by ElevenLabs
                  </p>
                )}
              </div>

              {/* Bottom Bar: Pill Input Container (Exact Match to Screenshot 2) */}
              <div className="w-full shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="w-full rounded-full border border-neutral-200/90 bg-white px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-xs hover:border-neutral-300 focus-within:border-neutral-400 transition-all"
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
                    <SolidPaperPlaneIcon className="w-4 h-4 text-current" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* ================= VIEW 2: TEXT CHAT THREAD VIEW (Matches Screenshot 3) ================= */
            <div className="flex-1 min-h-0 flex flex-col justify-between h-full bg-white overflow-hidden relative">
              {/* Top Header: Orb with Back Chevron on Left, Minimize on Right */}
              <div className="p-6 pb-2 flex items-center justify-between w-full select-none z-20 shrink-0">
                {/* Top-left: Circular gradient orb with back arrow (< / ChevronLeft) to return to Voice view */}
                <button
                  type="button"
                  onClick={() => setViewMode("voice")}
                  title="Return to voice view"
                  aria-label="Return to voice view"
                  className="relative rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <VoiceOrb size="md">
                    <ChevronLeft className="w-4 h-4 text-white stroke-[2.5] -translate-x-0.5" />
                  </VoiceOrb>
                </button>

                {/* Top-right: Circular minimize button */}
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
                  className="w-9 h-9 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Message Thread */}
              <div
                data-lenis-prevent
                className="flex-1 min-h-0 overflow-y-auto px-6 py-2 space-y-3 bg-white"
              >
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div
                      key={message.id}
                      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={
                          isUser
                            ? "bg-white border border-neutral-200/90 rounded-[20px] px-4 py-2.5 text-sm text-neutral-800 max-w-[85%] shadow-xs break-words"
                            : "bg-neutral-100 rounded-[20px] p-4 text-sm text-neutral-800 leading-relaxed max-w-[85%] break-words"
                        }
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          formatMessageText(message.content)
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start w-full">
                    <div className="bg-neutral-100 rounded-[20px] px-4 py-3 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Bar: The exact same clean rounded-full pill input bar */}
              <div className="p-6 pt-2 w-full shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="w-full rounded-full border border-neutral-200/90 bg-white px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-xs hover:border-neutral-300 focus-within:border-neutral-400 transition-all"
                >
                  <input
                    ref={inputRef}
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
                    <SolidPaperPlaneIcon className="w-4 h-4 text-current" />
                  </button>
                </form>
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
