const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);  // GEREKLİ YERLER

/////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./util/eventLoader')(client);


const DBL = require("dblapi.js");
  const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNTc3MjYyNDAzOTcwNjY0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTUyNjY1NDczfQ.fFYq0ohNQhg1JjHy3WsQ0S56kwZ6tXu_ox7jL-_XbkE', client) 

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} ${member.user.username}`)
});


const eco = require("discord-economy");

const settings = {
  prefix: 'm+',
  token: 'NTY4ODA4NTg1MzQ2NDE2NjUw.XMxfAQ.AtaLZacIvh6LTgXkgSXGWU-YZ48',
  admin:["568808585346416650"]
}

 

client.on('message', async message => {
 
  
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  
  var args = message.content.split(' ').slice(1);
 
  
  
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
 
  if (command === 'cüzdan') {
 
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! Cüzdanında ${output.balance}TL var.`);
  }
 
  if (command === 'günlükpara') {
 
    var output = await eco.Daily(message.author.id)
    //output.updated bize üyenin günlük parasını alıp almadığını söyler
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`İşte Günlük 100TL Artık ${profile.newbalance}TL ya sahipsin!`);
 
    } else {
      message.channel.send(`Üzgünüm, zaten günlük paranı aldın!\n Ama üzülme, ${output.timetowait} sonra tekrar alabilirsin!`)
    }
 
  }

  
  if (command === 'liderliktablosu') {

 
    //Eğer birini etiketlerseniz kullanıcının sıralamda kaçıncı olduğunu gösterir
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`${message.mentions.users.first().tag}, liderlik tablosunda ${output} sırada!`);   
 
    } else {
 
      eco.Leaderboard({
        limit: 3, 
        filter: x => x.balance > 50 
      }).then(async users => { 
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) 
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) 
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) 
 
        message.channel.send(`Liderlik Tablosu:
 
1 - ${firstplace && firstplace.tag || 'Kişi Yok'} : ${users[0] && users[0].balance || 'Para yok'}
2 - ${secondplace && secondplace.tag || 'Kişi Yok'} : ${users[1] && users[1].balance || 'Para yok'}
3 - ${thirdplace && thirdplace.tag || 'Kişi Yok'} : ${users[2] && users[2].balance || 'Para yok'}`)
 
      })
 
    }
  }
 
    if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Para göndermek istediğiniz kullanıcıyı etiketleyin!')
    if (!amount) return message.reply('Ödemek istediğiniz tutarı belirtin!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Transfer etmek istediğiniz miktardan daha az para var!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Para transferleri başarıyla yapıldı!\n Gönderen Kişi:${message.author.tag} \n Gönderen Kişinin Yeni Bakiye Durumu ${transfer.FromUser}\n Gonderilen Kişi: ${user.tag} \n Para Gönderilen Kişinin Yeni Bakiye Durumu: ${transfer.ToUser}`);
    }
  
  if (command === 'kumar') {
 
    var roll = args[0] 
    var amount = args[1] 
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Lütfen 1-6 arası bir sayı belirtin! Doğru kullanım: **-zar <1-6> <para miktarı>**')
    if (!amount) return message.reply('Lütfen oynayacağınız miktarı belirtin! Doğru kullanım: **&zar <1-6> <para miktarı>**')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Belirttiğiniz miktardan daha az paran var. Maalesef Kumar Oynayamazsınız!')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)

    
    if (gamble.output === "lost") {
    message.reply(`Zar ${gamble.dice} atıldı. Yani kaybettin! Artık cüzdanında ${gamble.newbalance}TL var`)
    } else if (gamble.output === "won"){
    message.reply(`Zar ${gamble.dice} atıldı. Yani kazandın! Artık cüzdanında ${gamble.newbalance}TL var`)
    }
    
   
 
  }
 

 

 
});

const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

  if (message.content.toLowerCase() === prefix + 'level' || message.content.toLowerCase() === prefix + 'profil') {
        var output = await eco.FetchBalance(message.author.id)

const level = new Discord.RichEmbed().setTitle(`${user.username}`).setDescription(`**Seviye: ** ${userData.level}\n**EXP: **${userData.points}\n**Parası: **${output.balance}`).setColor("RANDOM").setFooter(`MrGambleRR | Level Sistemi`).setThumbnail(user.avatarURL)
message.channel.send(`📝 **| ${user.username} Adlı Kullanıcının Profili Burada!**`)
message.channel.send(level)
  }
});
 
client.on('guildMemberAdd', async member => {
  var user = member.user;
  var tarih = ''
			if(moment(user.createdAt).format('MM') === '01') {
				var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '02') {
				var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '03') {
				var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '04') {
				var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '05') {
				var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '06') {
				var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '07') {
				var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '08') {
				var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '09') {
				var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '10') {
				var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '11') {
				var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '12') {
				var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
  
  var tarih2 = ''
			if(moment(user.joinedAt).format('MM') === '01') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '02') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '03') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '04') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '05') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '06') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '07') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '08') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '09') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '10') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '11') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '12') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
  .setAuthor(`Sunucuya Bir Kullanıcı Katıldı ${member.guild.memberCount} Üye!`, member.user.avatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
  .addField("<a:giris:553315814284197909> Kullanıcı Tag", member.user.tag, true)
  .addField("<a:giris:553315814284197909> ID", member.user.id, true)
  .addField("<a:giris:553315814284197909> Discord Kayıt Tarihi", tarih, true)
  .addField("<a:giris:553315814284197909> Sunucuya Katıldığı Tarih", tarih2, true)
   .setFooter('MrGambleRR Giriş-Çıkış Sistemi')
   .setTimestamp()
   if(db.has(`girişçıkış_${member.guild.id}`) === true) return member.guild.channels.get(db.fetch(`girişçıkış_${member.guild.id}`)).send(embed);
})

client.on('guildMemberRemove', async member => {
  var user = member.user;
  var tarih = ''
			if(moment(user.createdAt).format('MM') === '01') {
				var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '02') {
				var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '03') {
				var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '04') {
				var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '05') {
				var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '06') {
				var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '07') {
				var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '08') {
				var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '09') {
				var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '10') {
				var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '11') {
				var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '12') {
				var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
  
  var tarih2 = ''
			if(moment(user.joinedAt).format('MM') === '01') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '02') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '03') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '04') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '05') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '06') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '07') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '08') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '09') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '10') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '11') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.joinedAt).format('MM') === '12') {
				var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
  
const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
  .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı ${member.guild.memberCount} Üye!`, member.user.avatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
  .addField("<a:cikis:553316508520939538> Kullanıcı Tag", member.user.tag, true)
  .addField("<a:cikis:553316508520939538> ID", member.user.id, true)
  .addField("<a:cikis:553316508520939538> Discord Kayıt Tarihi", tarih, true)
  .addField("<a:cikis:553316508520939538> Sunucuya Katıldığı Tarih", tarih2, true)
   .setFooter('MrGambleRR Giriş-Çıkış Sistemi')
   .setTimestamp()
   if(db.has(`girişçıkış_${member.guild.id}`) === true) return member.guild.channels.get(db.fetch(`girişçıkış_${member.guild.id}`)).send(embed);
})


   
client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-çöp') {
    if (msg.channel.type === 'dm') {
      const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xdcff00)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu özel mesajlarda kullanamazsın.')
    msg.author.sendEmbed(ozelmesajuyari); }
      if (msg.channel.type !== 'dm') {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (msg.lauthor.id !== ayarlar.yapimci) {
            const mesajlariyonet = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField(':warning: Uyarı :warning:', 'Bu komutu kulllanmak için `Mesajları Yönet` iznine sahip olmalısın.')
          return msg.author.sendEmbed(mesajlariyonet);
      }}
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100); //500 mesaj gg
      const sohbetsilindi = new Discord.RichEmbed()
    .setColor(0x35ff00)
    .setTimestamp()
    .addField('Eylem:', '**Sohbet silme**')
    .addField('Yetkili:', '` ' + msg.author.username + '`')
    .addField('Silinen Mesaj Sayısı:', '»'+ '  **500**  ' + '«')
    .addField('Sonuç:', '`Başarılı`'+ ' :white_check_mark: ')
    return msg.channel.sendEmbed(sohbetsilindi).then(msg => msg.delete(2900));
}}});

client.on('message', async message => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+ml') {
    msg.reply('🎮➳  ✔️ Mobile Legends: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Mobile Legends Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+lol') {
    msg.reply('🎮➳  ✔️ Legends Of Legend: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç LoL Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+mc') {
    msg.reply('🎮➳  ✔️ Minecraft: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Minecraft Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+cs') {
    msg.reply('🎮➳  ✔️ Counter Strike: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Counter Strike Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+fortnite') {
    msg.reply('🎮➳  ✔️ Fortnite: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Fortnite Oynayacak H? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+rocketleague') {
    msg.reply('🎮➳  ✔️ Rocket Legue: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Rocket League Oynayacak He? 😂');   
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+bs') {
    msg.reply('🎮➳  ✔️ Black Squad: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Black Squad Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+wot') {
    msg.reply('🎮➳  ✔️ World Of Tanks: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç World Of Tanks Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+pubg') {
    msg.reply('🎮➳  ✔️ PUBG: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç PUBG Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+toblox') {
    msg.reply('🎮➳  ✔️ Roblox: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Roblox Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+unturned') {
    msg.reply('🎮➳  ✔️ Unturned: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Unturned Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+ets2') {
    msg.reply('🎮➳  ✔️ Euro Truck Simulator 2: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Euro Truck Simulator 2 Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+gta5') {
    msg.reply('🎮➳  ✔️ Grand Theft Auto V: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Grand Theft Auto V Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+mta') {
    msg.reply('🎮➳  ✔️ Multi Theft Auto: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Multi Theft Auto Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+combatarms') {
    msg.reply('🎮➳  ✔️ Combat Arms: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Combat Arms Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+fifa') {
    msg.reply('🎮➳  ✔️ FIFA: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç FIFA Oynayacak He? 😂');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'h+pes') {
    msg.reply('🎮➳  ✔️ Pes: @here Baylar, Bayanlar, Kaydırakdan Kayanlar! Yok Mu Hiç Pes Oynayacak He? 😂');
  }
});

client.on("messageDelete", message => {
  if(message.author.bot) return;
  db.set(`sonmesajicerik_${message.channel.id}`,message.content)
  db.set(`sonmesajsahipid_${message.channel.id}`,message.author.id)
  console.log('Sunucu:' + message.guild.name + 'Snipe: ' + message.content + ' ' + client.users.get(message.author.id).tag)
  });

client.on("message",message => {
  if(!message.author.bot) return;
let usdurum = db.fetch(`usohbet_${message.channel.id}`)
    if(!usdurum || usdurum === 'pasif') return;
    else {
      message.delete(5000)
    }
})

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "yetkiliodakur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])


    
        
    message.guild.createChannel(`「👑」Kurucu Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "「👑」Kurucu");
      let role3 = message.guild.roles.find("name", "「👑」Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
     });
})

    message.guild.createChannel(`「🎩」Admin Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "「👑」Kurucu");
      let role3 = message.guild.roles.find("name", "「👑」Yönetici");
	  let role4 = message.guild.roles.find("name", "「🎩」Admin");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
     });
	  c.overwritePermissions(role4, {
          CONNECT: true,
     });
})

    message.guild.createChannel(`「⭐」Yetkili Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "「👑」Kurucu");
      let role3 = message.guild.roles.find("name", "「👑」Yönetici");
	  let role4 = message.guild.roles.find("name", "「🎩」Admin");
	  let role5 = message.guild.roles.find("name", "「⭐」Yetkili");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
     });
	  c.overwritePermissions(role4, {
          CONNECT: true,
     });

	  c.overwritePermissions(role5, {
          CONNECT: true,
     });
})
    message.guild.createChannel(`「🔥」Modaratör Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "「👑」Kurucu");
      let role3 = message.guild.roles.find("name", "「👑」Yönetici");
	  let role4 = message.guild.roles.find("name", "「🎩」Admin");
	  let role5 = message.guild.roles.find("name", "「⭐」Yetkili");
	  let role6 = message.guild.roles.find("name", "「🔥」Moderatör");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
     });
	  c.overwritePermissions(role4, {
          CONNECT: true,
     });

	  c.overwritePermissions(role5, {
          CONNECT: true,
     });
	  c.overwritePermissions(role6, {
          CONNECT: true,
     });
})
     
    message.guild.createChannel(`「💼」Toplanti Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ YETKILI ODALAR|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "「👑」Kurucu");
      let role3 = message.guild.roles.find("name", "「👑」Yönetici");
	  let role4 = message.guild.roles.find("name", "「🎩」Admin");
	  let role5 = message.guild.roles.find("name", "「⭐」Yetkili");
	  let role6 = message.guild.roles.find("name", "「🔥」Moderatör");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
     });
	  c.overwritePermissions(role4, {
          CONNECT: true,
     });

	  c.overwritePermissions(role5, {
          CONNECT: true,
     });
})
     
      message.guild.createRole({
        name: '「👑」Kurucu',
        color: 'b90303',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: '「👑」Yönetici',
        color: '1e08ac',
        permissions: [
            "ADMINISTRATOR",
    ]
      })
	  
	        message.guild.createRole({
        name: '「🎩」Admin',
        color: '050b46',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
			"ADMINISTRATOR",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })
	  
	  	    message.guild.createRole({
        name: '「⭐」Yetkili',
        color: '050b46',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      }) 
	 

      message.guild.createRole({
        name: '「🔥」Moderatör',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: '「🍹」VIP',
        color: '00ffff',
      })

      message.guild.createRole({
        name: 'Üye',
        color: '5de434',
      })

      message.guild.createRole({
        name: '「👻」Bot',
        color: '0f0f0f',
      })

       message.channel.send("Gerekli Odalar Kuruldu!")
     
            })
    
  };
});

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "stattemizle") {
  if (!message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")) return message.channel.send(" İstatistik ayarlanmamış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      const a = message.guild.channels.find(channel => channel.name === "Sunucu İstatistik").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Üye sayısı: ${message.guild.memberCount}`).delete()
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`).delete()
      if(!c) return console.log("guildStatsBot")
      const d = message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
      message.channel.send(" Kanallar temizlendi.")
    }
  if (command === "statayarla") {
  if (message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")) return message.channel.send(" Zaten istatistik ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
  message.channel.send(`Kategori ve kanal kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Sunucu İstatistik', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT'],
  deny: ['VIEW_CHANNEL']
}]);
let ban = message.guild.fetchBans().then(bans => {
 message.guild.createChannel(`Üye sayısı: ${message.guild.memberCount}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
 message.guild.createChannel(`Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
message.guild.createChannel(`Kanal sayısı: ${message.guild.channels.size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
        message.guild.createChannel(`Banlı Kişi Sayısı: ${bans.size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
  message.channel.send(process.env.basarili + " Sunucu paneli ayarlandı!")
        })
})
  }
});


client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`<a:v3:538057719899357194>  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("- BHDR | Bot", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<a:kartopu:560567017514467328> <a:tik:560563691443978251> Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});

let hereEngel = JSON.parse(fs.readFileSync("././jsonlar/hereEngelle.json", "utf8"));

  client.on("message", msg => {
  if (!msg.guild) return;
  if (!hereEngel[msg.guild.id]) return;
  if (hereEngel[msg.guild.id].hereEngel === 'kapali') return;
    if (hereEngel[msg.guild.id].hereEngel=== 'acik') {
      const here = ["@here", "@everyone"];
  if (here.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete());
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Everyone ve Here Engeli!")
        .setDescription(`Bu sunucuda Everyone ve Here yasak!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
});

client.on("message", msg => {
  
  
let i = db.fetch(`sa_${msg.guild.id}`)
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'Sa' ) {
          try {

                  return msg.reply('Aleyküm Selam Hoşgeldin!')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  
    });

client.on("message", async msg => {
let i = db.fetch(`kufur_${msg.guild.id}`)
if (i == 'Açık') {
        const kufur = ["oç","oc","amk","ananı sikiyim","ananıskm","piç","amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "ambaş", "am", "yarak", "veled", "veled-i zina"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Küfür etmemelisin! ⚠').then(msg => msg.delete(30000));
             }
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {

}

});

client.on("message", async msg => {
let i = db.fetch(`reklam_${msg.guild.id}`)
if (i == 'Açık') {

    const reklam = ["discordapp", ".com", ".net", ".xyz", ".tk", "gulu", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Reklam Tespit Edildi! ⚠').then(msg => msg.delete(30000));
             }
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {

        }
});

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<a:cildirmisdisco:560566927978790957> <a:giris:553315814284197909> **${member.user.tag}** Adlı Kullanıcı Katıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
});

client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<a:cildirmisdisco:560566927978790957> <a:cikis:553316508520939538> **${member.user.tag}** Adlı Kullanıcı Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz! `)
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

////////////////////////


////////////////////////


client.on('message', message => {
if (message.content === '<@535772624039706644>') {
  const embed = new Discord.RichEmbed()
  .setTitle('Ben MrGambleRR')
  .setDescription('Prefixim: `-`')
  .setColor('RANDOM')
 message.reply(embed)
}
});

client.on('message', message => {
    if (message.content.startsWith("-virüs")) {
        if(!message.author.id === '') return;
      if (message.author.bot) return
           message.delete();
             let args = message.content.split(' ').slice(1);
 
                   let virusname = args.join('Aktarma işlemi, iptal edildi!');
                 if (virusname < 1) {
                     return message.channel.send("Lütfen, bir isim belirtiniz!");
                 }
                 message.channel.send({embed: new Discord.RichEmbed().setTitle(virusname + " Hazırlanmakta!").setColor(0x808080)}).then(function(m) {
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 1%').setColor(0x808080)})
             }, 1000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 2%').setColor(0x808080)})
             }, 2000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 3%').setColor(0x808080)})
             }, 3000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 4%').setColor(0x808080)})
             }, 4000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 28%').setColor(0x808080)})
             }, 5000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 35%').setColor(0x808080)})
             }, 6000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 78%').setColor(0x808080)})
             }, 7000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 80%').setColor(0x808080)})
             }, 8000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 86%').setColor(0x808080)})
             }, 9000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 89%').setColor(0x808080)})
             }, 10000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 90%').setColor(0x808080)})
             }, 11000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 95%').setColor(0x808080)})
             }, 12000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 96%').setColor(0x808080)})
             }, 13000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 97%').setColor(0x808080)})
             }, 14000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 98%').setColor(0x808080)})
             }, 15000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 99%').setColor(0x808080)})
             }, 16000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs, Yükleniyor! 100%').setColor(0x808080)})
             }, 17000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs İçin Aktarma İşlemi Başlatılıyor!').setColor(0x808080)})
             }, 18000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle(virusname + ' Adlı Virüs İçin Dosyalar Hazırlanıyor!').setColor(0x808080)})
             }, 19000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('Dosya, aktarılıyor: ' + virusname + ".key").setColor(0x808080)})
             }, 22000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('İşlemin gerçekleşmesine, son 5sn.').setColor(0x808080)})
             }, 25000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('İşlemin gerçekleşmesine, son 4sn.').setColor(0x808080)})
             }, 26000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('İşlemin gerçekleşmesine, son 3sn.').setColor(0x808080)})
             }, 27000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('İşlemin gerçekleşmesine, son 2sn.').setColor(0x808080)})
             }, 28000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('İşlemin gerçekleşmesine, son 1sn.').setColor(0x808080)})
             }, 29000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('Virüs, ekleniyor!').setColor(0x808080)})
           }, 30000)
              setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('Virüs, eklendi!').setColor(0x808080)})
           }, 31000)
              setTimeout(function() {
               m.delete()
           }, 32000)
             setTimeout(function() {
               message.channel.send('Virüs, sızdırıldı!')
           }, 33000)
           });
         }
 })


client.on('guildCreate', guild => {
         let channel = client.channels.get("537648051922141194")//girdiği sunucuların logunu yazmasını istediğiniz kanalın idi
         const embed = new Discord.RichEmbed()
             .setColor("GREEN")
             .setAuthor(`Bot Bir Sunucuya Katıldı.`)
             .setThumbnail(guild.iconURL)
             .addField("Sunucu Adı:", guild.name)
             .addField("Sunucu sahibi", guild.owner)
             .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
             .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
             .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
         channel.send(embed);
     });

     client.on('guildDelete', guild => {
         let channel = client.channels.get("537648051922141194")//çıktığı sunucuların logunu yazmasını istediğiniz kanalın idi
         const embed = new Discord.RichEmbed()
             .setColor("RED")
             .setAuthor(`Bot Bir Sunucudan Ayrıldı.`)
             .setThumbnail(guild.iconURL)
             .addField("Sunucu Adı:", guild.name)
             .addField("Sunucu sahibi", guild.owner)
             .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
             .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
             .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
         channel.send(embed);
     });

client.on('message', message => {
  if (message.content === prefix + 'yenilen') {
      
      if (message.author.id === "311916056270864384") {
          message.channel.send('**Bot Yeniden Başlatılıyor...**').then(msg => {
              console.log('yeniden başlatılıyor')
              process.exit(0);
          });
      } else 
          message.channel.send('**Maalesef bu komutu kullanamazsın. Benim yapımcım değilsin!**')
  }
  
  
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);