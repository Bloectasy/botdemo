module.exports.run = async (bot, message, args) => {

    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = bot.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            usertag: message.author.tag,
            reason: reason
        };

        bot.afk.set(message.author.id, construct);
        return = new discord.RichEmbed()
        .color('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField(message.reply`you have been set to afk for reason ${reason}`)
        .setFooter('Do not ping again cause it is annoying');
        
    }

};

module.exports.help = {
    name: 'afk'
};
