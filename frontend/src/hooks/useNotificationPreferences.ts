import { useState, useCallback } from "react";

const STORAGE_KEY = "wc_notif_subscriptions";

function readStorage(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function writeStorage(ids: Set<number>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useNotificationPreferences() {
  const [subscribed, setSubscribed] = useState<Set<number>>(() => readStorage());

  const isSubscribed = useCallback(
    (matchId: number) => subscribed.has(matchId),
    [subscribed],
  );

  const toggle = useCallback((matchId: number) => {
    setSubscribed((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }
      writeStorage(next);
      return next;
    });
  }, []);

  const subscribe = useCallback((matchId: number) => {
    setSubscribed((prev) => {
      if (prev.has(matchId)) return prev;
      const next = new Set(prev);
      next.add(matchId);
      writeStorage(next);
      return next;
    });
  }, []);

  const unsubscribe = useCallback((matchId: number) => {
    setSubscribed((prev) => {
      if (!prev.has(matchId)) return prev;
      const next = new Set(prev);
      next.delete(matchId);
      writeStorage(next);
      return next;
    });
  }, []);

  return { subscribed, isSubscribed, toggle, subscribe, unsubscribe };
}

export function getSubscribedMatchIds(): Set<number> {
  return readStorage();
}
