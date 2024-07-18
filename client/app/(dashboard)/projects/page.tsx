import { Overview } from "@/components/dashboard/overview";
import { ProjectTable } from "@/components/dashboard/project-table";
import { Button } from "@/components/ui/button";
import { PROJECT_STATUSES } from "@/config/constants";
import { ProjectStatus } from "@/generated/graphql";
import { getProjects } from "@/lib/providers/project";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Project({
  searchParams,
}: {
  searchParams: {
    status?: string | null;
    limit?: string | null;
    page?: string | null;
  };
}) {
  if (!PROJECT_STATUSES.some((status) => searchParams.status === status))
    searchParams.status = null;

  const data = await getProjects({
    pagination: {
      page: searchParams.page ? parseInt(searchParams.page) : null,
      limit: searchParams.limit ? parseInt(searchParams.limit) : null,
    },
    status: searchParams.status
      ? (searchParams.status as ProjectStatus)
      : undefined,
  });

  return (
    <section className="px-6 py-4 font-medium">
      <div className="flex justify-end">
        <Link href="/projects/new" className="">
          <Button className="mx-auto bg-primary-orange w-fit hover:bg-primary-orange/80">
            <Plus size={16} className="mr-2" />
            Create new Project
          </Button>
        </Link>
      </div>
      <ProjectTable title="Project Summary" data={data.projects} />
    </section>
  );
}
