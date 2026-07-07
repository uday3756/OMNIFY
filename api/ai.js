// Omnify AI - OpenRouter proxy (server-side only).
// The API key is read from the OPENROUTER_API_KEY env var and NEVER sent to the browser.

// Real, currently-available OpenRouter free models, ordered by observed reliability.
// Free tiers are heavily rate-limited upstream, so we try several across providers.
const FREE_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'openai/gpt-oss-20b:free',
];

const CATALOG = `
Available programs (recommend only from this list, by exact name):
- Little Builders Robotics | ages 6-9 | Sat mornings | small calm groups, great for beginners | free trial, then $695 term
- Maker Duo (Siblings) | ages 4-9 | Sat 10-11:30 | two kids same room same time | $120/mo (sibling discount)
- Weekend STEM Explorers | ages 7-10 | Sun mornings | rotates robots, coding, science | free trial, then $595 term
- Tiny Picassos Art Studio | ages 4-7 | weekday afternoons | calm, expressive, mess-friendly | $90/mo
- Splash Starters Swimming | ages 3-6 | weekends | water confidence basics | free trial, then $260
- Little Movers Dance | ages 4-8 | Sat afternoons | playful beginner dance | $85/mo
- Junior Coders Club | ages 8-12 | Sun afternoons | block coding to first games | free trial, then $480
- Summer Discovery Camp | ages 5-11 | weekday camps | multi-activity week | $275/week
`;

const SYSTEM = `You are Omnify's kids-activity matching AI. A parent describes their child or children in casual, messy, possibly mixed language (interests, ages, schedule, budget, siblings, commitment level).
Do two things:
1) Extract a short structured understanding (6 to 8 items), each a {"k": short label, "v": short value}. Cover children and ages, interests, temperament, schedule, budget signal, sibling intent, and commitment uncertainty when present.
2) Recommend exactly 3 programs from the catalog that best fit, ranked. Each recommendation: {"name": exact catalog name, "match": integer 80-99, "why": one warm sentence tied to what the parent said, "badges": 2-3 short tags like "Sat mornings","Ages 6-9","Free trial","Sibling slot", "price": short price string}.
${CATALOG}
Respond with ONLY valid minified JSON, no markdown, no commentary, matching:
{"understood":[{"k":"","v":""}],"recommendations":[{"name":"","match":0,"why":"","badges":[""],"price":""}]}
Do not use em dashes anywhere. Use plain hyphens.`;

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Strip any BOM / non-printable / whitespace that can sneak in via env tooling.
  const key = (process.env.OPENROUTER_API_KEY || '').replace(/[^\x21-\x7E]/g, '');
  if (!key) {
    res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const message = (body && body.message ? String(body.message) : '').slice(0, 1200);
  if (!message.trim()) {
    res.status(400).json({ error: 'Missing message' });
    return;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const state = { lastErr: 'unknown' };

  // Try one model. Returns a valid parsed object, or null (and records why in state).
  async function tryModel(model) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 18000); // never let one model stall the function
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: ctrl.signal,
        headers: {
          'Authorization': 'Bearer ' + key,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://omnify-ai.vercel.app',
          'X-Title': 'Omnify AI Service Store',
        },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          max_tokens: 900,
          messages: [
            { role: 'system', content: SYSTEM },
            { role: 'user', content: message },
          ],
        }),
      });

      if (!r.ok) { state.lastErr = 'model ' + model + ' returned ' + r.status; return null; }
      const data = await r.json();
      const text = data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : '';
      if (!text) { state.lastErr = 'empty response from ' + model; return null; }

      const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(cleaned); }
      catch (e) {
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (!m) { state.lastErr = 'unparseable JSON from ' + model; return null; }
        parsed = JSON.parse(m[0]);
      }

      if (parsed && Array.isArray(parsed.understood) && Array.isArray(parsed.recommendations)) {
        return parsed;
      }
      state.lastErr = 'bad shape from ' + model;
      return null;
    } catch (e) {
      state.lastErr = (e && e.name === 'AbortError') ? ('timeout from ' + model) : ((e && e.message) || String(e));
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  // Pass 1: walk the whole free-model list once.
  for (const model of FREE_MODELS) {
    const parsed = await tryModel(model);
    if (parsed) { res.status(200).json({ model, ...parsed }); return; }
  }

  // Pass 2: free tiers throttle in short bursts. Wait briefly and retry the two
  // most reliable models once more before giving up to the client fallback.
  await sleep(1500);
  for (const model of FREE_MODELS.slice(0, 3)) {
    const parsed = await tryModel(model);
    if (parsed) { res.status(200).json({ model, retried: true, ...parsed }); return; }
  }

  res.status(502).json({ error: 'All free models busy, try again', detail: state.lastErr });
}
