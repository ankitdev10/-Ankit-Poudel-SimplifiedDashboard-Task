import { Logger } from "@nestjs/common";
import { join } from "path";
import * as z from "zod";

const appConfigSchema = z.object({
  apiOptions: z.object({
    host: z.string(),
    port: z.number(),
  }),
  database: z.object({
    type: z.string(),
    synchronize: z.boolean(),
    logging: z.boolean(),
    url: z.string().optional(),
    migrations: z.array(z.string()),
  }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
export default (): AppConfig => {
  const DB_TYPE = (process.env.DB_TYPE as any) || "postgres";
  const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
  const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "postgres";
  const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
  const POSTGRES_PORT = process.env.POSTGRES_PORT || "5432";
  const POSTGRES_DB = process.env.POSTGRES_DB || "postgres";

  const DB_URL = `${DB_TYPE}://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

  console.log(DB_URL);
  const value: AppConfig = {
    apiOptions: {
      host: process.env.API_HOST || "localhost",
      port: Number(process.env.API_PORT) || 3000,
    },
    database: {
      type: (process.env.DB_TYPE as any) || "postgres",
      synchronize: true,
      logging: false,
      url: DB_URL,
      migrations: [join(__dirname, "../../migrations/*.ts")],
      // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
  };

  const parseResult = appConfigSchema.safeParse(value);
  if (!parseResult.success) {
    Logger.warn("Invalid app config", "Configuration");
    console.error(parseResult.error.errors);
    process.exit(1);
  }

  return parseResult.data;
};
