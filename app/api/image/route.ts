import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = "1", resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!prompt || !amount || !resolution) {
            return new NextResponse("Prompt, amount, and resolution are required", { status: 400 });
        }

        // Make the OpenAI API call here to generate images using the provided 'prompt'

        // Example:
        const image = await openai.images.generate({ model: "dall-e-3", prompt });

        // Extract image URLs or necessary data from the 'image' response

        // Return the response data as JSON with status 200
        return new NextResponse(JSON.stringify(image), { status: 200 });
    } catch (error) {
        console.error("[IMAGE_ERROR]", error);
        // Return an Internal Server Error response with status 500
        return new NextResponse("Internal Error", { status: 500 });
    }
}




