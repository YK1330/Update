import { getStats, getEnquiries, getCourses } from "@/lib/data";
import { MessageSquare, UserCheck, Clock, XCircle, TrendingUp, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["hsl(199,89%,48%)", "hsl(217,72%,50%)", "hsl(38,92%,50%)", "hsl(152,60%,42%)", "hsl(0,72%,51%)"];

export default function AdminDashboard() {
  const stats = getStats();
  const enquiries = getEnquiries();

  const STAT_CARDS = [
    { label: "Total Enquiries", value: stats.total, icon: MessageSquare, color: "text-primary" },
    { label: "New", value: stats.new, icon: Clock, color: "text-info" },
    { label: "Contacted", value: stats.contacted, icon: PhoneCall, color: "text-primary" },
    { label: "Follow-ups", value: stats.followUp, icon: TrendingUp, color: "text-warning" },
    { label: "Converted", value: stats.converted, icon: UserCheck, color: "text-success" },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-destructive" },
  ];

  // Monthly data
  const months = ["Nov", "Dec", "Jan", "Feb"];
  const monthlyData = months.map(m => {
    const monthMap: Record<string, number> = { Nov: 10, Dec: 11, Jan: 0, Feb: 1 };
    const count = enquiries.filter(e => new Date(e.createdAt).getMonth() === monthMap[m]).length;
    return { month: m, enquiries: count };
  });

  // Course distribution
  const courseData = getCourses().map(c => ({
    name: c.name.replace(/^(B\.Tech |B\.Sc |B\.Com |MBA|BBA)/, "$1").substring(0, 15),
    value: enquiries.filter(e => e.courseId === c.id).length,
  })).filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card border border-border/50"
          >
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Monthly Enquiries</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="enquiries" fill="hsl(217,72%,50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Enquiries by Course</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={courseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {courseData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent enquiries */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Recent Enquiries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 font-medium text-muted-foreground">Name</th>
                <th className="pb-2 font-medium text-muted-foreground">Course</th>
                <th className="pb-2 font-medium text-muted-foreground">Status</th>
                <th className="pb-2 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.slice(0, 5).map(e => (
                <tr key={e.id} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{e.studentName}</td>
                  <td className="py-2.5 text-muted-foreground">{getCourses().find(c => c.id === e.courseId)?.name}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.status === "new" ? "bg-info/10 text-info" :
                        e.status === "contacted" ? "bg-primary/10 text-primary" :
                          e.status === "follow-up" ? "bg-warning/10 text-warning" :
                            e.status === "converted" ? "bg-success/10 text-success" :
                              "bg-destructive/10 text-destructive"
                      }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{new Date(e.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
