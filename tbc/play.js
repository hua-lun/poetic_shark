const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, ThreadManager } = require('discord.js');
const rn = require('random-number')

const arr = ['bench', 'coffeeshop', 'computer', 'lecture', 'rollercoaster', 'spa']
const abc = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
]

const options1 = {
    min: 0,
    max: 25,
    integer: true
}

const options2 = {
    min: 0,
    max: 5,
    integer: true
}

async function imageCreator() {
    let images = []
    for (let i = 0; i < 2; i++) {
        const img = arr[rn(options2)]
        images.push('./img/' + img + '.png')
    }
    return images
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Starts game, returns images and prompts'),
    async execute(interaction) {

        const imgArr = await imageCreator()
        await interaction.reply({ files: [imgArr[0]]});
        await interaction.followUp({ files: [imgArr[1]]});
        await interaction.followUp({ files: [imgArr[2]]});
    },
};