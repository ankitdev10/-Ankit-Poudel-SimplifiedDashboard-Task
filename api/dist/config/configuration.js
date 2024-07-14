"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const z = require("zod");
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
exports.default = () => {
    const value = {
        apiOptions: {
            host: process.env.API_HOST || "localhost",
            port: Number(process.env.API_PORT) || 3000,
        },
        database: {
            type: process.env.DB_TYPE || "postgres",
            synchronize: true,
            logging: false,
            url: process.env.DB_URL,
            migrations: [(0, path_1.join)(__dirname, "../../migrations/*.ts")],
        },
    };
    const parseResult = appConfigSchema.safeParse(value);
    if (!parseResult.success) {
        common_1.Logger.warn("Invalid app config", "Configuration");
        console.error(parseResult.error.errors);
        process.exit(1);
    }
    return parseResult.data;
};
//# sourceMappingURL=configuration.js.map