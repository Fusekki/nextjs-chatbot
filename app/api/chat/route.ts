import { NextRequest } from "next/server";

// type Params = {
//   id: string;
// };

export async function POST(request: NextRequest) {
//   const { db } = await connectToDb();
//   const { id } = await params;
    const body = await request.json();
    const { message } = body;

//   const product = await db.collection('products').findOne({ id: id });

  if (!message) {
    return new Response('message required in body', { status: 400 });
  }



  return new Response(JSON.stringify('product'), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
