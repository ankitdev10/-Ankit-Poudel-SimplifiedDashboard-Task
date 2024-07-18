import { DashboardHeader } from "@/components/dashboard-header";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="grid grid-cols-[300px_1fr]">
        <div className="sticky left-0 top-0 z-10 h-screen">
          <Sidebar />
        </div>
        <div className="bg-offwhite">
          <DashboardHeader />
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
