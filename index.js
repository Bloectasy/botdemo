const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
//The server
http.createServer().listen(port);

console.log("Newest Version")

const token = process.env.TOKEN;

//When bot ready
bot.on('ready', ()=>{
    console.log(`${bot.user.username} is ready for action!`);
    bot.user.setActivity("bloectasy's sexy body",{type:"Watching"});

//load commands
bot.commands = new Discord.Collection();
fs.readdir("./commands", (err, files) => {
    if (err) console.error(err);
    let jsfiles  = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.lenght <= 0) return console.log("There are no commands to load ....!");

    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

})
//when idk this thing xD
bot.afk = new Map();
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (message.content.includes(message.mentions.users.first())) {
        bot.afk.forEach(key => {
          if (key.id == message.mentions.users.first().id) {
            message.guild.fetchMember(key.id).then(member => {
              let user_tag = member.user.tag;
              return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
            });
          }
        });
      }
    

    bot.afk.forEach(key => {
        if (message.author.id == key.id) {
            bot.afk.delete(message.author.id);
            return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
        }
    });

    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot ,message, args);

    


});

bot.on('error', err => {
  console.log('err');
})

//bot token into config files
bot.login(token)