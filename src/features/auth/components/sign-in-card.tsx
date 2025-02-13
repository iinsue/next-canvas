"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

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

export const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/",
      });
    });
  };

  const onProviderSignIn = (provider: "github" | "google") => {
    startTransition(async () => {
      await signIn(provider, { redirect: false });
    });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlertIcon className="size-4 min-w-4" />
          {error === "OAuthAccountNotLinked" ? (
            <p>Another account already exists with the same e-mail address</p>
          ) : (
            <p>Invalid email or password</p>
          )}
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignIn} className="space-y-2.5">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            disabled={isPending}
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            disabled={isPending}
            required
            minLength={3}
            maxLength={20}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isPending}
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
            onClick={() => onProviderSignIn("google")}
            disabled={isPending}
          >
            <GoogleIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="relative w-full font-semibold [&_svg]:size-5"
            onClick={() => onProviderSignIn("github")}
            disabled={isPending}
          >
            <GithubIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?
          <Button
            variant="link"
            size="sm"
            asChild
            className="text-sky-700"
            disabled={isPending}
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
