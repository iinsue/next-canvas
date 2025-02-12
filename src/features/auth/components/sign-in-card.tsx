"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

export const SignInCard = () => {
  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, { redirectTo: "/" });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="relative w-full font-semibold [&_svg]:size-5"
            onClick={() => onProviderSignIn("google")}
          >
            <GoogleIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="relative w-full font-semibold [&_svg]:size-5"
            onClick={() => onProviderSignIn("github")}
          >
            <GithubIcon className="absolute left-2.5 top-2.5 mr-2" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?
          <Button variant="link" size="sm" asChild className="text-sky-700">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
