# 🎯 Quick Reference (Print This)

## The 30-Second Elevator Pitch
"I redesigned Omnify's kids-activity registration as an **AI-first experience**. Parents describe their child naturally, the AI understands them, and recommends the 3 best programs with reasoning. It removes the filter-clicking maze and increases conversions. Live at omnify-ai-assessment.vercel.app."

---

## Tech Stack (One Line Each)
| Layer | Tech | Why |
|-------|------|-----|
| Frontend | HTML/CSS/Vanilla JS | Zero build overhead, deploys instantly |
| AI | OpenRouter free models (Gemma, Nemotron, Qwen3, GPT-OSS, Llama) | Stateless, retries across 8 models, $0 cost |
| Backend | Vercel Functions (Node.js) | API key stays secret, scales to zero |
| Deploy | Vercel + GitHub | Auto-deploy on push, integrated |
| Database | (None yet) | Stateless MVP; Supabase if we scale |

---

## AI Flow in 5 Steps
```
1. Parent types/voices: "7yo loves robots, free weekends"
2. Fetch /api/ai → OpenRouter
3. Model returns JSON: {understood: [...], recommendations: [...]}
4. Frontend animates tags + match cards
5. Fallback scripted result if API throttles (5% of the time)
```

---

## Talking Points by Question

### "How does the AI work?"
- System prompt tells the model to parse input into structured tags + 3 recommendations
- Output is JSON (no parsing errors)
- Match % = confidence signal
- "Why" field ties back to parent's exact words

### "Why OpenRouter?"
- One API for 8 different free models
- Automatic retry logic (if Gemma is rate-limited, try Nemotron)
- No key management hell
- $0 cost to validate idea

### "What's your backend?"
- Today: stateless serverless
- Tomorrow (if we scale): Supabase (PostgreSQL + RLS) or Convex (TypeScript)
- Supabase wins on cost ($5–100/mo vs Convex $25–500/mo)

### "How do you measure success?"
- Conversion rate (% of browsers who book; target: +38%)
- Attachment rate (% who show up to 1st class; target: 85%+)
- Repeat bookings (% who book again in 30 days; target: 25%+)
- Cost per booking (total AI spend ÷ bookings; target: <$1)

### "What's next if you had unlimited tokens?"
- **Cartoon companion** — animated character teaches activity steps
- **Personalized storytelling** — custom story the night before (kid arrives excited)
- **Dynamic game curator** — micro-games tailored to age/interests/mood
- **Feedback loop** — parents rate 1st session, AI re-recommends smarter

Each is 500–2000 tokens/user/month. High ROI for turning one-time bookers into repeats.

---

## Live Demo (2 Minutes)
**URL:** https://omnify-ai-assessment.vercel.app/01-discovery.html

**Steps:**
1. Scroll the hero (watch video scrub as you scroll)
2. Click in the textarea (example text clears)
3. Type: `"my 8yo loves coding, weekends work"`
4. Click "Find programs"
5. **Watch it happen:** animated tags + 3 recommendations with match %

---

## If They Ask "What About Costs?"
| Scenario | Cost | Notes |
|----------|------|-------|
| MVP (free models) | $0/mo | Validates idea, proves market |
| 10k registrations/mo (Claude Haiku) | $30–300/mo | Pass-through to customer or charge $1–5/reg |
| Phase 2 (stories + games) | $1000–5000/mo | But engagement goes 1x → 2–3x repeat rate |
| Scale (100k kids/yr) | Model-dependent | Custom fine-tune or committed spend with OpenRouter |

---

## Conversational Reframes
| Instead of... | Say... |
|--|--|
| "I used serverless functions" | "I kept infrastructure costs to $0 by using stateless functions" |
| "Free models have latency issues" | "We handle rate-limiting gracefully with a fallback, so users never see the API failure" |
| "It's just a prototype" | "It's a production-ready demo that validates the AI-first registration model" |
| "I don't have a database yet" | "We're stateless MVP; once we add parent profiles and history, Supabase PostgreSQL is the plan" |

---

## If You Get Stuck
- **"Tell me more about..."** → Buy time by clarifying their question
- **"That's a great question..."** → Genuine engagement signal
- **"Here's how I'd approach that..."** → Shows problem-solving, not defensiveness
- **Live demo** → If conversation lags, demo the product (it speaks for itself)

---

## Red Flags to Avoid
❌ "I used AI because it's trendy"
✅ "The problem was matching complexity; AI solved it cleanly"

❌ "I didn't think about cost"
✅ "Free models validated the idea; production cost is $X and we have 3 ways to recoup it"

❌ "I don't know why I chose Vercel"
✅ "Vercel has native integration with GitHub and Serverless functions, so deploys are instant"

❌ "The AI just does magic"
✅ "Here's the system prompt. Here's the JSON structure. Here's how the frontend renders it."

---

## Energy & Tone
- **Confident but humble:** "I shipped this in 6 hours, but here's what I'd do differently with more time"
- **Curious:** "I'm curious how you'd approach the Phase 2 roadmap with your infrastructure"
- **Specific:** Avoid "it was interesting" — say *why* it was interesting
- **Excited:** You built something real and it works. Let that show.

---

**Good luck! 🚀**
