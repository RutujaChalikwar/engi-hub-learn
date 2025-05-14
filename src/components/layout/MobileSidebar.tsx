
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface MobileSidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const MobileSidebarItem = ({ href, icon, children, onClose }: MobileSidebarItemProps) => {
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
        onClick={onClose}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
};

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="p-6">
            <h2 className="mb-2 text-lg font-semibold">Dashboard</h2>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-4">
              <div className="py-2">
                <h3 className="mb-2 text-xs font-semibold text-muted-foreground">Learning</h3>
                <ul className="grid gap-1">
                  <MobileSidebarItem
                    href="/dashboard"
                    icon={<span className="text-lg">📊</span>}
                    onClose={handleClose}
                  >
                    Overview
                  </MobileSidebarItem>
                  <MobileSidebarItem
                    href="/dashboard/my-courses"
                    icon={<span className="text-lg">📚</span>}
                    onClose={handleClose}
                  >
                    My Courses
                  </MobileSidebarItem>
                  <MobileSidebarItem
                    href="/dashboard/schedule"
                    icon={<span className="text-lg">📅</span>}
                    onClose={handleClose}
                  >
                    Schedule
                  </MobileSidebarItem>
                </ul>
              </div>

              {isAdmin && (
                <div className="py-2">
                  <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
                    Admin
                  </h3>
                  <ul className="grid gap-1">
                    <MobileSidebarItem
                      href="/dashboard/manage-courses"
                      icon={<span className="text-lg">🔧</span>}
                      onClose={handleClose}
                    >
                      Manage Courses
                    </MobileSidebarItem>
                    <MobileSidebarItem
                      href="/dashboard/users"
                      icon={<span className="text-lg">👥</span>}
                      onClose={handleClose}
                    >
                      Users
                    </MobileSidebarItem>
                    <MobileSidebarItem
                      href="/dashboard/analytics"
                      icon={<span className="text-lg">📈</span>}
                      onClose={handleClose}
                    >
                      Analytics
                    </MobileSidebarItem>
                  </ul>
                </div>
              )}

              <div className="py-2">
                <h3 className="mb-2 text-xs font-semibold text-muted-foreground">Account</h3>
                <ul className="grid gap-1">
                  <MobileSidebarItem
                    href="/dashboard/profile"
                    icon={<span className="text-lg">👤</span>}
                    onClose={handleClose}
                  >
                    Profile
                  </MobileSidebarItem>
                  <MobileSidebarItem
                    href="/dashboard/settings"
                    icon={<span className="text-lg">⚙️</span>}
                    onClose={handleClose}
                  >
                    Settings
                  </MobileSidebarItem>
                </ul>
              </div>
            </nav>
          </div>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full" onClick={handleClose} asChild>
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
