export default async function handler(req, res) {
  // Разрешаем запросы
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, contact, site } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});


const TG_PART1 = '8602087283:AAGx';
const TG_PART2 = 'u02zheEefW3qCMbIWGlTJdg8jm-ejgA'; 

const TG_BOT_TOKEN = TG_PART1 + TG_PART2;
const TG_CHAT_ID = '740180583';

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
      console.error('Telegram Error:', tgData);
      return res.status(500).json({ error: tgData.description || 'Telegram Error' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
