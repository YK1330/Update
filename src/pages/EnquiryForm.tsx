import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses, addEnquiry } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EnquiryForm() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("course") || "";
  const { toast } = useToast();

  // Use uncontrolled inputs (refs) for responsive typing; read values on submit
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [courseId, setCourseId] = useState<string>(preselected);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const phone = phoneRef.current?.value ?? "";
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required";
    if (!phone.trim() || !/^\d{10}$/.test(phone)) e.phone = "Valid 10-digit phone is required";
    if (!courseId) e.courseId = "Please select a course";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = "e" + Date.now();
    const enquiry = {
      id,
      studentName: (nameRef.current?.value ?? "").trim(),
      email: (emailRef.current?.value ?? "").trim(),
      phone: (phoneRef.current?.value ?? "").trim(),
      courseId,
      message: (messageRef.current?.value ?? "").trim(),
      status: "new" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
    };

    try {
      setSubmitting(true);
      await addEnquiry(enquiry);
      setSubmitted(true);
      toast({ title: "Enquiry Submitted!", description: "We'll get back to you soon." });
    } catch (err) {
      console.error('Failed to submit enquiry', err);
      toast({ title: "Submission failed", description: "Could not save your enquiry — please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const Field = ({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );

  return (
    <div>
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-primary-foreground mb-3">
            Online Enquiry
          </motion.h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">Fill out the form below and our team will reach out to you shortly.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-success mx-auto mb-6" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Enquiry Submitted!</h2>
                <p className="text-muted-foreground mb-6">We've received your enquiry. A counselor will contact you within 24 hours.</p>
                <p className="text-sm text-muted-foreground">You can track your application status using your email on the <a href="/track" className="text-primary underline">Track Application</a> page.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-8 shadow-card border border-border/50 space-y-5"
              >
                <Field label="Full Name" name="name" error={errors.name}>
                  <Input id="name" placeholder="Your full name" ref={nameRef} defaultValue={""} />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <Input id="email" type="email" placeholder="you@example.com" ref={emailRef} defaultValue={""} />
                </Field>
                <Field label="Phone" name="phone" error={errors.phone}>
                  <Input id="phone" placeholder="10-digit phone number" ref={phoneRef} defaultValue={""} />
                </Field>
                <Field label="Course Interested" name="courseId" error={errors.courseId}>
                  <Select value={courseId} onValueChange={v => setCourseId(v)}>
                    <SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger>
                    <SelectContent>
                      {getCourses().map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Message (optional)" name="message">
                  <Textarea id="message" placeholder="Any specific questions..." rows={3} ref={messageRef} defaultValue={""} />
                </Field>
                <Button type="submit" disabled={submitting} className="w-full gradient-primary text-primary-foreground font-semibold" size="lg">
                  {submitting ? 'Submitting...' : 'Submit Enquiry'} <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
