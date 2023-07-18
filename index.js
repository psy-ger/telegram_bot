const { kStringMaxLength } = require('buffer');
const TelegramApi =  require('node-telegram-bot-api');

const token = '6185751248:AAGTjqk5_8MzhFR7QvmM3dsLo0r1QK4OZ6Q';

const bot = new TelegramApi(token, {polling: true})


const buttonAnswer = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Так🔥', callback_data: 'yes'}, {text: 'Ні, ще думаю❓', callback_data: 'no'}],
            [{text: 'Дізнайся про Нас більше 😍', callback_data: 'infobutton'}]
        ]
    })
}

const buttomData = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '24.07', callback_data: '24.07'}, {text: '25.07', callback_data: '25.07'}],
            [{text: '26.07', callback_data: '26.07'}, {text: '27.07', callback_data: '27.07'}],
            [{text: '28.07', callback_data: '28.07'}, {text: '29.07', callback_data: '29.07'}],
        ]
    })
}

/*const buttom = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Подтвердить', callback_data: 'test1'}, {text: 'Отклонить', callback_data: 'test1'}],
        ]
    })
}*/


bot.setMyCommands([
    {command: '/start', description: 'Главная страница '},
    {command: '/info', description: 'Інформація про Нас 😍'},
])

let number = 1;

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
        var fs = require('fs');
            var array1 = fs.readFileSync('AppointmentToAlena.txt').toString().split("\n");
            for(i in array1) {
            }
        var fs = require('fs');
            var array2 = fs.readFileSync('AppointmentToLilit.txt').toString().split("\n");
            for(i in array2) {
            }
        if(data === 'yes'){
            return bot.editMessageText('Добре, оберіть процедуру', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Кератин', callback_data: 'keratin'}],
                        [{text: 'Скоро будет еще ...', callback_data: 'test2'}],
                        [{text: 'Скоро будет еще ...', callback_data: 'test2'}],
                    ]})
            })
           // return bot.sendMessage(chatId, 'Добре, оберіть процедуру', buttonProcedure);   
        }
        if(data === 'no'){
            return bot.editMessageText('Добре, тоді можешь більше дізнатися про Нас', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Дізнайся про Нас більше 😍', callback_data: 'infobutton'}],
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
                        [{text: '<== Назад', callback_data: 'yes'}],
                    ]})
            })
           // return bot.sendMessage(chatId, 'Добре, оберіть Майстра: ', buttonMaster); 
              
        }
        if(data === 'infobutton'){
            return  bot.sendMessage(chatId, 'Поки інформації немає😥...\nАле згодом усе буде🤩\nЗ любовью до тебе ' + msg.from.first_name + ' ❤')
        }
        const masterUP = data;
        console.log(masterUP)
        if(data === 'lilit'){
            return bot.editMessageText('Чудово, Ваш майстер Лилит.\nТепер оберімо дату:', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: array2[i-5], callback_data: array2[i-5]}, {text: array2[i-4], callback_data: array2[i-4]}],
                        [{text: array2[i-3], callback_data: array2[i-3]}, {text: array2[i-2], callback_data: array2[i-2]}],
                        [{text: array2[i-1], callback_data: array2[i-1]}, {text: array2[i], callback_data: array2[i]}],
                        [{text: '<== Назад', callback_data: 'keratin'}],
                    ]})
            })
            /*const master = 'Лилит';
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Лилит.\nТепер оберімо дату:', buttomData);*/
        }
        
        if(data === 'alena'){
            return bot.editMessageText('Чудово, Ваш майстер Алёна.\nТепер оберімо дату:', {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: array1[i-5], callback_data: array1[i-5]}, {text: array1[i-4], callback_data: array1[i-4]}],
                        [{text: array1[i-3], callback_data: array1[i-3]}, {text: array1[i-2], callback_data: array1[i-2]}],
                        [{text: array1[i-1], callback_data: array1[i-1]}, {text: array1[i], callback_data: array1[i]}],
                        [{text: '<== Назад', callback_data: 'keratin'}],
                    ]})
            })
           /* const master = 'Алёна';
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Алёна.\nТепер оберімо дату:', buttomData);*/
        }
        if(data === array1[i-5] || data === array1[i-4] || data === array1[i-3] || data === array1[i-2] || data === array1[i-1] || data === array1[i]){
            await bot.editMessageText('Чудово, Ваш майстер Алёна.\nВаша Дата : ' + data, {
                chat_id: chatId,
                message_id: msgId,
            })
            return bot.sendMessage(-1001602229085, 'Алёна до тебе новий запис.\nДата : ' + data, buttomAcceptMaster)
           /* const master = 'Алёна';
            return bot.sendMessage(chatId, 'Чудово, Ваш майстер Алёна.\nТепер оберімо дату:', buttomData);*/
        }
        if(data === array2[i-5] || data === array2[i-4] || data === array2[i-3] || data === array2[i-2] || data === array2[i-1] || data === array2[i]){
            await bot.editMessageText('Чудово, Ваш майстер Лилит.\nВаша Дата : ' + data, {
                chat_id: chatId,
                message_id: msgId,
            })
            return bot.sendMessage(-1001602229085, 'Лилит до тебе новий запис.\nДата : ' + data)
           
        }
        return bot.sendMessage(chatId, 'Я не розумію Вас😣')
        
    }

    )

}



start();