"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { useSignUp } from "@/features/auth/hooks/use-sign-up";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { TriangleAlertIcon } from "lucide-react";

export const SignUpCard = () => {
  const mutation = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onProviderSignUp = (provider: "github" | "google") => {
    signIn(provider, { redirectTo: "/" });
  };

  const onCredentialSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            redirectTo: "/",
          });
        },
      },
    );
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!mutation.error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlertIcon className="size-4" />
          <p>{mutation.error.message}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignUp} className="space-y-2.5">
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            disabled={mutation.isPending}
            required
          />
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            disabled={mutation.isPending}
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            disabled={mutation.isPending}
            required
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={mutation.isPending}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="relative w-full font-semibold [&_svg]:size-5"
            onClick={() => onProviderSignUp("google")}
            disabled={mutation.isPending}
          >
            <GoogleIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="relative w-full font-semibold [&_svg]:size-5"
            onClick={() => onProviderSignUp("github")}
            disabled={mutation.isPending}
          >
            <GithubIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <Button
            variant="link"
            size="sm"
            className="text-sky-700"
            disabled={mutation.isPending}
            asChild
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
