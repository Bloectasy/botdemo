const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;
//The server
http.createServer().listen(port);

console.log("Newest Version")

const token = process.env.TOKEN;

//When bot ready
bot.on('ready', ()=>{
    console.log(`${bot.user.username} is ready for action!`);
    bot.user.setActivity("Prefix - $",{type:"Playing"});

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
      let mentioned = bot.afk.get(message.mentions.users.first().id);
      if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
    }
    let afkcheck = bot.afk.get(message.author.id);
    if (afkcheck) return [bot.afk.delete(message.author.id), message.reply(`you have been removed from the afk list!`)]
  

    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot ,message, args);

    let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 456;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor('RANDOM')
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });  
  if (!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds through commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){

  }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)


});

bot.on('error', err => {
  console.log('err');
})

//bot token into config files
bot.login(token)
