# Claude Code Project Handoff: Prism Landscaping (Greenly)

This file is automatically read by Claude Code when initialized in this directory.

---

## 🌿 Project Summary

**Prism Landscaping** is a modern, high-performance web platform built for **Greenly Landscaping**, a premium outdoor design and lawn care business.

- **Repository**: `https://github.com/zahidhossin39/Prism-Landscaping.git`
- **Main Branch**: `main`
- **Contributors**: Zahid Hossain & Masum Khan (`themasum-com`)
- **Framework**: Next.js 16.4.0 (Turbopack, App Router)
- **Runtime**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons
- **Smooth Scroll**: Lenis (`lenis/react`)

---

## ⚡ Quick Commands

```bash
# Start local dev server (Turbopack) on http://localhost:3000
npm run dev

# Run ESLint (must pass with 0 errors)
npm run lint

# Production build test (all 33 routes static / SSG)
npm run build

# Start production server
npm run start
```

---

## 🔑 Environment Variables (`.env.local`)

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key used by `/api/chat` (primary LLM: `gemini-2.5-flash-lite`) |
| `GEMINI_MODEL` | Optional override for Gemini model (defaults to `gemini-2.5-flash-lite`) |
| `OPENAI_API_KEY` | Optional fallback LLM key (`gpt-4o-mini`) if Gemini fails or is rate-limited |
| `ELEVENLABS_AGENT_ID` | ElevenLabs Conversational Voice Agent ID (`agent_8401m4vbfz7tfmtsjv6ssmdesw6w`) |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Exposed agent ID for client-side direct connection |

*Template available in `.env.example`.*

---

## 🏗️ Architecture & Key Components

### 1. Routes (`src/app/`)
- `/` (`page.tsx`): Full interactive homepage with Hero, Services, Gallery, FAQ, Testimonials, Blog, Modals.
- `/about`: Company story, mission, metrics, video showcase, team.
- `/service` & `/service/[slug]`: 10 comprehensive service catalog detail pages with dynamic routing and SSG.
- `/blog` & `/blog/[slug]`: 7 dynamic articles with full markdown/rich content models.
- `/gallery`: Project portfolio with before-and-after transformations.
- `/testimonials`: Client reviews and video feedback.
- `/contact-us`: Contact form, operating hours, phone hotline, and interactive map embed.
- `/privacy`: Legal terms and privacy policies.
- `/not-found.tsx`: Custom branded 404 handler.

### 2. AI Chat & Voice Assistant (`src/components/ChatbotWidget.tsx`)
- Floating interactive widget bottom-right.
- **Text Chat**: Communicates with `/api/chat` using streaming/multi-turn context, backed by `gemini-2.5-flash-lite`.
- **Knowledge Base**: Deeply grounded in all 10 services, exact pricing tiers ($45–$65 mowing, $95+ garden maintenance, etc.), emergency contacts, and hours.
- **Voice Agent**: ElevenLabs Conversational AI integration via WebSocket audio streaming (`agent_8401m4vbfz7tfmtsjv6ssmdesw6w`) using voice "Eric", plus Web Speech Recognition fallback.
- **API Endpoints**:
  - `src/app/api/chat/route.ts`: Core AI reasoning, prompt unslop doctrine, multi-turn history, failover to built-in knowledge engine.
  - `src/app/api/elevenlabs/agent/route.ts`: Serves public agent configuration safely.

### 3. Smooth Scrolling (`src/components/SmoothScroll.tsx`)
- Configured with Lenis for silky momentum physics across pages.
- Native mobile touch bypass and modal overflow lock observation.

---

## ⚠️ Critical Rules & Gotchas (MUST READ)

1. **DO NOT modify visual design without explicit instruction**:
   - The user strictly requested that layout, colors (`#bedd25` lime green, `#274839` deep forest green, `#f2f1e7` warm cream background), typography (Playfair Display + Inter), and component designs must NOT be changed unless explicitly instructed.
2. **Next.js 16 Configuration Warning (`next.config.ts`)**:
   - **NEVER** re-enable `cacheComponents: true` or `partialPrefetching: true` in `next.config.ts`.
   - The home page is `"use client"` and React 19's `<Activity>` component from PPR creates an infinite dev-server compile loop (`GET /` every 1s). Keep config simple.
3. **Collaboration with Masum Khan**:
   - Masum Khan (`hello.masumiqbal@gmail.com`) frequently pushes to the same GitHub repository.
   - **Always run `git pull origin main` before starting new tasks** to avoid merge conflicts.
4. **Commits**: Do NOT add the `Co-Authored-By: Claude` line to commit messages in this project (user's decision).
5. **AI "Unslop" Doctrine**:
   - System prompts and AI outputs must avoid synthetic AI buzzwords (e.g. "delve", "foster", "testament", "tapestry", "embark", em-dashes, or unsolicited conversational emoji). Keep responses natural, concise, and helpful.

---

## 🎯 Current Status & Next Priorities

- [x] Full responsive design & dynamic slug routing implemented.
- [x] Infinite compile loop diagnosed and fixed in `next.config.ts`.
- [x] Gemini AI chat integration grounded in business knowledge.
- [x] ElevenLabs voice agent configured and wired.
- [x] ESLint passing (0 errors, 0 warnings).
- [x] Next.js production build passing (all 33 routes static/SSG).
- [x] All commits pushed to GitHub `main` (latest commit `45f4457`).
- [ ] **Ready for Deployment**: When deploying to Vercel, ensure `GEMINI_API_KEY` and `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` are set in Vercel project environment variables.
