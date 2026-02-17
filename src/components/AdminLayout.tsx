import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Users, BarChart3, LogOut, GraduationCap, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { getCurrentUser, logout } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ADMIN_LINKS = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  { label: "Counselors", path: "/admin/counselors", icon: Users },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (!user || (user.role !== "admin" && user.role !== "counselor")) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-y-0 left-0 z-40 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-sidebar-primary-foreground truncate">BrightFuture</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {ADMIN_LINKS.map(l => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <l.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{l.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User + collapse */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          {!collapsed && (
            <div className="px-2 py-1">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && "Logout"}
          </Button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.div
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2 }}
        className="flex-1 min-h-screen"
      >
        <header className="h-16 bg-card border-b flex items-center px-6">
          <h2 className="font-semibold text-lg text-foreground">
            {ADMIN_LINKS.find(l => l.path === location.pathname)?.label || "Admin Panel"}
          </h2>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}
