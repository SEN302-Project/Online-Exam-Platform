import { Flag } from "lucide-react";
import AnswerOptions from "./AnswerOptions";

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag,
}) {
  return (
    <article className="card p-6 sm:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-ink-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-400">
            <span>Question {questionNumber}</span>
            <span>/</span>
            <span>{totalQuestions}</span>
            <span className="badge bg-ink-100 text-ink-600 ml-1">
              {question.points} {question.points === 1 ? "pt" : "pts"}
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-tight text-ink-900">
            {question.prompt}
          </h2>
        </div>

        <button
          onClick={onToggleFlag}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isFlagged
              ? "border-warning bg-warning/10 text-warning"
              : "border-ink-200 text-ink-500 hover:bg-ink-50"
          }`}
        >
          <Flag size={15} fill={isFlagged ? "currentColor" : "none"} />
          {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>

      {/* Question media */}
      {question.image && (
        <img
          src={question.image}
          alt=""
          className="mb-6 rounded-xl border border-ink-100 max-h-80 object-contain"
        />
      )}

      {/* Answer area */}
      <AnswerOptions
        question={question}
        currentAnswer={currentAnswer}
        onAnswerChange={onAnswerChange}
      />
    </article>
  );
}