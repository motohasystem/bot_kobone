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
const kobone_1 = require("./kobone");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.MessageContent, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.GuildMembers]
});
console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
const kobone = new kobone_1.KoboneBot(client);
client.once('ready', () => {
    console.log('Ready!');
    if (client.user != null) {
        console.log(client.user.tag);
    }
});
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
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`users: ${message.mentions.users}`);
    // console.log(message.mentions)
    console.log(`author: ${message.author}`);
    console.log(`content: ${message.content}`);
    if (message.author.bot) {
        return;
    }
    if (message.mentions.users.size > 0) {
        const first = message.mentions.users.first();
        if (first) {
            console.log(`username: ${first.username}`);
        }
    }
    // メッセージを食べさせてみる
    kobone.feed(message);
}));
