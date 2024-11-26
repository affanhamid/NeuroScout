import { NextResponse } from "next/server";
import { OrganizationModel } from "@/db/models";

export async function GET({ params }: { params: { id: string } }) {
  const organization = await OrganizationModel.get(params.id);
  if (!organization) {
    return NextResponse.json(
      { success: false, error: "Organization not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, data: organization });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const updatedOrganization = await OrganizationModel.update(
    { id: params.id },
    body,
  );
  return NextResponse.json({ success: true, data: updatedOrganization });
}

export async function DELETE({ params }: { params: { id: string } }) {
  await OrganizationModel.delete(params.id);
  return NextResponse.json({ success: true, message: "Organization deleted" });
}
