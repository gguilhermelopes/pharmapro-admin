import prismadb from "@/lib/prismadb";

import { ManufacturerColumn } from "./components/columns";
import { format } from "date-fns";
import ManufacturerClient from "./components/client";

const ManufacturersPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const manufacturers = await prismadb.manufacturer.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedManufacturers: ManufacturerColumn[] = manufacturers.map(
    (item) => ({
      id: item.id,
      name: item.name,
      createdAt: format(item.createdAt, "dd/MM/yyyy"),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ManufacturerClient data={formattedManufacturers} />
      </div>
    </div>
  );
};

export default ManufacturersPage;
