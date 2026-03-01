import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user && user.role === "student") {
      navigate("/student/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials or not a student account.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Student Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Access your student portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="student@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
            <LogIn className="h-4 w-4 mr-2" /> Sign In
          </Button>
        </form>

        <div className="flex flex-col gap-2 mt-4 text-center text-sm text-muted-foreground">
          <p>Don't have an account? <Link to="/student/register" className="text-primary hover:underline">Register here</Link></p>
          <p><Link to="/admin/login" className="text-primary hover:underline">Admin Login →</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
