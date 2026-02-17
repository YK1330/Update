import { getEnquiries, getStats, COURSES, STATUS_LABELS, type EnquiryStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const enquiries = getEnquiries();
  const stats = getStats();
  const { toast } = useToast();

  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const monthMap: Record<string, number> = { Sep: 8, Oct: 9, Nov: 10, Dec: 11, Jan: 0, Feb: 1 };

  const monthlyData = months.map(m => {
    const total = enquiries.filter(e => new Date(e.createdAt).getMonth() === monthMap[m]).length;
    const converted = enquiries.filter(e => new Date(e.createdAt).getMonth() === monthMap[m] && e.status === "converted").length;
    return { month: m, total, converted, rate: total > 0 ? Math.round((converted / total) * 100) : 0 };
  });

  // Course breakdown
  const courseBreakdown = COURSES.map(c => {
    const courseEnqs = enquiries.filter(e => e.courseId === c.id);
    return {
      course: c.name.substring(0, 18),
      total: courseEnqs.length,
      converted: courseEnqs.filter(e => e.status === "converted").length,
    };
  }).filter(d => d.total > 0);

  const conversionRate = stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Phone", "Course", "Status", "Date"],
      ...enquiries.map(e => [
        e.studentName, e.email, e.phone,
        COURSES.find(c => c.id === e.courseId)?.name || "",
        STATUS_LABELS[e.status],
        new Date(e.createdAt).toLocaleDateString(),
      ]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries_report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report Exported", description: "CSV file downloaded." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">Reports & Analytics</h2>
        <Button onClick={handleExport} variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Enquiries", value: stats.total },
          { label: "Conversions", value: stats.converted },
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Pending", value: stats.new + stats.contacted + stats.followUp },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border/50 text-center"
          >
            <div className="text-2xl font-bold text-foreground">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="hsl(217,72%,50%)" strokeWidth={2} dot={{ fill: "hsl(217,72%,50%)" }} />
              <Line type="monotone" dataKey="converted" stroke="hsl(152,60%,42%)" strokeWidth={2} dot={{ fill: "hsl(152,60%,42%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Course-wise Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={courseBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="course" tick={{ fontSize: 11 }} width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="hsl(217,72%,50%)" radius={[0, 4, 4, 0]} name="Total" />
              <Bar dataKey="converted" fill="hsl(152,60%,42%)" radius={[0, 4, 4, 0]} name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
