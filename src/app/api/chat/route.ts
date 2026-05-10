import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';
import { chatMessageSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = chatMessageSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { messages } = parsed.data;
    
    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            systemInstruction: "You are an expert career coach and resume writer. Help the user craft a perfect, ATS-compliant resume. Be encouraging, concise, and professional. Ask clarifying questions if you need more information to build their resume.",
        }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
            for await (const chunk of responseStream) {
                if (chunk.text) {
                    controller.enqueue(encoder.encode(chunk.text));
                }
            }
        } catch(e) {
            console.error("Stream error", e);
        } finally {
            controller.close();
        }
      }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
        { error: "Our AI career expert is currently taking a coffee break. Please try again in a moment." }, 
        { status: 500 }
    );
  }
}
