export const getStreakReminderEmail = (userName, partnerName, streakCount, appLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .card { background: linear-gradient(135deg, #0a0a12 0%, #1a0a1f 100%); border-radius: 16px; padding: 32px; color: #fff; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
    .header { text-align: center; margin-bottom: 24px; }
    .flame { font-size: 56px; animation: float 3s ease-in-out infinite; display: inline-block; }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    h1 { margin: 12px 0 0 0; font-size: 24px; font-weight: 800; color: #ffd166; }
    h2 { font-size: 28px; margin: 24px 0 12px 0; color: #fff; }
    .streak { background: rgba(255, 209, 102, 0.15); border: 1px solid rgba(255, 209, 102, 0.3); border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0; }
    .streak-number { font-size: 48px; font-weight: 900; color: #ffd166; }
    .streak-text { font-size: 14px; color: #aaa; margin-top: 4px; }
    .message { font-size: 16px; line-height: 1.6; color: #ddd; margin: 20px 0; }
    .heart { color: #ff6b9d; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #ff6b9d 0%, #ff5080 100%); color: #fff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin-top: 20px; transition: transform 0.2s, box-shadow 0.2s; }
    .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255, 107, 157, 0.3); }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
    .divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="flame">🔥</div>
        <h1>Lửa Nhỏ</h1>
      </div>
      
      <h2>Đừng để lửa vụt tắt!</h2>
      
      <p class="message">
        Xin chào <strong>${userName}</strong>,<br><br>
        Bạn và <strong>${partnerName}</strong> đã giữ chuỗi <span class="heart">♥</span> của mình trong <strong>${streakCount} ngày</strong> rồi! 🎉<br><br>
        Hôm nay còn một câu hỏi đợi bạn. Cùng nhau trả lời để tiếp tục giữ lửa nhỏ âm ấm này nhé!
      </p>

      <div class="streak">
        <div class="streak-number">${streakCount}</div>
        <div class="streak-text">ngày liên tiếp cùng nhau</div>
      </div>

      <div style="text-align: center;">
        <a href="${appLink}" class="cta-button">📱 Mở ứng dụng ngay</a>
      </div>

      <div class="divider"></div>

      <p class="message" style="font-size: 14px; margin: 20px 0 0 0;">
        💝 Hãy để những kỷ niệm này trở nên thật đặc biệt.<br>
        <em>— Lửa Nhỏ Team</em>
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Lửa Nhỏ. Ứng dụng yêu cho những cặp đôi yêu thương.</p>
    </div>
  </div>
</body>
</html>
`;
