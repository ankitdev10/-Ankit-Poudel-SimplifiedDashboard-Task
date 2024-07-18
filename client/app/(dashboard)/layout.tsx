import { DashboardHeader } from "@/components/dashboard-header";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="grid grid-cols-[300px_1fr]">
        <Sidebar />
        <div className="bg-offwhite">
          <DashboardHeader />
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
