import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLTypesLoader } from '@nestjs/graphql';
import { ServicesModule } from 'src/services/services.module';
import { RequestContext } from './request-context';
import { ErrorTypeResolver } from 'src/common/errors/error';
import { GraphQLJSON } from 'graphql-scalars';
import { UserResolver } from './resolvers/user.resolver';

const resolvers = [UserResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [GraphQLTypesLoader],
      imports: [ServicesModule],
      useFactory: () => {
        return {
          playground: true,
          introspection: true,
          typePaths: ['./**/*.graphql'],
          resolvers: [ErrorTypeResolver, { JSON: GraphQLJSON }],
          context: ({ req, res }) => {
            const ctx = new RequestContext({ req, res });
            return ctx;
          },
        };
      },
    }),
  ],
  providers: [...resolvers],
})
export class ApiModule {}
