import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
// type Params = {
//   id: string;
// };
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
console.log('GEMINI_API_KEY: ', GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type ChatBody = {
  message: string;
};

export async function POST(request: NextRequest) {
//   const { db } = await connectToDb();
//   const { id } = await params;
// const body = await request.json();
    const body: ChatBody = await request.json();
    const  { message } = body;
    console.log('message', message);
    // console.log(request.body)

    const prompt = message;
        // const image = {
        //     inlineData: {
        //         data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
        //         mimeType: "image/png",
        //     },
        // };

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

//   const product = await db.collection('products').findOne({ id: id });

  // if (!message) {
  //   return new Response('message required in body', { status: 400 });
  // }



    return new Response(JSON.stringify(result.response.text()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
}
