import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Plus, BookOpen, ScrollText, BarChart3, AlertTriangle, HelpCircle,
  TrendingUp, TrendingDown, Users, Award, Target, ArrowLeft,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ScoreChart from "../../components/dashboard/ScoreChart";
import ProgressBar from "../../components/dashboard/ProgressBar";

const sidebarItems = [
  {
    section: "TEACHING",
    items: [
      { to: "/instructor", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/instructor/create-exam", label: "Create exam", icon: Plus },
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

const distributions = {
  "SEN 306 Final": [
    { label: "0-20", value: 1 }, { label: "21-40", value: 4 }, { label: "41-60", value: 12 },
    { label: "61-80", value: 34 }, { label: "81-100", value: 20 },
  ],
  "CSC 204 Mid-term": [
    { label: "0-20", value: 0 }, { label: "21-40", value: 2 }, { label: "41-60", value: 8 },
    { label: "61-80", value: 22 }, { label: "81-100", value: 20 },
  ],
};

const topicPerformance = [
  { topic: "Search Algorithms", avg: 78, trend: "up" },
  { topic: "Heuristics", avg: 85, trend: "up" },
  { topic: "Pre/Post-Conditions", avg: 71, trend: "down" },
  { topic: "Software History", avg: 82, trend: "up" },
  { topic: "Design Patterns", avg: 68, trend: "down" },
];

export default function Analytics() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("SEN 306 Final");

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <button
            onClick={() => navigate("/instructor")}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back to dashboard
          </button>

          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Instructor</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Analytics</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Insights across your exams and student performance.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <KpiCard icon={Users} label="Total students" value="233" trend="+12" trendUp />
            <KpiCard icon={Award} label="Class average" value="76%" trend="+3%" trendUp />
            <KpiCard icon={Target} label="Pass rate" value="89%" trend="+5%" trendUp />
            <KpiCard icon={TrendingDown} label="Drop-off" value="4%" trend="-2%" trendUp />
          </div>

          {/* Exam selector + distribution */}
          <section className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-900">Score distribution</h2>
                <p className="text-sm text-ink-500">How students performed in {selectedExam}</p>
              </div>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="input max-w-[220px]"
              >
                {Object.keys(distributions).map((exam) => (
                  <option key={exam}>{exam}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2 h-44">
              {distributions[selectedExam].map((d, i) => {
                const max = Math.max(...distributions[selectedExam].map((x) => x.value), 1);
                const heightPct = (d.value / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-xs font-mono text-ink-400 opacity-0 group-hover:opacity-100 transition">{d.value}</div>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-accent-600 to-accent-500 transition-all duration-700"
                        style={{ height: `${heightPct}%`, minHeight: d.value > 0 ? "4px" : "0" }}
                      />
                    </div>
                    <div className="text-[10px] font-medium text-ink-500">{d.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Topic performance */}
          <section className="card p-6 mb-6">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Topic performance</h2>
            <p className="text-sm text-ink-500 mb-5">Average scores by topic — where to focus your teaching.</p>
            <div className="space-y-4">
              {topicPerformance.map((t) => (
                <div key={t.topic}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink-900">{t.topic}</span>
                      {t.trend === "up" ? (
                        <TrendingUp size={13} className="text-success" />
                      ) : (
                        <TrendingDown size={13} className="text-danger" />
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold text-ink-700">{t.avg}%</span>
                  </div>
                  <ProgressBar value={t.avg} showLabel={false} height="h-2" />
                </div>
              ))}
            </div>
          </section>

          {/* Engagement over time */}
          <section className="card p-6">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Engagement</h2>
            <p className="text-sm text-ink-500 mb-5">Average time spent per question across all exams.</p>
            <div className="grid grid-cols-3 gap-4">
              <Metric label="Avg time/question" value="1m 24s" />
              <Metric label="Completion rate" value="96%" />
              <Metric label="Resubmission rate" value="8%" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
        <Icon size={17} />
      </div>
      <div className="mt-3 sm:mt-4 text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</span>
        <span className={`text-xs font-semibold ${trendUp ? "text-success" : "text-danger"}`}>{trend}</span>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-ink-50 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-ink-900">{value}</div>
    </div>
  );
}