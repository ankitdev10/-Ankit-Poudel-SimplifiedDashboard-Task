import { Overview } from "@/components/dashboard/overview";
import { ProjectTable } from "@/components/dashboard/project-table";
import { PROJECT_STATUSES } from "@/config/constants";
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
  if (!PROJECT_STATUSES.some((status) => searchParams.status))
    searchParams.status = null;

  const data = await getProjects({
    pagination: {
      page: searchParams.page ? parseInt(searchParams.page) : null,
      limit: searchParams.limit ? parseInt(searchParams.limit) : null,
    },
  });

  return (
    <section className="px-6 py-4 font-medium">
      <Overview />
      <ProjectTable title="Project Summary" data={data.projects} />
    </section>
  );
}
