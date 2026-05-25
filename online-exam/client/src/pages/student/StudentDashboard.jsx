import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, CalendarClock, ScanFace, MonitorCheck, Radio, TrendingUp, BookOpen, HelpCircle, Sparkles,
  ArrowRight, Clock, FileText, Award, ChevronRight,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import HonorPledge from "../../components/dashboard/HonorPledge";
import SystemHealth from "../../components/dashboard/SystemHealth";
import ProgressBar from "../../components/dashboard/ProgressBar";
import { useAuth } from "../../context/AuthContext";

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

const mockUpcoming = [
  { id: "1", course: "SEN 306", title: "Software Construction Final", startsAt: new Date().toISOString(), durationMin: 90, questionCount: 40, type: "Mixed", isNow: true },
  { id: "2", course: "ENT 312", title: "Business Enterprise Mid-term", startsAt: new Date(Date.now() + 86400000).toISOString(), durationMin: 60, questionCount: 25, type: "MCQ", isNow: false },
];

const mockPastResults = [
  { id: "r1", course: "CSC 203", title: "Data Structures", score: 87, rank: 96, date: "May 12" },
  { id: "r2", course: "MTH 211", title: "Linear Algebra", score: 92, rank: 99, date: "Apr 26" },
  { id: "r3", course: "PHL 120", title: "Ethics in Tech", score: 76, rank: 88, date: "Apr 18" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Welcome back, {firstName}.</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">{mockUpcoming.length} exams scheduled this week. Run a system check before joining.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6 sm:space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900">Upcoming exams</h2>
                  <button onClick={() => navigate("/student/upcoming")} className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1">
                    View all <ArrowRight size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  {mockUpcoming.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} onStart={() => navigate(`/student/exam/${exam.id}`)} onCheck={() => navigate("/student/system-check")} />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900">Past results</h2>
                  <button onClick={() => navigate("/student/history")} className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1">
                    Open results <ArrowRight size={14} />
                  </button>
                </div>
                <div className="card overflow-hidden">
                  {mockPastResults.map((result, i) => (
                    <button key={result.id} onClick={() => navigate(`/student/results/${result.id}`)} className={`w-full p-4 hover:bg-ink-50 transition text-left flex items-center gap-3 sm:gap-4 ${i < mockPastResults.length - 1 ? "border-b border-ink-100" : ""}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold text-ink-500">{result.course}</span>
                          <span className="text-xs text-ink-400">•</span>
                          <span className="text-xs text-ink-400">{result.date}</span>
                        </div>
                        <div className="font-semibold text-ink-900 truncate text-sm sm:text-base">{result.title}</div>
                      </div>
                      <div className="hidden sm:block flex-1 max-w-[200px]">
                        <ProgressBar value={result.score} />
                      </div>
                      <div className="text-right flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="sm:hidden font-mono text-sm font-bold text-ink-900">{result.score}%</span>
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                          <Award size={11} /> {result.rank}
                        </span>
                        <ChevronRight size={16} className="text-ink-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-4">Your activity</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <StatCard icon={FileText} label="Upcoming" value="2" color="accent" />
                  <StatCard icon={Clock} label="Completed" value="12" color="ink" />
                  <StatCard icon={TrendingUp} label="Average" value="84%" color="success" />
                  <StatCard icon={Award} label="Best score" value="98%" color="warning" />
                </div>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 self-start">
              <HonorPledge userName={user?.name || firstName} signedDate={new Date()} />
              <SystemHealth />
              <button onClick={() => navigate("/student/practice")} className="card p-4 w-full text-left hover:shadow-lg transition group bg-gradient-to-br from-accent-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-ink-900 text-sm group-hover:text-accent-700 transition">Practice mode</div>
                    <div className="text-xs text-ink-500">No timer · Instant feedback</div>
                  </div>
                </div>
              </button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function ExamCard({ exam, onStart, onCheck }) {
  const date = new Date(exam.startsAt);
  const isToday = exam.isNow;
  const isTomorrow = !isToday && date.toDateString() === new Date(Date.now() + 86400000).toDateString();

  return (
    <article className="card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-lg transition">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 flex-col items-center justify-center rounded-xl font-mono ${isToday ? "bg-accent-600 text-white" : isTomorrow ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-700"}`}>
          <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider opacity-80">
            {isToday ? "TOD" : isTomorrow ? "TOM" : date.toLocaleDateString("en", { month: "short" }).toUpperCase()}
          </div>
          <div className="font-display text-xl sm:text-2xl font-bold leading-none">
            {isToday ? "Now" : date.getDate()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-ink-900 text-sm sm:text-base truncate">{exam.course} — {exam.title}</span>
            <span className="badge bg-ink-100 text-ink-600">{exam.type}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs text-ink-500 flex-wrap">
            <span className="flex items-center gap-1"><Clock size={12} />{exam.durationMin} min</span>
            <span>·</span>
            <span>{exam.questionCount} questions</span>
          </div>
        </div>
      </div>
      {isToday ? (
        <button onClick={onStart} className="btn-primary shrink-0 w-full sm:w-auto">Start exam <ArrowRight size={15} /></button>
      ) : (
        <button onClick={onCheck} className="btn-secondary shrink-0 !text-sm w-full sm:w-auto"><MonitorCheck size={14} /> System check</button>
      )}
    </article>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = { accent: "bg-accent-50 text-accent-600", ink: "bg-ink-100 text-ink-700", success: "bg-success/10 text-success", warning: "bg-warning/10 text-warning" };
  return (
    <div className="card p-4 sm:p-5">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon size={17} />
      </div>
      <div className="mt-3 sm:mt-4 text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}