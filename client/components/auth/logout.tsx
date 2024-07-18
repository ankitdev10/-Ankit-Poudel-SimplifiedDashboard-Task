"use client";
import { logout } from "@/lib/providers/auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const Logout = () => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      router.push("/");
    });
  };

  return (
    <span className="flex items-center gap-x-2" onClick={handleLogout}>
      <LogOutIcon size={16} />
      Logout
    </span>
  );
};
