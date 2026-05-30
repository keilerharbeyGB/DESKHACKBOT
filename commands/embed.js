const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Crear un embed avanzado')

        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )

        .addStringOption(option =>
            option
                .setName('titulo')
                .setDescription('Título del embed')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('descripcion')
                .setDescription('Descripción')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('color')
                .setDescription('Ejemplo: #8A2BE2')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('autor')
                .setDescription('Nombre del autor')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('imagen')
                .setDescription('URL de imagen grande')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('miniatura')
                .setDescription('URL de miniatura')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('footer')
                .setDescription('Texto del footer')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('footer_imagen')
                .setDescription('URL de la imagen del footer')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('contenido')
                .setDescription('@everyone, @here o texto')
                .setRequired(false)
        ),

    async execute(interaction) {

        const titulo =
            interaction.options.getString('titulo');

        const descripcion =
            interaction.options.getString('descripcion');

        const color =
            interaction.options.getString('color') ||
            '#8A2BE2';

        const autor =
            interaction.options.getString('autor');

        const imagen =
            interaction.options.getString('imagen');

        const miniatura =
            interaction.options.getString('miniatura');

        const footer =
            interaction.options.getString('footer');

        const footerImagen =
            interaction.options.getString('footer_imagen');

        const contenido =
            interaction.options.getString('contenido');

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(titulo)
            .setDescription(descripcion)
            .setTimestamp();

        if (autor) {
            embed.setAuthor({
                name: autor
            });
        }

        if (imagen) {
            embed.setImage(imagen);
        }

        if (miniatura) {
            embed.setThumbnail(miniatura);
        }

        if (footer) {
            embed.setFooter({
                text: footer,
                iconURL: footerImagen || undefined
            });
        }

        await interaction.channel.send({
            content: contenido || null,
            embeds: [embed]
        });

        await interaction.reply({
            content: '✅ Embed enviado correctamente.',
            ephemeral: true
        });
    }
};