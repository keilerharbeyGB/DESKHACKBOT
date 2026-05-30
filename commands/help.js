const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Panel de ayuda'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('📚 DESKHACK HELP')
            .setColor('Blue')
            .setDescription(`
/ping
/help
/anuncio
/ticket-panel
            `);

        await interaction.reply({
            embeds: [embed]
        });
    }
};