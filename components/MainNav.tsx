"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Category",
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Size",
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/color`,
      label: "Color",
      active: pathName === `/${params.storeId}/color`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Product",
      active: pathName === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Order",
      active: pathName === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-4", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm hidden md:block text-black/90 font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black/90 dark:text-white"
              : "text-muted-foreground"
          )}
        >{route.label}</Link>
      ))}
      <MobileSidebar />

    </nav>
  );
};

export default MainNav;
