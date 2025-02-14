"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  CreditCard,
  CrownIcon,
  HomeIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="px-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75 [&_svg]:size-4"
          onClick={() => {}}
        >
          <CrownIcon className="mr-1 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold">Upgrade to Canvas Pro</span>
        </Button>
      </div>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href="mailto:hinsu93@gmail.com"
          icon={MessageCircleQuestionIcon}
          label="Get Help"
        />
      </ul>
    </div>
  );
};
