"use client";

import { FC } from "react";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description="Gerencie os pedidos da sua farmácia"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
