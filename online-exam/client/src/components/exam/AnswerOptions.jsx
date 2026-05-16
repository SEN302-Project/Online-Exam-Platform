import { Check } from "lucide-react";

export default function AnswerOptions({ question, currentAnswer, onAnswerChange }) {
  switch (question.type) {
    case "mcq":
    case "true_false":
      return (
        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const selected = currentAnswer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onAnswerChange(opt.id)}
                className={`group w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
                  selected
                    ? "border-accent-600 bg-accent-50"
                    : "border-ink-100 hover:border-ink-300 bg-white"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold transition ${
                    selected
                      ? "bg-accent-600 text-white"
                      : "bg-ink-100 text-ink-500 group-hover:bg-ink-200"
                  }`}
                >
                  {selected ? <Check size={14} strokeWidth={3} /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-ink-900">{opt.text}</span>
              </button>
            );
          })}
        </div>
      );

    case "multi_select":
      return (
        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const selectedSet = new Set(currentAnswer || []);
            const selected = selectedSet.has(opt.id);
            const toggle = () => {
              selected ? selectedSet.delete(opt.id) : selectedSet.add(opt.id);
              onAnswerChange([...selectedSet]);
            };
            return (
              <button
                key={opt.id}
                onClick={toggle}
                className={`group w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
                  selected ? "border-accent-600 bg-accent-50" : "border-ink-100 hover:border-ink-300 bg-white"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
                    selected ? "border-accent-600 bg-accent-600" : "border-ink-300 bg-white"
                  }`}
                >
                  {selected && <Check size={14} strokeWidth={3} className="text-white" />}
                </span>
                <span className="text-ink-900">{opt.text}</span>
              </button>
            );
          })}
        </div>
      );

    case "fill_blank":
    case "short_answer":
      return (
        <input
          type="text"
          value={currentAnswer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer…"
          className="input text-lg py-3"
          autoFocus
        />
      );

    case "essay":
      return (
        <div>
          <textarea
            value={currentAnswer || ""}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Write your essay response here…"
            rows={10}
            className="input resize-y leading-relaxed"
          />
          <div className="mt-2 flex justify-between text-xs text-ink-400">
            <span>{(currentAnswer || "").split(/\s+/).filter(Boolean).length} words</span>
            <span>{(currentAnswer || "").length} characters</span>
          </div>
        </div>
      );

    case "coding":
      return (
        <div className="rounded-xl border border-ink-200 overflow-hidden">
          <div className="flex items-center justify-between bg-ink-900 px-4 py-2 text-ink-300 text-xs font-mono">
            <span>{question.language || "javascript"}</span>
            <span className="text-ink-500">Code Editor</span>
          </div>
          <textarea
            value={currentAnswer || question.starterCode || ""}
            onChange={(e) => onAnswerChange(e.target.value)}
            spellCheck={false}
            rows={14}
            className="w-full bg-ink-950 px-4 py-3 font-mono text-sm text-ink-100 focus:outline-none resize-y"
          />
        </div>
      );

    case "file_upload":
      return (
        <label className="block cursor-pointer rounded-xl border-2 border-dashed border-ink-200 p-8 text-center hover:border-accent-500 hover:bg-accent-50 transition">
          <input
            type="file"
            className="hidden"
            onChange={(e) => onAnswerChange(e.target.files?.[0])}
          />
          <p className="font-medium text-ink-700">
            {currentAnswer?.name || "Click to upload or drag a file here"}
          </p>
          <p className="mt-1 text-sm text-ink-400">PDF, DOCX, or ZIP up to 25MB</p>
        </label>
      );

    default:
      return <p className="text-ink-500">Unsupported question type: {question.type}</p>;
  }
}