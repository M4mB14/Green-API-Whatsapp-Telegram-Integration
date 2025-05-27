import express, { Request, Response } from 'express';
import {transformer} from "./transformer";
import dotenv from 'dotenv'

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Парсит JSON-тело запроса

app.post('/webhook', async (req: Request, res: Response) => {
  let messengerType: 'whatsapp' | 'telegram';

  try {
    // Попытка извлечь поле, которое есть только у WhatsApp
    const instanceData = req.body.instanceData;
    if (instanceData) {
      messengerType = 'whatsapp';
    } else {
      messengerType = 'telegram';
    }
  } catch (error) {
    messengerType = 'telegram';
  }

  if (messengerType === 'whatsapp') {
    try {
      const message = req.body.messageData?.textMessageData?.textMessage;
      await transformer(messengerType,message)
    } catch (error) {
      console.error('Ошибка при обработке WhatsApp сообщения:', error);
    }
  } else if (messengerType === 'telegram') {
    const message = req.body.message.text
    await transformer(messengerType,message)
  }

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Webhook-сервер слушает http://localhost:${PORT}/webhook`);
});