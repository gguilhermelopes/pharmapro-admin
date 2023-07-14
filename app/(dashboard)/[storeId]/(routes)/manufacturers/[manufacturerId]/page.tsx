import prismadb from "@/lib/prismadb";
import ManufacturerForm from "./components/manufacturer-form";

const ManufacturerPage = async ({
  params,
}: {
  params: { manufacturerId: string };
}) => {
  const manufacturer = await prismadb.manufacturer.findUnique({
    where: {
      id: params.manufacturerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ManufacturerForm initialData={manufacturer} />
      </div>
    </div>
  );
};

export default ManufacturerPage;
