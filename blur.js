const Discord = require('discord.js');
const Jimp = require('jimp'); 

exports.run = (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;

      message.channel.send(`:timer: | Fotoğraf işleniyor, lütfen bekleyin.`).then(m => m.delete(1000));

  
        Jimp.read(user.avatarURL || user.defaultAvatarURL, function (err, image){
            if(err) return message.channel.send(err);
            image.blur(5).write('image.png');
            setTimeout(() => {
              message.channel.sendFile('image.png');
            }, 500);
        });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'blur',
  description: 'İstediğiniz Kisinin Profil Resmini Bulanık Yaparsınız.',
  usage: 'bulanık [User]'
};