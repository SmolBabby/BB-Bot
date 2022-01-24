module.exports = {
    name: 'reddit',
    description: 'Get a post from a Subreddit. *<Subreddit/post link>*',
    category: 'Fun',
    command: true,
    execute(client, message, args, Discord, fetch) {

        message.delete();

        if (args[0].startsWith("https://www.reddit.com/r/") || args[0].startsWith("https://reddit.com/r/")) {


            fetch(`${args}.json`)
                .then(response => response.json())
                .then(response => {

                    if (typeof response[0] == "undefined" || typeof response[0].data == "undefined") {
                        return message.channel.send("Error: The post link is invalid");
                    } else {

                        if (response[0].data.children[0].data.is_self) {
                            var posttitle = response[0].data.children[0].data.title;
                            var posttext = response[0].data.children[0].data.selftext;
                            var postlink = 'https://reddit.com' + response[0].data.children[0].data.permalink;
                            var postauthor = response[0].data.children[0].data.author;

                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor + `\n**${posttext}**`)
                                .setAuthor('Post from: r/' + response[0].data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);

                            return message.channel.send(redditEmbed)

                        } else if (response[0].data.children[0].data.is_video) {

                            var posttitle = response[0].data.children[0].data.title;
                            var posttext = `[Click here to see the video!](${response[0].data.children[0].data.media.reddit_video.scrubber_media_url})`;
                            var postlink = 'https://reddit.com' + response[0].data.children[0].data.permalink;
                            var postauthor = response[0].data.children[0].data.author;

                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor + `\n${posttext}`)
                                .setAuthor('Post from: r/' + response[0].data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);


                            return message.channel.send(redditEmbed)


                        } else {
                            var posttitle = response[0].data.children[0].data.title;
                            var postimage = response[0].data.children[0].data.url_overridden_by_dest;
                            var postlink = 'https://reddit.com' + response[0].data.children[0].data.permalink;
                            var postauthor = response[0].data.children[0].data.author;
                            console.log(postimage);

                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor)
                                .setAuthor('Post from: r/' + response[0].data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);

                            return message.channel.send(redditEmbed)
                        }
                    }

                })





        } else {

            fetch(`https://www.reddit.com/r/${args[0]}/new.json`)
                .then(response => response.json())
                .then(response => {
                    if (response.data.children[0].data.over_18) { return message.channel.send("Error: Can't search for NSFW posts") }
                    if (typeof response.data == "undefined") {
                        return message.channel.send("Error: The subreddit is invalid");
                    } else if (typeof response.data.children[0] == "undefined") {
                        return message.channel.send("Error: The subreddit is invalid");
                    } else {
                        if (response.data.children[0].data.is_self) {
                            var posttitle = response.data.children[0].data.title;
                            var posttext = response.data.children[0].data.selftext;
                            var postlink = 'https://reddit.com' + response.data.children[0].data.permalink;
                            var postauthor = response.data.children[0].data.author;

                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor + `\n**${posttext}**`)
                                .setAuthor('Post from: r/' + response.data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);

                            return message.channel.send(redditEmbed)


                        } else if (response.data.children[0].data.is_video) {

                            var posttitle = response.data.children[0].data.title;
                            var posttext = `[Click here to see the video!](${response.data.children[0].data.media.reddit_video.scrubber_media_url})`;
                            var postlink = 'https://reddit.com' + response.data.children[0].data.permalink;
                            var postauthor = response.data.children[0].data.author;

                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor + `\n${posttext}`)
                                .setAuthor('Post from: r/' + response.data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);


                            return message.channel.send(redditEmbed)


                        } else {

                            var posttitle = response.data.children[0].data.title;
                            var postimage = response.data.children[0].data.url_overridden_by_dest;
                            var postlink = 'https://reddit.com' + response.data.children[0].data.permalink;
                            var postauthor = response.data.children[0].data.author;

                            if (typeof response.data.children[0].data.preview.reddit_video_preview == 'undefined') {

                            } else {
                                postimage = postimage.slice(0, -1);
                            }


                            const redditEmbed = new Discord.MessageEmbed()
                                .setColor('#FF5700')
                                .setTitle(posttitle)
                                .setURL(postlink)
                                .setDescription('By u/' + postauthor)
                                .setAuthor('Post from: r/' + response.data.children[0].data.subreddit, 'https://www.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png', `https://www.reddit.com/r/${args[0]}`)
                                .setImage(postimage)
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL);

                            return message.channel.send(redditEmbed)
                        }

                    }
                });
        }

    },
};