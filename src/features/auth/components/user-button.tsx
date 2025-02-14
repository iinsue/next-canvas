"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCardIcon, LoaderIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <LoaderIcon className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data?.user?.name ?? "";
  const imageUrl = session.data?.user?.image ?? "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* TODO: Add Crown if user is premium */}
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage alt={name} src={imageUrl} />
          <AvatarFallback className="bg-indigo-500 font-medium text-white">
            <UserIcon className="size-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="h-10 [&_svg]:size-4">
          <CreditCardIcon className="mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10 [&_svg]:size-4"
          onClick={() => signOut()}
        >
          <LogOutIcon className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
