import { Suspense } from "react";
import { Profile } from "./auth/profile";
import { Input } from "./ui/input";

export const DashboardHeader = () => {
  return (
    <header className="px-8 border-b border-[#e1d4cb] py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="flex  space-x-4">
          <Input placeholder="Search for anything" className="rounded-3xl" />
          <Suspense>
            <Profile />
          </Suspense>
        </div>
      </div>
    </header>
  );
};
