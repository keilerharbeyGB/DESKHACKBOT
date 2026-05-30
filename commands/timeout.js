const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Silenciar usuario')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)

        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario')
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option.setName('minutos')
                .setDescription('Minutos')
                .setRequired(true)
        )

        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Motivo')
                .setRequired(false)
        ),

    async execute(interaction) {

        const usuario = interaction.options.getUser('usuario');
        const minutos = interaction.options.getInteger('minutos');
        const motivo = interaction.options.getString('motivo') || 'Sin motivo';

        const miembro = await interaction.guild.members.fetch(usuario.id);

        await miembro.timeout(
            minutos * 60 * 1000,
            motivo
        );

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('🔇 Usuario Silenciado')
            .setDescription(`
👤 Usuario: ${usuario.tag}
⏳ Tiempo: ${minutos} minuto(s)
📝 Motivo: ${motivo}
            `);

        await interaction.reply({ embeds: [embed] });
    }
};