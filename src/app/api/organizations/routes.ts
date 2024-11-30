import { NextRequest, NextResponse } from "next/server";
import { OrganizationModel, handleError } from "@/db";
import { CreateOrganizationRequest } from "@/types";

// GET: Retrieve all organizations
export async function GET() {
  try {
    const organizations = await OrganizationModel.find();
    return NextResponse.json({ success: true, data: organizations });
  } catch (error) {
    return handleError(error);
  }
}

// POST: Create a new organization
export async function POST(req: NextRequest) {
  const createData: CreateOrganizationRequest = await req.json();

  try {
    const newOrganization = await OrganizationModel.create(createData);
    return NextResponse.json(
      { success: true, data: newOrganization },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
