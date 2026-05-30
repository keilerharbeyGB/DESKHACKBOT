const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra el ping'),

    async execute(interaction) {
        await interaction.reply(`🏓 ${interaction.client.ws.ping}ms`);
    }
};