import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { MetricData } from "@/generated/graphql";

interface CardWithFormProps {
  data: MetricData;
  Icon: any;
}

export const MetricCard = ({ data, Icon }: CardWithFormProps) => {
  return (
    <Card className="bg-card-offwhite">
      <CardContent className="py-4 space-y-4">
        {Icon}
        <h2 className="font-medium text-sm">{data.type}</h2>
        <h3 className="text-xl font-semibold">{data.value}</h3>
      </CardContent>
    </Card>
  );
};
