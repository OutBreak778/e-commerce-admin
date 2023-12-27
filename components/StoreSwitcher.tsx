"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Store } from "@prisma/client";
import UseStoreModal from "@/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const storeModel = UseStoreModal();

  const [open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="w-4 h-4 ml-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1">
        <Command>
            <CommandList>
                <CommandInput placeholder="Search Store..." />
                <CommandEmpty>No Store Found</CommandEmpty>
                <CommandGroup heading="Stores">
                    {formattedItems.map((store) => (
                        <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                            <StoreIcon className="mr-2 w-4 h-4" />
                            {store.label}
                            <Check className={cn("ml-auto w-4 h-4", currentStore?.value === store.value ? "opacity-100": "opacity-0")} />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
                <CommandGroup>
                    <CommandItem  className="cursor-pointer" onSelect={() => {
                        setOpen(false)
                        storeModel.onOpen()
                    }}>
                        <PlusCircle className="w-4 h-4 mr-3" />
                        Create Store
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
