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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoboneBot = void 0;
const discord_js_1 = require("discord.js");
// import { inspect } from 'util'
class KoboneBot {
    constructor(client) {
        this.entries = []; // 小骨メッセージを格納する配列
        this.client = client;
        // .then(fetchedMembers => {
        //     const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
        //     // Now you have a collection with all online member objects in the totalOnline variable
        //     console.log(`There are currently ${totalOnline.size} members online in this guild!`);
        // });
    }
    // コボネにメッセージを与える
    feed(message) {
        const msg = message.content;
        if (msg.search(/小骨|困っ|どうしたら/g) != -1) {
            this.memorize(message);
        }
        if (msg.search(/ボタン/g) != -1) {
            console.log("call put_buttons()");
            this.put_buttons(message.channel);
        }
    }
    memorize(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.entries.push(msg);
            msg.react('🐈');
            msg.reply(`🐈 ${msg.author} の小骨ミッケタ！ (${msg.content})`);
            const usernames = yield this.listup_members(msg, [msg.author.id]);
            // msg.reply(`この小骨、みんなはどう思うにゃ？ ${usernames}`)
            this.reply_with_buttons(`この小骨、みんなはどう思うにゃ？ ${usernames}`, msg);
        });
    }
    listup_members(message, excluded_ids = []) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listup members.");
            if (message.guild == null) {
                console.log("guild is null");
                return;
            }
            const members = yield message.guild.members.fetch();
            return members.filter(d => {
                var _a;
                const id = d.user.id;
                console.log(`user id: ${id}`);
                if (d.user.bot || excluded_ids.includes(id)) {
                    return false;
                }
                console.log(d.user.username);
                console.log((_a = d.presence) === null || _a === void 0 ? void 0 : _a.status);
                return true;
            }).map((d) => {
                return `<@${d.user.id}>`; // mention
                // return `<@${d.user.username}>`
            });
        });
    }
    create_button(id, msg, style = discord_js_1.ButtonStyle.Primary) {
        return new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(id)
            .setLabel(msg)
            .setStyle(style));
    }
    reply_with_buttons(content, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const buttons = this.create_buttons();
            yield msg.reply({
                content: content,
                components: buttons
            });
        });
    }
    put_buttons(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const buttons = this.create_buttons();
            yield channel.send({
                content: "この小骨、にゃ？",
                components: buttons
            });
        });
    }
    create_buttons() {
        const btn1 = this.create_button('primary', 'わかるー🦴', discord_js_1.ButtonStyle.Primary);
        const btn2 = this.create_button('secondary', 'やったことあるよ💡', discord_js_1.ButtonStyle.Success);
        return [btn1, btn2];
    }
}
exports.KoboneBot = KoboneBot;
