const TelegramApi =  require('node-telegram-bot-api');

const token = '6185751248:AAGTjqk5_8MzhFR7QvmM3dsLo0r1QK4OZ6Q';

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const buttonAnswer = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Так🔥', callback_data: 'yes'}, {text: 'Ні, ще думаю❓', callback_data: 'no'}],
            [{text: 'Дізнайся про Нас більше 😍', callback_data: 'infobutton'}]
        ]
    })
}

const buttonMaster = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Лилит', callback_data: 'lilit'}, {text: 'Алёна', callback_data: 'alena'}],
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Запуск 🚀'},
    {command: '/info', description: 'Інформація про Нас 😍'},
])


const start = () => {
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId=msg.chat.id;
        console.log(msg)
    
        if (text === '/start'){
            return bot.sendMessage(chatId, 'Вітаю, ' + msg.from.first_name + ', чи готові ви записатись на процедури, до Наших найкращих майстрів?', buttonAnswer);
            
        }
        if(text === '/info'){
            return  bot.sendMessage(chatId, 'Поки інформації немає😥...\nАле згодом усе буде🤩\nЗ любовью до тебе ' + msg.from.first_name + ' ❤')
        }
        

    })

    bot.on('callback_query',  async msg=>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg)
        if(data === 'yes'){
            return bot.sendMessage(chatId, 'Добре, оберіть Майстра', buttonMaster);   
        }
        if(data === 'infobutton'){
            return  bot.sendMessage(chatId, 'Поки інформації немає😥...\nАле згодом усе буде🤩\nЗ любовью до тебе ' + msg.from.first_name + ' ❤')
        }
        if(data === 'lilit'){
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Лилит.\nТепер оберімо час:');
        }
        if(data === 'alena'){
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Алёна.\nТепер оберімо час:');
        }
        return bot.sendMessage(chatId, 'Я не розумію Вас😣')
        
    }

    )
}



start();