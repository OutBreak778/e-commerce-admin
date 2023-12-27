// "use client";

// import React, { useState } from "react";
// import { BillboardColumn } from "./Columns";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { CopyIcon, Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
// import toast from "react-hot-toast";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import AlertModal from "@/components/modal/AlertModal";

// interface CellActionProps {
//   data: BillboardColumn;
// }

// const CellAction: React.FC<CellActionProps> = ({ data }) => {
    
//   const router = useRouter();
//   const params = useParams();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const onCopy = (id: string) => {
//     navigator.clipboard.writeText(id);
//     toast.success("Billboard ID is Copied");
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
//       toast.success('Billboard deleted.');
//       console.log("Item deleted")
//       router.refresh();
//     } catch (error) {
//       toast.error('Make sure you removed all categories using this billboard first.');
//     } finally {
//       setOpen(false);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AlertModal 
//         isOpen={open} 
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-10 w-10 p-2">
//             <span className="sr-only">Open Menu</span>
//             <MoreHorizontal className="w-5 h-5" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuItem
//             onClick={() =>
//               router.push(`/${params.storeId}/billboards/${data.id}`)
//             }
//           >
//             <Edit className="w-4 h-4 mr-2" />
//             Update
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => onCopy(data.id)}>
//             <CopyIcon className="w-4 h-4 mr-2" />
//             Copy ID
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setOpen(true)}>
//             <Trash2Icon className="w-4 h-4 mr-2" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

// export default CellAction;

"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AlertModal  from "@/components/modal/AlertModal"
import { BillboardColumn } from "./Columns";


interface CellActionProps {
  data: BillboardColumn;
}

const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      toast.success('Billboard deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard ID copied to clipboard.');
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction