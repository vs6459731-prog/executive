import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { efLessons } from '@/data/efLessons';

export const EF_PROGRESS_STORAGE_KEY = 'seonbi.ef-progress.v1';
const initialProgress = { completed: 0, startedNext: false };
type Progress = typeof initialProgress;

function decodeProgress(raw: string | null): Progress {
  if (raw === null) return initialProgress;
  const saved = JSON.parse(raw);
  if (
    !Number.isInteger(saved?.completed) ||
    saved.completed < 0 ||
    saved.completed > efLessons.length ||
    typeof saved.startedNext !== 'boolean'
  ) {
    return initialProgress;
  }
  return { completed: saved.completed, startedNext: saved.startedNext };
}

function useProgressState() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const current = useRef<Progress | null>(null);
  const writing = useRef(false);

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const raw = await AsyncStorage.getItem(EF_PROGRESS_STORAGE_KEY);
      let next: Progress;
      try {
        next = decodeProgress(raw);
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
        next = initialProgress;
      }
      current.current = next;
      setProgress(next);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const saveLesson = useCallback(async (index: number, complete: boolean) => {
    const previous = current.current;
    if (!previous || index > previous.completed || writing.current) return false;
    if (index < previous.completed || (!complete && previous.startedNext)) return true;

    const next = complete
      ? { completed: index + 1, startedNext: false }
      : { ...previous, startedNext: true };
    writing.current = true;
    setSaving(true);
    setSaveError(false);
    try {
      await AsyncStorage.setItem(EF_PROGRESS_STORAGE_KEY, JSON.stringify(next));
      current.current = next;
      setProgress(next);
      return true;
    } catch {
      setSaveError(true);
      return false;
    } finally {
      writing.current = false;
      setSaving(false);
    }
  }, []);

  return { progress, load, loadError, saveLesson, saving, saveError };
}

const EfProgressContext = createContext<ReturnType<typeof useProgressState> | null>(null);

export function EfProgressProvider({ children }: { children: ReactNode }) {
  return <EfProgressContext.Provider value={useProgressState()}>{children}</EfProgressContext.Provider>;
}

export function useEfProgress() {
  const value = useContext(EfProgressContext);
  if (!value) throw new Error('EF progress is only available within the module.');
  return value;
}
