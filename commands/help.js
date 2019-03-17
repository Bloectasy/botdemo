const discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot , message, args) => {


    let help = new discord.RichEmbed()

    .setColor('RANDOM')
    .addField("This bot is created by Bloectasy#6969.", "And he is cool.", true/false )
    .addField("This bot currently has 2 commands which are the following:", "Afk and Report", true/false)
    .addField("Afk: Which sets you as afk so people know that you are away when they mention you.","Usage of Afk: $afk [reason]", true/false)
    .addField("Report: This is a command if you want to report someone and one of the online staff member will get notified and will get to you as fast as possible.","Usage of Report: $report [@person] [reason]", true/false)
    .addField("Level: Which shows what level are you.","Usage of Level: $level", true/false)
    .setFooter("Hope you enjoy the bot")

    try{
        message.author.send(help)
    }catch(e){
    message.channel.send('The help has been sent to your dms if your dms are closed please open them.')
    }}

module.exports.help = {
    name: 'help'
}
