"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PROJECT_STATUSES } from "@/config/constants";
import { ProjectStatus } from "@/generated/graphql";
import { createProject } from "@/lib/providers/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loading-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(100),
  description: z
    .string()
    .min(4, { message: "Description is required" })
    .max(100),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  status: z.enum(["COMPLETED", "DELAYED", "ONGOING", "AT_RISK"]),
  progress: z.coerce.number().max(100, { message: "Progress max can be 100" }),
  dueDate: z.string().min(4, { message: "Due Date is required" }).max(100),
  managerId: z.string(),
});

type LoginSchema = z.infer<typeof createProjectSchema>;
export const ProjectForm = ({
  data,
}: {
  data: { value: string; label: string }[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      status: "ONGOING",
      progress: 0,
      dueDate: "",
      managerId: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    console.log(values);
    startTransition(async () => {
      const res = await createProject({
        ...values,
        status: values.status as ProjectStatus,
        managerId: value,
      });
      if (res?.createProject.__typename === "Project") {
        router.push("/projects");
      } else {
        toast.error("Somethig went wrong");
      }
    });
  };

  const rootError = form.formState.errors.root?.message;
  return (
    <div className="p-8">
      <Form {...form}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Create new Project
        </h2>
        <form
          className="grid grid-cols-2 items-center  mt-8 gap-4 gap-x-12 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project Name" type="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    required
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PROJECT_STATUSES.map((status, index) => (
                          <SelectItem
                            className="cursor-pointer"
                            value={status}
                            key={index}
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {data?.length && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between"
                >
                  {value
                    ? data?.find((user) => user?.value === value)?.label
                    : "Select Manager..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search Manager..." />
                  <CommandEmpty>No Manager found.</CommandEmpty>
                  <CommandGroup>
                    {data?.length &&
                      data?.map((user) => (
                        <CommandList>
                          <CommandItem
                            key={user?.value}
                            value={user?.value}
                            onSelect={() => {
                              console.log(user.value);
                              setValue(user.value === value ? "" : user.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === user.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {user.label}
                          </CommandItem>
                        </CommandList>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Progress</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Progress"
                    type="number"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Due Date"
                    required
                    type="date"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!!rootError && (
            <p className="text-sm font-medium text-destructive">{rootError}</p>
          )}
          <LoadingButton
            className="mt-4 w-fit col-span-2"
            disabled={isPending}
            type="submit"
            loading={isPending}
            defaultText="Submit"
            loadingText="Submitting..."
          />
        </form>
      </Form>
    </div>
  );
};
