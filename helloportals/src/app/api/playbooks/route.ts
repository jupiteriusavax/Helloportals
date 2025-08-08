import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const playbooks = [
      {
        id: "1",
        name: "Sales Pipeline",
        description: "Pipeline de vente standard",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: "2", 
        name: "Customer Onboarding",
        description: "Processus d'intégration client",
        status: "active",
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(playbooks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch playbooks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Mock implementation without Clerk
    const body = await request.json();
    
    return NextResponse.json({
      id: "new-playbook-id",
      name: body.name,
      description: body.description,
      status: "active",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create playbook" },
      { status: 500 }
    );
  }
}