import { BriefcaseBusiness, LayoutDashboard } from "lucide-react";

export const NAV_LINKS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BriefcaseBusiness,
    label: "Projects",
    href: "/projects",
  },
];

export type NavLinks = typeof NAV_LINKS;
