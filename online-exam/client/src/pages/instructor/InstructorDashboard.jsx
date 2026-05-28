import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Plus, BookOpen, ScrollText, FileText, Users, AlertTriangle, BarChart3, HelpCircle,
  ArrowRight, ChevronRight, TrendingUp, CheckCircle2, Clock,
  FileEdit,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ScoreChart from "../../components/dashboard/ScoreChart";
import ProgressBar from "../../components/dashboard/ProgressBar";
import { useAuth } from "../../context/AuthContext";

const sidebarItems = [
  {
    section: "TEACHING",
    items: [
      { to: "/instructor", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/instructor/create-exam", label: "Create exam", icon: Plus },
      { to: "/instructor/drafts", label: "Drafts", icon: FileEdit, badge: "3" },
      { to: "/instructor/question-bank", label: "Question bank", icon: BookOpen },
      { to: "/instructor/grading/1", label: "Grading queue", icon: ScrollText, badge: "12" },
    ],
  },
  {
    section: "INSIGHTS",
    items: [
      { to: "/instructor/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/instructor/plagiarism/1", label: "Integrity reports", icon: AlertTriangle },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/instructor/help", label: "Help center", icon: HelpCircle }],
  },
];

const mockExams = [
  { id: "1", title: "Software Construction Final", course: "SEN 306", students: 87, submitted: 71, pending: 16, avgScore: 76, status: "active" },
  { id: "2", title: "Algorithms Mid-term", course: "CSC 204", students: 52, submitted: 52, pending: 0, avgScore: 81, status: "completed" },
  { id: "3", title: "Data Structures Quiz 3", course: "CSC 203", students: 94, submitted: 23, pending: 71, avgScore: null, status: "active" },
];

const scoreDistribution = [
  { label: "0-20", value: 1 }, { label: "21-40", value: 4 }, { label: "41-60", value: 12 },
  { label: "61-80", value: 34 }, { label: "81-100", value: 20 },
];

const mockActivity = [
  { type: "submission", who: "Alex M.", what: "submitted SEN 306 Final", time: "2m ago" },
  { type: "flag", who: "John P.", what: "flagged for review", time: "8m ago" },
  { type: "grade", who: "You", what: "graded 5 essays in CSC 204", time: "1h ago" },
  { type: "submission", who: "Maya R.", what: "submitted CSC 203 Quiz", time: "2h ago" },
];

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = user?.name?.split(" ").slice(0, 2).join(" ") || "Instructor";

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Instructor</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Welcome back, {firstName}.</h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">12 submissions are waiting for your review.</p>
            </div>
            <button onClick={() => navigate("/instructor/create-exam")} className="btn-primary">
              <Plus size={16} /> New exam
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <StatCard icon={FileText} label="Active exams" value="3" color="accent" />
            <StatCard icon={Users} label="Total students" value="233" color="ink" />
            <StatCard icon={ScrollText} label="Pending grading" value="12" color="warning" highlight />
            <StatCard icon={AlertTriangle} label="Integrity flags" value="4" color="danger" />
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6 sm:space-y-8">
              <section>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-4">Your exams</h2>
                <div className="card overflow-hidden">
                  {mockExams.map((exam, i) => (
                    <button
                      key={exam.id}
                      onClick={() => navigate(`/instructor/grading/${exam.id}`)}
                      className={`w-full p-4 sm:p-5 hover:bg-ink-50 transition text-left flex items-center gap-3 sm:gap-4 ${i < mockExams.length - 1 ? "border-b border-ink-100" : ""}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-xs font-semibold text-ink-500">{exam.course}</span>
                          <span className={`badge ${exam.status === "active" ? "bg-success/10 text-success" : "bg-ink-100 text-ink-600"}`}>
                            {exam.status === "active" ? "Live" : "Completed"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-ink-900 truncate text-sm sm:text-base">{exam.title}</h3>
                        <div className="mt-2 max-w-xs">
                          <ProgressBar value={exam.submitted} max={exam.students} showLabel={false} height="h-1.5" />
                          <div className="mt-1 text-xs text-ink-500">
                            {exam.submitted} / {exam.students} submitted
                            {exam.pending > 0 && <span className="text-warning"> • {exam.pending} pending</span>}
                          </div>
                        </div>
                      </div>
                      {exam.avgScore && (
                        <div className="text-right shrink-0 hidden sm:block">
                          <div className="font-mono text-2xl font-bold text-ink-900">{exam.avgScore}%</div>
                          <div className="text-[10px] uppercase tracking-wider text-ink-400">avg</div>
                        </div>
                      )}
                      <ChevronRight size={18} className="text-ink-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900">Latest exam distribution</h2>
                  <button
                    onClick={() => navigate("/instructor/analytics")}
                    className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1"
                  >
                    Full analytics <ArrowRight size={14} />
                  </button>
                </div>
                <ScoreChart data={scoreDistribution} title="Software Construction Final" />
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 self-start">
              <div className="card p-5">
                <h3 className="font-semibold text-ink-900 mb-1">Recent activity</h3>
                <p className="text-xs text-ink-500 mb-4">Live feed of student submissions and flags.</p>
                <ul className="space-y-3">
                  {mockActivity.map((a, i) => {
                    const Icon = a.type === "flag" ? AlertTriangle : a.type === "grade" ? CheckCircle2 : TrendingUp;
                    const color = a.type === "flag" ? "text-danger bg-danger/10" : a.type === "grade" ? "text-success bg-success/10" : "text-accent-600 bg-accent-50";
                    return (
                      <li key={i} className="flex gap-3">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${color}`}>
                          <Icon size={13} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm leading-tight">
                            <span className="font-semibold text-ink-900">{a.who}</span>{" "}
                            <span className="text-ink-600">{a.what}</span>
                          </div>
                          <div className="text-xs text-ink-400 mt-0.5 flex items-center gap-1">
                            <Clock size={10} /> {a.time}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="card p-5 bg-gradient-to-br from-ink-900 to-ink-950 text-white">
                <h3 className="font-display text-lg font-semibold mb-1">Pending grading</h3>
                <p className="text-sm text-ink-300 mb-4">12 essays in SEN 306 need your review.</p>
                <button onClick={() => navigate("/instructor/grading/1")} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-50 transition">
                  Start grading <ArrowRight size={14} />
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, highlight }) {
  const colors = {
    accent: "bg-accent-50 text-accent-600", ink: "bg-ink-100 text-ink-700",
    success: "bg-success/10 text-success", warning: "bg-warning/10 text-warning", danger: "bg-danger/10 text-danger",
  };
  return (
    <div className={`card p-4 sm:p-5 ${highlight ? "ring-2 ring-accent-200" : ""}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon size={17} />
      </div>
      <div className="mt-3 sm:mt-4 text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}