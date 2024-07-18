import { Overview } from "@/components/dashboard/overview";
import { ProjectTable } from "@/components/dashboard/project-table";
import { PROJECT_STATUSES } from "@/config/constants";
import { ProjectStatus } from "@/generated/graphql";
import { getProjects } from "@/lib/providers/project";

export default async function Dashboard({
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
    <section className="px-2 py-2  md:px-6 md:py-4 font-medium">
      <Overview />
      <ProjectTable title="Project Summary" data={data.projects} />
    </section>
  );
}
