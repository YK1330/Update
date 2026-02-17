import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user && (user.role === "admin" || user.role === "counselor")) {
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials or insufficient access.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-foreground flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-background" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage enquiries</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@college.edu" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold">
            <LogIn className="h-4 w-4 mr-2" /> Sign In
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Demo: admin@college.edu / admin123
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link to="/student/login" className="text-primary hover:underline">← Student Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
