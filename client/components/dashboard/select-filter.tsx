"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_STATUSES } from "@/config/constants";
import { useRouter, useSearchParams } from "next/navigation";
export const SelectFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <Select
      onValueChange={(e) => {
        router.push(`/dashboard?status=${e}`);
      }}
      defaultValue={params.get("status") ?? ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {PROJECT_STATUSES.map((status, index) => (
            <SelectItem className="cursor-pointer" value={status} key={index}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
