const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('sugerencia')
        .setDescription('Crear sugerencia')
        .addStringOption(option =>
            option
                .setName('texto')
                .setDescription('Tu sugerencia')
                .setRequired(true)
        ),

    async execute(interaction) {

        const texto =
            interaction.options.getString('texto');

        const embed = new EmbedBuilder()
            .setTitle('💡 Nueva Sugerencia')
            .setDescription(texto)
            .addFields({
                name: 'Autor',
                value: interaction.user.tag
            })
            .setColor('Yellow')
            .setTimestamp();

        const mensaje = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        await mensaje.react('👍');
        await mensaje.react('👎');
    }
};