import { Message, Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});


client.once('ready', () => {
    console.log('Ready!')
    if(client.user != null){
        console.log(client.user.tag)
    }
})

client.on('messageCreate', async (message: Message) => {
    console.log('users --------')
    console.log(message.mentions.users)
    // console.log(message.mentions)
    console.log(`author: ${message.author}`)
    console.log(`content: ${message.content}`)

    
    if (message.author.bot) {
        return
    }

    const msg = message.content

    if (message.mentions.users.size > 0){
        const first = message.mentions.users.first()
        if(first){
            console.log(`username: ${first.username}`)
        }
    }

    if(msg.search(/小骨/g) != -1){
        message.channel.send(`🐈 小骨ミッケタ！(${msg})`)
    }


    // if(message.isMemberMentioned(client.user)){
    //     // if(message.isMemberMentioned(message.author)){
    //         sendReply(message, `呼びましたか？🐈(${msg})`);
    //         return;
    //     }


    if (message.content.startsWith('!ping')) {
        message.channel.send('Pong!')
    }
})

console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`)
client.login(process.env.DISCORD_BOT_TOKEN)

