const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Jimp = require('jimp') ;
const fs = require('fs')

async function createMeme(theme, line1, line2, user) {
    // Reading image
    const image = await Jimp.read('./img/' + theme + '.png');
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    image.print(font, 100, 400, line1);
    image.print(font, 100, 450, line2);
    // Writing image after processing
    await image.writeAsync('./processed_img/textOverlay_' + user + '.png');

    return new MessageAttachment('./processed_img/textOverlay_' + user + '.png');
}

async function deleteMeme(user) {
    try {
        fs.unlinkSync('./processed_img/textOverlay_' + user + '.png')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shark')
        .setDescription('Create a custom meme!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('computer')
                .setDescription('computer theme')
                .addStringOption(option => option.setName('first').setDescription('Description, limited to 26 chars'))
                .addStringOption(option => option.setName('second').setDescription('Description, limited to 26 chars')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('rollercoaster')
                .setDescription('rollercoaster theme')
                .addStringOption(option => option.setName('first').setDescription('Description, limited to 26 chars'))
                .addStringOption(option => option.setName('second').setDescription('Description, limited to 26 chars')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('spa')
                .setDescription('spa day theme')
                .addStringOption(option => option.setName('first').setDescription('Description, limited to 26 chars'))
                .addStringOption(option => option.setName('second').setDescription('Description, limited to 26 chars')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('lecture')
                .setDescription('class lecture theme')
                .addStringOption(option => option.setName('first').setDescription('Description, limited to 26 chars'))
                .addStringOption(option => option.setName('second').setDescription('Description, limited to 26 chars')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('coffeeshop')
                .setDescription('coffeeshop theme')
                .addStringOption(option => option.setName('first').setDescription('Description, limited to 26 chars'))
                .addStringOption(option => option.setName('second').setDescription('Description, limited to 26 chars'))),

    async execute(interaction) {
        if (interaction.commandName === 'shark') {

            const theme = interaction.options.getSubcommand()
            const line1 = interaction.options.getString('first')
            let line2 = interaction.options.getString('second')

            if (line2 === null) {
                line2 = ''
            }

            if (line1.length > 26 || line2.length > 26) {
                await interaction.reply('Unable to process. Please ensure each line has no more than 26 chars.')
            }

            console.log(line1, line2)

            const user = interaction.user.id

            await interaction.reply({ files: [await createMeme(theme, line1, line2, user)] })

            await deleteMeme(user)
        }
    },
};