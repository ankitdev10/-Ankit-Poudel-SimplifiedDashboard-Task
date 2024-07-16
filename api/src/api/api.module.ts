import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule, GraphQLTypesLoader } from "@nestjs/graphql";
import { ServicesModule } from "src/services/services.module";
import { RequestContext } from "./request-context";
import { ErrorTypeResolver } from "src/common/errors/error";
import { GraphQLJSON } from "graphql-scalars";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "src/services/user.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth-guard";
import { ProjectResolver } from "./resolvers/project.resolver";

const resolvers = [UserResolver, ProjectResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [UserService, GraphQLTypesLoader],
      imports: [ServicesModule],
      useFactory: async (userService: UserService) => {
        return {
          playground: true,
          introspection: true,
          typePaths: ["./**/*.graphql"],
          resolvers: [ErrorTypeResolver, { JSON: GraphQLJSON }],
          context: async ({ req, res }) => {
            const ctx = new RequestContext({ req, res });
            try {
              if (ctx.req.headers.authorization) {
                const user = await userService.getSession(
                  ctx.req.headers.authorization,
                );
                ctx.user = user;
                return ctx;
              }
            } catch (error) {
              throw error;
            }
            return ctx;
          },
        };
      },
    }),
  ],
  providers: [
    ...resolvers,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}
