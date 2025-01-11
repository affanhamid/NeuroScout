import PlayerForm from "@/components/ui/PlayerForm";
import React from "../../../../frontend/node_modules/@types/react";
import DataProvider from "@/components/ui/DataProvider";
import { OrganizationTypeWithId } from "@/types";

async function page({
  params
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <main>
      <DataProvider<OrganizationTypeWithId>
        endpoint={`organizations/${resolvedParams.organizationId}`}
      >
        {(organization) => <PlayerForm organization={organization} />}
      </DataProvider>
    </main>
  );
}

export default page;
