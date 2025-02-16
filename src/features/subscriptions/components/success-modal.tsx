"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSuccessModal } from "@/features/subscriptions/store/use-success-modal";

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

export const SuccessModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useSuccessModal();

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
            Subscription successfull!
          </DialogTitle>
          <DialogDescription>
            You have successfully subscribed to our service
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
