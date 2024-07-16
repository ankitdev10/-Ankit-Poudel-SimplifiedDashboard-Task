import { Args, Context, Query, Mutation, Resolver } from "@nestjs/graphql";
import {
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationLoginArgs,
  MutationUpdateUserArgs,
} from "src/generated";
import { UserService } from "src/services/user.service";
import { RequestContext } from "../request-context";
import { Public } from "../decorators/public.decorator";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
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

  @Public()
  @Mutation()
  async login(@Context() ctx: RequestContext, @Args() args: MutationLoginArgs) {
    return await this.userService.login(ctx, args.username, args.password);
  }

  @Mutation()
  async deleteUser(
    @Context() ctx: RequestContext,
    @Args() args: MutationDeleteUserArgs,
  ) {
    return await this.userService.deleteUser(ctx, args.id);
  }

  @Mutation()
  async updateUser(
    @Context() ctx: RequestContext,
    @Args() args: MutationUpdateUserArgs,
  ) {
    return await this.userService.updateUser(ctx, args.id, args.input);
  }
}
