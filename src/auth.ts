import { Admin } from "./model/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "./lib/dbConnect";
import crypto from "crypto";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Credential is missing");
        }

        await dbConnect();
        const user = await Admin.findOne({
          username: credentials.username,
        }).select("+password");

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error("Password does not match");
        }

        const sessionToken = crypto.randomBytes(32).toString("hex");
        user.token = sessionToken;
        await user.save();

        return {
          id: user._id.toString(),
          username: user.username,
          name: user.name ?? null,
          image: user.image ?? null,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.image = user.image ?? null;
        token.username = user.username ?? ""; 
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string | null;
        session.user.image = token.image as string | null;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
