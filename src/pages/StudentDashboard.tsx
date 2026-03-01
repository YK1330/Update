import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getEnquiriesByEmail, getNotifications, markNotificationRead, COURSES, STATUS_COLORS, STATUS_LABELS, type Enquiry, type Notification } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Bell, User, FileText, LogOut } from "lucide-react";
import { logout } from "@/lib/data";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tab, setTab] = useState<"enquiries" | "notifications" | "profile">("enquiries");

  useEffect(() => {
    if (!user || user.role !== "student") { navigate("/student/login"); return; }
    setEnquiries(getEnquiriesByEmail(user.email));
    setNotifications(getNotifications(user.id));
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => { logout(); navigate("/student/login"); };

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-[80vh] py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-sm text-muted-foreground">Your student dashboard</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {([
            { key: "enquiries", label: "My Enquiries", icon: FileText },
            { key: "notifications", label: `Notifications${unread ? ` (${unread})` : ""}`, icon: Bell },
            { key: "profile", label: "Profile", icon: User },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${tab === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "enquiries" && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No enquiries found.</div>
            ) : enquiries.map(enq => {
              const course = COURSES.find(c => c.id === enq.courseId);
              return (
                <motion.div key={enq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl p-5 shadow-card border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{course?.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Submitted: {new Date(enq.createdAt).toLocaleDateString()}</p>
                      {enq.message && <p className="text-sm text-muted-foreground mt-2">"{enq.message}"</p>}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[enq.status]}`}>
                      {STATUS_LABELS[enq.status]}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {tab === "notifications" && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No notifications.</div>
            ) : notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  // Refresh notifications after marking as read
                  setTimeout(() => setNotifications(getNotifications(user.id)), 100);
                }}
                className={`bg-card rounded-xl p-4 shadow-card border cursor-pointer transition-colors ${n.read ? "border-border/50" : "border-primary/30 bg-primary/5"}`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm text-foreground">{n.title}</h4>
                  <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 max-w-md">
            <div className="space-y-3">
              <div><span className="text-xs text-muted-foreground">Name</span><p className="font-medium text-foreground">{user.name}</p></div>
              <div><span className="text-xs text-muted-foreground">Email</span><p className="font-medium text-foreground">{user.email}</p></div>
              <div><span className="text-xs text-muted-foreground">Phone</span><p className="font-medium text-foreground">{user.phone}</p></div>
              <div><span className="text-xs text-muted-foreground">Role</span><p className="font-medium text-foreground capitalize">{user.role}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
