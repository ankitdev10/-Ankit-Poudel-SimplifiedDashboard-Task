"use server";

import { LoginDocument, MeDocument, UsersDocument } from "@/generated/graphql";
import { getClient } from "../client";
import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY } from "@/config/constants";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await getClient().mutate({
      mutation: LoginDocument,
      variables: {
        username,
        password,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const me = async () => {
  try {
    const res = await getClient().query({
      query: MeDocument,
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
};

export const users = async () => {
  try {
    const res = await getClient().query({
      query: UsersDocument,
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
