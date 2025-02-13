import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt, stepId } = await req.json();

    // Simulate processing delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Define generic example outputs for different step IDs
    const mockOutputs: Record<string, string> = {
      idea_market: "Example: Consider targeting emerging tech markets and exploring niche demographics based on industry trends.",
      branding: "Example: Emphasize a modern and minimalist design along with a clear, authentic brand voice.",
      execution: "Example: Integrate an automation tool like n8n to streamline customer follow-ups and email marketing workflows.",
      review: "Example: Your business plan is robust. Consider refining key sections based on market benchmarks and expert insights."
    };

    const output = mockOutputs[stepId] || "AI suggestion example placeholder.";

    return NextResponse.json({ success: true, output });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
