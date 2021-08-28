const { MessageAttachment, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const exampleEmbed = {
    color: 0x003253,
    title: 'The Poetic Shark Bot',
    url: 'https://github.com/hua-lun/poetic_shark',

    description: 'Poetic Shark was created for SharkHacks 2021.\n' +
        'Create your own memes / emphasis a message with our meme generator!\n' +
        'Feeling inspired? Play our Poetic Shark game and see who comes up with the best caption!',

    image: {
        url: 'https://raw.githubusercontent.com/hua-lun/poetic_shark/master/img/Poetic%20Shark.png',
    },
    timestamp: new Date(),
    footer: {
        text: 'Poetic Shark Bot',
        icon_url: 'https://raw.githubusercontent.com/hua-lun/poetic_shark/master/img/Poetic%20Shark.png',
    },
};



module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About The Poetic Shark Bot'),
    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed]});
    },
};