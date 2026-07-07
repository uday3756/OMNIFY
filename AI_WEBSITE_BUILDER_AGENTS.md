# AI Website Builder - Agent Architecture & System Prompts

## 📊 How Many Agents Are Working?

**Total: 8 Agent Functions** (each with 2 modes: sync + streaming)

1. **OpenAI Agent** (generate + stream)
2. **Gemini Agent** (generate + stream)
3. **Groq Agent** (generate + stream)
4. **OpenRouter Agent** (generate + stream)
5. **Anthropic Agent** (generate + stream)
6. **DeepSeek Agent** (implied in providers list)
7. **Mistral Agent** (implied in providers list)
8. **Together AI Agent** (implied in providers list)

**Key: All agents share ONE system prompt, customized per mode (JSON code generation vs conversational).**

---

## 🎯 System Prompts (The Brain of All Agents)

### **System Prompt 1: JSON Code Generation Mode** (Primary)
```
"You are an expert React developer. Respond with valid JSON only, no markdown fences."
```

**Used for:**
- Generating React component code
- Generating full project structure
- Modifying existing code

**Output format enforced:**
```json
{
  "/App.js": "import React from 'react'...",
  "/pages/Home.js": "...",
  "/components/Header.js": "...",
  "/package.json": "..."
}
```

**Temperature: 0.7** (balanced creativity + consistency)

### **System Prompt 2: Conversational Mode** (Planning)
```
"You are a helpful assistant for building websites."
```

**Used for:**
- Planning conversations ("Tell me about your needs")
- Discussing requirements
- Generating [READY_TO_BUILD] markers

**Temperature: 0.7**

---

## 🔄 Agent Selection Flow

**Location:** `lib/llm/providers.js`

### How It Works:

```javascript
// Provider-specific functions (all use same system prompt):

openAIChatCompletion()           // OpenAI API
generateGeminiText()             // Google Gemini API
generateGroqText()               // Groq API (OpenAI-compatible)
generateOpenRouterText()         // OpenRouter API (OpenAI-compatible)
generateAnthropicText()          // Anthropic Claude API
generateDeepSeekText()           // DeepSeek API
generateMistralText()            // Mistral API
generateTogetherAIText()         // Together AI API
```

### Configuration:

```javascript
const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini']
const GEMINI_MODELS = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash']
const GROQ_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']
const OPENROUTER_FREE_MODELS = ['google/gemma-4-31b-it:free', 'nvidia/nemotron-3-nano-30b-a3b:free']
const ANTHROPIC_MODELS = ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest']
const DEEPSEEK_MODELS = ['deepseek-coder', 'deepseek-chat']
const MISTRAL_MODELS = ['codestral-latest', 'mistral-large-latest']
const TOGETHER_MODELS = ['meta-llama/Llama-3.3-70B-Instruct-Turbo', 'Qwen/Qwen2.5-Coder-32B-Instruct']
```

---

## 📁 Building from Existing File Structure

### **YES — The system DOES support modifying existing projects**

**How it works:**

**Step 1: Flatten Existing Project**
```javascript
formatExistingProjectForPrompt(fileData)
  ↓
Converts: { "/App.js": "...", "/pages/Home.js": "..." }
    to: Full JSON with all file paths
```

**Location:** `lib/formatExistingProject.js`

**Step 2: Include in AI Prompt**
```
[EXISTING_PROJECT — apply the user's latest request on top of this codebase. 
Return the FULL updated project JSON with ALL files, not a diff. 
Preserve working features unless the user asked to remove them.]

{ 
  "/App.js": "existing code here...",
  "/pages/Home.js": "existing code here...",
  ...
}
```

**Step 3: AI Modifies & Returns**
The AI receives:
- **System prompt:** "You are an expert React developer..."
- **User request:** "Add dark mode to this app"
- **Context:** The full existing codebase

The AI returns:
- **Updated JSON** with ALL files (not a diff)
- **Modified files** for the user's request
- **Preserved files** that weren't touched

### **Example Flow:**

**Initial build:**
```
User: "Build me a React app with login and a dashboard"
  ↓
AI generates: { "/App.js", "/pages/Home.js", "/pages/Dashboard.js", "/components/Login.js", ... }
  ↓
File structure created in Convex/Sandpack
```

**Later modification:**
```
User: "Add dark mode to the dashboard"
  ↓
AI receives existing project: { "/App.js": "...", "/pages/Dashboard.js": "...", ... }
  ↓
AI modifies only: "/pages/Dashboard.js" (adds dark mode)
  ↓
AI returns FULL project with ALL files (edited + unedited)
  ↓
Updated in Convex/Sandpack
```

---

## 🎯 Key Instruction in System Prompt

The instruction **`[EXISTING_PROJECT]`** in the prompt tells the AI:

```
✅ DO:
- Keep existing code working
- Add/modify files as requested
- Return the COMPLETE project JSON

❌ DON'T:
- Return a diff
- Delete files the user didn't ask to remove
- Break existing functionality
```

---

## 🔌 Provider Fallback Logic

If one provider fails or is rate-limited, it tries the next:

```javascript
// Priority order (user preference or env config):
1. OpenAI (gpt-4o)
2. Gemini (google)
3. Anthropic (Claude)
4. Groq (open-source)
5. OpenRouter (free models)
6. Mistral
7. DeepSeek
8. Together AI

// If a provider is rate-limited:
//   → Try next model in same provider
//   → If all models fail → Try next provider
```

---

## 📊 Comparison: Omnify vs AI Website Builder

| Aspect | Omnify | AI Website Builder |
|--------|--------|-------------------|
| **# of Agents** | 1 (OpenRouter wrapper) | 8 (multi-provider) |
| **System Prompts** | 1 (matching AI) | 2 (code gen + conversational) |
| **Existing Code** | No (stateless) | **YES** (full project context) |
| **Prompt Size** | ~100 words | ~90,000 chars max (existing project) |
| **Output Format** | JSON tags + recommendations | JSON full file structure |
| **Temperature** | 0.4 (consistent) | 0.7 (creative) |
| **Task** | Classification | Code generation |

---

## 💡 For Your Interview

**When asked: "How many agents are building the website?"**

*"There are 8 provider agents (OpenAI, Gemini, Anthropic, Groq, OpenRouter, Mistral, DeepSeek, Together), but they all share ONE system prompt: 'You are an expert React developer. Respond with valid JSON only.' The system picks a provider based on user preference or availability.*

*When building from scratch, the user describes what they want, and the AI generates a full React project as JSON.*

*When modifying existing code, the system includes the full existing project in the prompt with a marker: '[EXISTING_PROJECT — apply the user's latest request on top of this codebase. Return the FULL updated project JSON with ALL files, not a diff.]' This way, the AI modifies what's needed and preserves everything else."*

**When asked: "Does it handle existing code?"**

*"Yes. The system flattens all existing files, includes them in the prompt (up to 90K characters, prioritizing App.js and pages first), and tells the AI to return the complete updated project. It's not a diff system — the AI returns all files, modified and unmodified."*

---

## 📁 File Locations

| Component | File |
|-----------|------|
| **All system prompts** | `lib/llm/providers.js` (lines 57–63, 200–220, etc.) |
| **Provider functions** | `lib/llm/providers.js` (lines 50–300+) |
| **Existing project handling** | `lib/formatExistingProject.js` (lines 1–50) |
| **Build workflow logic** | `lib/buildWorkflow.js` |
| **Prompt truncation** | `lib/gemini.js` (truncateCodegenPrompt fn) |

---

## 🎓 Interview Takeaway

The AI Website Builder is **multi-agent with single-prompt discipline**:
- **8 providers** (for redundancy and user choice)
- **1 system prompt template** (for consistency)
- **Full project context** (for modifications, not diffs)
- **Automatic fallback** (if a provider fails, try the next)

This is different from Omnify (which is single-provider, single-task matching). The Website Builder's strength is **code generation at scale with multi-provider resilience**.
