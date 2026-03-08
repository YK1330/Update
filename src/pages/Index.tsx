import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/data";
import { GraduationCap, Users, Award, BookOpen, ArrowRight, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-college.jpg";

const STATS = [
  { icon: Users, label: "Students", value: "5,000+" },
  { icon: GraduationCap, label: "Graduates", value: "15,000+" },
  { icon: Award, label: "Awards", value: "50+" },
  { icon: BookOpen, label: "Courses", value: "25+" },
];

const TESTIMONIALS = [
  { name: "Aisha Khan", course: "B.Tech CS '24", text: "The placement cell helped me land a job at a top MNC. The faculty support was incredible throughout.", rating: 5 },
  { name: "Rajesh Menon", course: "MBA '23", text: "The case-study approach and industry visits gave me real-world exposure that set me apart.", rating: 5 },
  { name: "Sneha Reddy", course: "B.Sc Nursing '24", text: "Clinical rotations in top hospitals gave me the confidence to excel in my career.", rating: 4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="College campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>
        <div className="container relative z-10 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
              Admissions Open 2026-27
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Shape Your Future at <span className="text-accent">BrightFuture</span> College
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
              A premier institution offering world-class education with state-of-the-art infrastructure, expert faculty, and 95% placement rate.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/enquiry">
                <Button size="lg" className="gradient-primary text-primary-foreground font-semibold px-8 shadow-lg hover:shadow-xl transition-shadow">
                  Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card rounded-xl p-5 shadow-card text-center"
              >
                <s.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Popular Courses</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Choose from our wide range of programs designed to launch your career.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {getCourses().slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link to={`/courses/${course.id}`} className="block group">
                  <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-border/50">
                    <div className="h-2 w-16 rounded-full gradient-primary mb-4" />
                    <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{course.department} • {course.duration}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-semibold">{course.fees}</span>
                      <span className="text-sm text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Learn More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/courses"><Button variant="outline">View All Courses</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 shadow-card"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <p className="text-muted-foreground text-sm mb-4">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className={`h-4 w-4 ${si < t.rating ? "text-accent fill-accent" : "text-muted"}`} />
                  ))}
                </div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.course}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">Take the first step towards a brighter future. Apply now or reach out to our admission counselors.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/enquiry">
                <Button size="lg" className="bg-accent text-accent-foreground font-semibold px-8 hover:bg-accent/90">
                  Apply Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
