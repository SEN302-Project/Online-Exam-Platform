import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, CalendarClock, ScanFace, MonitorCheck, Radio, TrendingUp, BookOpen, HelpCircle, Sparkles,
  Search, Calendar, Clock, Award, ChevronRight, Download,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ProgressBar from "../../components/dashboard/ProgressBar";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "2" },
      { to: "/student/practice", label: "Practice mode", icon: Sparkles },
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

const mockHistory = [
  { id: "1", examTitle: "Software Construction Final", course: "SEN 306", score: 78, totalPoints: 100, completedAt: "May 15, 2026", timeTaken: "1h 22m", passed: true, rank: 14 },
  { id: "2", examTitle: "Data Structures Quiz 3", course: "CSC 203", score: 88, totalPoints: 100, completedAt: "May 10, 2026", timeTaken: "39m", passed: true, rank: 7 },
  { id: "3", examTitle: "Discrete Math Test", course: "MTH 211", score: 72, totalPoints: 100, completedAt: "May 8, 2026", timeTaken: "33m", passed: true, rank: 22 },
  { id: "4", examTitle: "Web Development Practical", course: "CSC 305", score: 92, totalPoints: 100, completedAt: "May 3, 2026", timeTaken: "45m", passed: true, rank: 4 },
  { id: "5", examTitle: "Business Ethics Essay", course: "ENT 312", score: 55, totalPoints: 100, completedAt: "Apr 28, 2026", timeTaken: "1h 00m", passed: false, rank: 41 },
  { id: "6", examTitle: "Linear Algebra Mid-term", course: "MTH 211", score: 81, totalPoints: 100, completedAt: "Apr 20, 2026", timeTaken: "55m", passed: true, rank: 11 },
];

export default function ExamHistory() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockHistory.filter((r) => {
    const matchSearch =
      r.examTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.course.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "passed" && r.passed) ||
      (filter === "failed" && !r.passed);
    return matchSearch && matchFilter;
  });

  const avgScore = Math.round(mockHistory.reduce((s, r) => s + r.score, 0) / mockHistory.length);
  const passedCount = mockHistory.filter((r) => r.passed).length;

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Results & feedback</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">All your completed examinations and performance history.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatCard label="Total exams" value={mockHistory.length} />
            <StatCard label="Average score" value={`${avgScore}%`} />
            <StatCard label="Passed" value={`${passedCount} / ${mockHistory.length}`} />
            <StatCard label="Best rank" value="#4" />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exam title or course..."
                className="input pl-10"
              />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input max-w-[160px]">
              <option value="all">All results</option>
              <option value="passed">Passed only</option>
              <option value="failed">Failed only</option>
            </select>
            <button className="btn-secondary">
              <Download size={15} /> Export
            </button>
          </div>

          <div className="card overflow-hidden">
            {filtered.map((result, i) => (
              <button
                key={result.id}
                onClick={() => navigate(`/student/results/${result.id}`)}
                className={`w-full p-4 sm:p-5 hover:bg-ink-50 transition text-left flex items-center gap-3 sm:gap-4 ${
                  i < filtered.length - 1 ? "border-b border-ink-100" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-ink-500">{result.course}</span>
                    <span className={`badge ${result.passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                      {result.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink-900 truncate text-sm sm:text-base">{result.examTitle}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-500 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar size={11} />{result.completedAt}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{result.timeTaken}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Award size={11} />Rank #{result.rank}</span>
                  </div>
                </div>

                <div className="hidden sm:block flex-1 max-w-[200px]">
                  <ProgressBar value={result.score} />
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-ink-900">{result.score}<span className="text-ink-400 text-sm">%</span></div>
                </div>

                <ChevronRight size={18} className="text-ink-400 shrink-0" />
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="p-12 text-center text-ink-400">No exam results match your filters.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}