"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banners (${data.length})`}
          description="Crie destaques para sua farmácia com os Banners"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Banner
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
};

export default BillboardClient;
