import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { TransactionalConnection } from "./common/transaction-connection.service";
import { RequestContext } from "src/api/request-context";
import {
  CreateProjectInput,
  ProjectListOptions,
  UpdateProjectInput,
} from "src/generated";
import { Project } from "src/entities/project.entity";
import { ListQueryBuilder } from "./common/list-query-builder";
import { patchEntity } from "src/common/utils/patchEntity";

@Injectable()
export class ProjectService {
  constructor(
    private readonly userService: UserService,
    private readonly connection: TransactionalConnection,
    private readonly listQuery: ListQueryBuilder,
  ) {}

  async createProject(ctx: RequestContext, input: CreateProjectInput) {
    const manager = await this.userService.findOneById(input.managerId);
    if (!manager) {
      throw new NotFoundException("Manager not found");
    }

    const project = new Project({
      ...input,
      price: input.price * 100,
      manager,
    });
    return await this.connection.getRepository(Project).save(project);
  }

  async updateProject(id: string, input: UpdateProjectInput) {
    const project = await this.findOneById(id);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    const patched = patchEntity(project, {
      ...input,
      price: input.price * 100,
    });

    return await this.connection.getRepository(Project).save(patched);
  }

  async deleteProject(id: string) {
    const project = await this.findOneById(id);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return await this.connection.getRepository(Project).delete(project);
  }

  async findOneById(id: string) {
    return await this.connection.getRepository(Project).findOneById(id);
  }

  async findAll(input: ProjectListOptions) {
    // add a second arg to build method as options
    const skip = input?.pagination?.page
      ? (input?.pagination?.page - 1) * (input?.pagination?.limit || 10)
      : 0;

    return await this.listQuery
      .build(Project, ["manager"])
      .skip(skip)
      .andWhere(input.status ? "Project.status = :status" : "1 = 1", {
        status: input.status || undefined,
      })
      .orderBy("Project.createdAt", "DESC")
      .take(input?.pagination?.limit ?? 10)
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }));
  }
}
