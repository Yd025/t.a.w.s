const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? '/v1/chat';

function extractLlmText(data: unknown): string | null {
  if (typeof data === 'string' && data.trim()) return data;
  if (!data || typeof data !== 'object') return null;
  const o = data as Record<string, unknown>;
  const keys = [
    'response',
    'message',
    'answer',
    'text',
    'content',
    'output',
    'result',
  ];
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string' && v.trim()) return v;
  }
  return null;
}

export function parseLlmResponse(raw: string): string {
  const trimmed = raw.trim();
  try {
    const outer = JSON.parse(trimmed) as unknown;
    const direct = extractLlmText(outer);
    if (direct) return direct;

    if (outer && typeof outer === 'object' && 'body' in outer) {
      const body = (outer as { body: unknown }).body;
      if (typeof body === 'string') {
        const innerTrim = body.trim();
        try {
          const inner = JSON.parse(innerTrim) as unknown;
          return extractLlmText(inner) ?? innerTrim;
        } catch {
          return innerTrim;
        }
      }
    }

    return typeof outer === 'object'
      ? JSON.stringify(outer)
      : String(outer);
  } catch {
    return trimmed;
  }
}

export async function sendChatQuestion(question: string): Promise<string> {
  const formData = new FormData();
  formData.append('question', question);

  const res = await fetch(CHAT_API_URL, {
    method: 'POST',
    body: formData,
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(raw || `Request failed with status ${res.status}`);
  }

  return parseLlmResponse(raw);
}
