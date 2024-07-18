import { Query, Resolver } from "@nestjs/graphql";
import { MetricsService } from "src/services/metrics.service";

@Resolver()
export class MetricsResolver {
  constructor(private metricsService: MetricsService) {}

  @Query()
  async metrics() {
    return this.metricsService.metrics();
  }
}
