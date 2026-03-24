import { useEffect, useState, useMemo } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Task } from "@/types/task";
import { TrendingUp, Calendar, Search, Trash2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewTaskDialog from "@/components/NewTaskDialog";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
      setTasks(data);
    });
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      return true;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const completed = tasks.filter((t) => t.status === "done").length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const upcoming = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const now = new Date();
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  const toggleStatus = async (task: Task) => {
    const next = task.status === "done" ? "todo" : "done";
    await updateDoc(doc(db, "tasks", task.id), { status: next });
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const priorityColor = (p: string) => {
    if (p === "high") return "bg-destructive/20 text-destructive";
    if (p === "medium") return "bg-warning/20 text-warning";
    return "bg-info/20 text-info";
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Progress</span>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-3xl font-bold">{progress}% <span className="text-sm font-normal text-muted-foreground">completed</span></p>
          <div className="mt-3 h-1.5 rounded-full bg-secondary">
            <div className="h-full rounded-full bg-muted-foreground transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Streak</span>
            <TrendingUp className="w-4 h-4 text-warning" />
          </div>
          <p className="text-3xl font-bold">{completed} <span className="text-sm font-normal text-muted-foreground">tasks done</span></p>
          <p className="text-xs text-muted-foreground mt-2">Keep it up! You're on fire.</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Upcoming</span>
            <Calendar className="w-4 h-4 text-info" />
          </div>
          <p className="text-3xl font-bold">{upcoming} <span className="text-sm font-normal text-muted-foreground">due soon</span></p>
          <p className="text-xs text-muted-foreground mt-2">Focus on what matters most.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-input border-border" />
        </div>
        <div className="flex gap-3 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-input border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px] bg-input border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <NewTaskDialog />
        </div>
      </div>

      {/* Task List */}
      <div className="glass-card p-6 min-h-[200px]">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No tasks found. Time to relax or create one!</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((task) => (
              <div key={task.id} className={`flex items-center gap-4 p-4 rounded-lg border border-border/50 transition-all hover:border-border ${task.status === "done" ? "opacity-60" : ""}`}>
                <button onClick={() => toggleStatus(task)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.status === "done" ? "border-success bg-success" : "border-muted-foreground hover:border-foreground"}`}>
                  {task.status === "done" && <Check className="w-3 h-3 text-background" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${task.status === "done" ? "line-through" : ""}`}>{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground truncate mt-0.5">{task.description}</p>}
                </div>
                <Badge variant="secondary" className={`text-xs ${priorityColor(task.priority)}`}>{task.priority}</Badge>
                {task.dueDate && <span className="text-xs text-muted-foreground hidden sm:inline">{task.dueDate}</span>}
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-destructive flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
