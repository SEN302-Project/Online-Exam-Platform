import { Flag } from "lucide-react";

export default function NavigationPanel({
  totalQuestions,
  currentIndex,
  answers,
  questionIds,
  flaggedQuestions,
  onJump,
}) {
  const answeredCount = Object.keys(answers).filter((id) => {
    const v = answers[id];
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && v !== "";
  }).length;

  return (
    <div className="card p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink-900">Questions</h3>
        <span className="text-xs font-mono text-ink-500">
          {answeredCount}/{totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 w-full rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full bg-accent-600 transition-all duration-500"
          style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question grid */}
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const qId = questionIds[i];
          const isAnswered = answers[qId] !== undefined && answers[qId] !== "";
          const isCurrent = i === currentIndex;
          const isFlagged = flaggedQuestions.has(i);

          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={`relative h-9 w-9 rounded-lg text-sm font-semibold transition ${
                isCurrent
                  ? "bg-ink-900 text-white ring-2 ring-ink-900 ring-offset-2"
                  : isAnswered
                    ? "bg-accent-100 text-accent-700 hover:bg-accent-200"
                    : "bg-ink-50 text-ink-500 hover:bg-ink-100"
              }`}
            >
              {i + 1}
              {isFlagged && (
                <Flag
                  size={9}
                  fill="currentColor"
                  className="absolute -top-1 -right-1 text-warning"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-ink-100 space-y-1.5 text-xs text-ink-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-accent-100" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-ink-50 border border-ink-200" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={11} fill="currentColor" className="text-warning" />
          <span>Flagged for review</span>
        </div>
      </div>
    </div>
  );
}