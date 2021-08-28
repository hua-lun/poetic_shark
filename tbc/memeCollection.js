const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memecollection')
        .setDescription('View all available meme templates to use for shark command'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'computer',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'rollercoaster',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                        {
                            label: 'spa',
                            description: 'This is also a description',
                            value: 'third_option',
                        },
                        {
                            label: 'lecture',
                            description: 'This is also a description',
                            value: 'fourth_option',
                        },
                        {
                            label: 'coffeeshop',
                            description: 'This is also a description',
                            value: 'fifth_option',
                        },
                    ]),
            );

        await interaction.reply({ content: 'Meme Album!', components: [row] });
    }
}
