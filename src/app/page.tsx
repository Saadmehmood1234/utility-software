// app/signin/page.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import InputField from "@/components/InputField";
const formSchema = z.object({
  username: z.string().min(4, "Username Should be minimum 4 characters"),
  password: z.string().min(6),
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    console.log(values);
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      console.log(result?.error);
      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Authentication failed"
        );
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-blue-900 mb-4 font-playfair">
              Welcome Back
            </h1>
            <p className="text-blue-700">Sign in to manage your bookings</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              label="Username"
              icon={<Mail className="h-5 w-5 text-blue-500" />}
              {...form.register("username")}
              error={form.formState.errors.username}
            />

            <InputField
              label="Password"
              type="password"
              icon={<Lock className="h-5 w-5 text-blue-500" />}
              {...form.register("password")}
              error={form.formState.errors.password}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 rounded text-white py-4 text-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
