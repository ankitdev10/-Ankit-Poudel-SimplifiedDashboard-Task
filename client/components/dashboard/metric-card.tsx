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
        <h5 className="text-muted-foreground font-medium text-sm">
          {data.type}
        </h5>
        <h6 className="text-xl font-semibold">{data.value}</h6>
      </CardContent>
    </Card>
  );
};
