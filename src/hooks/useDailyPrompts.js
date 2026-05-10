import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { getDailyQuestions } from "../data/questions"; // Phao cứu sinh khi mất mạng

export function useDailyPrompts(roomId) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchPrompts = async () => {
      try {
        // 🚀 Gọi Edge Function "generate-daily-prompts"
        const { data, error: invokeError } = await supabase.functions.invoke(
          "generate-daily-prompts",
          { body: { room_id: roomId } }
        );

        if (invokeError) throw invokeError;

        if (isMounted) {
          // Server trả về data.prompts (đúng chuẩn 6 câu)
          setQuestions(data.prompts || []);
          setError(null);
        }
      } catch (err) {
        console.warn("⚠️ Edge Function thất bại, dùng fallback local:", err);
        
        if (isMounted) {
          // Nếu server lỗi, dùng hàm cũ trong questions.js để chữa cháy
          const fallbackQuestions = getDailyQuestions(6);
          setQuestions(fallbackQuestions);
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrompts();

    return () => { isMounted = false; };
  }, [roomId]);

  return { questions, loading, error };
}