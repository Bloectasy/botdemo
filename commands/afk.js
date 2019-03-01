module.exports.run = async (bot, message, args) => {

    let reason = args.join(' ') ? args.join(' ') : author.username + 'is currently away';
    let awaylist = bot.away.get(message.author.id);

    if (!awaylist) {
        let construct = {
            id: message.author.id,
            usertag: message.author.tag,
            reason: reason
        };

        bot.away.set(message.author.id, construct);
        return message.reply(`you have been set to away for reason: ${reason}`)
    }

};

module.exports.help = {
    name: 'away'
};