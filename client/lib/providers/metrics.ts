"use server";

import { MetricsDocument } from "@/generated/graphql";
import { getClient } from "../client";

export const getMetrics = async () => {
  try {
    const res = await getClient().query({
      query: MetricsDocument,
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
