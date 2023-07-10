import { auth } from "@clerk/nextjs";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

const Dashboard = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
};

export default Dashboard;
