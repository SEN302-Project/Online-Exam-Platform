import { AlertCircle, CheckCircle2, Flag } from "lucide-react";
import Modal from "../common/Modal";

export default function SubmitConfirmDialog({
  open,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount,
  flaggedCount,
  submitting,
}) {
  const unanswered = totalQuestions - answeredCount;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Submit Examination?"
      size="md"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose} disabled={submitting}>
            Review Answers
          </button>
          <button className="btn-primary" onClick={onConfirm} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Final"}
          </button>
        </>
      }
    >
      <p className="text-ink-600 mb-5">
        Once submitted, you cannot return to make changes. Please review your status below.
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-accent-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-accent-600" />
            <span className="font-medium text-ink-900">Answered</span>
          </div>
          <span className="font-mono font-semibold text-accent-700">
            {answeredCount} / {totalQuestions}
          </span>
        </div>

        {unanswered > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-danger/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-danger" />
              <span className="font-medium text-ink-900">Unanswered</span>
            </div>
            <span className="font-mono font-semibold text-danger">{unanswered}</span>
          </div>
        )}

        {flaggedCount > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-warning/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <Flag size={18} className="text-warning" fill="currentColor" />
              <span className="font-medium text-ink-900">Flagged for review</span>
            </div>
            <span className="font-mono font-semibold text-warning">{flaggedCount}</span>
          </div>
        )}
      </div>
    </Modal>
  );
}