const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-panel')
        .setDescription('Crear panel de tickets'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor('#8A2BE2')
            .setTitle('🎫 DESKHACK')
            .setDescription(`
💎 **Bienvenido/a al sistema de soporte de DESKHACK**

¿Necesitas ayuda? Nuestro equipo está listo para atenderte.

🔹 Soporte y solución de problemas
🔹 Asistencia con compras y pagos
🔹 Consultas generales
🔹 Reporte de errores o fallos técnicos
🔹 Dudas sobre productos y servicios
🔹 Atención personalizada

Nuestro objetivo es brindar una atención rápida y eficiente.

Gracias por confiar en DESKHACK.
            `)
            .setImage('https://media.discordapp.net/attachments/1508867351167242391/1508872243235655851/706b17f2-a344-4f77-94de-798f0c550970.jpg')
            .setFooter({
                text: 'DESKHACK'
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('crear_ticket')
                    .setLabel('Abrir Ticket')
                    .setEmoji('🎫')
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
};