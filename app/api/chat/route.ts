import { NextRequest } from "next/server";
import { GoogleGenAI } from '@google/genai';
import { z } from "zod";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenAI({apiKey:GEMINI_API_KEY});

type ChatBody = {
  message: string;
};

const Message = z.object({
  message: z.string(),
});

// extract the inferred type
type Message = z.infer<typeof Message>;

export async function POST(request: NextRequest) {
    console.log('in POST')
    const body: ChatBody = await request.json();
    try {
      Message.parse(body);
    } catch(e) {
      console.error(`Error in POST: ${JSON.stringify(e)}`);
      if (e.issues && e.issues[0]) {
        return new Response(JSON.stringify(e.issues[0]), { status: 400 });
      } else {
        return new Response('field \'message\' required', { status: 400 });
      }
    }
    const { message } = body;
    const prompt = message;

    const result = await genAI.models.generateContent({model: 'gemini-2.0-flash-001',contents: prompt});
    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify(generatedText), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
}
