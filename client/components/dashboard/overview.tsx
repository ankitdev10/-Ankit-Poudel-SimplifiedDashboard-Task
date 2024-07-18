import { MetricData } from "@/generated/graphql";
import { getMetrics } from "@/lib/providers/metrics";
import { BarChartBig, BriefcaseBusiness } from "lucide-react";
import { MetricCard } from "./metric-card";

export const Overview = async () => {
  const data = await getMetrics();

  return (
    <section className="px-2 py-2 md:px-6 md:py-4 font-medium">
      <h1 className="text-lg">Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-4 md:gap-8 mt-8">
        {data.metrics.map((metric, index) => (
          <MetricCard
            key={metric!.type}
            data={metric as MetricData}
            Icon={
              index === 0 ? (
                <BarChartBig
                  size={56}
                  color="white"
                  className="bg-[#e17bea] rounded-full p-3 size-12"
                />
              ) : (
                <BriefcaseBusiness
                  size={32}
                  color="white"
                  className="bg-primary-orange  rounded-full p-3 size-12"
                />
              )
            }
          />
        ))}
      </div>
    </section>
  );
};
