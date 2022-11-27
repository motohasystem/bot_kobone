import { Message, Client, GatewayIntentBits, PublicThreadChannel, SelectMenuBuilder, DMChannel, NewsChannel, PartialDMChannel, PrivateThreadChannel, TextChannel, VoiceChannel } from 'discord.js'
import {  ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js'

import dotenv from 'dotenv'

import { KoboneBot } from './kobone'

dotenv.config()

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
});
console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`)
client.login(process.env.DISCORD_BOT_TOKEN)
const kobone = new KoboneBot(client)

client.once('ready', () => {
    console.log('Ready!')
    if(client.user != null){
        console.log(client.user.tag)
    }
})


// should definitely increase the time in your collector.
// const collector = interaction.channel.createMessageComponentCollector({ time: 3500 });


// client.once("ready", () => {
//     client.on(Events.InteractionCreate, async interaction => {
//         if (!interaction.isChatInputCommand()) return;

//         if (interaction.commandName === 'button') {
//             const row = new ActionRowBuilder<ButtonBuilder>()
//                 .addComponents(
//                     new ButtonBuilder()
//                         .setCustomId('primary')
//                         .setLabel('Click me!')
//                         .setStyle(ButtonStyle.Primary),
//                 );

//             await interaction.reply({ content: 'I think you should,', components: [row] });
//         }
//     });
//     console.log("ready");
//     // placeComponents().catch(console.error);
// });


client.on('messageCreate', async (message: Message) => {
    console.log(`users: ${message.mentions.users}`)
    // console.log(message.mentions)
    console.log(`author: ${message.author}`)
    console.log(`content: ${message.content}`)

    
    if (message.author.bot) {
        return
    }

    if (message.mentions.users.size > 0){
        const first = message.mentions.users.first()
        if(first){
            console.log(`username: ${first.username}`)
        }
    }

    // メッセージを食べさせてみる
    kobone.feed(message)


})


