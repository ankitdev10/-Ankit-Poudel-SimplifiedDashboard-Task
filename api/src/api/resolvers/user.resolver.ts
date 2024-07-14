import { Args, Context, Query, Mutation, Resolver } from '@nestjs/graphql';
import { MutationCreateUserArgs } from 'src/generated';
import { UserService } from 'src/services/user.service';
import { RequestContext } from '../request-context';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation()
  async createUser(
    @Context() ctx: RequestContext,
    @Args() args: MutationCreateUserArgs,
  ) {
    return await this.userService.createUser(ctx, args.input);
  }

  @Query()
  async users() {
    return await this.userService.users();
  }
}
