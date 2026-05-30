const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Información de usuario')
        .addUserOption(option =>
            option
                .setName('usuario')
                .setDescription('Usuario')
                .setRequired(false)
        ),

    async execute(interaction) {

        const usuario =
            interaction.options.getUser('usuario') ||
            interaction.user;

        const miembro =
            interaction.guild.members.cache.get(usuario.id);

        const embed = new EmbedBuilder()
            .setTitle('👤 Información de Usuario')
            .setThumbnail(usuario.displayAvatarURL())
            .addFields(
                {
                    name: 'Nombre',
                    value: usuario.tag,
                    inline: true
                },
                {
                    name: 'ID',
                    value: usuario.id,
                    inline: true
                },
                {
                    name: 'Entró al servidor',
                    value: `<t:${Math.floor(miembro.joinedTimestamp / 1000)}:F>`
                }
            )
            .setColor('Green');

        await interaction.reply({
            embeds: [embed]
        });
    }
};