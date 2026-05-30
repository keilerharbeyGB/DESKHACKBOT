const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Enviar mensaje con el bot')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )

        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje')
                .setRequired(true)
        ),

    async execute(interaction) {

        const mensaje =
            interaction.options.getString('mensaje');

        await interaction.channel.send(mensaje);

        await interaction.reply({
            content: '✅ Mensaje enviado.',
            ephemeral: true
        });
    }
};