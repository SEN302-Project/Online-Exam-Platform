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
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "5" },
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

const practiceQuestions = [
  {
    id: "q1",
    course: "SEN 306",
    topic: "Search Algorithms",
    difficulty: "medium",
    prompt: "Which search algorithm uses f(n) = g(n) + h(n) where g(n) is path cost and h(n) is heuristic?",
    options: [
      { id: "a", text: "Breadth-First Search" },
      { id: "b", text: "Depth-First Search" },
      { id: "c", text: "A* Search" },
      { id: "d", text: "Hill Climbing" },
    ],
    correctId: "c",
    explanation:
      "A* Search combines the actual cost from start g(n) with the heuristic estimate to goal h(n) to make informed decisions. This makes it both complete and optimal (when using an admissible heuristic).",
  },
  {
    id: "q2",
    course: "SEN 306",
    topic: "Software Design",
    difficulty: "easy",
    prompt: "A pre-condition is a Boolean expression that must be true before a function executes.",
    options: [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ],
    correctId: "true",
    explanation:
      "Pre-conditions are constraints the caller must satisfy before calling a function. Post-conditions describe what must be true after execution. Together with invariants, they form the foundation of contract-based programming.",
  },
  {
    id: "q3",
    course: "CSC 203",
    topic: "Complexity",
    difficulty: "easy",
    prompt: "What is the time complexity of binary search on a sorted array of n elements?",
    options: [
      { id: "a", text: "O(1)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(n)" },
      { id: "d", text: "O(n log n)" },
    ],
    correctId: "b",
    explanation:
      "Binary search halves the search space with each comparison, leading to log₂(n) comparisons in the worst case — hence O(log n) time complexity.",
  },
];

const DIFF_COLORS = {
  easy: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  hard: "bg-danger/10 text-danger",
};

export default function PracticeMode() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const q = practiceQuestions[idx];
  const isCorrect = submitted && selected === q.correctId;

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    setStats((s) => ({
      correct: s.correct + (selected === q.correctId ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);
    setIdx((i) => (i + 1) % practiceQuestions.length);
  };

  const handleReset = () => {
    setIdx(0);
    setSelected(null);
    setSubmitted(false);
    setStats({ correct: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1 flex items-center gap-1.5">
              <Sparkles size={11} /> Practice Mode
            </div>
            <h1 className="font-display text-4xl font-semibold text-ink-900">
              Sharpen your skills
            </h1>
            <p className="mt-1.5 text-ink-500">
              Try practice questions with no timer and immediate feedback. Results don't count toward your grades.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-6">
            {/* Question */}
            <div>
              <article className="card p-6 sm:p-8 animate-fade-in">
                <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-ink-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge bg-ink-100 text-ink-600">{q.course}</span>
                    <span className="badge bg-accent-50 text-accent-700">{q.topic}</span>
                    <span className={`badge ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <span className="font-mono text-xs text-ink-400">
                    {idx + 1} / {practiceQuestions.length}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-ink-900 mb-6">
                  {q.prompt}
                </h2>

                <div className="space-y-2.5">
                  {q.options.map((opt, i) => {
                    const isPicked = selected === opt.id;
                    const isCorrectOpt = submitted && opt.id === q.correctId;
                    const isWrongPick = submitted && isPicked && opt.id !== q.correctId;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => !submitted && setSelected(opt.id)}
                        disabled={submitted}
                        className={`group w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
                          isCorrectOpt
                            ? "border-success bg-success/5"
                            : isWrongPick
                              ? "border-danger bg-danger/5"
                              : isPicked
                                ? "border-accent-600 bg-accent-50"
                                : "border-ink-100 hover:border-ink-300 bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold transition ${
                            isCorrectOpt
                              ? "bg-success text-white"
                              : isWrongPick
                                ? "bg-danger text-white"
                                : isPicked
                                  ? "bg-accent-600 text-white"
                                  : "bg-ink-100 text-ink-500"
                          }`}
                        >
                          {isCorrectOpt ? (
                            <CheckCircle2 size={14} strokeWidth={3} />
                          ) : isWrongPick ? (
                            <XCircle size={14} strokeWidth={3} />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        <span className="text-ink-900">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`mt-6 card border-2 p-5 animate-slide-up ${
                      isCorrect ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isCorrect ? "bg-success text-white" : "bg-warning text-white"
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 size={17} /> : <Lightbulb size={17} />}
                      </div>
                      <div>
                        <div className="font-semibold text-ink-900 mb-1">
                          {isCorrect ? "Correct!" : "Not quite — here's why"}
                        </div>
                        <p className="text-sm text-ink-700 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button onClick={handleReset} className="btn-secondary">
                  <RotateCcw size={15} /> Reset
                </button>
                {submitted ? (
                  <button onClick={handleNext} className="btn-primary">
                    Next question <ArrowRight size={15} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={!selected} className="btn-primary">
                    Check answer
                  </button>
                )}
              </div>
            </div>

            {/* Stats sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-20 self-start">
              <div className="card p-5">
                <h3 className="font-semibold text-ink-900 mb-4">Your session</h3>
                <div className="space-y-4">
                  <Stat label="Questions" value={stats.total} total={practiceQuestions.length} />
                  <Stat label="Correct" value={stats.correct} color="text-success" />
                  <Stat
                    label="Accuracy"
                    value={stats.total ? `${Math.round((stats.correct / stats.total) * 100)}%` : "—"}
                    color="text-accent-700"
                  />
                </div>
              </div>

              <div className="card p-5 bg-gradient-to-br from-accent-600 to-accent-700 text-white">
                <Sparkles size={18} className="mb-2" />
                <h3 className="font-display text-lg font-semibold mb-1">Practice often</h3>
                <p className="text-sm text-white/80">
                  Students who practice 3+ times a week score 23% higher on real exams.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value, total, color = "text-ink-900" }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-0.5">
        {label}
      </div>
      <div className={`font-display text-2xl font-bold ${color}`}>
        {value}
        {total !== undefined && <span className="text-ink-400 text-base"> / {total}</span>}
      </div>
    </div>
  );
}