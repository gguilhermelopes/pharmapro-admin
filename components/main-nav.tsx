"use client";

import { HTMLAttributes } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { AiFillSetting } from "react-icons/ai";

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/products`,
      label: "Produtos",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Banners",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categorias",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/manufacturers`,
      label: "Fabricantes",
      active: pathname === `/${params.storeId}/manufacturers`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Pedidos",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Configurações",
      active: pathname === `/${params.storeId}/settings`,
      icon: <AiFillSetting className="w-5 h-5" />,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white font-bold"
              : "text-muted-foreground"
          )}
        >
          {route.icon ? route.icon : route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
