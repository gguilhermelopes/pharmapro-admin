"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";
import ApiTitle from "@/components/ui/api-title";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Produtos (${data.length})`}
          description="Gerencie os produtos da sua farmácia"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <ApiTitle />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
