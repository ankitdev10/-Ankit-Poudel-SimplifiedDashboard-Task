import { Suspense } from "react";
import { Profile } from "./auth/profile";
import { Input } from "./ui/input";

export const DashboardHeader = () => {
  return (
    <header className="px-2 md:px-8  py-2 md:py-6 border-b border-[#e1d4cb] ">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block md:text-2xl font-semibold">Dashboard</h1>

        <div className="flex  space-x-4">
          <Input placeholder="Search for anything" className=" rounded-3xl" />
          <Suspense>
            <Profile />
          </Suspense>
        </div>
      </div>
    </header>
  );
};
