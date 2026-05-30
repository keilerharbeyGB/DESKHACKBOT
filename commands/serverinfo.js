const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Información del servidor'),

    async execute(interaction) {

        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`🌐 ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: '👥 Miembros',
                    value: `${guild.memberCount}`,
                    inline: true
                },
                {
                    name: '📁 Canales',
                    value: `${guild.channels.cache.size}`,
                    inline: true
                },
                {
                    name: '🎭 Roles',
                    value: `${guild.roles.cache.size}`,
                    inline: true
                }
            )
            .setColor('Purple');

        await interaction.reply({
            embeds: [embed]
        });
    }
};