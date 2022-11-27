"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.MessageContent, discord_js_1.GatewayIntentBits.GuildMessages]
});
client.once('ready', () => {
    console.log('Ready!');
    if (client.user != null) {
        console.log(client.user.tag);
    }
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('users --------');
    console.log(message.mentions.users);
    // console.log(message.mentions)
    console.log(`author: ${message.author}`);
    console.log(`content: ${message.content}`);
    if (message.author.bot) {
        return;
    }
    const msg = message.content;
    if (message.mentions.users.size > 0) {
        const first = message.mentions.users.first();
        if (first) {
            console.log(`username: ${first.username}`);
        }
    }
    if (msg.search(/小骨/g) != -1) {
        message.channel.send(`🐈 小骨ミッケタ！(${msg})`);
    }
    // if(message.isMemberMentioned(client.user)){
    //     // if(message.isMemberMentioned(message.author)){
    //         sendReply(message, `呼びましたか？🐈(${msg})`);
    //         return;
    //     }
    if (message.content.startsWith('!ping')) {
        message.channel.send('Pong!');
    }
}));
console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
