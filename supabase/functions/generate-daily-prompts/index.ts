import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { ALL_QUESTIONS, FREQUENCY_DAYS } from "../_shared/questions.ts";

const DAILY_DISTRIBUTION = { daily: 3, weekly: 1, monthly: 1, rare: 1 };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ✅ FIX 1: Thêm type Request cho biến req
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { 
        global: { 
          headers: { 
            Authorization: req.headers.get("Authorization") || "" 
          } 
        } 
      }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    let body: { room_id: string };
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: corsHeaders });
    }
    
    const { room_id } = body;
    if (!room_id) {
      return new Response(JSON.stringify({ error: "Missing room_id" }), { status: 400, headers: corsHeaders });
    }

    const { data: room } = await supabaseClient
      .from("couple_rooms")
      .select("id, user1_id, user2_id")
      .eq("id", room_id)
      .single();

    if (!room) return new Response(JSON.stringify({ error: "Room not found" }), { status: 404, headers: corsHeaders });
    if (room.user1_id !== user.id && room.user2_id !== user.id) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });
    }

    const today = new Date().toISOString().split("T")[0]; 

    const { data: existing } = await supabaseClient
      .from("daily_prompts")
      .select("question_data")
      .eq("room_id", room_id)
      .eq("date_key", today);

    if (existing && existing.length > 0) {
      // ✅ FIX 2: Thêm type any cho biến e
      return new Response(JSON.stringify({ prompts: existing.map((e: any) => e.question_data) }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: history } = await supabaseClient
      .from("question_history")
      .select("question_id, shown_date")
      .eq("room_id", room_id);

    const lastShownMap = new Map<string, string>();
    // ✅ FIX 3: Thêm type any cho biến h
    (history || []).forEach((h: any) => {
      const d = lastShownMap.get(h.question_id);
      if (!d || h.shown_date > d) lastShownMap.set(h.question_id, h.shown_date);
    });

    const todayDate = new Date(today);

    const pools: Record<string, any[]> = { daily: [], weekly: [], monthly: [], rare: [] };
    for (const q of ALL_QUESTIONS) {
      const questionId = q.id || q.vi; 
      
      const lastShown = lastShownMap.get(questionId);
      if (lastShown) {
        const diffDays = Math.floor((todayDate.getTime() - new Date(lastShown).getTime()) / (1000 * 60 * 60 * 24));
        const requiredGap = FREQUENCY_DAYS[q.frequency] || 30;
        if (diffDays < requiredGap) continue;
      }
      const freq = q.frequency || "daily";
      if (pools[freq]) pools[freq].push(q);
      else pools.daily.push(q); 
    }

    const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);
    const selected: any[] = [];
    for (const [freq, count] of Object.entries(DAILY_DISTRIBUTION)) {
      const pool = pools[freq] || [];
      selected.push(...shuffle(pool).slice(0, count));
    }

    while (selected.length < 6) {
       const randomQ = ALL_QUESTIONS[Math.floor(Math.random() * ALL_QUESTIONS.length)];
       selected.push(randomQ);
    }

    // ✅ FIX 4: Thêm type cho biến q, i
    const promptsWithKey = selected.map((q: any, i: number) => ({ ...q, promptKey: `${today}#${i}` }));

    const { error: insertErr } = await supabaseClient.from("daily_prompts").insert(
      promptsWithKey.map((q: any) => ({ room_id, date_key: today, question_data: q }))
    );
    if (insertErr) {
      console.error("Lỗi insert daily_prompts:", insertErr);
    }

    await supabaseClient.from("question_history").insert(
      promptsWithKey.map((q: any) => ({ room_id, question_id: q.id || q.vi, shown_date: today }))
    );

    return new Response(JSON.stringify({ prompts: promptsWithKey }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Bắt lỗi tổng:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});