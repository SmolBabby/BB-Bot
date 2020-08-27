console.log("index.js has been executed");

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("bot has logged into the account");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  //bot commands here
  
  client.on("message", (message) => {
  if (message.author.bot) return;
  
  message.reply('Hey, I\'m a reply!')
  .then(() => console.log(`Sent a reply to ${message.author.username}`))
  .catch(console.error);
    
});

client.login("YOUR-DISCORD-TOKEN");
