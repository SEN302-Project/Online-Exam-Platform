import { useEffect, useRef, useState } from "react";

/**
 * Auto-save with both interval and debounced change-based saves.
 * @param {Object} data - The data to persist.
 * @param {Function} saveFn - Async function to perform the save.
 * @param {number} intervalMs - Periodic save interval (default 30s per SRS FR-ED-02).
 * @param {number} debounceMs - Debounce window after a change (default 2s).
 */
export function useAutoSave(data, saveFn, intervalMs = 30000, debounceMs = 2000) {
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const lastDataRef = useRef(JSON.stringify(data));
  const debounceTimer = useRef(null);

  const save = async () => {
    try {
      setStatus("saving");
      await saveFn(data);
      setStatus("saved");
      setLastSavedAt(new Date());
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error("Auto-save failed:", err);
      setStatus("error");
    }
  };

  // Debounced save on change
  useEffect(() => {
    const serialized = JSON.stringify(data);
    if (serialized === lastDataRef.current) return;
    lastDataRef.current = serialized;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(save, debounceMs);

    return () => clearTimeout(debounceTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Interval-based save
  useEffect(() => {
    const id = setInterval(save, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs]);

  return { status, lastSavedAt };
}