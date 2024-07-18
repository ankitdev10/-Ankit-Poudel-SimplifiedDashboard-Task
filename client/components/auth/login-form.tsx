"use client";

import { login } from "@/lib/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
import { LoadingButton } from "../ui/loading-button";
import { useTransition } from "react";
const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .max(100),
  password: z.string().min(4, { message: "Password is required" }).max(100),
});

type LoginSchema = z.infer<typeof loginSchema>;
export const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirect");

  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    startTransition(async () => {
      const res = await login({
        username: values.username,
        password: values.password,
      });
      if (res?.login.__typename === "User") {
        router.push("/dashboard");
      } else if (res?.login.__typename === "InvalidCredentialsError") {
        toast.error(res.login.message);
      }
    });
  };

  const rootError = form.formState.errors.root?.message;
  return (
    <div className="flex flex-col max-h-screen justify-center  items-center p-8 md:p-12">
      <Form {...form}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Welcome Back!
        </h2>
        <form
          className="max-w-md mt-8 space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@username.com"
                    type="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="*******"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="current-password"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!!rootError && (
            <p className="text-sm font-medium text-destructive">{rootError}</p>
          )}
          <LoadingButton
            disabled={isPending}
            type="submit"
            loading={isPending}
            defaultText="Login"
            loadingText="Logging in.."
          />
        </form>
      </Form>
    </div>
  );
};
