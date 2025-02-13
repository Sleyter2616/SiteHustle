import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt, stepId } = await req.json();

    // Simulate processing delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Define mock outputs for different step IDs
    const mockOutputs: Record<string, string> = {
      idea_market: "Based on your vision input, consider targeting a niche market with emerging tech trends. Competitor analysis suggests focusing on underserved demographics.",
      branding: "Your brand identity could be refined by emphasizing authenticity and transparency. Consider adopting a modern, minimalist design aesthetic.",
      execution: "Your 30-day plan looks strong. For automations, consider integrating n8n to automate customer follow-ups and email marketing. A detailed workflow diagram is recommended."
    };

    const output = mockOutputs[stepId] || "AI suggestion placeholder.";

    return NextResponse.json({ success: true, output });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
