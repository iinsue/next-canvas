"use client";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Modals } from "./modals";
import { SubscriptionAlert } from "@/features/subscriptions/components/subscription-alert";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <Toaster position="top-center" duration={1500} />
      <Modals />
      <SubscriptionAlert />
      {children}
    </QueryProvider>
  );
};
