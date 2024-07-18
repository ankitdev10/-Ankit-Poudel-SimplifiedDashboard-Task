import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module, OnModuleInit } from "@nestjs/common";
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
import { MetricsResolver } from "./resolvers/metrics.resolver";
import { TransactionalConnection } from "src/services/common/transaction-connection.service";
import { Project } from "src/entities/project.entity";
import { PROJECTS, USERS } from "./dummydata";
import { User } from "src/entities/user.entity";
import { ProjectService } from "src/services/project.service";

const resolvers = [UserResolver, ProjectResolver, MetricsResolver];

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
export class ApiModule implements OnModuleInit {
  constructor(
    private userService: UserService,
    private transaction: TransactionalConnection,
    private projectService: ProjectService,
  ) {}
  async onModuleInit() {
    await this.esnureDummyDataExists();
    await this.ensureSuperAdminExist();
  }

  async ensureSuperAdminExist() {
    const user = await this.userService.findOneByEmail("superadmin");
    if (!user) {
      console.log("Creating super admin");
      await this.userService.createUser(undefined, {
        firstName: "Super",
        lastName: "Admin",
        email: "superadmin",
        phone: "1234567890",
        password: "password123",
      });
    }
  }

  async esnureDummyDataExists() {
    const users = await this.transaction.getRepository(User).find();
    if (users.length === 0) {
      await this.transaction.getRepository(User).save(USERS);
    }

    const projects = await this.transaction.getRepository(Project).find();
    if (projects.length === 0) {
      PROJECTS.forEach(async (project) => {
        await this.projectService.createProject(undefined, project as any);
      });
    }
  }
}
