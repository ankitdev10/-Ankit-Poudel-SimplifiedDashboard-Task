import * as z from "zod";
declare const appConfigSchema: z.ZodObject<{
    apiOptions: z.ZodObject<{
        host: z.ZodString;
        port: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        host?: string;
        port?: number;
    }, {
        host?: string;
        port?: number;
    }>;
    database: z.ZodObject<{
        type: z.ZodString;
        synchronize: z.ZodBoolean;
        logging: z.ZodBoolean;
        url: z.ZodOptional<z.ZodString>;
        migrations: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type?: string;
        synchronize?: boolean;
        logging?: boolean;
        url?: string;
        migrations?: string[];
    }, {
        type?: string;
        synchronize?: boolean;
        logging?: boolean;
        url?: string;
        migrations?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    apiOptions?: {
        host?: string;
        port?: number;
    };
    database?: {
        type?: string;
        synchronize?: boolean;
        logging?: boolean;
        url?: string;
        migrations?: string[];
    };
}, {
    apiOptions?: {
        host?: string;
        port?: number;
    };
    database?: {
        type?: string;
        synchronize?: boolean;
        logging?: boolean;
        url?: string;
        migrations?: string[];
    };
}>;
export type AppConfig = z.infer<typeof appConfigSchema>;
declare const _default: () => AppConfig;
export default _default;
