import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectsQuery, ProjectStatus } from "@/generated/graphql";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import ProgressCircle from "../progress-circle";
import { ProjectFilters } from "./project-filters";
interface ProjectTableProps {
  title: string;
  data: ProjectsQuery["projects"];
}
export const ProjectTable = ({ title, data }: ProjectTableProps) => {
  return (
    <section className="px-6 py-4 font-medium">
      <Card className="bg-card-offwhite">
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <h5>{title}</h5>
            <Suspense>
              <div className="flex gap-x-4 items-center">
                <ProjectFilters />
              </div>
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b border-[red]">
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Project Manager</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-semibold">
                    {project.name}
                  </TableCell>
                  <TableCell className="">
                    {project.manager.firstName} {project.manager.lastName}
                  </TableCell>
                  <TableCell>
                    {new Date(project.dueDate).toDateString()}
                  </TableCell>
                  <TableCell>
                    <CustomStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell>
                    <ProgressCircle progress={project.progress} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

const CustomStatusBadge = ({ status }: { status: ProjectStatus }) => {
  return (
    <div>
      {status === "COMPLETED" && (
        <Badge className="bg-green-100 text-green-800 py-1 hover:bg-green-200">
          Completed
        </Badge>
      )}

      {status === "DELAYED" && (
        <Badge className="bg-yellow-100 text-yellow-800 py-1 hover:bg-yellow-200">
          Delayed
        </Badge>
      )}

      {status === "ONGOING" && (
        <Badge className="bg-orange-100 text-orange-800 py-1 hover:bg-orange-200">
          Ongoing
        </Badge>
      )}

      {status === "AT_RISK" && (
        <Badge className="bg-red-100 text-red-800 py-1 hover:bg-red-200">
          At Risk
        </Badge>
      )}
    </div>
  );
};
