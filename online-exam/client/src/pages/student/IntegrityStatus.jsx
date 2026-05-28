import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, CalendarClock, ScanFace, MonitorCheck, Radio, TrendingUp, BookOpen, HelpCircle, Sparkles,
  ShieldCheck, AlertTriangle, CheckCircle2, FileText, Bot, Calendar, ArrowRight, Info,
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

const mockSubmissions = [
  {
    id: "1",
    course: "SEN 306",
    examTitle: "Software Construction Final",
    submittedAt: "May 15, 2026",
    status: "clean",
    similarityScore: 12,
    aiScore: 8,
    flagged: false,
  },
  {
    id: "2",
    course: "ENT 312",
    examTitle: "Business Ethics Essay",
    submittedAt: "Apr 28, 2026",
    status: "review",
    similarityScore: 47,
    aiScore: 32,
    flagged: true,
    flagReason: "Similarity score above threshold",
    appealable: true,
  },
  {
    id: "3",
    course: "CSC 203",
    examTitle: "Data Structures Quiz",
    submittedAt: "May 10, 2026",
    status: "clean",
    similarityScore: 8,
    aiScore: 5,
    flagged: false,
  },
];

const STATUS_STYLES = {
  clean: { badge: "bg-success/10 text-success", label: "Clean", icon: CheckCircle2 },
  review: { badge: "bg-warning/10 text-warning", label: "Under Review", icon: AlertTriangle },
  flagged: { badge: "bg-danger/10 text-danger", label: "Flagged", icon: AlertTriangle },
};

export default function IntegrityStatus() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const cleanCount = mockSubmissions.filter((s) => s.status === "clean").length;
  const flaggedCount = mockSubmissions.filter((s) => s.flagged).length;

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Integrity status</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">
              See how your submissions performed in plagiarism and AI-content checks.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            <StatCard icon={CheckCircle2} label="Clean submissions" value={cleanCount} color="success" />
            <StatCard icon={AlertTriangle} label="Under review" value={flaggedCount} color="warning" />
            <StatCard icon={FileText} label="Total submissions" value={mockSubmissions.length} color="ink" />
          </div>

          {/* How it works panel */}
          <div className="card p-5 mb-6 bg-gradient-to-br from-accent-50 to-white">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white">
                <Info size={17} />
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-1">How integrity checks work</h3>
                <p className="text-sm text-ink-700 leading-relaxed">
                  Every submission is scanned for text similarity (against your peers and online sources) and
                  for AI-generated content. Scores above <strong>50% similarity</strong> or{" "}
                  <strong>70% AI probability</strong> are flagged for instructor review. You'll be notified if
                  any of your work needs clarification.
                </p>
              </div>
            </div>
          </div>

          {/* Submissions list */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-ink-100">
              <h2 className="font-display text-lg font-semibold text-ink-900">My submissions</h2>
            </div>
            {mockSubmissions.map((sub, i) => {
              const style = STATUS_STYLES[sub.status];
              const Icon = style.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelected(sub)}
                  className={`w-full p-4 sm:p-5 hover:bg-ink-50 transition text-left flex items-start gap-3 sm:gap-4 ${
                    i < mockSubmissions.length - 1 ? "border-b border-ink-100" : ""
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.badge}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-ink-500">{sub.course}</span>
                      <span className={`badge ${style.badge}`}>{style.label}</span>
                    </div>
                    <h3 className="font-semibold text-ink-900 truncate text-sm sm:text-base">{sub.examTitle}</h3>
                    <div className="text-xs text-ink-500 mt-1 flex items-center gap-1">
                      <Calendar size={11} /> Submitted {sub.submittedAt}
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col gap-1 min-w-[140px]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-500">Similarity</span>
                      <span className="font-mono font-semibold text-ink-700">{sub.similarityScore}%</span>
                    </div>
                    <ProgressBar value={sub.similarityScore} showLabel={false} height="h-1.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Appeal info if any are flagged */}
          {flaggedCount > 0 && (
            <div className="mt-6 card p-5 border-warning/30 bg-warning/5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-ink-900 mb-1">
                    {flaggedCount} submission{flaggedCount > 1 ? "s" : ""} under review
                  </h3>
                  <p className="text-sm text-ink-700 mb-3">
                    Your instructor will review the flagged content and reach out if clarification is needed.
                    You may also appeal directly with supporting context.
                  </p>
                  <button className="btn-primary !text-sm">Submit appeal</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal submission={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DetailModal({ submission, onClose }) {
  const style = STATUS_STYLES[submission.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl card animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink-900">Integrity Details</h3>
          <button onClick={onClose} className="btn-ghost !p-1.5">✕</button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`badge ${style.badge}`}>{style.label}</span>
              <span className="font-mono text-xs font-semibold text-ink-500">{submission.course}</span>
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-900">{submission.examTitle}</h2>
            <div className="text-sm text-ink-500 mt-1">Submitted {submission.submittedAt}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card border-ink-100 p-4">
              <div className="text-xs uppercase tracking-wider text-ink-400 mb-2 flex items-center gap-1.5">
                <FileText size={13} /> Text Similarity
              </div>
              <div className="font-mono text-3xl font-bold text-ink-900">
                {submission.similarityScore}<span className="text-ink-400 text-base">%</span>
              </div>
              <ProgressBar value={submission.similarityScore} showLabel={false} height="h-1.5" />
              <div className="text-xs text-ink-500 mt-2">
                {submission.similarityScore < 30 ? "Within normal range" : submission.similarityScore < 50 ? "Slightly elevated" : "Above threshold"}
              </div>
            </div>
            <div className="card border-ink-100 p-4">
              <div className="text-xs uppercase tracking-wider text-ink-400 mb-2 flex items-center gap-1.5">
                <Bot size={13} /> AI-Generated
              </div>
              <div className="font-mono text-3xl font-bold text-ink-900">
                {submission.aiScore}<span className="text-ink-400 text-base">%</span>
              </div>
              <ProgressBar value={submission.aiScore} showLabel={false} height="h-1.5" />
              <div className="text-xs text-ink-500 mt-2">
                {submission.aiScore < 30 ? "Likely human-written" : submission.aiScore < 70 ? "Mixed signals" : "High AI probability"}
              </div>
            </div>
          </div>

          {submission.flagged && (
            <div className="card border-warning/30 bg-warning/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-ink-900 mb-1">Why was this flagged?</div>
                  <p className="text-sm text-ink-700">{submission.flagReason}</p>
                  <p className="text-xs text-ink-500 mt-2">
                    Your instructor will review and contact you if needed. You can also appeal with context.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-ink-100 bg-ink-50 flex justify-end gap-2 rounded-b-2xl">
          <button onClick={onClose} className="btn-secondary">Close</button>
          {submission.flagged && (
            <button className="btn-primary">Submit appeal <ArrowRight size={14} /></button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    ink: "bg-ink-100 text-ink-700",
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