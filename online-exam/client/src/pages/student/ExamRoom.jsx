import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Save, Send } from "lucide-react";
import Timer from "../../components/common/Timer";
import QuestionCard from "../../components/exam/QuestionCard";
import NavigationPanel from "../../components/exam/NavigationPanel";
import SubmitConfirmDialog from "../../components/exam/SubmitConfirmDialog";
import WebcamFeed from "../../components/proctoring/WebcamFeed";
import EnvironmentCheck from "../../components/proctoring/EnvironmentCheck";
import ProctorAlertBanner from "../../components/proctoring/ProctorAlertBanner";
import { useTimer } from "../../hooks/useTimer";
import { useAutoSave } from "../../hooks/useAutoSave";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Mock exam data - replace with examService.getExamById(examId)
const mockExam = {
  id: "1",
  title: "Software Construction Final",
  course: "SEN 306",
  durationSeconds: 5400, // 90 min
  questions: [
    {
      id: "q1",
      type: "mcq",
      prompt: "Which search algorithm is guaranteed to find the optimal solution in a weighted graph with non-negative weights?",
      points: 2,
      options: [
        { id: "a", text: "Depth-First Search (DFS)" },
        { id: "b", text: "Breadth-First Search (BFS)" },
        { id: "c", text: "A* Search" },
        { id: "d", text: "Hill Climbing" },
      ],
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A pre-condition is a Boolean expression that must be true before a function executes.",
      points: 1,
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" },
      ],
    },
    {
      id: "q3",
      type: "multi_select",
      prompt: "Which of the following are valid heuristics for the 8-puzzle problem? (Select all that apply)",
      points: 3,
      options: [
        { id: "a", text: "Number of misplaced tiles" },
        { id: "b", text: "Sum of Manhattan distances" },
        { id: "c", text: "Random number between 0 and 8" },
        { id: "d", text: "Euclidean distance for each tile" },
      ],
    },
    {
      id: "q4",
      type: "short_answer",
      prompt: "Define a loop invariant in your own words.",
      points: 3,
    },
    {
      id: "q5",
      type: "essay",
      prompt: "Compare and contrast Best-First Search and A* Search. Discuss completeness, optimality, and time complexity.",
      points: 10,
    },
  ],
};

export default function ExamRoom() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("loading"); // loading | check | active | submitted
  const [exam, setExam] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  // Load exam
  useEffect(() => {
    // examService.getExamById(examId).then(setExam);
    setTimeout(() => {
      setExam(mockExam);
      setPhase("check");
    }, 400);
  }, [examId]);

  // Timer
  const handleExpire = async () => {
    if (phase !== "active") return;
    await handleSubmit();
  };
  const { secondsLeft, warning } = useTimer(
    exam?.durationSeconds || 0,
    handleExpire,
    [600, 300, 60]
  );

  // Auto-save (FR-ED-02: every 30s and on change)
  const { status: saveStatus } = useAutoSave(
    answers,
    async (data) => {
      // await examService.autoSave(examId, data);
      return Promise.resolve();
    },
    30000,
    2000
  );

  // Anti-cheating: window blur detection (FR-ED-01)
  useEffect(() => {
    if (phase !== "active") return;
    const handleBlur = () => {
      setAlert({ message: "You appear to have left the exam window. This event has been logged." });
      // proctoringService.reportIncident(examId, { type: "window_blur" });
    };
    const handleVisibility = () => document.hidden && handleBlur();
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [phase]);

  // Block copy/paste and right-click during exam
  useEffect(() => {
    if (phase !== "active") return;
    const block = (e) => e.preventDefault();
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
    };
  }, [phase]);

  if (phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" label="Preparing your exam…" />
      </div>
    );
  }

  if (phase === "check") {
    return (
      <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
        <EnvironmentCheck onComplete={() => setPhase("active")} />
      </div>
    );
  }

  const currentQuestion = exam.questions[currentIndex];
  const answeredCount = Object.values(answers).filter((v) =>
    Array.isArray(v) ? v.length > 0 : v !== undefined && v !== ""
  ).length;

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(currentIndex) ? next.delete(currentIndex) : next.add(currentIndex);
      return next;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // const result = await examService.submitExam(examId, answers);
      await new Promise((r) => setTimeout(r, 1000));
      navigate(`/student/results/mock-result-id`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <ProctorAlertBanner alert={alert} onDismiss={() => setAlert(null)} />

      {/* Slim exam header (no nav links to prevent leaving) */}
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wider text-ink-400">{exam.course}</div>
            <h1 className="font-display font-semibold text-ink-900 truncate">{exam.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Save status */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-500">
              <Save size={13} className={saveStatus === "saving" ? "animate-pulse" : ""} />
              <span>
                {saveStatus === "saving" && "Saving…"}
                {saveStatus === "saved" && "Saved"}
                {saveStatus === "idle" && "Auto-save on"}
                {saveStatus === "error" && "Save failed"}
              </span>
            </div>

            <Timer secondsLeft={secondsLeft} warning={warning} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Question area */}
          <div>
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={exam.questions.length}
              currentAnswer={answers[currentQuestion.id]}
              onAnswerChange={handleAnswer}
              isFlagged={flagged.has(currentIndex)}
              onToggleFlag={toggleFlag}
            />

            {/* Footer nav */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="btn-secondary"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {currentIndex < exam.questions.length - 1 ? (
                <button onClick={() => setCurrentIndex((i) => i + 1)} className="btn-primary">
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={() => setShowSubmit(true)} className="btn-primary !bg-success hover:!bg-emerald-700">
                  <Send size={15} />
                  Submit Exam
                </button>
              )}
            </div>
          </div>

          {/* Side panel */}
          <aside className="space-y-4">
            <WebcamFeed />
            <NavigationPanel
              totalQuestions={exam.questions.length}
              currentIndex={currentIndex}
              answers={answers}
              questionIds={exam.questions.map((q) => q.id)}
              flaggedQuestions={flagged}
              onJump={setCurrentIndex}
            />
          </aside>
        </div>
      </main>

      <SubmitConfirmDialog
        open={showSubmit}
        onClose={() => setShowSubmit(false)}
        onConfirm={handleSubmit}
        totalQuestions={exam.questions.length}
        answeredCount={answeredCount}
        flaggedCount={flagged.size}
        submitting={submitting}
      />
    </div>
  );
}