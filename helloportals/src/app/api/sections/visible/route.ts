import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const sections = [
      {
        id: "1",
        name: "Overview",
        type: "overview",
        visible: true,
        order: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "Documents",
        type: "documents", 
        visible: true,
        order: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: "3",
        name: "Timeline",
        type: "timeline",
        visible: false,
        order: 3,
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: "Sections updated successfully",
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update sections" },
      { status: 500 }
    );
  }
}