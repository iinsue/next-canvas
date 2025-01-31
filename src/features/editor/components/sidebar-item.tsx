import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex h-full w-full flex-col rounded-none px-3 py-4 [&_svg]:size-5",
        isActive && "bg-muted text-primary",
      )}
    >
      <Icon className="stroke-2" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};
