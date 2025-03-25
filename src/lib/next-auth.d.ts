import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    username?: string;
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      username?: string; // ✅ Replaced email with username
      role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    username?: string;
    role?: string;
  }
}
