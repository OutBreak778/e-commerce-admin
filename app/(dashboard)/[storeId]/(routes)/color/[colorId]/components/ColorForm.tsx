"use client";

import AlertModal from "@/components/modal/AlertModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { PlusIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(3).regex(/^#/, {
    message: "String must be valid HEX code",
  }),
});

type ColorFormValue = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData ? "Edit a Color" : "Add new Color";
  const toastMessage = initialData ? "Color Updated" : "Color Created";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ColorFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValue) => {
    try {

      setLoading(true);

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/color/${params.colorId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/color`, data);

      }

      router.push(`/${params.storeId}/color`)
      router.refresh();
      toast.success(toastMessage);

    } catch (error) {
      toast.error("Something went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/color/${params.colorId}`);
      router.push(`/${params.storeId}/color`);
      router.refresh();

      toast.success("Color deleted successfully.");
    } catch (error) {
      toast.error(
        "Make sure you remove all product using this color."
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between mb-3">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 mb-5 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Color Name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                    <Input
                      placeholder="Color HEX value"
                      disabled={loading}
                      {...field}
                    />
                    <div className="border p-4 rounded-full" style={{background: field.value}} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            <PlusIcon className="w-4 h-4 mr-2" /> {action}
          </Button>
        </form>
      </Form>
      <Separator />
      {/* <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public" /> */}
    </div>
  );
};

export default ColorForm;
