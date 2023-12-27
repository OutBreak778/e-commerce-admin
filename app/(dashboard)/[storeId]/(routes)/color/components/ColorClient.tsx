"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/ApiList";

interface SizesClientProps {
  data: ColorColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Color (${data.length})`}
          description="Manage your Color of your Products"
        />
        <Button onClick={() => router.push(`/${params.storeId}/color/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Color
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Heading title="API" description="API call for Color" />
      <ApiList entityName="color" entityIdName="colorId" />
    </div>
  );
};

export default SizesClient;
