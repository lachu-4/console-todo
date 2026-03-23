import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const NewTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        status: "todo",
        priority,
        dueDate: dueDate || null,
        createdAt: Date.now(),
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setOpen(false);
    } catch (e) {
      console.error("Error adding task:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input placeholder="Task title..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-input border-border" />
          <Textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-input border-border" />
          <div className="flex gap-3">
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-input border-border" />
          </div>
          <Button onClick={handleSubmit} disabled={loading || !title.trim()} className="w-full">
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
