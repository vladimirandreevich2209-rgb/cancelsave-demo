export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, contact, site } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    const TG_TOKEN = process.env.TG_TOKEN;
    const TG_CHAT_ID = process.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      return res.status(500).json({ error: 'Переменные окружения не настроены в Vercel' });
    }

    const text = `🔥 *Новая заявка CancelSave 2.0!*\n\n👤 *Имя:* ${name || 'Не указано'}\n✈️ *Контакт:* ${contact || 'Не указан'}\n🌐 *Проект:* ${site || 'Не указан'}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const tgData = await tgRes.json();

    if (tgRes.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(500).json({ error: tgData.description || 'Telegram Error' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
