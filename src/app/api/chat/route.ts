import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { askMistral } from "@/lib/mistral";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const aiResponse = await askMistral(message);

    const saved = await prisma.chat.create({
      data: {
        prompt: message,
        response: aiResponse,
      },
    });

    return NextResponse.json(saved);
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
