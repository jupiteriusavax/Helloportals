import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock implementation without Clerk and Prisma
    const rooms = [
      {
        id: "1",
        name: "Sales Room",
        type: "SALES",
        description: "Salle de vente pour les prospects",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "Success Room", 
        type: "SUCCESS",
        description: "Salle de succès client",
        status: "active",
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Mock implementation without Clerk and Prisma
    const body = await request.json();
    
    return NextResponse.json({
      id: "new-room-id",
      name: body.name,
      type: body.type,
      description: body.description,
      status: "active",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}