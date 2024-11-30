import { NextRequest, NextResponse } from "next/server";
import { handleError, OrganizationModel } from "@/db";
import { UpdateOrganizationRequest } from "@/types";

// GET: Retrieve a specific organization
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const organization = await OrganizationModel.findById(id);
    if (!organization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: organization });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Update a specific organization
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const updateData: UpdateOrganizationRequest = await req.json();

  try {
    const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updatedOrganization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: updatedOrganization });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Delete a specific organization
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const deletedOrganization = await OrganizationModel.findByIdAndDelete(id);
    if (!deletedOrganization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: deletedOrganization });
  } catch (error) {
    return handleError(error);
  }
}
