"use server";

import { LoginDocument, MeDocument } from "@/generated/graphql";
import { getClient } from "../client";

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
