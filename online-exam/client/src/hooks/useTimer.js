import { useEffect, useRef, useState } from "react";

/**
 * Countdown timer with threshold-based alerts.
 * @param {number} initialSeconds - Total exam duration.
 * @param {Function} onExpire - Called when timer hits 0.
 * @param {number[]} thresholds - Seconds at which to fire warnings (e.g. [600, 300]).
 */
export function useTimer(initialSeconds, onExpire, thresholds = [600, 300, 60]) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [warning, setWarning] = useState(null);
  const firedThresholds = useRef(new Set());
  const expired = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!expired.current) {
        expired.current = true;
        onExpire?.();
      }
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        const next = s - 1;
        thresholds.forEach((t) => {
          if (next === t && !firedThresholds.current.has(t)) {
            firedThresholds.current.add(t);
            setWarning(t);
            setTimeout(() => setWarning(null), 4000);
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft, onExpire, thresholds]);

  return { secondsLeft, warning };
}