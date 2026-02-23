import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';

export function useUserProgress(userId: string | undefined) {
  const [tracedLetterIds, setTracedLetterIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    const supabase = getSupabase();
    if (!userId || !supabase) {
      setTracedLetterIds(new Set());
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('traced_letter_ids')
        .eq('user_id', userId)
        .single();
      if (error) {
        if (error.code !== 'PGRST116') console.warn('Supabase fetch progress:', error);
        setTracedLetterIds(new Set());
      } else if (data?.traced_letter_ids?.length) {
        setTracedLetterIds(new Set(data.traced_letter_ids));
      } else {
        setTracedLetterIds(new Set());
      }
    } catch {
      setTracedLetterIds(new Set());
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const addTracedLetter = useCallback(
    async (letterId: string) => {
      const next = new Set(tracedLetterIds).add(letterId);
      setTracedLetterIds(next);

      const supabase = getSupabase();
      if (!userId || !supabase) return;

      await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            traced_letter_ids: Array.from(next),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
    },
    [userId, tracedLetterIds]
  );

  return { tracedLetterIds, addTracedLetter, loading, refetch: fetchProgress };
}
