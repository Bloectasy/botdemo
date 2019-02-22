const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let reports = message.guild.channels.find((x) => x.name == config.reportsChannel);

    if (!target) return message.reply('please specify a member to report!');
    if (!reason) return message.reply('please specify a reason for this reason!');
    if (!reports) return message.reply(`plesae create a channel called ${config.reportsChannel} to log the reports`);

    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Reported Member', `${target.user.username} with an ID: ${target.user.id}`)
        .addField('Reported By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Reported Time', message.createdAt)
        .addField('Reported In', message.channel)
        .addField('Reported Reason', reason)
        .addField('Reported Person', `${target.user.username}`)
        .setFooter('Report user information', target.user.displayAvatarURL);

    message.channel.send(`${target} was reported by ${message.author} for ${reason}`).then(msg => msg.delete(10000));
    reports.send(embed);

};

module.exports.help = {
    name: 'report'
}
