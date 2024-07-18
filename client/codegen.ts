import type { CodegenConfig } from "@graphql-codegen/cli";
// eslint-disable-next-line import/no-extraneous-dependencies

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["graphql/**/*.graphql"],
  generates: {
    "generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
