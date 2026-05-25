import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  CalendarClock,
  ScanFace,
  MonitorCheck,
  Radio,
  TrendingUp,
  BookOpen,
  HelpCircle,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  FileText,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "5" },
      { to: "/student/identity", label: "Identity verification", icon: ScanFace },
      { to: "/student/system-check", label: "System check", icon: MonitorCheck },
      { to: "/student/live", label: "Live exam", icon: Radio },
      { to: "/student/history", label: "Results & feedback", icon: TrendingUp },
    ],
  },
  {
    section: "REFERENCE",
    items: [
      { to: "/student/honor-policy", label: "Honor policy", icon: BookOpen },
      { to: "/student/help", label: "Help center", icon: HelpCircle },
    ],
  },
];

const mockExams = [
  { id: "1", course: "SEN 306", title: "Software Construction Final", date: "May 20", time: "10:00 AM", durationMin: 90, questionCount: 40, type: "Mixed", instructor: "Dr. Williams", isToday: true },
  { id: "2", course: "ENT 312", title: "Business Enterprise Mid-term", date: "May 22", time: "2:00 PM", durationMin: 60, questionCount: 25, type: "MCQ", instructor: "Prof. Adekunle" },
  { id: "3", course: "CSC 305", title: "Web Development Practical", date: "May 25", time: "9:00 AM", durationMin: 120, questionCount: 5, type: "Coding", instructor: "Dr. Chen" },
  { id: "4", course: "MTH 211", title: "Linear Algebra Quiz", date: "May 28", time: "11:00 AM", durationMin: 45, questionCount: 20, type: "MCQ", instructor: "Prof. Olamide" },
  { id: "5", course: "PHL 120", title: "Ethics Final Essay", date: "Jun 02", time: "3:00 PM", durationMin: 180, questionCount: 3, type: "Essay", instructor: "Dr. Bello" },
];

export default function UpcomingExams() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockExams.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || e.type.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-4xl font-semibold text-ink-900">Upcoming exams</h1>
            <p className="mt-1.5 text-ink-500">{mockExams.length} exams scheduled. Plan ahead and stay prepared.</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by exam or course..." className="input pl-10" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input max-w-[160px]">
              <option value="all">All types</option>
              <option value="mcq">MCQ</option>
              <option value="essay">Essay</option>
              <option value="mixed">Mixed</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <div className="space-y-3">
            {filtered.map((exam) => (
              <article key={exam.id} className="card p-5 flex items-center gap-5 hover:shadow-lg transition">
                <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${exam.isToday ? "bg-accent-600 text-white" : "bg-ink-100 text-ink-700"}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{exam.date.split(" ")[0].toUpperCase()}</div>
                  <div className="font-display text-2xl font-bold leading-none">{exam.date.split(" ")[1]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-ink-500">{exam.course}</span>
                    <span className="badge bg-ink-100 text-ink-600">{exam.type}</span>
                    {exam.isToday && <span className="badge bg-accent-100 text-accent-700">Today</span>}
                  </div>
                  <h3 className="font-semibold text-ink-900">{exam.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink-500 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar size={12} />{exam.date} · {exam.time}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{exam.durationMin} min</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><FileText size={12} />{exam.questionCount} questions</span>
                    <span>·</span>
                    <span>by {exam.instructor}</span>
                  </div>
                </div>
                {exam.isToday ? (
                  <button onClick={() => navigate(`/student/exam/${exam.id}`)} className="btn-primary shrink-0">Start exam <ArrowRight size={15} /></button>
                ) : (
                  <button onClick={() => navigate("/student/system-check")} className="btn-secondary shrink-0 !text-sm">
                    <MonitorCheck size={14} /> Run system check
                  </button>
                )}
              </article>
            ))}
            {filtered.length === 0 && <div className="text-center py-16 text-ink-400 card">No exams match your filters.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}