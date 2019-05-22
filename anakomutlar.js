const Discord = require('discord.js');
const loglar = require('../loglar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const yardım = new Discord.RichEmbed()
  .setColor(0x36393E)
      .setThumbnail(client.user.avatarURL)
      .addField(` 
Ψ hчвrís | Ana Komutlar`, `<a:yesildonme:574517628912271367> | h+anakomutlar: Ana Komutlar.
<a:hybrid:574517628912271367> | h+kullanıcı: Kullanıcı Komutları.
<a:hybrid:574517628912271367> | h+eğlence: Eğlence Komutları
<a:hybrid:574517628912271367> | h+yetkili: Yetkili Komutları. 
<a:hybrid:574517628912271367> | h+ekstra: Ekstra Komutlar. `)
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
  return message.channel.sendEmbed(yardım);

};

  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['komut', 'komutlar', 'command', 'yardim', 'help', 'halp', 'y', 'h', 'commands'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'anakomutlar',
    description: 'anakomutlar',
    usage: 'anakomutlar'
  };
   