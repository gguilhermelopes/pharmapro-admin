import { redirect } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";

import MainNav from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "@/components/store-switcher";
import HomeButton from "@/components/home-button";
import { ModeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <HomeButton />
        <div className="ml-auto flex items-center space-x-4">
          <MainNav className="mx-6" />
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
