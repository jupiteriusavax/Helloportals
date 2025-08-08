import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const triggers = [
      {
        id: "1",
        name: "New Lead",
        description: "Déclenché quand un nouveau lead est créé",
        type: "webhook",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "Deal Won",
        description: "Déclenché quand un deal est gagné",
        type: "webhook", 
        status: "active",
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(triggers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch triggers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const body = await request.json();
    
    return NextResponse.json({
      id: "new-trigger-id",
      name: body.name,
      description: body.description,
      type: body.type,
      status: "active",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create trigger" },
      { status: 500 }
    );
  }
}