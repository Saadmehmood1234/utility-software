import { ReactNode } from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  if(session.user.role!=="admin"){
    redirect("/")
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 h-screen overflow-x-auto bg-gray-100">
        {children}
      </div>
    </div>
  );
}
