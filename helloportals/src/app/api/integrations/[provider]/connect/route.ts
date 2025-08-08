import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  try {
    // Mock implementation without Clerk and Prisma
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: `Connected to ${params.provider}`,
      data: {
        provider: params.provider,
        status: "connected",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect integration" },
      { status: 500 }
    );
  }
}