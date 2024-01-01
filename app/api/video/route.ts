import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import OpenAI from 'openai';
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});


//const openai = new OpenAI({
  //apiKey: process.env.OPENAI_API_KEY,
//});

export async function POST(
    req: Request ){
        try {
            const { userId } = auth();
            const body = await req.json();
            const { prompt } = body;
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }


    
            if (!prompt || prompt.length === 0) {
                return new NextResponse("Messages are required", { status: 400 });
            }
    
            const response = await replicate.run(
              "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
              {
                input: {
                  prompt: prompt
                }
              }
            );
    
    
            return NextResponse.json(response);
            
        } catch (error) {
            console.log("[VDIEO_ERROR]", error);
            return new NextResponse("Internal error", { status: 500 });
        }
    }
