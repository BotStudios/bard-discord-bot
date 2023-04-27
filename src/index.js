import { Bard } from "googlebard";
import config from "../config.js";
import { Client, Intents, MessageAttachment } from 'discord.js';
const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],  
	partials: ["MESSAGE", "CHANNEL", "REACTION"] 
});

const bot = new Bard(config.cookie, {
		protocol: "https",
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function send(message, result){
try{
if(result.length > 1020){
  message.reply({ files: [new MessageAttachment(Buffer.from(result, 'utf-8'), 'message.txt')]})
   }else {
     message.reply(result + "_ _")
   }
    }catch(e){
    message.reply("_ _" + e)
  }
 }

client.on('messageCreate', (message) => {
  if(!message.content.startsWith("!ask"))return;
  const content = message.content.slice(5);
  bot.ask(content).then(r=> {
  send(message, r)
})
})

client.on('messageCreate', (message) => {
  if(message.channel.type != "DM")return;
  if(message.author.bot)return;
	bot.ask(message.content, message.author.id).then(r=> {
	  send(message, r)
	})
})

client.login(config.token);

