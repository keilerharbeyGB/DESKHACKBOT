require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    console.log('Cargando:', file);

    const command = require(`./commands/${file}`);

    if (!command.data) {
        console.log('❌ ERROR EN:', file);
        continue;
    }

    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' })
    .setToken(process.env.TOKEN);

(async () => {

    try {

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('✅ Slash Commands registrados');

    } catch (error) {
        console.error(error);
    }

})();