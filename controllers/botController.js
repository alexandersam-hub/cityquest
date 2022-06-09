const telegramService = require('../services/telegramService')

class BotController{

    async start(bot){



        bot.on('message', async (msg) => {
            const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
            let user = await telegramService.getUserByTelegramId(chatId)
            if(user.warning)
                user = await telegramService.createUserByTelegramId(chatId)
            // отправляем сообщение
            await bot.sendMessage(chatId, 'Привет! Начнем игру?', { // прикрутим клаву
                reply_markup: {
                    inline_keyboard:  [
                        [
                            {
                                text: 'Хочу играть', // текст на кнопке
                                url : `https://quizserver.vityazgroup.ru/login/${user.user.telegramId}/${user.password}`
                            }
                        ]
                    ]
                }
            });
        });
        bot.on('callback_query', async (query) => {

            if (query.data === 'moreKeks') { // если кот
                 bot.sendMessage(chatId, 'Ссылка на игру:', {
                    reply_markup: {
                        inline_keyboard:[
                            [
                                {
                                    text: 'Нажми, чтобы играть', // текст на кнопке
                                    url: 'https://localhost:3001/' // данные для обработчика событий
                                }
                            ]
                        ]

                    }
                });

                 bot.sendMessage(chatId,'Логин: '+user.user.username);
                 bot.sendMessage(chatId,'Пароль: '+user.password);
            }

    })
}

}

module.exports = new BotController()