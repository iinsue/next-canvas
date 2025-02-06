"use client";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <Toaster position="top-center" duration={1500} />
      {children}
    </QueryProvider>
  );
};
