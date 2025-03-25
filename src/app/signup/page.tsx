"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import InputField from "@/components/InputField";
import { toast } from "react-hot-toast";
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(4, "username Should be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("SignUp", values);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        password: values.password,
      }),
    });
    const data = await res.json();
    console.log();
    if (!data.success) {
      toast.error(data.message || "Error in SignUp");
      return;
    }
    toast.success("SignUp Successfully");
    reset();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 font-playfair">
              Create Account
            </h1>
            <p className="text-purple-700">
              Join us to start planning your events
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              label="Full Name"
              icon={<User className="h-5 w-5 text-purple-500" />}
              {...register("name")}
              error={errors.name} // Pass the entire FieldError object
            />

            <InputField
              label="Username"
              icon={<Mail className="h-5 w-5 text-purple-500" />}
              {...register("username")}
              error={errors.username} // Pass the entire FieldError object
            />

            <InputField
              label="Password"
              type="password"
              icon={<Lock className="h-5 w-5 text-purple-500" />}
              {...register("password")}
              error={errors.password} // Pass the entire FieldError object
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 text-lg"
            >
              Create Account
            </button>

            <p className="text-center text-purple-700">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
