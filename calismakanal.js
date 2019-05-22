const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
exports.run = (client, message, args) => {
let channel;
if(message.mentions.channels.first()) channel = message.mentions.channels.first().id
else channel = args[0]
if(!channel) return message.channel.send("Hata! Bir Kanal Etikellemeli veya Bir Kanal idsi girmelisin")
 db.set(`calisimmi_${channel}`, "aktif")
 message.channel.send(":white_check_mark: | Artık <#" + channel + "> kanalında çalışmayacağım\nBu Özelliği Kapatmak için g!kapat çalışmakanal [kanal]")
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'çalışmakanal',
  description: 'The BHDR Code Sunucusuna Aittir!.',
  usage: 'yardım [komut]'
};
