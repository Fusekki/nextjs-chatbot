import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    // console.log(Message.safeParse(body));
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

    const result = await model.generateContent(prompt);

    return new Response(JSON.stringify(result.response.text()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
}
