import { useState } from "react";
import { getEnquiriesByEmail, COURSES, STATUS_COLORS, STATUS_LABELS, type Enquiry } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Circle, Clock, XCircle, PhoneCall } from "lucide-react";

const TIMELINE_ICONS: Record<string, typeof Circle> = {
  new: Circle,
  contacted: PhoneCall,
  "follow-up": Clock,
  converted: CheckCircle2,
  rejected: XCircle,
};

const TIMELINE_ORDER = ["new", "contacted", "follow-up", "converted"];

export default function TrackApplication() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<Enquiry[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setResults(getEnquiriesByEmail(email.trim()));
  };

  return (
    <div>
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-primary-foreground mb-3">
            Track Your Application
          </motion.h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">Enter your email to check the status of your enquiry.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-xl">
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <Input placeholder="Enter your email address" type="email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1" />
            <Button type="submit" className="gradient-primary text-primary-foreground"><Search className="h-4 w-4 mr-1" /> Search</Button>
          </form>

          <AnimatePresence mode="wait">
            {results !== null && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {results.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium mb-1">No enquiries found</p>
                    <p className="text-sm">Please check your email or submit a new enquiry.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {results.map(enq => {
                      const course = COURSES.find(c => c.id === enq.courseId);
                      const currentIdx = enq.status === "rejected" ? -1 : TIMELINE_ORDER.indexOf(enq.status);

                      return (
                        <div key={enq.id} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-foreground">{course?.name || "Unknown Course"}</h3>
                              <p className="text-xs text-muted-foreground">Submitted: {new Date(enq.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[enq.status]}`}>
                              {STATUS_LABELS[enq.status]}
                            </span>
                          </div>

                          {/* Timeline */}
                          {enq.status !== "rejected" ? (
                            <div className="flex items-center gap-0 mt-4">
                              {TIMELINE_ORDER.map((step, i) => {
                                const Icon = TIMELINE_ICONS[step];
                                const isActive = i <= currentIdx;
                                return (
                                  <div key={step} className="flex items-center flex-1">
                                    <div className={`flex flex-col items-center`}>
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isActive ? "gradient-primary" : "bg-muted"}`}>
                                        <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                      </div>
                                      <span className={`text-xs mt-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>{STATUS_LABELS[step as keyof typeof STATUS_LABELS]}</span>
                                    </div>
                                    {i < TIMELINE_ORDER.length - 1 && (
                                      <div className={`flex-1 h-0.5 mx-1 ${i < currentIdx ? "bg-primary" : "bg-muted"}`} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-4 text-destructive text-sm">
                              <XCircle className="h-4 w-4" /> Application was not accepted.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
