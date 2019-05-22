const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')


  

exports.run = async (client, message, params, args) => {
    

      let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const embedyardim = new Discord.RichEmbed()
  .setTitle("")
  .setDescription('')
  .setColor('RANDOM')
  .addField("** :keyboard:  Ayarlanabilir Komutlar :keyboard: **", `${prefix}otorol = Sunucuda Otorol Ayarlar.\n${prefix}sayaç = Sayaç ayarlamanızı sağlar\n${prefix}sa-as = Sunucuda Otomatik Selam Almayı Açar Kapatır.\n${prefix}prefix = Prefix ayarlamanızı sağlar.\n${prefix}küfüengel = Sunucuda küfürü engeller\n${prefix}linkengel = Sunucuda linkleri engellersiniz.\n${prefix}slowmode = SlowMode ayarlamanızı sağlar.\n${prefix}giriş-çıkış = Giriş Çıkış ayarlamanızı sağları.`)
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'ayarlanabilir',
  description: 'Eğlence Komutlarını Gösterir',
  usage: 'kullanıcı [komut]'
};
