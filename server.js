require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const WEBHOOK_URL = (process.env.DISCORD_WEBHOOK_URL || "").trim();
const INVITE_URL = (process.env.DISCORD_INVITE_URL || "").trim();

app.disable("x-powered-by");
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"]
    }
  }
}));
app.use(express.json({ limit: "24kb", type: "application/json" }));

const orderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "تم تجاوز عدد محاولات الطلب. انتظر قليلًا ثم حاول مرة أخرى." }
});

function cleanText(value, maxLength) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function isValidWebhook(urlText) {
  try {
    const url = new URL(urlText);
    return url.protocol === "https:" &&
      (url.hostname === "discord.com" || url.hostname === "discordapp.com") &&
      /^\/api\/webhooks\/\d+\/[A-Za-z0-9_.-]+/.test(url.pathname);
  } catch {
    return false;
  }
}

function isValidInvite(urlText) {
  try {
    const url = new URL(urlText);
    return url.protocol === "https:" &&
      (url.hostname === "discord.gg" || url.hostname === "www.discord.com" || url.hostname === "discord.com") &&
      (url.hostname === "discord.gg" ? url.pathname.length > 1 : url.pathname.startsWith("/invite/"));
  } catch {
    return false;
  }
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/orders", orderLimiter, async (req, res) => {
  if (!isValidWebhook(WEBHOOK_URL)) {
    return res.status(503).json({ error: "إعداد استقبال الطلبات غير مكتمل. يرجى التواصل مع إدارة المتجر." });
  }

  const customerName = cleanText(req.body?.customerName, 70);
  const discordContact = cleanText(req.body?.discordContact, 80);
  const notes = cleanText(req.body?.notes, 1200);
  const incomingItems = Array.isArray(req.body?.items) ? req.body.items : [];

  if (!customerName || !discordContact) {
    return res.status(400).json({ error: "يرجى إدخال الاسم واسم ديسكورد أو User ID." });
  }
  if (incomingItems.length < 1 || incomingItems.length > 10) {
    return res.status(400).json({ error: "يجب أن يحتوي الطلب على منتج واحد على الأقل وبحد أقصى 10 منتجات." });
  }

  const items = incomingItems.map((item, index) => ({
    id: cleanText(item?.id, 40),
    name: cleanText(item?.name, 90),
    category: cleanText(item?.category, 60),
    price: cleanText(item?.price, 40),
    index: index + 1
  }));

  if (items.some(item => !item.id || !/^[a-z0-9-]+$/i.test(item.id) || !item.name)) {
    return res.status(400).json({ error: "تعذر قراءة أحد المنتجات في الطلب. أعد تحميل الصفحة وحاول مرة أخرى." });
  }

  const orderId = `X16-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const itemsText = items.map(item => `${item.index}. **${item.name}** — ${item.price || "السعر عند الطلب"}`).join("\n");
  const fields = [
    { name: "صاحب الطلب", value: customerName, inline: true },
    { name: "التواصل في ديسكورد", value: discordContact, inline: true },
    { name: "المنتجات المطلوبة", value: itemsText.slice(0, 1024), inline: false },
    { name: "ملاحظات العميل", value: notes ? notes.slice(0, 1024) : "لا توجد ملاحظات", inline: false },
    { name: "حالة الطلب", value: "🕓 بانتظار مراجعة فريق المتجر", inline: false }
  ];

  const webhookPayload = {
    content: "📥 وصل طلب جديد من موقع X16 STORE",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: "🛒 طلب جديد — X16 STORE",
      description: `تم استلام طلب جديد. رقم الطلب: **${orderId}**`,
      color: 0xAEB8C2,
      fields,
      footer: { text: "X16 STORE • Order Management" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    const webhook = new URL(WEBHOOK_URL);
    webhook.searchParams.set("wait", "true");
    const discordResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
      signal: AbortSignal.timeout(12000)
    });

    if (!discordResponse.ok) {
      const detail = await discordResponse.text().catch(() => "");
      console.error("Discord webhook rejected order:", discordResponse.status, detail.slice(0, 500));
      return res.status(502).json({ error: "تعذر إرسال طلبك إلى ديسكورد حاليًا. حاول مرة أخرى بعد قليل." });
    }

    return res.status(201).json({
      ok: true,
      orderId,
      message: "تم إرسال طلبك وسيتم مراجعته.",
      inviteUrl: isValidInvite(INVITE_URL) ? INVITE_URL : ""
    });
  } catch (error) {
    console.error("Order submission failed:", error.name, error.message);
    return res.status(502).json({ error: "حدث خطأ في الاتصال أثناء إرسال الطلب. حاول مرة أخرى." });
  }
});

app.use(express.static(path.join(__dirname, "public"), {
  dotfiles: "deny",
  index: "index.html",
  extensions: ["html"]
}));

app.use((err, _req, res, _next) => {
  if (err?.type === "entity.too.large") return res.status(413).json({ error: "بيانات الطلب كبيرة جدًا." });
  console.error("Server error:", err.message);
  return res.status(500).json({ error: "حدث خطأ غير متوقع في الخادم." });
});

app.listen(PORT, () => {
  console.log(`✅ X16 STORE يعمل على http://localhost:${PORT}`);
  console.log(`ℹ️ Discord webhook: ${isValidWebhook(WEBHOOK_URL) ? "configured" : "غير مضبوط — راجع .env"}`);
  console.log(`ℹ️ Discord invite: ${isValidInvite(INVITE_URL) ? "configured" : "غير مضبوط — لن يظهر رابط الدعوة للعميل"}`);
});
