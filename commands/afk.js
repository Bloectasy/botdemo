module.exports.run = async (bot, message, args) => {

    let reason = args.join(' ') ? args.join(' ') : 'Im currently busy ill contact you as soon as possible.';
    let afklist = bot.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            usertag: message.author.tag,
            reason: reason
        };

        bot.afk.set(message.author.id, construct);
        return message.reply(`you have been set to afk for reason: ${reason}`)
    }

};

module.exports.help = {
    name: 'afk'
};
