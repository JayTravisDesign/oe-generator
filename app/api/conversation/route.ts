import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    req: Request ){
        try {
            const { userId } = auth();
            const body = await req.json();
            const { messages } = body;
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
            if (!openai.apiKey) {
                return new NextResponse("OpenAI API Key not configured", { status: 500 });
            }
    
            if (!messages || messages.length === 0) {
                return new NextResponse("Messages are required", { status: 400 });
            }
    
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages
            });
    
            // Check the structure of the response before accessing 'data'
            if (!response || !response.choices || response.choices.length === 0 || !response.choices[0].message) {
                return new NextResponse("Invalid response format", { status: 500 });
            }
    
            const chatResponse = response.choices[0].message;
            console.log(chatResponse);
    
            return new NextResponse(JSON.stringify(chatResponse), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.log("[CONVERSATION_ERROR]", error);
            return new NextResponse("Internal error", { status: 500 });
        }
    }
