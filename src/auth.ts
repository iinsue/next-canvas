import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/drizzle";

// usersTable, accountsTable, sessionsTable, verificationTokenTable 따로 지정하지 않고 기본값으로 적용
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Github, Google],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
});
