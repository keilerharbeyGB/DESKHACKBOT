const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsar usuario')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Motivo')
                .setRequired(false)
        ),

    async execute(interaction) {

        const usuario = interaction.options.getUser('usuario');
        const motivo = interaction.options.getString('motivo') || 'Sin motivo';

        const miembro = await interaction.guild.members.fetch(usuario.id);

        await miembro.kick(motivo);

        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('👢 Usuario Expulsado')
            .setDescription(`
👤 Usuario: ${usuario.tag}
📝 Motivo: ${motivo}
            `);

        await interaction.reply({ embeds: [embed] });
    }
};