import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getDailyQuestions } from "../data/questions";

export function useDailyPrompts(roomId) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithRetry = async (retries = 2) => {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        // Đảm bảo session đã sẵn sàng trước khi gọi
        await supabase.auth.getSession();
        const { data, error } = await supabase.functions.invoke("generate-daily-prompts", {
          body: { room_id: roomId },
        });
        if (error) {
          if (error.status === 401) {
            // Token chưa kịp refresh, đợi 1s rồi thử lại
            await new Promise(r => setTimeout(r, 1000));
            continue;
          }
          throw error;
        }
        return data.prompts;
      } catch (err) {
        lastError = err;
        if (err.status !== 401) break;
      }
    }
    throw lastError;
  };

  useEffect(() => {
    if (!roomId) return;
    let cancelled = false;

    const fetchPrompts = async () => {
      try {
        const prompts = await fetchWithRetry(2);
        if (!cancelled) setQuestions(prompts);
      } catch (err) {
        console.warn("Edge Function thất bại, dùng fallback local:", err);
        if (!cancelled) {
          const fallback = getDailyQuestions(6);
          setQuestions(fallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPrompts();
    return () => { cancelled = true; };
  }, [roomId]);

  return { questions, loading };
}