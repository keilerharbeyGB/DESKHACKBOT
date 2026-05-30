const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra tu avatar')
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

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${usuario.username}`)
            .setImage(usuario.displayAvatarURL({ size: 1024 }))
            .setColor('Blue');

        await interaction.reply({
            embeds: [embed]
        });
    }
};