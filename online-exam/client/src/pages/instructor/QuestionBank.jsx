import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Upload, Tag, ArrowLeft, X } from "lucide-react";
import Navbar from "../../components/common/Navbar";

const mockQuestions = [
  { id: "1", prompt: "What is the time complexity of binary search?", type: "mcq", difficulty: "easy", topic: "Algorithms", course: "CSC 204" },
  { id: "2", prompt: "Explain the difference between BFS and DFS.", type: "essay", difficulty: "medium", topic: "Graph Theory", course: "SEN 306" },
  { id: "3", prompt: "A pre-condition must always be true before function execution.", type: "true_false", difficulty: "easy", topic: "Software Design", course: "SEN 306" },
  { id: "4", prompt: "Write a Python function that finds the longest palindromic substring.", type: "coding", difficulty: "hard", topic: "Strings", course: "CSC 203" },
];

const TYPE_COLORS = {
  mcq: "bg-accent-50 text-accent-700",
  true_false: "bg-success/10 text-success",
  essay: "bg-warning/10 text-warning",
  coding: "bg-ink-900 text-white",
  short_answer: "bg-ink-100 text-ink-700",
};

const DIFF_COLORS = {
  easy: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  hard: "bg-danger/10 text-danger",
};

export default function QuestionBank() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQ, setNewQ] = useState({
    prompt: "",
    type: "mcq",
    difficulty: "medium",
    topic: "",
    course: "",
  });

  const filtered = mockQuestions.filter(
    (q) =>
      q.prompt.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase()) ||
      q.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    // TODO: wire to backend POST /api/questions
    setShowNewQuestion(false);
    setNewQ({ prompt: "", type: "mcq", difficulty: "medium", topic: "", course: "" });
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <button onClick={() => navigate("/instructor")} className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">Question Bank</h1>
            <p className="mt-1 text-ink-500 text-sm sm:text-base">Manage reusable questions across your exams.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="btn-secondary">
              <Upload size={15} /> Import CSV
            </button>
            <button onClick={() => setShowNewQuestion(true)} className="btn-primary">
              <Plus size={15} /> New Question
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="input pl-10"
            />
          </div>
          <select className="input max-w-[160px]">
            <option>All courses</option>
            <option>SEN 306</option>
            <option>CSC 204</option>
            <option>CSC 203</option>
          </select>
          <select className="input max-w-[160px]">
            <option>All types</option>
            <option>MCQ</option>
            <option>True/False</option>
            <option>Essay</option>
            <option>Coding</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map((q) => (
            <article key={q.id} className="card p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-semibold text-ink-500">{q.course}</span>
                  <span className={`badge ${TYPE_COLORS[q.type]}`}>{q.type.replace("_", " ")}</span>
                  <span className={`badge ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-500">
                  <Tag size={11} /> {q.topic}
                </div>
              </div>
              <p className="text-ink-900 text-sm sm:text-base">{q.prompt}</p>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="card p-12 text-center text-ink-400">No questions match your search.</div>
          )}
        </div>
      </main>

      {/* New Question Modal */}
      {showNewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setShowNewQuestion(false)} />
          <div className="relative w-full max-w-lg card animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-ink-900">New Question</h3>
              <button onClick={() => setShowNewQuestion(false)} className="btn-ghost !p-1.5">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Question prompt</label>
                <textarea
                  required
                  rows={3}
                  value={newQ.prompt}
                  onChange={(e) => setNewQ({ ...newQ, prompt: e.target.value })}
                  className="input resize-none"
                  placeholder="Write your question here..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1.5">Course</label>
                  <input
                    type="text"
                    required
                    value={newQ.course}
                    onChange={(e) => setNewQ({ ...newQ, course: e.target.value })}
                    className="input"
                    placeholder="e.g. SEN 306"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1.5">Topic</label>
                  <input
                    type="text"
                    required
                    value={newQ.topic}
                    onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                    className="input"
                    placeholder="e.g. Algorithms"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1.5">Type</label>
                  <select
                    value={newQ.type}
                    onChange={(e) => setNewQ({ ...newQ, type: e.target.value })}
                    className="input"
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="true_false">True / False</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="essay">Essay</option>
                    <option value="coding">Coding</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1.5">Difficulty</label>
                  <select
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                    className="input"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-ink-100">
                <button type="button" onClick={() => setShowNewQuestion(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}