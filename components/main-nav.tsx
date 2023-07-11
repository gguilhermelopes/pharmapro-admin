"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      MainNav
    </nav>
  );
};

export default MainNav;
