import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const segments = [
      {
        id: "1",
        name: "Enterprise",
        description: "Clients enterprise",
        criteria: { type: "enterprise" },
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "SMB",
        description: "Petites et moyennes entreprises", 
        criteria: { type: "smb" },
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(segments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch segments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const body = await request.json();
    
    return NextResponse.json({
      id: "new-segment-id",
      name: body.name,
      description: body.description,
      criteria: body.criteria,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create segment" },
      { status: 500 }
    );
  }
}