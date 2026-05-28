import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, Clock, Download, ArrowLeft, Trophy, Home, CalendarClock, ScanFace, MonitorCheck,
  Radio, TrendingUp, BookOpen, HelpCircle, Sparkles, ShieldCheck, Share2,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

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
      { to: "/student/integrity", label: "Integrity status", icon: ShieldCheck },
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

const mockResult = {
  examTitle: "Software Construction Final",
  course: "SEN 306",
  score: 78,
  totalPoints: 100,
  percentage: 78,
  timeTaken: "1h 22m",
  passingThreshold: 60,
  completedAt: "May 15, 2026 · 11:30 AM",
  questionsCorrect: 32,
  totalQuestions: 40,
  rank: 14,
  classAvg: 71,
  breakdown: [
    { topic: "Search Algorithms", correct: 8, total: 10 },
    { topic: "Heuristics", correct: 9, total: 10 },
    { topic: "Pre/Post-Conditions", correct: 7, total: 10 },
    { topic: "Software History", correct: 8, total: 10 },
  ],
};

export default function Results() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const passed = mockResult.percentage >= mockResult.passingThreshold;

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-4xl">
          <button
            onClick={() => navigate("/student/history")}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back to results
          </button>

          {/* Hero result card */}
          <div className="card overflow-hidden mb-6">
            <div className={`p-6 sm:p-8 ${passed ? "bg-gradient-to-br from-success/10 to-success/5" : "bg-gradient-to-br from-danger/10 to-danger/5"}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="badge bg-white/80 text-ink-700">{mockResult.course}</span>
                    <span className={`badge ${passed ? "bg-success text-white" : "bg-danger text-white"}`}>
                      {passed ? <CheckCircle2 size={12} /> : "✕"}
                      {passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">{mockResult.examTitle}</h1>
                  <p className="mt-1 text-ink-600 text-sm">Completed {mockResult.completedAt}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-ink-900 leading-none">
                    <span className="text-5xl sm:text-7xl tabular-nums">{mockResult.percentage}</span>
                    <span className="text-2xl sm:text-3xl text-ink-400">%</span>
                  </div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-ink-600">
                    {mockResult.score} / {mockResult.totalPoints} points
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-ink-100">
              <Metric icon={CheckCircle2} label="Correct" value={`${mockResult.questionsCorrect}/${mockResult.totalQuestions}`} />
              <Metric icon={Clock} label="Time" value={mockResult.timeTaken} />
              <Metric icon={Trophy} label="Class Rank" value={`#${mockResult.rank}`} />
              <Metric icon={TrendingUp} label="Class Avg" value={`${mockResult.classAvg}%`} />
            </div>
          </div>

          {/* Topic breakdown */}
          <div className="card p-5 sm:p-6 mb-6">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-1">Performance by Topic</h2>
            <p className="text-sm text-ink-500 mb-5">Where you excelled and where to focus next.</p>
            <div className="space-y-4">
              {mockResult.breakdown.map((b) => {
                const pct = (b.correct / b.total) * 100;
                return (
                  <div key={b.topic}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-ink-900">{b.topic}</span>
                      <span className="font-mono text-ink-500">{b.correct}/{b.total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          pct >= 80 ? "bg-success" : pct >= 60 ? "bg-accent-600" : "bg-warning"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button className="btn-primary">
              <Download size={16} /> Download PDF
            </button>
            <button className="btn-secondary">
              <Share2 size={16} /> Share
            </button>
            <button onClick={() => navigate("/student/history")} className="btn-secondary">
              <Trophy size={16} /> All Results
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="p-4 sm:p-5 text-center">
      <Icon size={16} className="text-ink-400 mx-auto mb-2" />
      <div className="text-[10px] uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className="font-mono text-lg sm:text-xl font-bold text-ink-900">{value}</div>
    </div>
  );
}