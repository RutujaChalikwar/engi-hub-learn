
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarItem = ({ href, icon, children }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="hidden lg:block border-r bg-card h-[calc(100vh-4rem)] w-64 overflow-y-auto">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="mb-2 text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-4">
            <div className="py-2">
              <h3 className="mb-2 text-xs font-semibold text-muted-foreground">Learning</h3>
              <ul className="grid gap-1">
                <SidebarItem
                  href="/dashboard"
                  icon={<span className="text-lg">📊</span>}
                >
                  Overview
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/my-courses"
                  icon={<span className="text-lg">📚</span>}
                >
                  My Courses
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/schedule"
                  icon={<span className="text-lg">📅</span>}
                >
                  Schedule
                </SidebarItem>
              </ul>
            </div>

            {isAdmin && (
              <div className="py-2">
                <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
                  Admin
                </h3>
                <ul className="grid gap-1">
                  <SidebarItem
                    href="/dashboard/manage-courses"
                    icon={<span className="text-lg">🔧</span>}
                  >
                    Manage Courses
                  </SidebarItem>
                  <SidebarItem
                    href="/dashboard/users"
                    icon={<span className="text-lg">👥</span>}
                  >
                    Users
                  </SidebarItem>
                  <SidebarItem
                    href="/dashboard/analytics"
                    icon={<span className="text-lg">📈</span>}
                  >
                    Analytics
                  </SidebarItem>
                </ul>
              </div>
            )}

            <div className="py-2">
              <h3 className="mb-2 text-xs font-semibold text-muted-foreground">Account</h3>
              <ul className="grid gap-1">
                <SidebarItem
                  href="/dashboard/profile"
                  icon={<span className="text-lg">👤</span>}
                >
                  Profile
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/settings"
                  icon={<span className="text-lg">⚙️</span>}
                >
                  Settings
                </SidebarItem>
              </ul>
            </div>
          </nav>
        </div>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
