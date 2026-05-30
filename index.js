require('dotenv').config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`✅ DESKHACK conectado como ${client.user.tag}`);
});



client.on('guildMemberAdd', async member => {
    const rol = member.guild.roles.cache.find(
    r => r.name === '👤 Miembro'
);

if (rol) {
    member.roles.add(rol).catch(() => {});
}

    const canal = member.guild.channels.cache.find(
        c => c.name === '✅┆𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘢'
    );

    if (!canal) return;

    const embed = new EmbedBuilder()
        .setColor('#00ff88')
        .setTitle('🎉 Nuevo Miembro')
        .setDescription(`
Bienvenido ${member}

📌 Lee las reglas
🎫 Abre un ticket si necesitas ayuda
💎 Disfruta tu estancia en DESKHACK
        `)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

    canal.send({
        embeds: [embed]
    });

});


client.on('interactionCreate', async interaction => {

    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }

    if (interaction.isButton()) {

        if (interaction.customId === 'crear_ticket') {

            const categoria = interaction.guild.channels.cache.find(
                c => c.name === '📂┆𝘚𝘖𝘗𝘖𝘙𝘛𝘌'
            );

            const canal = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: categoria?.id,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages
                        ]
                    }
                ]
            });

            const cerrar = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('cerrar_ticket')
                        .setLabel('Cerrar Ticket')
                        .setEmoji('🔒')
                        .setStyle(ButtonStyle.Danger)
                );

            await canal.send({
                content: `${interaction.user}`,
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🎫 Ticket Creado')
                        .setDescription('Describe tu problema.')
                        .setColor('Green')
                ],
                components: [cerrar]
            });

            await interaction.reply({
                content: `✅ Ticket creado: ${canal}`,
                ephemeral: true
            });
        }

        if (interaction.customId === 'cerrar_ticket') {

            await interaction.reply({
                content: '🔒 Ticket cerrado en 5 segundos.',
                ephemeral: true
            });

            setTimeout(() => {
                interaction.channel.delete().catch(() => {});
            }, 5000);
        }
    }
});

client.login(process.env.TOKEN);
client