import React, { useState } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse, type Course } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function AdminCourses() {
    const [courses, setCourses] = useState(getCourses());
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    // Separate states for the form
    const [formData, setFormData] = useState<Partial<Course>>({});
    const [syllabusText, setSyllabusText] = useState("");
    const { toast } = useToast();

    const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase())
    );

    const refresh = () => setCourses([...getCourses()]);

    const handleOpenDialog = (course?: Course) => {
        if (course) {
            setEditingCourse(course);
            setFormData(course);
            setSyllabusText(course.syllabus ? course.syllabus.join("\n") : "");
        } else {
            setEditingCourse(null);
            setFormData({
                name: "",
                department: "",
                duration: "",
                fees: "",
                eligibility: "",
                description: "",
                seats: 0,
            });
            setSyllabusText("");
        }
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.department || !formData.description) {
            toast({ title: "Validation Error", description: "Name, Department, and Description are required", variant: "destructive" });
            return;
        }

        const syllabus = syllabusText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const updatedData: Course = {
            ...formData as Course,
            syllabus,
            seats: Number(formData.seats) || 0,
            id: editingCourse ? editingCourse.id : `c${Date.now()}`
        };

        try {
            if (editingCourse) {
                await updateCourse(updatedData.id, updatedData);
                toast({ title: "Course Updated", description: "The course has been updated successfully." });
            } else {
                await addCourse(updatedData);
                toast({ title: "Course Created", description: "The new course has been created successfully." });
            }
            refresh();
            setDialogOpen(false);
        } catch (err) {
            toast({ title: "Error", description: "There was a problem saving the course.", variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course? This might delete associated enquiries.")) return;
        try {
            await deleteCourse(id);
            refresh();
            toast({ title: "Course Deleted" });
        } catch (err) {
            toast({ title: "Delete Failed", description: "Could not delete course.", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <Button onClick={() => handleOpenDialog()} className="gradient-primary text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" /> Add Course
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(course => (
                    <motion.div key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden flex flex-col">
                        <div className="h-2 gradient-primary" />
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{course.department}</span>
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-1">{course.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{course.description}</p>

                            <div className="text-xs text-muted-foreground mb-4 space-y-1">
                                <p><strong>Duration:</strong> {course.duration}</p>
                                <p><strong>Fees:</strong> {course.fees}</p>
                                <p><strong>Seats:</strong> {course.seats}</p>
                            </div>

                            <div className="flex gap-2 justify-end mt-auto pt-4 border-t border-border/50">
                                <Button variant="outline" size="sm" onClick={() => handleOpenDialog(course)}>
                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(course.id)}>
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {filtered.length === 0 && (
                    <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
                        No courses found.
                    </div>
                )}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. B.Tech Computer Science" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Department</label>
                            <Input value={formData.department || ''} onChange={e => setFormData({ ...formData, department: e.target.value })} placeholder="e.g. Engineering" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Duration</label>
                            <Input value={formData.duration || ''} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 4 Years" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fees</label>
                            <Input value={formData.fees || ''} onChange={e => setFormData({ ...formData, fees: e.target.value })} placeholder="e.g. ₹1,20,000/year" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Seats</label>
                            <Input type="number" value={formData.seats || 0} onChange={e => setFormData({ ...formData, seats: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Eligibility</label>
                            <Input value={formData.eligibility || ''} onChange={e => setFormData({ ...formData, eligibility: e.target.value })} placeholder="e.g. 10+2 with PCM" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium">Syllabus (One item per line)</label>
                            <Textarea value={syllabusText} onChange={e => setSyllabusText(e.target.value)} rows={5} placeholder="Data Structures & Algorithms&#10;Operating Systems&#10;..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="gradient-primary text-primary-foreground">Save Course</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
