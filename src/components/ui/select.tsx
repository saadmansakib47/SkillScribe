"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextProps {
  value?: string;
  setValue: (value: string) => void;
  closeMenu: () => void;
}

const SelectContext = React.createContext<SelectContextProps | undefined>(
  undefined
);

export function Select({
  value: controlledValue,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const [internalValue, setInternalValue] = React.useState(controlledValue ?? "");
  const [open, setOpen] = React.useState(false);

  const value = controlledValue ?? internalValue;

  const setValue = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <SelectContext.Provider value={{ value, setValue, closeMenu }}>
      <div className="relative inline-block w-full">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as any, { open, setOpen })
            : child
        )}
      </div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  {
    placeholder?: string;
    open?: boolean;
    setOpen?: (v: boolean) => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, placeholder, open, setOpen, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within <Select>");
  const { value } = context;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen?.(!open)}
      className={cn(
        "flex w-full justify-between items-center rounded-[8px] border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none",
        className
      )}
      {...props}
    >
      <span className={cn(!value && "text-gray-400")}>
        {value || placeholder || "Select"}
      </span>
      <ChevronDown
        className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export function SelectContent({
  children,
  open,
}: {
  children: React.ReactNode;
  open?: boolean;
}) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectContent must be used within <Select>");
  const { closeMenu } = context;

  if (!open) return null;

  return (
    <div
      className="absolute mt-1 w-full z-20 bg-white border border-gray-200 rounded-[8px] shadow-lg animate-in fade-in slide-in-from-top-1"
      onMouseLeave={closeMenu}
    >
      <div className="max-h-48 overflow-y-auto py-1">{children}</div>
    </div>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectItem must be used within <Select>");
  const { setValue } = context;

  return (
    <div
      onClick={() => setValue(value)}
      className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectValue must be used within <Select>");
  const { value } = context;
  return <span>{value || placeholder}</span>;
}
