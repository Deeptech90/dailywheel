import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GenerateRequestBody {
  keywords?: string;
  style?: string;
  randomness?: 'low' | 'medium' | 'high';
  length?: 'all' | 'short' | 'medium' | 'long';
  industry?: string;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      keywords = 'startup',
      style = 'brandable',
      randomness = 'medium',
      length = 'medium',
      industry = 'technology'
    } = request.body as GenerateRequestBody;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return 200 with fallback instruction flag so client generates locally
      return response.status(200).json({
        source: 'client_fallback',
        message: 'No GEMINI_API_KEY configured on server; using local phonetic engine.',
        names: []
      });
    }

    // Temperature mapping: low = 0.2, medium = 0.7, high = 1.1
    const temperature = randomness === 'low' ? 0.2 : randomness === 'high' ? 1.1 : 0.7;

    const prompt = `You are a world-class brand naming strategist.
Generate 30 unique, brandable, high-conversion business names tailored for:
- Concept / Keywords: "${keywords}"
- Industry Category: ${industry}
- Naming Style: ${style}
- Randomness / Creativity: ${randomness}
- Target Length: ${length}

Each name MUST have a short rationale in the "meaning" field (STRICTLY UNDER 12 WORDS) explaining why it fits (tone, wordplay, or what it evokes in the ${industry} industry).

Return ONLY a valid JSON object matching this schema:
{
  "names": [
    {
      "name": "BrandName",
      "phonetic": "PRON-un-see-AY-shun",
      "meaning": "Punchy rationale under 12 words explaining tone or wordplay",
      "score": 95
    }
  ]
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!geminiRes.ok) {
      return response.status(200).json({ source: 'client_fallback', names: [] });
    }

    const geminiData = await geminiRes.json();
    const textOutput = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      return response.status(200).json({ source: 'client_fallback', names: [] });
    }

    const parsed = JSON.parse(textOutput);
    return response.status(200).json({ source: 'gemini', names: parsed.names || [] });
  } catch (error: any) {
    return response.status(200).json({
      source: 'client_fallback',
      error: error.message || 'Error occurred',
      names: []
    });
  }
}
