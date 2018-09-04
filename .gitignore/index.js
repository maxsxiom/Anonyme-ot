const Discord = require('discord.js')
const Secure = require('./secure.js')
const client = new  Discord.Client()
const secure = new Secure()
const prefix = 't-'

client.on('ready',function(){
  console.log('Je Suis Op')
  let guilds_id = Array.from(client.guilds.keys())
  for(var i=0; i<guilds_id.length; i++){
    console.log(`>\t${client.guilds.get(guilds_id[i]).name}`)
  }
  client.user.setActivity(prefix+'help',{type: 'WATCHING'})
})

client.on('message',function(message){
  if(!message.system && !message.author.bot){
    if(message.content.includes(prefix+'exit') && message.membre.id === '308763822515159042'){
      message.channel.send('`Bye Anonyme-Bot`')
      message.delete()
      client.destroy()
    }else if(message.content.includes(prefix+'help')){
      message.channel.send(
        `\`${prefix}help\` -[ Affiche ce texte ]\n`+
        `\`${prefix}membres\` -[ Affiche les membres ]\n`+
        `\`${prefix}ban\` -[Se qui permet de ban les membres ( Bientot) ]\n`+
        `\`${prefix}loto\` -[ Cadeau ]\n`+
        `\`${prefix}dice\` -[ Lance un dé ]\n`+
        `\`${prefix}exit\` -[ Permet de faire quitée le bot (Admin) ]\n`+
        `\`${prefix}search <recherche>\` - [ Recherche Google ]\n`
      )
      message.delete()
    }else if(message.content.includes(prefix+'search') && message.content.includes(' ') && message.content.length >11){
      let search = message.content.toLowerCase().slice(9).replace(/ /g,'+')
      message.channel.send(`https://www.google.com/search?q=${search}&ie=utf-8&oe=utf-8&client=firefox-b-ab`)
      message.delete()
    }else if(message.content.includes(prefix+'dice')){
      let random =Math.floor(Math.random()*6)
      let alpha = [":one:",":two:",":three:",":four:",":five:",":six:"]
      message.channel.send('Je lance mon dé ...')
      message.channel.send(alpha[random])
      message.delete()
    }else if(message.content.includes(prefix+`loto`)){
      let members_id = Array.from(message.guild.members.keys())
      let member = message.guild.members.get(members_id[Math.floor(Math.random()*members_id.length)])
      message.channel.send(
        `${member.displayName} a gagné au loto !\n`+
        `Bravo ${tag(member)} ! ;)`
      )
        message.delete()
    }else if(message.content.includes(prefix+'membres')){
      let info = message.guild.members.map(membre => '>\t'+membre.id+'\t'+membre.displayName).join('\n')
      console.log(info)
      message.delete()
    }
     //else if(message.kick(prefix+'ban')){
    //let

  }
})

function tag(member){
  return `<@${member.id}>`
}

client.on('message', message => {
    let command = message.content.split(" ")[0]
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === 'expulser') {
    let modRole = message.guild.roles.find("name", "Admin");
    if (!message.member.roles.has(modRole.id)) {
        return message.channel.send(`Désolé **${message.author.username}** mais tu n'a pas la permission de kick les gens`)
    }
    if(message.mentions.users.size === 0) {
        return message.channel.send(`Oups, je pense que tu as oublié de mentionner un membre du serveur **${message.author.username}** x)`)
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember) {
        return message.channel.send(`Ohhh, je suis désolé **${message.author.username}** de vous l'annoncer mais cet utilisateur ne peut être expulsé ou n'est pas ici...`)
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send(`Désolé **${message.author.username}** mais je n'ai pas la permission d'expulser des personnes de ce serveur`)
    }
    kickMember.kick().then(member => {
        message.channel.send(`Bravo **${message.author.username}**, tu as expulsé **${member.user.username}** avec succès`)
        message.guild.channels.find("name", "general").send(`Bravo à **${member.user.username}** qui a été kick du serveur par notre gentil **${message.author.username}**`)
    })
}

    if (command === "bannissement") {
        let modRole = message.guild.roles.find("name", "Admin");
        if (!message.member.roles.has(modRole.id)) {
            return message.channel.send(`Désolé **${message.author.username}** mais tu n'a pas la permission de kick les gens`)
        }
        const member = message.guild.member(message.mentions.users.first());
        if (!member) return message.channel.send(`Hrmmm, je pense que tu as oublié de mentionner l'utilisateur que tu veux banir **${message.author.username}** --'`)
        member.ban().then(member => {
            message.channel.send(`L'utilisateur **${member.user.username}** a été banni avec succés`)
            message.guild.channels.find("name", "general").sendMessage(`Bravo à **${member.user.username}** qui a gagné un bannissement par **${message.author.username}**`)
        })
    }
})
  client.login(secure.token)
