import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Plus, BookOpen, ScrollText, BarChart3, AlertTriangle, HelpCircle,
  ArrowLeft, Bot, Eye, FileText, Search, Download, ExternalLink, CheckCircle2, X, Flag,
  FileEdit,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ProgressBar from "../../components/dashboard/ProgressBar";

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

const mockReports = [
  {
    id: "1",
    student: "Student A",
    similarityScore: 87,
    aiScore: 92,
    severity: "high",
    matches: [
      { source: "Student F submission", percent: 64, type: "peer" },
      { source: "wikipedia.org/wiki/A_star_algorithm", percent: 23, type: "web" },
    ],
    flaggedExcerpt: "The implementation uses a priority queue to maintain the frontier of nodes ordered by f(n) = g(n) + h(n), where g(n) represents the actual cost from the start node and h(n) is the heuristic estimate to the goal node.",
    aiConfidence: {
      "GPT-4 patterns": 89,
      "Repetitive structure": 67,
      "Vocabulary diversity": 92,
      "Sentence complexity": 78,
    },
  },
  {
    id: "2",
    student: "Student B",
    similarityScore: 64,
    aiScore: 78,
    severity: "medium",
    matches: [
      { source: "example-site.com/algorithms", percent: 41, type: "web" },
      { source: "Student M submission", percent: 23, type: "peer" },
    ],
    flaggedExcerpt: "Best-First Search uses only the heuristic function to guide its search, choosing the node that appears closest to the goal at each step.",
    aiConfidence: {
      "GPT-4 patterns": 71,
      "Repetitive structure": 54,
      "Vocabulary diversity": 88,
      "Sentence complexity": 66,
    },
  },
  {
    id: "3",
    student: "Student C",
    similarityScore: 12,
    aiScore: 8,
    severity: "low",
    matches: [],
    flaggedExcerpt: null,
    aiConfidence: null,
  },
];

const SEVERITY_STYLES = {
  high: { bar: "bg-danger", badge: "bg-danger/10 text-danger", label: "High Risk", color: "danger" },
  medium: { bar: "bg-warning", badge: "bg-warning/10 text-warning", label: "Medium Risk", color: "warning" },
  low: { bar: "bg-success", badge: "bg-success/10 text-success", label: "Low Risk", color: "success" },
};

export default function PlagiarismReport() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockReports.filter((r) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.severity === filter;
    return matchSearch && matchFilter;
  });

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

          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Instructor</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Integrity Reports</h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">
                Software Construction Final • 87 submissions analyzed
              </p>
            </div>
            <button className="btn-secondary">
              <Download size={15} /> Export report
            </button>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <SummaryCard icon={AlertTriangle} label="High risk" value="3" color="danger" />
            <SummaryCard icon={Eye} label="Medium risk" value="12" color="warning" />
            <SummaryCard icon={CheckCircle2} label="Clean" value="72" color="success" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name..."
                className="input pl-10"
              />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input max-w-[160px]">
              <option value="all">All severity</option>
              <option value="high">High risk</option>
              <option value="medium">Medium risk</option>
              <option value="low">Low risk</option>
            </select>
          </div>

          {/* Reports list */}
          <div className="space-y-3">
            {filtered.map((r) => {
              const sev = SEVERITY_STYLES[r.severity];
              return (
                <article key={r.id} className="card p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`badge ${sev.badge}`}>{sev.label}</span>
                        <span className="badge bg-ink-100 text-ink-600">{r.student}</span>
                      </div>
                      <p className="text-sm text-ink-600">
                        {r.matches.length > 0
                          ? `${r.matches.length} match${r.matches.length > 1 ? "es" : ""} found`
                          : "Within acceptable range"}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelected(r)}
                      className="btn-secondary !text-sm"
                    >
                      View details <ExternalLink size={13} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Metric label="Text Similarity" value={r.similarityScore} color={sev.bar} />
                    <Metric label="AI Probability" value={r.aiScore} icon={Bot} color={sev.bar} />
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      </div>

      {selected && <DetailPanel report={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DetailPanel({ report, onClose }) {
  const [tab, setTab] = useState("similarity");
  const sev = SEVERITY_STYLES[report.severity];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl card animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 ${
          report.severity === "high" ? "bg-gradient-to-br from-danger/10 to-danger/5"
          : report.severity === "medium" ? "bg-gradient-to-br from-warning/10 to-warning/5"
          : "bg-gradient-to-br from-success/10 to-success/5"
        }`}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`badge ${sev.badge}`}>{sev.label}</span>
                <span className="badge bg-white/80 text-ink-700">{report.student}</span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Integrity Analysis</h2>
            </div>
            <button onClick={onClose} className="btn-ghost !p-1.5">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/60 backdrop-blur p-3">
              <div className="text-xs uppercase tracking-wider text-ink-500 mb-1 flex items-center gap-1.5">
                <FileText size={12} /> Similarity
              </div>
              <div className="font-mono text-2xl font-bold text-ink-900">{report.similarityScore}%</div>
            </div>
            <div className="rounded-xl bg-white/60 backdrop-blur p-3">
              <div className="text-xs uppercase tracking-wider text-ink-500 mb-1 flex items-center gap-1.5">
                <Bot size={12} /> AI-Generated
              </div>
              <div className="font-mono text-2xl font-bold text-ink-900">{report.aiScore}%</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {(report.matches.length > 0 || report.aiConfidence) && (
          <>
            <div className="flex border-b border-ink-100 px-6">
              <button
                onClick={() => setTab("similarity")}
                className={`px-4 py-3 text-sm font-semibold transition border-b-2 ${
                  tab === "similarity" ? "border-accent-600 text-accent-600" : "border-transparent text-ink-500 hover:text-ink-900"
                }`}
              >
                Similarity matches
              </button>
              <button
                onClick={() => setTab("ai")}
                className={`px-4 py-3 text-sm font-semibold transition border-b-2 ${
                  tab === "ai" ? "border-accent-600 text-accent-600" : "border-transparent text-ink-500 hover:text-ink-900"
                }`}
              >
                AI analysis
              </button>
            </div>

            <div className="p-6">
              {tab === "similarity" && (
                <div className="space-y-4">
                  {report.matches.length === 0 ? (
                    <p className="text-ink-500 text-sm text-center py-6">No significant matches found.</p>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold text-ink-900 mb-3">Source matches</h3>
                        <div className="space-y-2">
                          {report.matches.map((m, i) => (
                            <div key={i} className="card border-ink-100 p-3">
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`badge ${m.type === "peer" ? "bg-warning/10 text-warning" : "bg-accent-50 text-accent-700"}`}>
                                    {m.type === "peer" ? "Peer match" : "Web source"}
                                  </span>
                                  <span className="text-sm text-ink-700 truncate">{m.source}</span>
                                </div>
                                <span className="font-mono font-bold text-ink-900 shrink-0">{m.percent}%</span>
                              </div>
                              <ProgressBar value={m.percent} showLabel={false} height="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {report.flaggedExcerpt && (
                        <div>
                          <h3 className="font-semibold text-ink-900 mb-2">Matched excerpt</h3>
                          <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
                            <p className="text-sm text-ink-700 leading-relaxed italic">
                              "{report.flaggedExcerpt}"
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {tab === "ai" && report.aiConfidence && (
                <div>
                  <p className="text-sm text-ink-500 mb-4">
                    Breakdown of signals contributing to the AI-generation score:
                  </p>
                  <div className="space-y-3">
                    {Object.entries(report.aiConfidence).map(([signal, score]) => (
                      <div key={signal}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-ink-900">{signal}</span>
                          <span className="font-mono text-ink-700">{score}%</span>
                        </div>
                        <ProgressBar value={score} showLabel={false} height="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="px-6 py-3 border-t border-ink-100 bg-ink-50 flex justify-end gap-2 rounded-b-2xl flex-wrap">
          <button onClick={onClose} className="btn-secondary">Dismiss</button>
          <button className="btn-secondary">
            Contact student
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-danger px-5 py-2.5 font-semibold text-white hover:bg-red-700 transition">
            <Flag size={15} /> Flag for review
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color }) {
  const colors = {
    danger: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  };
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

function Metric({ label, value, icon: Icon, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-700 flex items-center gap-1.5">
          {Icon && <Icon size={13} className="text-ink-500" />}
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-ink-900">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}