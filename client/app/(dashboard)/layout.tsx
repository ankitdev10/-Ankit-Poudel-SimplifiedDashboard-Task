import { DashboardHeader } from "@/components/dashboard-header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="grid grid-cols-1  md:grid-cols-[300px_1fr]">
        <div className="sticky hidden md:block left-0 top-0 z-10 h-screen">
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
