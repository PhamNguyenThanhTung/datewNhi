import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { getStreakReminderEmail } from "./email-template.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Verify cron authentication
const verifyCronSecret = (req) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  return token === process.env.CRON_SECRET;
};

// Get today's date in Vietnam timezone (UTC+7)
const getTodayInVN = () => {
  const now = new Date();
  const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return vnTime.toISOString().split("T")[0];
};

// Create Gmail OAuth2 transporter
const createGmailTransporter = async () => {
  const { google } = await import("googleapis");
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
};

// Get today's answers count by couple_room
const getUnansweredCouples = async (today) => {
  const startOfDay = `${today}T00:00:00Z`;
  const endOfDay = `${today}T23:59:59Z`;

  const { data: rooms, error: roomsError } = await supabase
    .from("couple_rooms")
    .select(`
      id,
      user1_id,
      user2_id,
      streak_count,
      profiles!couple_rooms_user1_id_fkey (
        id,
        email,
        display_name
      ),
      profiles!couple_rooms_user2_id_fkey (
        id,
        email,
        display_name
      )
    `);

  if (roomsError) {
    console.error("Error fetching rooms:", roomsError);
    return [];
  }

  const result = [];

  for (const room of rooms) {
    // Get answers for today
    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select("user_id")
      .eq("room_id", room.id)
      .gte("created_at", startOfDay)
      .lte("created_at", endOfDay);

    if (answersError) {
      console.error("Error fetching answers:", answersError);
      continue;
    }

    const user1Answered = answers.some((a) => a.user_id === room.user1_id);
    const user2Answered = answers.some((a) => a.user_id === room.user2_id);

    // If either user hasn't answered, add to result
    if (!user1Answered || !user2Answered) {
      result.push({
        roomId: room.id,
        unansweredUsers: [
          !user1Answered && {
            id: room.user1_id,
            email: room.profiles[0]?.email,
            name: room.profiles[0]?.display_name || "Bạn",
            partnerName:
              room.profiles[1]?.display_name || "Người ấy",
          },
          !user2Answered && {
            id: room.user2_id,
            email: room.profiles[1]?.email,
            name: room.profiles[1]?.display_name || "Bạn",
            partnerName:
              room.profiles[0]?.display_name || "Người ấy",
          },
        ].filter(Boolean),
        streakCount: room.streak_count || 0,
      });
    }
  }

  return result;
};

// Send reminder emails
const sendReminderEmails = async (transporter, couples, appLink) => {
  let sent = 0;
  let failed = 0;

  for (const couple of couples) {
    for (const user of couple.unansweredUsers) {
      try {
        const emailHtml = getStreakReminderEmail(
          user.name,
          user.partnerName,
          couple.streakCount,
          appLink
        );

        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: `🔥 Đừng để chuỗi ${couple.streakCount} ngày tắt! | Lửa Nhỏ`,
          html: emailHtml,
        });

        sent++;
        console.log(`✅ Email sent to ${user.email}`);
      } catch (error) {
        failed++;
        console.error(`❌ Failed to send email to ${user.email}:`, error);
      }
    }
  }

  return { sent, failed };
};

// Main handler
export default async (req, res) => {
  // Security: Verify cron request
  if (!verifyCronSecret(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("🚀 Starting streak reminder cron job...");

    const today = getTodayInVN();
    console.log(`📅 Today in VN timezone: ${today}`);

    // Get unanswered couples
    const unansweredCouples = await getUnansweredCouples(today);
    console.log(`📊 Found ${unansweredCouples.length} couples with unanswered users`);

    if (unansweredCouples.length === 0) {
      return res.json({
        success: true,
        message: "No reminders needed today",
        processed: 0,
      });
    }

    // Create Gmail transporter
    const transporter = await createGmailTransporter();

    // Send emails
    const appLink =
      process.env.APP_URL ||
      "https://datewnhi.vercel.app/";
    const { sent, failed } = await sendReminderEmails(
      transporter,
      unansweredCouples,
      appLink
    );

    console.log(`📧 Email sending complete: ${sent} sent, ${failed} failed`);

    res.json({
      success: true,
      message: "Streak reminders sent successfully",
      processed: unansweredCouples.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("❌ Cron job error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
