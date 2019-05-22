
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

exports.run = (client, message, args) => {
var büne = args[0]
if(büne === "çalışmakanal") {
let channel;
if(message.mentions.channels.first()) channel = message.mentions.channels.first().id
else channel = args[1]

if(!channel) return message.channel.send("Hata! Bir Kanal Etikellemeli veya Bir Kanal idsi girmelisin")


 db.delete(`calisimmi_${channel}`)
 message.channel.send(":white_check_mark: | Artık <#" + channel + "> kanalında çalışacağım")
  
} else if (büne === "prefix"){
 db.fetch(`prefix_${message.guild.id}`).then(nbr => {
   if(!nbr) return message.channel.send(":x: | Sunucuya Özel Prefix Zaten Kapalı Ayarlamak için** " + ayarlar.prefix + "prefix [prefix]**")
 

 db.delete(`prefix_${message.guild.id}`)
 message.channel.send(":white_check_mark: | Sunucudaki Özel Prefix Kapatıldı!\nKomutlar Bundan Sonra **"+ ayarlar.prefix + "** prefixi ile çalışacak!")

})} else {
  message.channel.send("Kapatabileceğin Özellikler: `çalışmakanal`,`prefix`")
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kapat',
  description: 'Ritarary Code Sunucusuna Aittir!.',
  usage: 'yardım [komut]'
};