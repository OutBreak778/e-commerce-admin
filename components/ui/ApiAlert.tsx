"use client"

import { CopyIcon, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { Separator } from "@radix-ui/react-separator";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const TextMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const VaraintMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant="public" }) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description)
        toast.success("API route is Copied")
    }
  return (
    <>
    <Alert className="my-4 shadow-md">
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-4">
        {title}
        <Badge variant={VaraintMap[variant]}>{TextMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.5rem] py-3 font-mono text-sm font-semibold">{description}</code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
            <CopyIcon className="h-4 w-4"  />
        </Button>
      </AlertDescription>
    </Alert></>
  );
};

export default ApiAlert;
