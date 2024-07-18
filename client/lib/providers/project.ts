"use server";

import { ProjectListOptions, ProjectsDocument } from "@/generated/graphql";
import { getClient } from "../client";

export const getProjects = async (options: ProjectListOptions) => {
  try {
    const res = await getClient().query({
      query: ProjectsDocument,
      variables: {
        options,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
