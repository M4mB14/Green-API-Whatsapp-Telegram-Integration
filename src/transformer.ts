import dotenv from 'dotenv';

dotenv.config();

export async function transformer(messengerType: 'whatsapp' | 'telegram', message: string): Promise<void> {
  if (messengerType === 'telegram') {
    const url = `https://api.green-api.com/waInstance${process.env.GREENAPI_INSTANCE_ID}/sendMessage/${process.env.GREENAPI_API_TOKEN}`;

    const body = {
      chatId: process.env.GREENAPI_PHONE_NUMBER,
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
    } catch (error) {
      console.error('Ошибка при отправке WhatsApp сообщения:', error);
    }

  } else if (messengerType === 'whatsapp') {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const body = {
      chat_id: process.env.TELEGRAM_GROUP_CHAT_ID,
      text: message,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
    } catch (error) {
      console.error('Ошибка при отправке Telegram сообщения:', error);
    }
  } else {
    console.warn('Неизвестный тип мессенджера:', messengerType);
  }
}

// ===== точка входа, если вызывается напрямую =====
if (require.main === module) {
  const [,, typeArg, ...messageParts] = process.argv;

  const messengerType = typeArg as 'whatsapp' | 'telegram';
  const message = messageParts.join(' ');

  if (!messengerType || !message) {
    console.error('Использование: npm run transformer -- <whatsapp|telegram> <сообщение>');
    process.exit(1);
  }

  transformer(messengerType, message);
}