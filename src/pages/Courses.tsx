import { useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, getDepartments } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, IndianRupee, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function Courses() {
  const [dept, setDept] = useState("All");
  const courses = getCourses();
  const filtered = dept === "All" ? courses : courses.filter(c => c.department === dept);

  return (
    <div>
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-primary-foreground mb-3">
            Our Courses
          </motion.h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">Discover programs designed to prepare you for a successful career.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", ...getDepartments()].map(d => (
              <Button
                key={d}
                size="sm"
                variant={dept === d ? "default" : "outline"}
                onClick={() => setDept(d)}
                className={dept === d ? "gradient-primary text-primary-foreground" : ""}
              >
                {d}
              </Button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="bg-card rounded-xl border border-border/50 shadow-card hover:shadow-card-hover transition-all group overflow-hidden">
                  <div className="h-2 gradient-primary" />
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{course.department}</span>
                    <h3 className="font-bold text-lg text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                      <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{course.fees}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{course.seats} seats</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">Details <ArrowRight className="ml-1 h-3 w-3" /></Button>
                      </Link>
                      <Link to={`/enquiry?course=${course.id}`}>
                        <Button size="sm" className="gradient-primary text-primary-foreground">Apply</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
