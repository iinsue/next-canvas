"use client";

import Image from "next/image";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";

export const SubscriptionModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Upgrade to a paid plan
          </DialogTitle>
          <DialogDescription>
            Upgrade to a paid to unlock more features
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited projects</p>
          </li>

          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited templates</p>
          </li>

          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              AI Backround removal
            </p>
          </li>

          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">AI Image generation</p>
          </li>
        </ul>

        <DialogFooter className="mt-4 gap-y-2 pt-2">
          <Button
            className="w-full bg-indigo-800 text-base font-semibold uppercase tracking-wide hover:bg-indigo-800/80"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
