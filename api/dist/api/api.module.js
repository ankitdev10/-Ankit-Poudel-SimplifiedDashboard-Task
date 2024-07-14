"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const services_module_1 = require("../services/services.module");
const request_context_1 = require("./request-context");
const error_1 = require("../common/errors/error");
const graphql_scalars_1 = require("graphql-scalars");
const user_resolver_1 = require("./resolvers/user.resolver");
const resolvers = [user_resolver_1.UserResolver];
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            services_module_1.ServicesModule,
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                inject: [graphql_1.GraphQLTypesLoader],
                imports: [services_module_1.ServicesModule],
                useFactory: () => {
                    return {
                        playground: true,
                        introspection: true,
                        typePaths: ['./**/*.graphql'],
                        resolvers: [error_1.ErrorTypeResolver, { JSON: graphql_scalars_1.GraphQLJSON }],
                        context: ({ req, res }) => {
                            const ctx = new request_context_1.RequestContext({ req, res });
                            return ctx;
                        },
                    };
                },
            }),
        ],
        providers: [...resolvers],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map