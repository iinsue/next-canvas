"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBilling } from "@/features/subscriptions/api/use-billing";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";

import {
  CreditCard,
  CrownIcon,
  HomeIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const mutation = useCheckout();
  const billingMutation = useBilling();
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
  const pathname = usePathname();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    billingMutation.mutate();
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75 [&_svg]:size-4"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              <CrownIcon className="mr-1 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">Upgrade to Canvas Pro</span>
            </Button>
          </div>

          <div className="px-3">
            <Separator />
          </div>
        </>
      )}

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
          onClick={onClick}
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
