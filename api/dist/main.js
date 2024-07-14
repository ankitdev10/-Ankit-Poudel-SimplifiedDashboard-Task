"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const config = app.get((config_1.ConfigService));
        const apiOptions = config.get('apiOptions', { infer: true });
        await app.listen(apiOptions.port, apiOptions.host).then(() => {
            console.log(`Application is running on: http://${apiOptions.host}:${apiOptions.port}`);
            console.log(`Playground: http://${apiOptions.host}:${apiOptions.port}/graphql`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map