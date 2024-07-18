"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { NAV_LINKS } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathName = usePathname();

  const paths = pathName.split("/").filter(Boolean);
  return (
    <aside className="px-12 py-10 min-h-screen bg-black text-white">
      <h2 className="text-xl font-medium text-center">The Makers</h2>

      <div className="mt-12">
        <Link href="/projects/new">
          <Button className="bg-white flex rounded-3xl space-x-2  py-6 text-black hover:bg-white">
            <span className="bg-primary-orange  text-white p-1 rounded-full">
              <PlusIcon size={20} />
            </span>
            <span className=""> Create new project</span>
          </Button>
        </Link>

        <ul className="mt-12 space-y-4">
          {NAV_LINKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="" key={index}>
                <Link
                  className={cn("flex space-x-4 items-center p-4", {
                    "rounded-3xl bg-white text-primary-orange": paths.includes(
                      item.label.toLowerCase(),
                    ),
                  })}
                  href={item.href}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
