"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { ManufacturerColumn, columns } from "./columns";
import ApiTitle from "@/components/ui/api-title";

interface ManufacturerClientProps {
  data: ManufacturerColumn[];
}

const ManufacturerClient: FC<ManufacturerClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Fabricantes (${data.length})`}
          description="Gerencie os fabricantes dos produtos da sua farmácia"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/manufacturers/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Fabricante
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <ApiTitle />
      <ApiList entityName="manufacturers" entityIdName="manufacturerId" />
    </>
  );
};

export default ManufacturerClient;
