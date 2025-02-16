"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBilling } from "@/features/subscriptions/api/use-billing";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import {
  CreditCardIcon,
  CrownIcon,
  LoaderIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const UserButton = () => {
  const mutation = useBilling();
  const session = useSession();
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate();
  };

  if (session.status === "loading") {
    return <LoaderIcon className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data?.user?.name ?? "";
  const imageUrl = session.data?.user?.image ?? "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        {!shouldBlock && !isLoading && (
          <div className="absolute -left-1 -top-1 z-10 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full bg-white p-1 drop-shadow-sm">
              <CrownIcon className="size-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage alt={name} src={imageUrl} />
          <AvatarFallback className="bg-indigo-500 font-medium text-white">
            <UserIcon className="size-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem
          className="h-10 [&_svg]:size-4"
          onClick={onClick}
          disabled={mutation.isPending}
        >
          <CreditCardIcon className="mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10 [&_svg]:size-4"
          onClick={() => signOut({ redirectTo: "/sign-in" })}
        >
          <LogOutIcon className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
