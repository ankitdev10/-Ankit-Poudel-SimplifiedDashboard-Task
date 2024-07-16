import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  MutationCreateProjectArgs,
  MutationDeleteProjectArgs,
  MutationUpdateProjectArgs,
  QueryProjectArgs,
} from "src/generated";
import { ProjectService } from "src/services/project.service";
import { RequestContext } from "../request-context";

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation()
  createProject(
    @Context() ctx: RequestContext,
    @Args() args: MutationCreateProjectArgs,
  ) {
    return this.projectService.createProject(ctx, args.input);
  }

  @Mutation()
  updateProject(
    @Context() ctx: RequestContext,
    @Args() args: MutationUpdateProjectArgs,
  ) {
    return this.projectService.updateProject(args.id, args.input);
  }

  @Query()
  projects(@Context() ctx: RequestContext) {
    return this.projectService.findAll();
  }

  @Query()
  project(@Context() ctx: RequestContext, @Args() args: QueryProjectArgs) {
    return this.projectService.findOneById(args.id);
  }

  @Mutation()
  deleteProject(
    @Context() ctx: RequestContext,
    @Args() args: MutationDeleteProjectArgs,
  ) {
    return this.projectService.deleteProject(args.id);
  }
}
