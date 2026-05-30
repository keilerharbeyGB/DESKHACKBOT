const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banear usuario')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
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

        const miembro = await interaction.guild.members.fetch(usuario.id).catch(() => null);

        if (!miembro) {
            return interaction.reply({
                content: '❌ Usuario no encontrado.',
                ephemeral: true
            });
        }

        await miembro.ban({ reason: motivo });

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('🔨 Usuario Baneado')
            .setDescription(`
👤 Usuario: ${usuario.tag}
📝 Motivo: ${motivo}
            `);

        await interaction.reply({ embeds: [embed] });
    }
};