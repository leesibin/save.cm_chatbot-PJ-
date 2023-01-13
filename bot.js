require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.botid; //텔레그램 봇아이디
const bot = new TelegramBot(token, { polling: true });

var client_id = process.env.id; //네이버 번역api 봇아이디
var client_secret = process.env.secret; //네이버 번역api 봇아이디

let obj = {};
let obj2 = {};

bot.onText(/^김시빈저장해 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "저장합니다 ";
  const chat = match[1].split(" ");
  let key = chat[0];
  let value = chat[1];

  obj.계획대로 = key;
  obj.되고있어 = value;
  bot.sendMessage(chatId, resp);
});
bot.onText(/^김시빈번역해 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "번역합니다 ";
  const chat2 = match[1];
  let key = chat2;
  obj2 = key;
  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  if (msg.text === obj.계획대로) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, obj.되고있어);
  }
});

bot.on("message", (msg) => {
  if (msg.text === obj2) {
    const chatId = msg.chat.id;
    var api_url = "https://openapi.naver.com/v1/papago/n2mt";

    var options = {
      url: api_url,
      form: { source: "ko", target: "en", text: obj2 },
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    };
    var request = require("request");
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let no = JSON.parse(body);
        let en0 = no.message.result.translatedText;
        bot.sendMessage(chatId, en0);
        console.log(no.message.result.translatedText);
      }
    });
  }
});
bot.on("message", (msg) => {
  if (msg.text === "삼성주식") {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "확인");
  }
});
