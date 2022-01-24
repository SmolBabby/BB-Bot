const fs = require('fs');
const path = require('path')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const chalk = require('chalk');
const Canvas = require('canvas');
const ms = require('ms');
const ytdl = require('ytdl-core');
const prompt = require('prompt');

const ud = require('urban-dictionary');
const db = require('quick.db')

const package = require('./package.json');
const config = require('./config.json');
const fortune = require('./variables/fortunes.js');
const works = require('./variables/works.js')
const currency = config.currency;

const client = new Discord.Client();
client.commands = new Discord.Collection();

var economy = new db.table('economy');


class newUser {
    constructor(username, guild) {
        this.balance = 0;
        this.items = [
            { name: "Tea", amount: 0 },
            { name: "Fortune Cookie", amount: 0 },
            { name: "Bullet", amount: 0 },
            { name: "Gun", amount: 0 },
            { name: "Stick", amount: 0 },
            { name: "Sandwich", amount: 0 },
            { name: "Bag Of Air", amount: 0 }

        ];
        this.username = username;
        this.guilds = [guild]
    }
}


const hi = require('./variables/hi.js')



const shop = [
    { name: "Tea", cost: 5 },
    { name: "Fortune Cookie", cost: 100 },
    { name: "Bullet", cost: 1000 },
    { name: "Gun", cost: 50000 },
    { name: "Stick", cost: 5000 },
    { name: "Sandwich", cost: 200 },
    { name: "Bag Of Air", cost: 1000000000 }
];


const talkedRecently = new Set();

const bjGames = new Set();

function replaceIndex(array, i, value) {
    var index = array.indexOf(i);

    if (index !== -1) {
        array[index] = value;
    }
}


function sort_by_key(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function isNumber(str) {
    if (typeof str != "string") return false // we only process strings!
        // could also coerce to string: str = ""+str
    return !isNaN(str) && !isNaN(parseFloat(str))
}



function setupDate(x) {
    if (x < 10) {
        return '0' + String(x);
    } else {
        return String(x);
    }
};



const searchObj = function(obj, query) {

    for (var key in obj) {
        var value = obj[key];

        if (typeof value === 'object') {
            searchObj(value, query);
        }

        if (value === query) {
            console.log('property=' + key + ' value=' + value);
            return key;
        }

    }

}




const sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function kill(message) {
    message.channel.send("Change da world. My final message. Goodb ye.").then((promise) => {
        console.log(chalk.cyanBright(`Babby used the command BB.kill. Ending the program...`));
        sleep(50);
        process.exit();

    });
}



const loic = '474666235192410132';
const jayden = '500417031498366998';
const bb = '761752606799560787';
const prefix = "bb.";




var totalCommands = 0;








const consoleTitle = config.title;
console.log(chalk.redBright(consoleTitle));
console.log(chalk.magentaBright("By Loïc Boiteux and Jayden Searle-Miller\n\n"));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
async function load() {

    await sleep(10000);


    await console.log('Booting up ' + chalk.cyan(__filename));
    await sleep(250);
    await console.log(chalk.yellow('[Command Loader]'), 'Loading commands...');
    await sleep(1000);
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        await sleep(getRandomInt(10));
        await console.log(chalk.yellow('[Command Loader]'), 'Successfully loaded ' + chalk.cyan(file));
        totalCommands++;
    }
    console.log(chalk.cyan(totalCommands), 'commands loaded');
    client.login(config.token);
}


load();


async function listingGuilds() {
    console.log('Connected as ' + chalk.greenBright(client.user.tag))
    await sleep(150);

    let i = 0;
    await client.guilds.cache.forEach((guild) => {
        i++;
    });
    await sleep(100);
    await console.log(`Present in ${i} servers `)
    await console.log("   Servers:");
    await client.guilds.cache.forEach(async(guild) => {
        await console.log(chalk.blueBright("     - " + guild.name));

    });
    sleep(100)
    await (client.user.setActivity(`Version ${package.version}`, { type: 'PLAYING' }).then(presence => console.log(`Activity set to ` + chalk.green(presence.activities[0].name))));
    await sleep(100);
    console.log('\nBot online; Waiting for commands...\n');
}


client.on('ready', async() => {
    await listingGuilds();

});


process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));


let request = require(`request`);


function download(url, name) {
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(`C:\\Users\\bande de moules\\Desktop\\Memes\\${name}`));
}




//==========================================================================================
//==========================================================================================







client.on('message', async message => {
    const author = message.author.id;

    if (message.author.bot) return;



    async function updateDB(author, username) {
        economy.set(`${author}.user.balance`, Math.floor(economy.get(`${author}.user.balance`)));
        let guilds = economy.get(`${author}.user.guilds`);
        economy.set(`${author}.user.username`, username)

        let i = false;
        guilds.forEach(guild => {

            if (guild == message.guild.id) {
                i = true
            }
        });
        if (i == false) {
            await guilds.push(message.guild.id);
            await economy.set(`${author}.user.guilds`, guilds)
        } else return;
        return
    }

    if (!economy.get(author)) {
        let obj = new newUser(message.author.tag.toString(), message.guild.id)
        await economy.set(author, {
            "user": obj
        });
        console.log(`Added an new entry for ${message.author.tag}`);
        await economy.add(`${author}.user.balance`, 10);
    } else {
        await updateDB(author, `${message.author.tag}`)
        await economy.add(`${author}.user.balance`, getRandomInt(5));
    }



    if (message.mentions.has(client.user)) { //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
        message.channel.send(`Hi ${message.author.username}, what can I do for you?`) //this is where you put what you want to do now
    }


    if (message.channel.name == 'memes') {
        message.attachments.forEach(attachment => {
            // do something with the attachment
            const url = attachment.url;
            let name;
            if (attachment.name == 'image0.jpg' || attachment.name == 'image0.png' || attachment.name == 'video0.mp4' || attachment.name == 'video0.mov') {
                name = String(getRandomInt(100000)) + '_' + attachment.name;
            } else {
                name = attachment.name;
            }

            download(url, name);
        });
    }


    async function logCommand(a, command) {


        let date = new Date();
        var today = [String(date.getFullYear()), date.getMonth() + 1, date.getDate()];
        var time = "(" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ")";

        today[1] = setupDate(today[1]);
        today[2] = setupDate(today[2]);

        console.log(`Successfully logged the command ` + chalk.blue(command) + ` used by ` + chalk.greenBright(a) + ` to ` + chalk.magenta(today[0] + '-' + today[1] + '-' + today[2]));
        fs.appendFileSync(path.join(__dirname + '\\logs', today[0] + '-' + today[1] + '-' + today[2] + '.txt'), time + " : " + a + " used the command: " + command + '\n', "UTF8");


    };




    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.toLowerCase().startsWith("bb.")) {
        return;
    }

    if (command == 'invite') {
        if (message.author.id == loic) {
            return message.channel.send(new Discord.MessageEmbed()
                .setURL('https://discord.com/api/oauth2/authorize?client_id=761752606799560787&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D761752606799560787%26permissions%3D8%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Foauth2%252Fauthorize%253Fclient_id%253D761752&scope=bot')
                .setTitle('Invite Link!')
                .setColor('#7f1f1f')
                .setTimestamp()
                .setFooter('From BB', client.user.avatarURL()));
        } else return
    }


    if (command == 'join') {
        message.member.voice.channel.join()
        return
    }
    if (command == 'leave') {
        return message.member.voice.channel.leave();
    }


    if (command == 'kill') {
        if (message.author == loic) {
            return kill(message);
        }
    }



    if (command === "echo") {
        if (message.author.id === loic) {
            /* if (args[0].toLowerCase() == '-owo') {
                args.shift();
                var echoMessage = args.join(" ");
                message.delete();
                echoMessage = owo(echoMessage);
                logCommand(message.author.tag, command);
                message.channel.send(echoMessage);
                return
            } else { */
                const echoMessage = args.join(" ");
                message.delete();
                logCommand(message.author.tag, command);
                message.channel.send(echoMessage);
                return
            }
         else {
            return message.channel.send('Error: Only my creators can use this command.')
        }
    }

    if (command === "embed") {
        if (message.author.id === loic) {
            logCommand(message.author.tag, command);
            message.delete();
            client.commands.get('embed').execute(client, message, args, Discord);
            return
        }
    }

    

    let user = economy.get(`${author}.user`);
    switch (command) {
        //pet
        case 'pet':
            client.commands.get('pet').execute(client, message, args, message.author.displayAvatarURL({ format: "png" }))
            logCommand(message.author.tag, command);
            break;

            //reddit
        case 'reddit':
            if (!args.length) {
                return message.channel.send('You must provide the subreddit!');
            }
            client.commands.get('reddit').execute(client, message, args, Discord, fetch);
            logCommand(message.author.tag, command);
            break;

            //sleep
        case 'sleep':
            client.commands.get('sleep').execute(client, message, args, Discord);
            logCommand(message.author.tag, command);
            break;

            //urban dictionary
        case 'ud':
            logCommand(message.author.tag, command);
            client.commands.get('ud').execute(client, message, args, ud, Discord);
            break;

            //Games
            //blackjack
        case 'bj':
        case 'blackjack':
            client.commands.get('blackjack').execute(client, message, args, Discord, economy, db);
            logCommand(message.author.tag, command);
            break;

            //coin flip
        case 'flip':
            client.commands.get('flip').execute(client, message, args, Discord, getRandomInt, economy, db, sleep);
            logCommand(message.author.tag, command);
            break;

            //ttt
        case 'ttt':
            client.commands.get('ttt').execute(client, message, args, Discord, getRandomInt, sleep, db, economy);
            logCommand(message.author.tag, command);
            break;


            //Money
            //Inventory
        case 'inventory':
        case 'inv':

            client.commands.get('inventory').execute(client, message, args, Discord, db, economy);
            logCommand(message.author.tag, command);
            break;

        case 'shop':
            client.commands.get('shop').execute(client, message, args, shop, Discord, sort_by_key)
            logCommand(message.author.tag, command)
            break;

            //buy
        case 'buy':
            if (!args.length) return message.channel.send('You need to provide an item\'s name!');

            client.commands.get('buy').execute(client, message, args, user, Discord, db, economy, fortune, getRandomInt)
            logCommand(message.author.tag, command);
            break;


            //use
        case 'use':
            if (!args.length) return message.channel.send('You need to provide an item\'s name!');
    
            client.commands.get('use').execute(client, message, args, user, Discord, db, economy, fortune, getRandomInt)
            logCommand(message.author.tag, command);
            break;

            //work
        case 'work':
            if (talkedRecently.has(message.author.id)) {
                message.reply(" please wait 60 seconds before using this command again!");
            } else {
                client.commands.get('work').execute(client, message, args, works, db, economy, getRandomInt)
                logCommand(message.author.tag, command);
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 60000);
            }
            break;

            //Leaderboard
        case 'lb':
        case 'leaderboard':
            client.commands.get('leaderboard').execute(client, message, args, user, Discord, db, economy)
            logCommand(message.author.tag, command);
            break;

            //Buy
        case 'buy':
            if (!args.length) return message.channel.send('You need to provide an item\'s name!');

            client.commands.get('buy').execute(client, message, args, user, Discord, db, economy)
            logCommand(message.author.tag, command);
            break;

            //Utility
            //Suggest
        case 'suggest':
            client.commands.get('suggest').execute(client, message, args);
            logCommand(message.author.tag, command);
            break;

            //Credits
        case 'credits':
        case 'credit':
            client.commands.get('credits').execute(client, message, args, Discord, package);
            logCommand(message.author.tag, command);
            break;

            //help
        case 'help':
            client.commands.get('help').execute(client, message, args, package);
            logCommand(message.author.tag, command);
            break;

        default:
            message.channel.send('Unknown command. Use `bb.help` for the list of commands!')
            break;
    }
    /*
        
           if (command == 'clear') {
            client.commands.get('clear').execute(client, message, args, sleep);
            logCommand(message.author.tag, command);
        }

        if (command == 'meme') {
            var files = fs.readdirSync('C:\\Users\\bande de moules\\Desktop\\Memes')
               
        let chosenFile = files[Math.floor(Math.random() * files.length)]
        console.log(chosenFile);
        message.channel.send({ files: [`C:\\Users\\bande de moules\\Desktop\\Memes\\${chosenFile}`] })

    } */

});