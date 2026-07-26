export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, site } = req.body;

  // Токен бота и Твой Chat ID
const TG_PART1 = '8602087283:AAHk';
const TG_PART2 = 'cT0pAU12Par_SjoNY_XJV7CQFMgt-bo'; 

const TG_BOT_TOKEN = TG_PART1 + TG_PART2;
const TG_CHAT_ID = '740180583';

  const text = `🔥 *Новая заявка CancelSave 2.0!*\n\n👤 *Имя:* ${name}\n✈️ *Контакт:* ${contact}\n🌐 *Проект:* ${site || 'Не указан'}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    if (tgRes.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(500).json({ error: 'Telegram API Error' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
