import { motion } from "framer-motion";
import { Target, Eye, Building2, FlaskConical, BookOpen, Wifi } from "lucide-react";
import heroImage from "@/assets/hero-college.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const INFRA = [
  { icon: Building2, title: "Smart Classrooms", desc: "AC rooms with projectors and digital boards" },
  { icon: FlaskConical, title: "Research Labs", desc: "State-of-the-art labs for every department" },
  { icon: BookOpen, title: "Central Library", desc: "50,000+ books, journals, and e-resources" },
  { icon: Wifi, title: "Wi-Fi Campus", desc: "High-speed internet across the entire campus" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={heroImage} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-primary-foreground"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Established in 1995, BrightFuture College has been at the forefront of quality education for over three decades. Located in the heart of Knowledge City, our campus spans 50 acres of lush greenery equipped with modern infrastructure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We offer a diverse portfolio of undergraduate and postgraduate programs across Engineering, Management, Health Sciences, and Commerce. Our faculty comprises industry veterans and accomplished researchers committed to nurturing the next generation of leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-8 shadow-card">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To be a globally recognized institution that produces innovative thinkers and responsible citizens who contribute meaningfully to society.
              </p>
            </motion.div>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-8 shadow-card">
              <div className="h-12 w-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To provide holistic education through innovative teaching, cutting-edge research, and strong industry partnerships, empowering students to achieve their fullest potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Campus Infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INFRA.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card rounded-xl p-5 shadow-card text-center hover:shadow-card-hover transition-shadow"
              >
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
