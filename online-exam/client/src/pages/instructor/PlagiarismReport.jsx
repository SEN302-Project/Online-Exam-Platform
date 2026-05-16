import { ArrowLeft, AlertTriangle, Bot, Eye, FileText } from "lucide-react";
import Navbar from "../../components/common/Navbar";

const mockReports = [
  { id: "1", student: "Student A", similarityScore: 87, aiScore: 92, source: "Cross-submission match (Student F)", severity: "high" },
  { id: "2", student: "Student B", similarityScore: 64, aiScore: 78, source: "Internet source: example-site.com", severity: "medium" },
  { id: "3", student: "Student C", similarityScore: 12, aiScore: 8, source: "Within acceptable range", severity: "low" },
];

const SEVERITY_STYLES = {
  high: { bar: "bg-danger", badge: "bg-danger/10 text-danger", label: "High Risk" },
  medium: { bar: "bg-warning", badge: "bg-warning/10 text-warning", label: "Medium Risk" },
  low: { bar: "bg-success", badge: "bg-success/10 text-success", label: "Low Risk" },
};

export default function PlagiarismReport() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <button className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6">
          <ArrowLeft size={15} /> Back to exam
        </button>

        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Plagiarism Report</h1>
        <p className="text-ink-500 mb-8">Software Construction Final • 87 submissions analyzed</p>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <SummaryCard icon={AlertTriangle} label="High Risk" value="3" color="danger" />
          <SummaryCard icon={Eye} label="Medium Risk" value="12" color="warning" />
          <SummaryCard icon={FileText} label="Clean Submissions" value="72" color="success" />
        </div>

        <div className="space-y-3">
          {mockReports.map((r) => {
            const sev = SEVERITY_STYLES[r.severity];
            return (
              <article key={r.id} className="card p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${sev.badge}`}>{sev.label}</span>
                      <span className="badge bg-ink-100 text-ink-600">{r.student}</span>
                    </div>
                    <p className="text-sm text-ink-600">{r.source}</p>
                  </div>
                  <button className="btn-secondary !text-sm">View Details</button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Metric label="Text Similarity" value={r.similarityScore} color={sev.bar} />
                  <Metric label="AI-Generated Probability" value={r.aiScore} icon={Bot} color={sev.bar} />
                </div>
              </article>
            );
          })}
        </div>
      </main>
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
    <div className="card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-ink-900">{value}</div>
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