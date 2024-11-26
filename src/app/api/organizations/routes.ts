import { NextResponse } from "next/server";
import { OrganizationModel } from "@/models";

export async function GET() {
  // Fetch all organizations
  try {
    const organizations = await OrganizationModel.scan().exec();
    return NextResponse.json({ success: true, data: organizations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  // Create a new organization
  try {
    const body = await request.json();
    const newOrganization = await OrganizationModel.create(body);
    return NextResponse.json({ success: true, data: newOrganization });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
