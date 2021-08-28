const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frenzy')
        .setDescription('Create a frenzy, flush out the chat'),
    async execute(interaction) {
        await interaction.reply('🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n' +
            '🦈\n');
    },
};