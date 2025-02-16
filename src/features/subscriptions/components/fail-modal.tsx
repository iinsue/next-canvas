"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFailModal } from "@/features/subscriptions/store/use-fail-modal";

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

export const FailModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useFailModal();

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Something went wrong
          </DialogTitle>
          <DialogDescription>
            We could not process your payment
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <DialogFooter className="mt-4 gap-y-2 pt-2">
          <Button
            className="w-full bg-indigo-800 text-base font-semibold uppercase tracking-wide hover:bg-indigo-800/80"
            onClick={handleClose}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
