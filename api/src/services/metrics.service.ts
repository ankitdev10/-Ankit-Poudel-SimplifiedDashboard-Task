import { Injectable } from "@nestjs/common";
import { TransactionalConnection } from "./common/transaction-connection.service";
import { MetricData, ProjectStatus } from "src/generated";
import { Project } from "src/entities/project.entity";

@Injectable()
export class MetricsService {
  constructor(private connection: TransactionalConnection) {}
  async metrics(): Promise<MetricData[]> {
    const totalProjects = await this.connection.getRepository(Project).count();
    const totalCompletedProjects = await this.connection
      .getRepository(Project)
      .count({
        where: {
          status: ProjectStatus.COMPLETED,
        },
      });
    const totalRevenue = await this.connection
      .getRepository(Project)
      .createQueryBuilder("project")
      .select("SUM(project.price)", "total")
      .where("project.status = :status", { status: "COMPLETED" })
      .getRawOne();

    return [
      {
        type: "Total Revenue",
        value: `$${totalRevenue.total}`,
      },
      {
        type: "Projects",
        value: `${totalCompletedProjects}/${totalProjects}`,
      },
    ];
  }
}
