"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";

const HomeButton = () => {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      href: `/${params.storeId}`,
      icon: <AiFillHome className="w-5 h-5" />,
      active: pathname === `/${params.storeId}`,
    },
  ];
  return (
    <div className="ml-4">
      {routes.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center justify-center gap-2 font-medium transition-colors hover:text-primary",
            item.active
              ? "text-black dark:text-white font-bold"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default HomeButton;
