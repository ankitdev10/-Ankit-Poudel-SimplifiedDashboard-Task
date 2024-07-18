import { ProjectForm } from "@/components/projects/project-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { users } from "@/lib/providers/auth";

export default async function NewProject() {
  const data = await users();
  return (
    <section className="md:px-6 md:py-4 px-2 py-2 font-medium">
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <h5>Create new Project</h5>
          </div>
        </CardHeader>
        <CardContent>
          <ProjectForm
            data={data.users.items.map((item) => ({
              value: item.id,
              label: item.firstName,
            }))}
          />
        </CardContent>
      </Card>
    </section>
  );
}
