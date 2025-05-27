# Green-API-Whatsapp-Telegram-Integration
Интеграция Telegram с GrenAPI

Что нужно для начала работы:
  1) Активированный инстанс на сайте https://green-api.com/ 
  2) Работающий бот в телеграме
  3) NodeJS - 18.2
  4) Npm - 10.8

Для инициализации и начало работы нужно проделать следующие шаги

1) Склонировать репозиторий на свой сервер 
```
git clone https://github.com/M4mB14/Green-API-Whatsapp-Telegram-Integration
```
2) После того, как мы склонировали репозиторий нужно инициализировать npm
```
npm init
```
3) После нужно установить нужные зависимости
```
npm install express
npm install dotenv
npm install --save-dev typescript ts-node @types/node @types/express
```
4) Поднять webhook
  Для нашей интеграции мы будем поднимать собственный webhook для прослушивания сообщений, чтобы наш webhook был публичный нужно пробросить порты, это можно сдедать с   помоцью ngrok
```
npm install -g ngrok
ngrok config add-authtoken <ваш_токен>
```
  Если вы не зарегестрированные на сайте ngrok, то заригестрируйтесь и получите токен в личном кабинете

5) После установки ngrok пробрасываем порт
```
ngrok http <ваш_порт>
```
  В окне ngrok вы увидете адрес, например https://abcd-12-34-56-78.ngrok-free.app, добавив в конце /webhook это будет ваш публичный адрес вашего webhook-аБ например https://abcd-12-34-56-78.ngrok-free.app/webhook

6) Создайте .env файл в основной директории и заполните его согласно шаблону 
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
  1) GREENAPI_INSTANCE_ID и GREENAPI_API_TOKEN возьмите в вашем личном кабинете на сайте https://green-api.com/
  2) GREENAPI_PHONE_NUMBER - номер телефона или id группы куда и от куда будут пересылатся сообщения 
  3) TELEGRAM_BOT_TOKEN вижно сразу при создании бота
  4) TELEGRAM_GROUP_CHAT_ID - можно посмотреть в web версии telegram
  5) APP_URL - Сюда вставляем webhook
  6) PORT - ставим любой вам удобный порт 

7) Ставим наш webhook в настройках в личном кабинете в GreanAPI
8) Нужно добавить бота в группу в telegramm и дать ему права администратора
9) Инициализировать webhook для телеграмма, сделать это можно запросом curl из терминала 
```
curl -X POST   https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook -d "<APP_URL>"
```


Итоговая структура проекта 
      ```
      ├── package.json
      ├── .env
      ├── src
      │   ├── transformer.ts
      │   └── webhook.ts
      └── tsconfig.json
      ```

Описание компанентов:
  transformer.ts - файл, который преобразовывает сообщения из WhatsApp формата в Telegram 
  webhook.ts - основной файл,который звпускает сервер и прослушивает порт, при поступлении запроса вызывает transformer.ts
  tsconfig.json - файл конфигурации ts
  package.json - файл с зависимостями, командами npm run и обозначение главного файла программы
  .env - файл с переменными окружения
  
10) Запустить сервер командой 
```
npm run start
```


После запуска сервера сообщения будут пересылатся из чата в WhatsApp-е в Telegramm и наоборот
