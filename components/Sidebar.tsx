"use client";

import { cn } from "@/lib/utils";
import {  KanbanSquare, LayoutDashboard, LucideSettings, Pipette, Plus, Ruler, ScrollText, Sheet, ShoppingCartIcon, User } from "lucide-react";
import React, { useState } from "react";
import { redirect, useParams } from "next/navigation";




const Sidebar = () => {

    const [showModel, setShowModel] = useState(true)
    const params = useParams()

    const routes = [
        {
          id: 1,
          icon: KanbanSquare,
          button: () => redirect("/"),
          label: "Overview",
        },
        {
          id: 2,
          icon: Sheet,
          button: () => redirect(`/${params.storeId}/billboards`),
          label: "Billboard",
        },
        {
          id: 3,
          icon: LayoutDashboard,
          button: () => redirect(`/${params.storeId}/categories`),
          label: "Category",
        },
        {
          id: 4,
          icon: Ruler,
          button: () => redirect(`/${params.storeId}/sizes`),
          label: "Size",
        },
        {
          id: 5,
          icon: LucideSettings,
          button: () => redirect(`/${params.storeId}/settings`),
          label: "Settings",
        },
        {
          id: 6,
          icon: Pipette,
          button: () => redirect(`/${params.storeId}/colors`),
          label: "Color",
        },
        {
          id: 7,
          icon: LucideSettings,
          button: () => redirect(`/${params.storeId}/products`),
          label: "Products",
        },
        {
          id: 8,
          icon: ShoppingCartIcon,
          button: () => redirect(`/${params.storeId}/orders`),
          label: "Orders",
        },
      ];

  return (
    <>
    <div className="shadow-xl flex flex-col h-full text-black bg-white overflow-y-scroll">
      <div className="p-4 flex-1 justify-center">
        <div className="space-y-5 mt-4">
          {routes.map((route) => (
            <div
            onClick={() => setShowModel(route.button)}
              key={route.id}
              className={cn(
                "text-muted-foreground border-2 border-solid border-black/5 shadow-sm transition-colors text-xs group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-black/90 hover:bg-black/10 rounded-lg",
                "bg-white text-black"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                <span className="text-xs">{route.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
