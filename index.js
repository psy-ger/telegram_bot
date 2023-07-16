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

/*const buttonMaster = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Лилит', callback_data: 'lilit'}, {text: 'Алёна', callback_data: 'alena'}],
        ]
    })
}*/

/*const buttonProcedure = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Кератин', callback_data: 'keratin'}],
            [{text: 'Скоро будет еще ...', callback_data: 'test1'}],
            [{text: 'Скоро будет еще ...', callback_data: 'test2'}],
        ]
    })
}*/

const buttomData = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '24.07', callback_data: '24.07'}, {text: '25.07', callback_data: '25.07'}],
            [{text: '26.07', callback_data: '26.07'}, {text: '27.07', callback_data: '27.07'}],
            [{text: '28.07', callback_data: '28.07'}, {text: '29.07', callback_data: '29.07'}],
        ]
    })
}

/*const buttomTime = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Лилит', callback_data: 'lilit'}],
            [{text: 'Лилит', callback_data: 'lilit'}],
            [{text: 'Лилит', callback_data: 'lilit'}],
        ]
    })
}*/

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
        const msgId = msg.message.message_id;
        console.log(msg)
        if(data === 'yes'){
            return bot.editMessageText('Добре, оберіть процедуру', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Кератин', callback_data: 'keratin'}],
                        [{text: 'Скоро будет еще ...', callback_data: 'test1'}],
                        [{text: 'Скоро будет еще ...', callback_data: 'test2'}],
                    ]})
            })
           // return bot.sendMessage(chatId, 'Добре, оберіть процедуру', buttonProcedure);   
        }
        if(data === 'keratin'){
            return bot.editMessageText('Добре, оберіть Майстра:', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Лилит', callback_data: 'lilit'}, {text: 'Алёна', callback_data: 'alena'}],
                    ]})
            })
           // return bot.sendMessage(chatId, 'Добре, оберіть Майстра: ', buttonMaster); 
              
        }
        if(data === 'infobutton'){
            return  bot.sendMessage(chatId, 'Поки інформації немає😥...\nАле згодом усе буде🤩\nЗ любовью до тебе ' + msg.from.first_name + ' ❤')
        }
        if(data === 'lilit'){
            const master = 'Лилит';
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Лилит.\nТепер оберімо дату:', buttomData);
        }
        if(data === 'alena'){
            const master = 'Алёна';
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Алёна.\nТепер оберімо дату:', buttomData);
        }
        return bot.sendMessage(chatId, 'Я не розумію Вас😣')
        
    }

    )
}



start();