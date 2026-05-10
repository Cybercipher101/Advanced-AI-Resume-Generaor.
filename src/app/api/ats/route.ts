import { NextResponse } from 'next/server';
import { getGeminiATSFeedback } from '@/lib/gemini';
import { atsFeedbackSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = atsFeedbackSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const feedback = await getGeminiATSFeedback(parsed.data.content);

    return NextResponse.json({ feedback });
  } catch (error: any) {
    console.error("ATS Feedback API Error:", error);
    return NextResponse.json(
        { error: "Unable to analyze ATS compliance at this moment. Please try again later." }, 
        { status: 500 }
    );
  }
}
