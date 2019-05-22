const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, member) => {

  let kufurfiltre = await db.fetch(`kufur_${message.guild.id}`)
  let kufurYazi;
  if (kufurfiltre == null) kufurYazi = 'Küfür filtresi açık değil, ayarlamak için `-küfür aç`'
  if (kufurfiltre == 'Açık') kufurYazi = '✅'
  if (kufurfiltre == 'Kapalı') kufurYazi = '❌'
  //reklam
  let reklamm = await db.fetch(`reklam_${message.guild.id}`)
  let reklam;
  if (reklamm == null) reklam = 'Reklam filtresi açık değil, ayarlamak için `-reklam aç`'
  if (reklamm == 'Açık') reklam = '✅'
  if (reklamm == 'Kapalı') reklam = '❌'
//everyone

//selam
let sa = await db.fetch(`sa_${message.guild.id}`)
  let sam;
  if (sa == null) sam = 'Selam filtresi açık değil, ayarlamak için `-selam aç`'
  if (sa == 'acik') sam = '✅'
  if (sa == 'kapali') sam = '❌'
//sayac
let sayaç = await db.fetch(`sayacSayi_${message.guild.id}`)
  let say;
  if (sayaç == null) say = 'Sayaç açık değil, ayarlamak için `-sayaç-ayarla`'
  if (sayaç == '<:acik:523412102098976768> ') say = ''
  if (sayaç  == 'kapali') say = '<:kapali:523412101935398912>'
//otorol
let oto = await db.fetch(`otorol_${message.guild.id}`)
  let rol;
  if (oto== null) rol = 'Otorol açık değil, ayarlamak için `-otorol-ayarla `'
  if (oto == '<:acik:523412102098976768> ') rol = ''
  if (oto == 'kapali') rol = '<:kapali:523412101935398912>'
//
let otok = await db.fetch(`arc_${message.guild.id}`)
  let otoka;
  if (otok == null) otoka = 'Otorol  açık değil, ayarlamak için `-otorol-ayarla`'
  if (otok == '<:acik:523412102098976768> ') otoka = ''
  if (otok == 'kapali') otoka = '<:kapali:523412101935398912>'
//
let sayaçk = await db.fetch(`sayacKanal_${message.guild.id}`)
  let sayk;
  if (sayaçk == null) sayk = 'Sayaç açık değil, ayarlamak için `-sayaç-ayarla`'
  if (sayaçk == '<:acik:523412102098976768> ') sayk = ''
  if (sayaçk  == 'kapali') sayk = '<:kapali:523412101935398912>'
//
//Prefix
const ayarlar = new Discord.RichEmbed()
.setAuthor(`Ayarlar`, `https://lh3.googleusercontent.com/5YLxhk-dGJ1YxgYTu436Z5a3vzllrai9iIjDYD73wSH1sUznSRhoj8ezdFRZA5MXEXM=s180-rw`)		
.addField('Küfür engelleme', kufurYazi)
.addField('Reklam engelleme', reklam) 
.addField('Selam filtresi', sam)
//.addField('Oto tag',)
.setColor("RANDOM")
message.channel.send(ayarlar)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'ayarlar',
  description: 'Sunucunun ayarlarını gösterir.',
  usage: '-ayarlar'
};