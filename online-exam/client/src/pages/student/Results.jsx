import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Download, ArrowLeft, Trophy } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import { formatTime, formatDateTime } from "../../utils/formatTime";

const mockResult = {
  examTitle: "Software Construction Final",
  course: "SEN 306",
  score: 78,
  totalPoints: 100,
  percentage: 78,
  timeTaken: 4920,
  passingThreshold: 60,
  completedAt: "2026-05-15T11:30:00",
  questionsCorrect: 32,
  totalQuestions: 40,
  breakdown: [
    { topic: "Search Algorithms", correct: 8, total: 10 },
    { topic: "Heuristics", correct: 9, total: 10 },
    { topic: "Pre/Post-Conditions", correct: 7, total: 10 },
    { topic: "Software History", correct: 8, total: 10 },
  ],
};

export default function Results() {
  const navigate = useNavigate();
  const passed = mockResult.percentage >= mockResult.passingThreshold;

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => navigate("/student")}
          className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
        >
          <ArrowLeft size={15} /> Back to dashboard
        </button>

        {/* Hero result card */}
        <div className="card overflow-hidden mb-6">
          <div className={`p-8 ${passed ? "bg-gradient-to-br from-success/10 to-success/5" : "bg-gradient-to-br from-danger/10 to-danger/5"}`}>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge bg-white/80 text-ink-700">{mockResult.course}</span>
                  <span className={`badge ${passed ? "bg-success text-white" : "bg-danger text-white"}`}>
                    {passed ? <CheckCircle2 size={12} /> : "✕"}
                    {passed ? "Passed" : "Failed"}
                  </span>
                </div>
                <h1 className="font-display text-3xl font-semibold text-ink-900">
                  {mockResult.examTitle}
                </h1>
                <p className="mt-1 text-ink-600">Completed {formatDateTime(mockResult.completedAt)}</p>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-ink-900 leading-none">
                  <span className="text-7xl tabular-nums">{mockResult.percentage}</span>
                  <span className="text-3xl text-ink-400">%</span>
                </div>
                <div className="mt-2 text-sm text-ink-600">
                  {mockResult.score} / {mockResult.totalPoints} points
                </div>
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 divide-x divide-ink-100">
            <div className="p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">Correct</div>
              <div className="font-mono text-xl font-bold text-ink-900">
                {mockResult.questionsCorrect}/{mockResult.totalQuestions}
              </div>
            </div>
            <div className="p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">Time Taken</div>
              <div className="font-mono text-xl font-bold text-ink-900 flex items-center justify-center gap-1.5">
                <Clock size={16} className="text-ink-400" />
                {formatTime(mockResult.timeTaken)}
              </div>
            </div>
            <div className="p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">Pass Threshold</div>
              <div className="font-mono text-xl font-bold text-ink-900">{mockResult.passingThreshold}%</div>
            </div>
          </div>
        </div>

        {/* Topic breakdown */}
        <div className="card p-6 mb-6">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Performance by Topic</h2>
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
        <div className="flex gap-3">
          <button className="btn-primary">
            <Download size={16} /> Download PDF
          </button>
          <button onClick={() => navigate("/student/history")} className="btn-secondary">
            <Trophy size={16} /> View All Results
          </button>
        </div>
      </main>
    </div>
  );
}