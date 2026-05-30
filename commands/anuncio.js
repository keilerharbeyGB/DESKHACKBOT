const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('anuncio')
        .setDescription('Crear anuncio')
        .addStringOption(option =>
            option.setName('titulo')
                .setDescription('Título')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('descripcion')
                .setDescription('Descripción')
                .setRequired(true)
        ),

    async execute(interaction) {

        const titulo = interaction.options.getString('titulo');
        const descripcion = interaction.options.getString('descripcion');

        const embed = new EmbedBuilder()
            .setTitle(`📢 ${titulo}`)
            .setDescription(descripcion)
            .setColor('#8B0000')
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};