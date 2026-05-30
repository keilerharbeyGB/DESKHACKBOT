const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Borrar mensajes')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        )

        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Cantidad')
                .setRequired(true)
        ),

    async execute(interaction) {

        const cantidad = interaction.options.getInteger('cantidad');

        if (cantidad < 1 || cantidad > 100) {
            return interaction.reply({
                content: '❌ Debe ser entre 1 y 100.',
                ephemeral: true
            });
        }

        await interaction.channel.bulkDelete(cantidad, true);

        await interaction.reply({
            content: `🧹 ${cantidad} mensajes eliminados.`,
            ephemeral: true
        });
    }
};