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
import { CrossIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
export const ProjectFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  const addSearchParams = (key: string, value: string) => {
    const existingParams = searchParams.forEach((val, key) => {
      params.set(key, val);
    });
    params.set(key, value);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <>
      <Select
        onValueChange={(e) => {
          addSearchParams("status", e);
        }}
        defaultValue={searchParams.get("status") ?? ""}
      >
        <SelectTrigger aria-label="status-trigger" className="">
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

      <Select
        onValueChange={(e) => {
          addSearchParams("page", e);
        }}
        defaultValue={searchParams.get("page") ?? ""}
      >
        <SelectTrigger aria-label="page-trigger" className="w-[180px]">
          <SelectValue placeholder="Page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Page</SelectLabel>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((page, index) => (
              <SelectItem
                className="cursor-pointer"
                value={String(page)}
                key={index}
              >
                {page}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {searchParams.size > 0 && (
        <X
          className="cursor-pointer"
          size={20}
          onClick={() => router.push("/dashboard")}
        />
      )}
    </>
  );
};
