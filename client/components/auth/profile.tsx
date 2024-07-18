import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../ui/button";
import { ChevronDown, ChevronDownIcon, LogOutIcon } from "lucide-react";
import { me } from "@/lib/providers/auth";
import { Logout } from "./logout";
export const Profile = async () => {
  const { me: data } = await me();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-3xl  flex space-x-2 bg-white hover:bg-white">
          <div>
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden md:block text-black">
            <div className="flex flex-col text-xs">
              <span>
                {data?.firstName} {data?.lastName}
              </span>
              <span className="text-accent-foreground/50">Project Manager</span>
            </div>
          </div>
          <div>
            <ChevronDown color="black" className="w-4 h-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
