import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Check, ChevronLeft, ChevronRight, EyeOff } from "lucide-react";
import Navbar from "../../components/common/Navbar";

const mockSubmissions = [
  {
    id: "s1",
    studentName: "Alex M.",
    question: "Compare and contrast Best-First Search and A* Search. Discuss completeness, optimality, and time complexity.",
    response: "Best-First Search uses only the heuristic function h(n) to guide its search, choosing the node that appears closest to the goal at each step. A* Search combines the cost so far g(n) with the heuristic h(n) to form f(n) = g(n) + h(n)...",
    aiScore: 7,
    aiMaxScore: 10,
    aiFeedback: "Strong understanding of both algorithms shown. Could elaborate more on time complexity analysis.",
    rubric: "Define both algorithms (2pts), Compare completeness (3pts), Compare optimality (3pts), Time complexity (2pts)",
    finalScore: null,
  },
];

export default function GradingInterface() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [blindMode, setBlindMode] = useState(false);

  const submission = mockSubmissions[current];

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <button
              onClick={() => navigate("/instructor")}
              className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-2"
            >
              <ArrowLeft size={15} /> Back to dashboard
            </button>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Grading Queue</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBlindMode(!blindMode)}
              className={`btn-secondary !text-sm ${blindMode ? "!bg-ink-900 !text-white" : ""}`}
            >
              <EyeOff size={14} /> Blind Mode {blindMode && "On"}
            </button>
            <div className="text-sm font-mono text-ink-500">
              {current + 1} / 12
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Response area */}
          <div className="space-y-5">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs uppercase tracking-wider text-ink-400">
                  Student
                </div>
                <span className="font-semibold text-ink-900">
                  {blindMode ? "Hidden" : submission.studentName}
                </span>
              </div>

              <div className="mb-5 p-4 rounded-xl bg-ink-50 border border-ink-100">
                <div className="text-xs uppercase tracking-wider text-ink-400 mb-2">Question</div>
                <p className="text-ink-900 leading-relaxed">{submission.question}</p>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-ink-400 mb-2">Response</div>
                <div className="rounded-xl border border-ink-100 p-5 leading-relaxed text-ink-800 whitespace-pre-wrap">
                  {submission.response}
                </div>
              </div>
            </div>

            {/* AI suggestion */}
            <div className="card p-6 border-accent-200 bg-gradient-to-br from-accent-50 to-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white">
                  <Bot size={16} />
                </div>
                <div>
                  <div className="font-semibold text-ink-900">AI-Assisted Suggestion</div>
                  <div className="text-xs text-ink-500">Review and apply or override</div>
                </div>
                <div className="ml-auto font-mono text-2xl font-bold text-accent-700">
                  {submission.aiScore}<span className="text-ink-400 text-base">/{submission.aiMaxScore}</span>
                </div>
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">{submission.aiFeedback}</p>
              <button
                onClick={() => {
                  setScore(submission.aiScore.toString());
                  setFeedback(submission.aiFeedback);
                }}
                className="mt-4 btn-secondary !text-sm"
              >
                <Check size={14} /> Apply AI Suggestion
              </button>
            </div>
          </div>

          {/* Grading panel */}
          <aside className="lg:sticky lg:top-24 space-y-4 self-start">
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-1">Rubric</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{submission.rubric}</p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-4">Your Grade</h3>

              <label className="text-sm font-medium text-ink-700 block mb-1.5">
                Score (out of {submission.aiMaxScore})
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                max={submission.aiMaxScore}
                min="0"
                className="input mb-4 text-2xl font-mono font-bold text-center"
                placeholder="0"
              />

              <label className="text-sm font-medium text-ink-700 block mb-1.5">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="input resize-none text-sm"
                placeholder="Provide feedback to the student…"
              />

              <button className="btn-primary w-full mt-4">
                Save & Next
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className="btn-secondary flex-1 !text-sm"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button className="btn-secondary flex-1 !text-sm">
                Skip <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}