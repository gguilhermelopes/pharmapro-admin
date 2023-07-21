"use client";

import { HTMLAttributes } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillSetting } from "react-icons/ai";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

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
    <>
      <nav className="md:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className="w-4 h-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {routes.map((route) => (
                  <NavigationMenuLink
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex flex-col py-2 px-4 items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-slate-200 hover:text-black",
                      route.active
                        ? "text-black dark:text-white font-bold"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.icon ? route.icon : route.label}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav
        className={cn(
          "hidden md:flex items-center space-x-4 lg:space-x-6",
          className
        )}
      >
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
    </>
  );
};

export default MainNav;
