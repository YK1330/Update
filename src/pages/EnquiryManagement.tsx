import React, { useState, useMemo, useEffect } from "react";
import { getEnquiries, updateEnquiry, addEnquiryNote, getCounselors, getUserById, COURSES, STATUS_COLORS, STATUS_LABELS, type Enquiry, type EnquiryStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, StickyNote, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "follow-up", "converted", "rejected"];
const PER_PAGE = 6;

// Generate unique note ID
function generateNoteId(): string {
  return `n${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState(getEnquiries);
  const [search, setSearch] = useState("");
  // separate controlled input to debounce updates to `search` used for filtering
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();
  const counselors = getCounselors();

  const filtered = useMemo(() => {
    let result = enquiries;
    if (filterStatus !== "all") result = result.filter(e => e.status === filterStatus);
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(e => e.studentName.toLowerCase().includes(s) || e.email.toLowerCase().includes(s));
    }
    return result;
  }, [enquiries, filterStatus, search]);

  // Debounce search input to avoid expensive re-filtering on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 200);
    return () => clearTimeout(t);
  }, [searchInput]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const refresh = () => setEnquiries([...getEnquiries()]);

  const [statusDialog, setStatusDialog] = useState<{ id: string, status: EnquiryStatus } | null>(null);
  const [statusComment, setStatusComment] = useState("");

  const handleStatusChange = (id: string, status: EnquiryStatus) => {
    setStatusDialog({ id, status });
  };

  const confirmStatusChange = async () => {
    if (!statusDialog) return;
    try {
      await updateEnquiry(statusDialog.id, { status: statusDialog.status });
      const noteText = statusComment.trim()
        ? `Status updated to ${STATUS_LABELS[statusDialog.status]}: ${statusComment.trim()}`
        : `Status updated to ${STATUS_LABELS[statusDialog.status]}`;

      await addEnquiryNote(statusDialog.id, { text: noteText, author: "Admin", createdAt: new Date().toISOString() });

      setStatusDialog(null);
      setStatusComment("");
      refresh();
      toast({ title: "Status Updated" });
    } catch (err) {
      console.error(err);
      toast({ title: "Update failed", description: "Could not update status", variant: "destructive" });
    }
  };

  const handleAssign = async (id: string, counselorId: string) => {
    try {
      await updateEnquiry(id, { assignedTo: counselorId });
      refresh();
      toast({ title: "Counselor Assigned" });
    } catch (err) {
      console.error(err);
      toast({ title: "Assign failed", description: "Could not assign counselor", variant: "destructive" });
    }
  };

  const handleAddNote = async () => {
    if (!selected || !noteText.trim()) return;
    const enq = getEnquiries().find(e => e.id === selected.id);
    if (!enq) return;
    const newNote = { text: noteText.trim(), author: "Admin", createdAt: new Date().toISOString() };
    try {
      await addEnquiryNote(selected.id, newNote);
      setNoteText("");
      refresh();
      setSelected(getEnquiries().find(e => e.id === selected.id) || null);
      toast({ title: "Note Added" });
    } catch (err) {
      console.error(err);
      toast({ title: "Add note failed", description: "Could not add note", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-9" value={searchInput} onChange={e => { setSearchInput(e.target.value); setPage(1); }} />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={v => { setFilterStatus(v); setPage(1); }}>
            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Assigned To</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(enq => {
                const counselor = enq.assignedTo ? getUserById(enq.assignedTo) : null;
                return (
                  <motion.tr key={enq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div>
                        <span className="font-medium text-foreground">{enq.studentName}</span>
                        <div className="text-xs text-muted-foreground">{enq.email}</div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{COURSES.find(c => c.id === enq.courseId)?.name}</td>
                    <td className="p-3">
                      <Select value={enq.status} onValueChange={v => handleStatusChange(enq.id, v as EnquiryStatus)}>
                        <SelectTrigger className="h-7 text-xs w-[120px]">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[enq.status]}`}>{STATUS_LABELS[enq.status]}</span>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <Select value={enq.assignedTo || ""} onValueChange={v => handleAssign(enq.id, v)}>
                        <SelectTrigger className="h-7 text-xs w-[130px]">
                          <SelectValue placeholder="Assign...">{counselor?.name || "Unassigned"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {counselors.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{new Date(enq.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm" onClick={() => setSelected(enq)}>
                        <StickyNote className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 border-t">
            <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* Notes Dialog */}
      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notes — {selected?.studentName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {selected?.notes.length === 0 && <p className="text-sm text-muted-foreground">No notes yet.</p>}
            {selected?.notes.map(n => (
              <div key={n.id} className="bg-muted rounded-lg p-3">
                <p className="text-sm text-foreground">{n.text}</p>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{n.author}</span>
                  <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea placeholder="Add a note..." value={noteText} onChange={e => setNoteText(e.target.value)} rows={2} className="flex-1" />
            <Button onClick={handleAddNote} size="sm" className="self-end gradient-primary text-primary-foreground">Add</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Status Dialog */}
      <Dialog open={!!statusDialog} onOpenChange={open => !open && setStatusDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a comment for this status change (optional).
            </p>
            <Textarea
              placeholder="Add a comment..."
              value={statusComment}
              onChange={e => setStatusComment(e.target.value)}
              rows={3}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setStatusDialog(null)}>Cancel</Button>
              <Button onClick={confirmStatusChange} className="gradient-primary text-primary-foreground">Update Status</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
