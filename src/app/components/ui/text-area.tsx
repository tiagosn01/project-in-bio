import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(
        `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white placeholder:text-content-placeholder hover:border-border-secondary hover:text-content-body active:border-border-tertiary`,
        props.className,
      )}
    />
  );
}
