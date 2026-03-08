import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, IndianRupee, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = getCourses().find(c => c.id === id);

  if (!course) return (
    <div className="container py-20 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-4">Course not found</h2>
      <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
    </div>
  );

  return (
    <div>
      <section className="gradient-hero py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-0.5 rounded-full">{course.department}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mt-3">{course.name}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">About the Program</h2>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Syllabus Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.syllabus.map(s => (
                    <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Eligibility</h2>
                <p className="text-muted-foreground">{course.eligibility}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-4">
                <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Duration:</span><span className="font-medium text-foreground">{course.duration}</span></div>
                <div className="flex items-center gap-2 text-sm"><IndianRupee className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Fees:</span><span className="font-medium text-foreground">{course.fees}</span></div>
                <div className="flex items-center gap-2 text-sm"><GraduationCap className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Seats:</span><span className="font-medium text-foreground">{course.seats}</span></div>
                <Link to={`/enquiry?course=${course.id}`}>
                  <Button className="w-full gradient-primary text-primary-foreground mt-2">Enquire Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
