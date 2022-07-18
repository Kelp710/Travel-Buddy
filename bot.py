from flask import Flask, request
import telegram
from apscheduler.schedulers.background import BackgroundScheduler
import os
from dotenv import load_dotenv

load_dotenv()
telegram_token=os.getenv("Telegram_Token")
print(telegram_token)
bot_id = "t.me/travel_suggest_bot"

bot = telegram.Bot(token=telegram_token)

app = Flask(__name__)

@app.route('/{}'.format(telegram_token), methods=['POST'])
def respond():
    update = telegram.Update.de_json(request.get_json(force=True), bot)

    chat_id = update.message.chat.id
    msg_id = update.message.message_id

    text = update.message.text.encode('utf-8').decode()
    print("got text message :", text)
    if text == "/start":
        bot_welcome = """
       Welcome to Travel Buddy bot, use it as you like
       """
        bot.sendMessage(chat_id=chat_id, text=bot_welcome, reply_to_message_id=msg_id)
    
    else:
        try:
            if text == "/my_list":
                bot.sendMessage(chat_id=chat_id, text="my list works")
        except Exception:
            bot.sendMessage(chat_id=chat_id, text="There was a problem in the name you used, please enter different name", reply_to_message_id=msg_id)

sched = BackgroundScheduler(daemon=True)


@sched.scheduled_job('cron', hour=17)
@app.route('/{}'.format(telegram_token), methods=['POST'])
def post_news():
    update = telegram.Update.de_json(request.get_json(force=True), bot)
    chat_id = update.message.chat.id

    bot.sendMessage(chat_id=chat_id, text="it`s 17")

@app.route('/')
def index():
   return '.'

if __name__ == '__main__':
    sched.start()
    app.run(debug=True, threaded=True)