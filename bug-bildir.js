const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Ne Bugu Bulduğunuzu Yazmayı Unuttunuz.');
    message.channel.send({embed: {
        color: 0xff8000,
        description: "Bulduğunuz Bugu Gönderdim ! En Kısa 3 Gün İçerisinde Bug Düzeltilecektir ! ✅ \nBug İle İlgili Spam Atmayınız Aksi Taktirde Engellenirsiniz."
      }});
    let str = "<@311916056270864384>";
    let id = str.replace(/[<@!>]/g, '');
    client.fetchUser(id)
        .then(user => {user.send(`Bug : **${mesaj}**\n\nGönderen: **${message.author.username}**`)})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bugbildir'],
  permLevel: 0
};

exports.help = {
  name: 'bug-bildir',
  description: 'tavsiye',
  usage: 'tavsiye [yazı]'
};