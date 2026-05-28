import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Navbar from "../../components/common/Navbar";

export default function CreateExam() {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    title: "",
    description: "",
    course: "",
    duration: 60,
    startTime: "",
    endTime: "",
    attempts: 1,
    passingThreshold: 60,
    proctoringMode: "ai_only",
    randomize: true,
    preventBackward: false,
    questions: [],
  });

  const update = (field, value) => setExam((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => navigate("/instructor")}
          className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900">Create Exam</h1>
            <p className="mt-1 text-ink-500">Configure exam settings and add questions.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate("/instructor/drafts")} className="btn-secondary">Save Draft</button>
            <button className="btn-primary">
              <Save size={15} /> Publish
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic info */}
          <section className="card p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-1">Basic Information</h2>
            <p className="text-sm text-ink-500 mb-5">Title, description, and course assignment.</p>

            <div className="space-y-4">
              <Field label="Exam title" required>
                <input
                  type="text"
                  value={exam.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="input"
                  placeholder="e.g. Software Construction Final"
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={exam.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                  className="input resize-none"
                  placeholder="Brief description of the exam content and expectations…"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Course code" required>
                  <input
                    type="text"
                    value={exam.course}
                    onChange={(e) => update("course", e.target.value)}
                    className="input"
                    placeholder="SEN 306"
                  />
                </Field>
                <Field label="Duration (minutes)" required>
                  <input
                    type="number"
                    value={exam.duration}
                    onChange={(e) => update("duration", parseInt(e.target.value))}
                    className="input"
                    min="1"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section className="card p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-1">Schedule</h2>
            <p className="text-sm text-ink-500 mb-5">When the exam is available to students.</p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start time">
                <input
                  type="datetime-local"
                  value={exam.startTime}
                  onChange={(e) => update("startTime", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="End time">
                <input
                  type="datetime-local"
                  value={exam.endTime}
                  onChange={(e) => update("endTime", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
          </section>

          {/* Settings */}
          <section className="card p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-1">Exam Settings</h2>
            <p className="text-sm text-ink-500 mb-5">Configure proctoring and behavior options.</p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <Field label="Allowed attempts">
                <input
                  type="number"
                  value={exam.attempts}
                  onChange={(e) => update("attempts", parseInt(e.target.value))}
                  className="input"
                  min="1"
                />
              </Field>
              <Field label="Passing threshold (%)">
                <input
                  type="number"
                  value={exam.passingThreshold}
                  onChange={(e) => update("passingThreshold", parseInt(e.target.value))}
                  className="input"
                  min="0"
                  max="100"
                />
              </Field>
            </div>

            <Field label="Proctoring mode">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "none", label: "None" },
                  { value: "ai_only", label: "AI Only" },
                  { value: "human_only", label: "Human" },
                  { value: "hybrid", label: "Hybrid" },
                ].map((p) => (
                  <button
                    key={p.value}
                    onClick={() => update("proctoringMode", p.value)}
                    className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                      exam.proctoringMode === p.value
                        ? "border-accent-600 bg-accent-50 text-accent-700"
                        : "border-ink-100 text-ink-600 hover:border-ink-300"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="mt-5 space-y-2.5">
              <Toggle
                label="Randomize question order"
                checked={exam.randomize}
                onChange={(v) => update("randomize", v)}
              />
              <Toggle
                label="Prevent backward navigation"
                checked={exam.preventBackward}
                onChange={(v) => update("preventBackward", v)}
              />
            </div>
          </section>

          {/* Questions */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink-900">Questions</h2>
                <p className="text-sm text-ink-500">Add questions from the bank or create new ones.</p>
              </div>
              <button className="btn-primary">
                <Plus size={15} /> Add Question
              </button>
            </div>
            <div className="rounded-xl border-2 border-dashed border-ink-200 p-10 text-center text-ink-400">
              No questions added yet. Click "Add Question" to begin.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-700 block mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-accent-600" : "bg-ink-200"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}