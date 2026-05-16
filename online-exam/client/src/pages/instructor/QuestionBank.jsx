import { useState } from "react";
import { Plus, Search, Upload, Tag } from "lucide-react";
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
  const [search, setSearch] = useState("");

  const filtered = mockQuestions.filter((q) =>
    q.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900">Question Bank</h1>
            <p className="mt-1 text-ink-500">Organize, tag, and reuse questions across exams.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Upload size={15} /> Import CSV
            </button>
            <button className="btn-primary">
              <Plus size={15} /> New Question
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="input pl-10"
            />
          </div>
          <select className="input max-w-[160px]">
            <option>All Types</option>
            <option>Multiple Choice</option>
            <option>True / False</option>
            <option>Essay</option>
            <option>Coding</option>
          </select>
          <select className="input max-w-[160px]">
            <option>All Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Question list */}
        <div className="card divide-y divide-ink-100 overflow-hidden">
          {filtered.map((q) => (
            <div key={q.id} className="p-5 hover:bg-ink-50 transition cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink-900 mb-2">{q.prompt}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`badge ${TYPE_COLORS[q.type]}`}>{q.type.replace("_", " ")}</span>
                    <span className={`badge ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="badge bg-ink-100 text-ink-600">
                      <Tag size={10} /> {q.topic}
                    </span>
                    <span className="badge bg-ink-100 text-ink-600">{q.course}</span>
                  </div>
                </div>
                <button className="btn-ghost !px-3 !py-1.5 !text-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}