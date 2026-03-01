import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function StudentRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerStudent({ name, email, phone, password, role: "student" });
            toast({ title: "Registration Successful", description: "You can now log in with your credentials." });
            navigate("/student/login");
        } catch (err: any) {
            toast({ title: "Registration Failed", description: err.message, variant: "destructive" });
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                    <p className="text-sm text-muted-foreground mt-1">Register for your student portal</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required placeholder="student@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" required placeholder="1234567890" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
                        <UserPlus className="h-4 w-4 mr-2" /> Register
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account? <Link to="/student/login" className="text-primary hover:underline">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
}
