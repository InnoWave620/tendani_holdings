import { NextRequest, NextResponse } from 'next/server';
import { aiChatbot, type AIChatbotInput } from '@/ai/flows/ai-chatbot';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIChatbotInput;

    if (!body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const result = await aiChatbot({
      message: body.message,
      conversationHistory: body.conversationHistory || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[CHAT API]', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'An error occurred while processing your request.', details: errorMessage }, { status: 500 });
  }
}
