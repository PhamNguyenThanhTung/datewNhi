import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, x-client-info, apikey",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    // Xác thực người dùng
    const authHeader = req.headers.get("Authorization") || "";
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = await req.json();
    const { targetUserId, message } = body;
    if (!targetUserId || !message) {
      return new Response(JSON.stringify({ error: "Missing targetUserId or message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Lấy key từ biến môi trường (bạn đã set ở bước trên)
    const ONE_SIGNAL_APP_ID = Deno.env.get("ONE_SIGNAL_APP_ID");
    const ONE_SIGNAL_REST_API_KEY = Deno.env.get("ONE_SIGNAL_REST_API_KEY");
    if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
      throw new Error("Thiếu biến môi trường OneSignal");
    }

    console.log("Đang gửi thông báo với App ID:", ONE_SIGNAL_APP_ID);
    console.log("Key bắt đầu bằng:", ONE_SIGNAL_REST_API_KEY.substring(0, 10) + "...");

    // Gửi đến OneSignal
    const oneSignalRes = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${ONE_SIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONE_SIGNAL_APP_ID,
        include_external_user_ids: [String(targetUserId)],
        contents: { en: message },
        headings: { en: "Lửa Nhỏ 🔥" },
        chrome_web_icon: "https://datew-nhi.vercel.app/logo.jpg",
      }),
    });

    const oneSignalData = await oneSignalRes.json();
    console.log("Kết quả OneSignal:", oneSignalData);

    return new Response(
      JSON.stringify({ success: oneSignalRes.ok, data: oneSignalData }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err) {
    console.error("Lỗi:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});