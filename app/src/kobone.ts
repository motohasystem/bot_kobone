import { Message, Client, GatewayIntentBits, PublicThreadChannel, SelectMenuBuilder, DMChannel, NewsChannel, PartialDMChannel, PrivateThreadChannel, TextChannel, VoiceChannel, Guild } from 'discord.js'
import {  ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js'

// import { inspect } from 'util'


export class KoboneBot {
    entries: Message<boolean>[] = []  // 小骨メッセージを格納する配列
    client: Client

    constructor(client: Client){
        this.client = client

        // .then(fetchedMembers => {
        //     const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
        //     // Now you have a collection with all online member objects in the totalOnline variable
        //     console.log(`There are currently ${totalOnline.size} members online in this guild!`);
        // });

    }

    // コボネにメッセージを与える
    feed(message: Message<boolean>){
        const msg = message.content
        if(msg.search(/小骨|困っ|どうしたら/g) != -1){
            this.memorize(message)
        }
    
        if(msg.search(/ボタン/g) != -1){
            console.log("call put_buttons()")
            this.put_buttons(message.channel)
        }
    }

    async memorize(msg: Message<boolean>){
        this.entries.push(msg)
        msg.react('🐈')

        msg.reply(`🐈 ${msg.author} の小骨ミッケタ！ (${msg.content})`)

        const usernames = await this.listup_members(msg, [msg.author.id] )
        // msg.reply(`この小骨、みんなはどう思うにゃ？ ${usernames}`)
        this.reply_with_buttons(`この小骨、みんなはどう思うにゃ？ ${usernames}`, msg)
    }

    async listup_members(message: Message, excluded_ids: string[] = []){
        console.log("listup members.")
        if(message.guild == null){
            console.log("guild is null")
            return
        }

        const members = await message.guild.members.fetch()
        return members.filter(d => {
            const id = d.user.id
            console.log(`user id: ${id}`)
            if(d.user.bot || excluded_ids.includes(id)){
                return false
            }
            console.log(d.user.username)
            console.log(d.presence?.status)
            return true
        }).map((d)=>{
            return `<@${d.user.id}>`     // mention
            // return `<@${d.user.username}>`
        })

    }

    create_button(id: string, msg: string, style: ButtonStyle = ButtonStyle.Primary): ActionRowBuilder<ButtonBuilder> {
        return  new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(id)
                .setLabel(msg)
                .setStyle(style),
        );
    }

    async reply_with_buttons(content: string, msg: Message<boolean>){
        const buttons = this.create_buttons()
        await msg.reply({
            content: content,
            components: buttons
        });

    }

    async put_buttons(channel:  DMChannel | PartialDMChannel | NewsChannel | TextChannel | PrivateThreadChannel | PublicThreadChannel<boolean> | VoiceChannel) {
        const buttons = this.create_buttons()
        await channel.send({
            content: "この小骨、にゃ？",
            components: buttons
        });
    }

    create_buttons() {
        const btn1 = this.create_button('primary', 'わかるー🦴', ButtonStyle.Primary)
        const btn2 = this.create_button('secondary', 'やったことあるよ💡', ButtonStyle.Success)

        return [btn1, btn2]
    }
}