import { useState } from "react";
import { getCounselors, addUser, updateUser, deleteUser, getEnquiries, type User } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function CounselorManagement() {
  const [counselors, setCounselors] = useState(getCounselors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const { toast } = useToast();
  const enquiries = getEnquiries();

  const refresh = () => setCounselors([...getCounselors()]);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", password: "" });
    setDialogOpen(true);
  };

  const openEdit = (c: User) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, password: "" });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Error", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    if (editing) {
      updateUser(editing.id, { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), ...(form.password ? { password: form.password } : {}) });
      toast({ title: "Counselor Updated" });
    } else {
      addUser({ id: "u" + Date.now(), name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), password: form.password || "counselor123", role: "counselor" });
      toast({ title: "Counselor Added" });
    }
    setDialogOpen(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    refresh();
    toast({ title: "Counselor Removed" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">Counselors ({counselors.length})</h2>
        <Button onClick={openNew} className="gradient-primary text-primary-foreground" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Counselor
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {counselors.map((c, i) => {
          const assigned = enquiries.filter(e => e.assignedTo === c.id).length;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border/50"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{c.name.charAt(0)}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.email}</p>
              <p className="text-xs text-muted-foreground">{c.phone}</p>
              <div className="mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Assigned Leads: </span>
                <span className="text-sm font-semibold text-primary">{assigned}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Counselor" : "Add Counselor"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            <div><Label>Password {editing && "(leave empty to keep)"}</Label><Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} /></div>
            <Button onClick={handleSave} className="w-full gradient-primary text-primary-foreground">
              {editing ? "Update" : "Add"} Counselor
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
