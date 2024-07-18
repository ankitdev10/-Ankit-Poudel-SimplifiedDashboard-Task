import { getMetrics } from "@/lib/providers/metrics";
import { MetricCard } from "./metric-card";
import { MetricData } from "@/generated/graphql";
import { BarChartBig, BriefcaseBusiness, ChevronDown } from "lucide-react";

export const Overview = async () => {
  const data = await getMetrics();

  return (
    <section className="px-6 py-4 font-medium">
      <h5 className="text-lg">Overview</h5>
      <div className="grid grid-cols-4 gap-8 mt-8">
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
