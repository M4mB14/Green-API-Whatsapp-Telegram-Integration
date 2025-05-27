# Green-API-Whatsapp-Telegram-Integration
Интеграция Telegram с GrenAPI

Что нужно для начала работы:
Активированный инстанс на сайте https://green-api.com/

Работающий бот в Telegram

Node.js версии 18.2

npm версии 10.8

Для инициализации и начала работы нужно выполнить следующие шаги:
1) Склонировать репозиторий на свой сервер:
```
git clone https://github.com/M4mB14/Green-API-Whatsapp-Telegram-Integration
```
2) После клонирования репозитория инициализировать npm:
```
npm init
```
3) Установить необходимые зависимости:
```
npm install express
npm install dotenv
npm install --save-dev typescript ts-node @types/node @types/express
```
4) Поднять webhook
Для нашей интеграции мы будем поднимать собственный webhook для прослушивания сообщений. Чтобы webhook был публичным, необходимо пробросить порты. Это можно сделать с помощью ngrok:
```
npm install -g ngrok
ngrok config add-authtoken <ваш_токен>
```
Если вы не зарегестрированные на сайте ngrok, то заригестрируйтесь и получите токен в личном кабинете

5) После установки ngrok пробросить порт:
```
ngrok http <ваш_порт>
```
 В окне ngrok вы увидите адрес, например: https://abcd-12-34-56-78.ngrok-free.appДобавив в конце /webhook, вы получите публичный адрес вашего webhook-а, например: https://abcd-12-34-56-78.ngrok-free.app/webhook

6) Создайте .env файл в корне проекта и заполните его по следующему шаблону:
```
# Green API (WhatsApp)
GREENAPI_INSTANCE_ID=
GREENAPI_API_TOKEN=
GREENAPI_PHONE_NUMBER=xxxxxx@c.us / xxxxxxxx@g.us

# Telegram Bot (для работы с группой)
TELEGRAM_BOT_TOKEN=
TELEGRAM_GROUP_CHAT_ID=

# Webhook & Server
APP_URL=
PORT=
```
    GREENAPI_INSTANCE_ID и GREENAPI_API_TOKEN возьмите в личном кабинете на https://green-api.com/
    GREENAPI_PHONE_NUMBER — номер телефона или ID группы, откуда и куда будут пересылаться сообщения
    TELEGRAM_BOT_TOKEN — токен, полученный при создании бота
    TELEGRAM_GROUP_CHAT_ID — можно посмотреть в веб-версии Telegram
    APP_URL — адрес webhook-а (тот, что вы получили от ngrok)
    PORT — любой удобный вам порт

7) Установите webhook в настройках личного кабинета на Green API.
8) Добавьте бота в группу Telegram и дайте ему права администратора.
9) Инициализируйте webhook для Telegram с помощью запроса curl из терминала:
```
curl -X POST   https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook -d "<APP_URL>"
```


Итоговая структура проекта 

      ├── package.json
      ├── .env
      ├── src
      │   ├── transformer.ts
      │   └── webhook.ts
      └── tsconfig.json

Описание компонентов:

    transformer.ts — файл, преобразующий сообщения из формата WhatsApp в формат Telegram
    webhook.ts — основной файл, запускающий сервер и прослушивающий порт; при поступлении запроса вызывает transformer.ts
    tsconfig.json — файл конфигурации TypeScript
    package.json — файл с зависимостями и командами для запуска проекта
    .env — файл с переменными окружения
  
10) Запустить сервер командой 
```
npm run start
```


После запуска сервера сообщения будут пересылаться из чата WhatsApp в Telegram и наоборот.
